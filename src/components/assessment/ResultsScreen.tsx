import { motion, AnimatePresence } from "framer-motion";
import type { SessionResult, ExamAnswer, SelfRating } from "@/lib/assessment-types";
import { ratingPoints, isLearningResult, aiGradeToRating } from "@/lib/assessment-types";
import { RotateCcw, ChevronDown, Sparkles, FileText, Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect } from "react";

interface Props {
  results: SessionResult[];
  mode: "learn" | "exam";
  pendingGrades: number;
  onRestart: () => void;
}

export function ResultsScreen({ results, mode, pendingGrades, onRestart }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const total = results.length;

  // Calculate statistics based on mode
  let full = 0;
  let partial = 0;
  let none = 0;

  if (mode === "learn") {
    full = results.filter((r) => isLearningResult(r) && r.rating === "full").length;
    partial = results.filter((r) => isLearningResult(r) && r.rating === "partial").length;
    none = results.filter((r) => isLearningResult(r) && r.rating === "none").length;
  } else {
    // Exam mode - use AI grades
    results.forEach((r) => {
      if (!isLearningResult(r) && r.aiResult) {
        const rating = aiGradeToRating(r.aiResult.grade);
        if (rating === "full") full++;
        else if (rating === "partial") partial++;
        else none++;
      } else if (!isLearningResult(r) && !r.aiResult) {
        // No AI result yet, count as pending
        none++;
      }
    });
  }

  const score = full * 1 + partial * 0.5;
  const actualTotal = results.filter((r) => !isLearningResult(r) ? r.aiResult !== null : true).length;
  const pct = actualTotal === 0 ? 0 : Math.round((score / actualTotal) * 100);

  const buckets = [
    {
      label: "Vollständig",
      sub: "1 Pkt",
      value: full,
      color: "var(--success)",
    },
    {
      label: "Teilweise",
      sub: "0,5 Pkt",
      value: partial,
      color: "var(--warning)",
    },
    {
      label: "Nicht gewusst",
      sub: "0 Pkt",
      value: none,
      color: "var(--destructive)",
    },
  ];

  // Donut chart
  const size = 220;
  const stroke = 18;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  let offsetAcc = 0;

  const scoreLabel = formatPoints(score);
  const totalLabel = formatPoints(actualTotal);

  // Auto-show details after a short delay in exam mode
  useEffect(() => {
    if (mode === "exam" && pendingGrades === 0) {
      const timer = setTimeout(() => setShowDetails(true), 600);
      return () => clearTimeout(timer);
    }
  }, [mode, pendingGrades]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-3xl px-6 py-16"
    >
      <div className="text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          {mode === "exam" ? "Prüfung abgeschlossen" : "Session abgeschlossen"}
        </div>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Auswertung
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          {total} Frage{total === 1 ? "" : "n"} bearbeitet
          {mode === "exam" && pendingGrades > 0 && (
            <span className="ml-2 inline-flex items-center gap-1.5">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
              <span className="text-xs italic">
                {pendingGrades} Antwort{pendingGrades === 1 ? "" : "n"} werden noch ausgewertet …
              </span>
            </span>
          )}
        </p>
      </div>

      <div className="mt-12 flex flex-col items-center">
        <div className="relative">
          <svg width={size} height={size} className="-rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="var(--muted)"
              strokeWidth={stroke}
            />
            {buckets.map((b, i) => {
              if (b.value === 0 || actualTotal === 0) return null;
              const length = (b.value / actualTotal) * circumference;
              const dashArray = `${length} ${circumference - length}`;
              const dashOffset = -offsetAcc;
              offsetAcc += length;
              return (
                <motion.circle
                  key={i}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={b.color}
                  strokeWidth={stroke}
                  strokeLinecap="butt"
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                />
              );
            })}
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="text-5xl font-semibold tabular-nums tracking-tight text-foreground"
            >
              {scoreLabel}
            </motion.div>
            <div className="mt-1 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              von {totalLabel} · {pct}%
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-center text-sm text-muted-foreground"
        >
          Gesamtpunktzahl
        </motion.div>

        <div className="mt-10 w-full space-y-3">
          {buckets.map((b, i) => {
            const barPct = actualTotal === 0 ? 0 : (b.value / actualTotal) * 100;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: b.color }}
                    />
                    <span className="font-medium text-foreground">
                      {b.label}
                    </span>
                    <span className="font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">
                      {b.sub}
                    </span>
                  </div>
                  <div className="font-mono text-xs tabular-nums text-muted-foreground">
                    {b.value} / {actualTotal}
                  </div>
                </div>
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: b.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${barPct}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.7 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detaillierte Fragenübersicht im Prüfungsmodus */}
      {mode === "exam" && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium tracking-wide text-foreground">
              Detaillierte Auswertung
            </h3>
            {pendingGrades > 0 && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
                Noch {pendingGrades} Evaluierung{pendingGrades === 1 ? "" : "en"} offen
              </span>
            )}
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {results
              .filter((r): r is ExamAnswer => !isLearningResult(r))
              .map((result, i) => (
                <AccordionItem
                  key={result.questionId}
                  value={result.questionId}
                  className="overflow-hidden rounded-xl border border-border bg-card data-[state=open]:shadow-sm"
                >
                  <AccordionTrigger className="px-5 py-4 hover:no-underline">
                    <div className="flex w-full items-center justify-between gap-3 pr-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-medium tabular-nums text-foreground">
                          {i + 1}
                        </span>
                        <span className="text-left text-sm font-medium text-foreground line-clamp-1">
                          {result.question}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {result.aiResult ? (
                          <AiGradeBadge grade={result.aiResult.grade} />
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full border border-muted bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Auswertung
                          </span>
                        )}
                        <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5">
                    <div className="space-y-5">
                      {/* Nutzerantwort */}
                      <div>
                        <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          <FileText className="h-3.5 w-3.5" />
                          Deine Antwort
                        </div>
                        <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm leading-relaxed text-foreground">
                          {result.userAnswer || (
                            <span className="italic text-muted-foreground">Keine Antwort</span>
                          )}
                        </div>
                      </div>

                      {/* KI-Einschätzung */}
                      {result.aiResult && (
                        <div>
                          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
                            <Sparkles className="h-3.5 w-3.5" />
                            KI-Einschätzung
                          </div>
                          <div className="rounded-lg border border-primary/30 bg-gradient-to-br from-primary/[0.06] to-primary/[0.02] p-4 text-sm leading-relaxed text-foreground">
                            {result.aiResult.reasoning}
                          </div>
                        </div>
                      )}

                      {/* Musterlösung */}
                      <div>
                        <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          <FileText className="h-3.5 w-3.5" />
                          Musterlösung
                        </div>
                        <div className="rounded-lg border border-border bg-card p-4 text-sm leading-relaxed text-foreground">
                          <div className="whitespace-pre-line">{result.modelAnswer}</div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </motion.div>
      )}

      <div className="mt-12 flex justify-center">
        <motion.button
          onClick={onRestart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background shadow-[0_10px_30px_-12px_oklch(0.22_0.025_257/0.5)]"
        >
          <RotateCcw className="h-4 w-4" />
          Zurück zum Start
        </motion.button>
      </div>
    </motion.div>
  );
}

function AiGradeBadge({ grade }: { grade: "correct" | "partial" | "wrong" }) {
  const map: Record<typeof grade, { label: string; cls: string }> = {
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

function formatPoints(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(1).replace(".", ",");
}
