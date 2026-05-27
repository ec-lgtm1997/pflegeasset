import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { HardQuestion } from "@/data/questions";
import type { SelfRating } from "@/lib/assessment-types";
import { useServerFn } from "@tanstack/react-start";
import { gradeAnswer, type AiGrade, type GradeResult } from "@/lib/grade.functions";
import { Sparkles, Loader2, AlertTriangle, ArrowRight } from "lucide-react";

interface Props {
  question: HardQuestion;
  onRate: (rating: SelfRating) => void;
}

const RATINGS: {
  id: SelfRating;
  label: string;
  points: string;
  classes: string;
  selectedClasses: string;
  dot: string;
}[] = [
  {
    id: "full",
    label: "Richtig",
    points: "1 Pkt",
    classes:
      "border-success/40 hover:border-success/70 hover:bg-success-soft text-foreground",
    selectedClasses:
      "border-success bg-success-soft ring-2 ring-success/30 text-foreground",
    dot: "bg-success",
  },
  {
    id: "partial",
    label: "Teilweise richtig",
    points: "0,5 Pkt",
    classes:
      "border-warning/40 hover:border-warning/70 hover:bg-warning-soft text-foreground",
    selectedClasses:
      "border-warning bg-warning-soft ring-2 ring-warning/30 text-foreground",
    dot: "bg-warning",
  },
  {
    id: "none",
    label: "Falsch",
    points: "0 Pkt",
    classes:
      "border-destructive/40 hover:border-destructive/70 hover:bg-destructive-soft text-foreground",
    selectedClasses:
      "border-destructive bg-destructive-soft ring-2 ring-destructive/30 text-foreground",
    dot: "bg-destructive",
  },
];

function mapAiGrade(g: AiGrade): SelfRating {
  if (g === "correct") return "full";
  if (g === "partial") return "partial";
  return "none";
}

export function OpenQuestionView({ question, onRate }: Props) {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<GradeResult | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState<SelfRating | null>(null);

  const grade = useServerFn(gradeAnswer);

  const handleGrade = async () => {
    if (!answer.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const result = await grade({
        data: {
          question: question.question,
          modelAnswer: question.modelAnswer,
          userAnswer: answer.trim(),
        },
      });
      setAiResult(result);
      setSelected(mapAiGrade(result.grade));
      setRevealed(true);
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error
          ? e.message
          : "Unbekannter Fehler bei der KI-Prüfung.",
      );
      // Falls KI nicht erreichbar: Musterlösung trotzdem freigeben
      setRevealed(true);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (!selected) return;
    onRate(selected);
  };

  return (
    <div>
      <h2 className="text-balance text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
        {question.question}
      </h2>

      <div className="mt-6">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Deine Antwort hier formulieren …"
          rows={8}
          disabled={revealed || loading}
          className="w-full resize-none rounded-2xl border border-border bg-card px-5 py-4 text-[0.95rem] leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all disabled:opacity-70"
        />
      </div>

      {!revealed && (
        <motion.button
          onClick={handleGrade}
          disabled={loading || !answer.trim()}
          whileHover={{ scale: loading || !answer.trim() ? 1 : 1.01 }}
          whileTap={{ scale: loading || !answer.trim() ? 1 : 0.99 }}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              KI prüft Antwort …
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Antwort durch KI prüfen
            </>
          )}
        </motion.button>
      )}

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {/* KI-Empfehlung */}
            {aiResult && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="mt-6 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.06] to-primary/[0.02] p-6 shadow-[0_4px_24px_-12px_oklch(0.55_0.18_255/0.35)]"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    KI-Einschätzung
                  </div>
                  <AiGradeBadge grade={aiResult.grade} />
                </div>
                <p className="text-[0.95rem] leading-relaxed text-foreground">
                  {aiResult.reasoning}
                </p>
              </motion.div>
            )}

            {error && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive-soft p-4 text-sm text-foreground">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <div>
                  <div className="font-medium">KI-Prüfung fehlgeschlagen</div>
                  <div className="text-muted-foreground">{error}</div>
                </div>
              </div>
            )}

            {/* Musterlösung */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mt-4 rounded-2xl border border-border bg-gradient-to-b from-card to-muted/40 p-6 shadow-[0_4px_20px_-12px_oklch(0.22_0.025_257/0.25)]"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="text-xs font-medium uppercase tracking-wider text-primary">
                  Musterlösung
                </div>
                <div className="ml-4 h-px flex-1 bg-border" />
              </div>
              <div className="whitespace-pre-line text-[0.95rem] leading-relaxed text-foreground">
                {question.modelAnswer}
              </div>
            </motion.div>

            {/* Selbstbewertung */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Bewertung {aiResult && "(Vorauswahl durch KI – anpassbar)"}
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {RATINGS.map((r) => {
                  const isSelected = selected === r.id;
                  return (
                    <motion.button
                      key={r.id}
                      onClick={() => setSelected(r.id)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center justify-between gap-3 rounded-xl border bg-card px-4 py-3.5 text-sm font-medium transition-all ${
                        isSelected ? r.selectedClasses : r.classes
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`h-2 w-2 rounded-full ${r.dot}`} />
                        {r.label}
                      </span>
                      <span className="font-mono text-[0.7rem] tabular-nums text-muted-foreground">
                        {r.points}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <motion.button
                onClick={handleConfirm}
                disabled={!selected}
                whileHover={{ scale: selected ? 1.01 : 1 }}
                whileTap={{ scale: selected ? 0.99 : 1 }}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-sm transition-colors hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                Bewertung übernehmen
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AiGradeBadge({ grade }: { grade: AiGrade }) {
  const map: Record<AiGrade, { label: string; cls: string }> = {
    correct: {
      label: "Richtig · 1 Pkt",
      cls: "bg-success-soft text-foreground border-success/40",
    },
    partial: {
      label: "Teilweise · 0,5 Pkt",
      cls: "bg-warning-soft text-foreground border-warning/40",
    },
    wrong: {
      label: "Falsch · 0 Pkt",
      cls: "bg-destructive-soft text-foreground border-destructive/40",
    },
  };
  const m = map[grade];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-wider ${m.cls}`}
    >
      {m.label}
    </span>
  );
}
