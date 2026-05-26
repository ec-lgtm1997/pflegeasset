import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  pickSessionQuestions,
  type Difficulty,
  type Question,
} from "@/data/questions";
import type { SelfRating, SessionResult } from "@/lib/assessment-types";
import { StartScreen } from "@/components/assessment/StartScreen";
import { ProgressBar } from "@/components/assessment/ProgressBar";
import { EasyQuestionView } from "@/components/assessment/EasyQuestionView";
import { OpenQuestionView } from "@/components/assessment/OpenQuestionView";
import { ResultsScreen } from "@/components/assessment/ResultsScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pflegeassessment — Prüfungssimulation" },
      {
        name: "description",
        content:
          "Minimalistische Prüfungssimulation für Pflege und Medizin. Multiple-Choice, offene Fragen und OSCE-Fallbeispiele mit Selbstbewertung.",
      },
    ],
  }),
  component: Index,
});

type Phase = "start" | "session" | "results";
type CountOption = 3 | 5 | 10 | "all";

function Index() {
  const [phase, setPhase] = useState<Phase>("start");
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [count, setCount] = useState<CountOption>(5);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<SessionResult[]>([]);

  const total = questions.length;
  const current = questions[index];

  const handleStart = () => {
    if (!difficulty) return;
    const session = pickSessionQuestions(difficulty, count);
    if (session.length === 0) return;
    setQuestions(session);
    setIndex(0);
    setResults([]);
    setPhase("session");
  };

  const advance = (result: SessionResult) => {
    const nextResults = [...results, result];
    setResults(nextResults);
    if (index + 1 >= total) {
      // tiny delay so the user sees the feedback for open mode
      setTimeout(() => setPhase("results"), 180);
    } else {
      setIndex(index + 1);
    }
  };

  const handleEasyAnswer = (correct: boolean) => {
    // store, but stay on screen until user clicks "Weiter"
    pendingResult.current = { kind: "easy", correct };
  };

  const pendingResult = useMemoRef<SessionResult | null>(null);

  const handleEasyNext = () => {
    if (pendingResult.current) {
      const r = pendingResult.current;
      pendingResult.current = null;
      advance(r);
    }
  };

  const handleRate = (rating: SelfRating) => {
    advance({ kind: "open", rating });
  };

  const handleRestart = () => {
    setPhase("start");
    setQuestions([]);
    setIndex(0);
    setResults([]);
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
              difficulty={difficulty}
              count={count}
              onSelectDifficulty={setDifficulty}
              onSelectCount={setCount}
              onStart={handleStart}
            />
          </motion.div>
        )}

        {phase === "session" && current && (
          <motion.div
            key={`q-${index}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-3xl px-6 py-12"
          >
            <div className="mb-10">
              <ProgressBar current={index + 1} total={total} />
            </div>

            {current.difficulty === "leicht" ? (
              <EasyQuestionView
                key={current.id}
                question={current}
                onAnswer={handleEasyAnswer}
                onNext={handleEasyNext}
              />
            ) : (
              <OpenQuestionView
                key={current.id}
                question={current}
                onRate={handleRate}
              />
            )}
          </motion.div>
        )}

        {phase === "results" && difficulty && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ResultsScreen
              results={results}
              difficulty={difficulty}
              onRestart={handleRestart}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// tiny ref helper to avoid importing useRef from another file
import { useRef } from "react";
function useMemoRef<T>(initial: T) {
  return useRef<T>(initial);
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
