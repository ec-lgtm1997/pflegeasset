import { motion } from "framer-motion";
import type { SessionResult } from "@/lib/assessment-types";
import type { Difficulty } from "@/data/questions";
import { RotateCcw } from "lucide-react";

interface Props {
  results: SessionResult[];
  difficulty: Difficulty;
  onRestart: () => void;
}

export function ResultsScreen({ results, difficulty, onRestart }: Props) {
  const total = results.length;
  const isEasy = difficulty === "leicht";

  let buckets: { label: string; value: number; color: string; soft: string }[];

  if (isEasy) {
    const correct = results.filter(
      (r) => r.kind === "easy" && r.correct,
    ).length;
    const wrong = total - correct;
    buckets = [
      {
        label: "Richtig",
        value: correct,
        color: "var(--success)",
        soft: "var(--success-soft)",
      },
      {
        label: "Falsch",
        value: wrong,
        color: "var(--destructive)",
        soft: "var(--destructive-soft)",
      },
    ];
  } else {
    const full = results.filter(
      (r) => r.kind === "open" && r.rating === "full",
    ).length;
    const partial = results.filter(
      (r) => r.kind === "open" && r.rating === "partial",
    ).length;
    const none = results.filter(
      (r) => r.kind === "open" && r.rating === "none",
    ).length;
    buckets = [
      {
        label: "Vollständig",
        value: full,
        color: "var(--success)",
        soft: "var(--success-soft)",
      },
      {
        label: "Teilweise",
        value: partial,
        color: "var(--warning)",
        soft: "var(--warning-soft)",
      },
      {
        label: "Nicht gewusst",
        value: none,
        color: "var(--destructive)",
        soft: "var(--destructive-soft)",
      },
    ];
  }

  const headlinePct =
    total === 0
      ? 0
      : Math.round(((buckets[0]?.value ?? 0) / total) * 100);

  // donut
  const size = 200;
  const stroke = 18;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  let offsetAcc = 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-2xl px-6 py-16"
    >
      <div className="text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Session abgeschlossen
        </div>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Auswertung
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          {total} Frage{total === 1 ? "" : "n"} bearbeitet
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
              if (b.value === 0) return null;
              const length = (b.value / total) * circumference;
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
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-4xl font-semibold tabular-nums tracking-tight text-foreground"
            >
              {headlinePct}%
            </motion.div>
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
              {buckets[0].label}
            </div>
          </div>
        </div>

        <div className="mt-10 w-full space-y-3">
          {buckets.map((b, i) => {
            const pct = total === 0 ? 0 : (b.value / total) * 100;
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
                    <span className="font-medium text-foreground">{b.label}</span>
                  </div>
                  <div className="font-mono text-xs tabular-nums text-muted-foreground">
                    {b.value} / {total} ·{" "}
                    <span className="text-foreground">{Math.round(pct)}%</span>
                  </div>
                </div>
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: b.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.7 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

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
