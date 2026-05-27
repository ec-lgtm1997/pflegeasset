import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  getCases,
  pickSessionByCases,
  type Question,
} from "@/data/questions";
import type { SelfRating, SessionResult, ExamAnswer, AssessmentMode } from "@/lib/assessment-types";
import { isLearningResult } from "@/lib/assessment-types";
import { StartScreen } from "@/components/assessment/StartScreen";
import { ProgressBar } from "@/components/assessment/ProgressBar";
import { OpenQuestionView } from "@/components/assessment/OpenQuestionView";
import { ExamQuestionView } from "@/components/assessment/ExamQuestionView";
import { ResultsScreen } from "@/components/assessment/ResultsScreen";
import { ArrowLeft, FileText } from "lucide-react";
import type { GradeResult } from "@/lib/grade.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pflegeassessment — Prüfungssimulation" },
      {
        name: "description",
        content:
          "Minimalistische Prüfungssimulation für Pflege und Medizin. Fallbasierte OSCE-Fragen mit Musterlösung und Selbstbewertung.",
      },
    ],
  }),
  component: Index,
});

type Phase = "start" | "session" | "results";

function Index() {
  const [phase, setPhase] = useState<Phase>("start");
  const [mode, setMode] = useState<AssessmentMode>("learn");
  const [selectedCases, setSelectedCases] = useState<Set<string>>(new Set());
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<SessionResult[]>([]);
  const [pendingGrades, setPendingGrades] = useState(0);

  const allCases = useMemo(() => getCases(), []);
  const total = questions.length;
  const current = questions[index];

  // Fall-Info für aktuelle Frage finden
  const currentCase = useMemo(() => {
    if (!current) return null;
    return allCases.find((c) => c.caseId === current.caseId) ?? null;
  }, [current, allCases]);

  // Position der Frage innerhalb des aktuellen Falls
  const caseProgress = useMemo(() => {
    if (!current || !currentCase) return null;
    const localIndex = currentCase.questions.findIndex(
      (q) => q.id === current.id,
    );
    return {
      current: localIndex + 1,
      total: currentCase.questions.length,
    };
  }, [current, currentCase]);

  // Count pending grades for exam mode
  useEffect(() => {
    if (phase === "results" && mode === "exam") {
      const pending = results.filter((r) => !isLearningResult(r) && r.aiResult === null).length;
      setPendingGrades(pending);
    }
  }, [phase, mode, results]);

  const toggleCase = (caseId: string) => {
    setSelectedCases((prev) => {
      const next = new Set(prev);
      if (next.has(caseId)) next.delete(caseId);
      else next.add(caseId);
      return next;
    });
  };

  const handleSelectAll = () =>
    setSelectedCases(new Set(allCases.map((c) => c.caseId)));
  const handleSelectNone = () => setSelectedCases(new Set());

  const handleStart = (selectedMode: AssessmentMode) => {
    if (selectedCases.size === 0) return;
    const session = pickSessionByCases(Array.from(selectedCases));
    if (session.length === 0) return;
    setMode(selectedMode);
    setQuestions(session);
    setIndex(0);
    setResults([]);
    setPendingGrades(0);
    setPhase("session");
  };

  // Lernmodus: Selbstbewertung
  const handleRate = (rating: SelfRating) => {
    const next = [...results, { kind: "open" as const, rating }];
    setResults(next);
    if (index + 1 >= total) {
      setTimeout(() => setPhase("results"), 180);
    } else {
      setIndex(index + 1);
    }
  };

  // Prüfungsmodus: Antwort speichern
  const handleExamSubmit = (answer: string, aiResult: GradeResult | null) => {
    if (!current) return;

    const examAnswer: ExamAnswer = {
      questionId: current.id,
      question: current.question,
      userAnswer: answer,
      modelAnswer: current.modelAnswer,
      aiResult,
    };

    const next = [...results, examAnswer];
    setResults(next);

    if (aiResult === null) {
      setPendingGrades((prev) => prev + 1);
    }

    if (index + 1 >= total) {
      setTimeout(() => setPhase("results"), 180);
    } else {
      setIndex(index + 1);
    }
  };

  const handleRestart = () => {
    setPhase("start");
    setQuestions([]);
    setIndex(0);
    setResults([]);
    setPendingGrades(0);
  };

  const handleBackToStart = () => {
    if (
      results.length > 0 &&
      !window.confirm(
        "Session wirklich abbrechen? Dein bisheriger Fortschritt geht verloren.",
      )
    ) {
      return;
    }
    handleRestart();
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      <BackgroundGlow />

      <AnimatePresence mode="wait">
        {phase === "start" && (
          <motion.div
            key="start"
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <StartScreen
              selected={selectedCases}
              onToggle={toggleCase}
              onSelectAll={handleSelectAll}
              onSelectNone={handleSelectNone}
              onStart={handleStart}
            />
          </motion.div>
        )}

        {phase === "session" && current && currentCase && (
          <motion.div
            key="session"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mx-auto w-full max-w-3xl px-6 py-10"
          >
            {/* Zurück-Button */}
            <div className="mb-6">
              <button
                onClick={handleBackToStart}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Zurück zur Startseite
              </button>
            </div>

            {/* Fortschritt */}
            <div className="mb-8">
              <ProgressBar current={index + 1} total={total} />
            </div>

            {/* Fallbeschreibung (pinned, animiert beim Fallwechsel) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCase.caseId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8 rounded-2xl border border-border bg-card p-6"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <FileText className="h-3.5 w-3.5" />
                    Klinisches Fallbeispiel
                  </div>
                  {caseProgress && caseProgress.total > 1 && (
                    <div className="font-mono text-[0.7rem] tabular-nums uppercase tracking-wider text-muted-foreground">
                      Frage {caseProgress.current} / {caseProgress.total}
                    </div>
                  )}
                </div>
                <p className="whitespace-pre-line text-[0.95rem] leading-relaxed text-foreground">
                  {currentCase.caseDescription}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Frage */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {mode === "learn" ? (
                  <OpenQuestionView question={current} onRate={handleRate} />
                ) : (
                  <ExamQuestionView
                    question={current}
                    onSubmit={handleExamSubmit}
                    isLast={index + 1 >= total}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {phase === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ResultsScreen
              results={results}
              mode={mode}
              pendingGrades={pendingGrades}
              onRestart={handleRestart}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.92 0.05 240 / 0.6), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.92 0.06 162 / 0.5), transparent)",
        }}
      />
    </div>
  );
}
