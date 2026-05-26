import { motion } from "framer-motion";
import type { SessionResult } from "@/lib/assessment-types";
import { ratingPoints } from "@/lib/assessment-types";
import { RotateCcw } from "lucide-react";

interface Props {
  results: SessionResult[];
  onRestart: () => void;
}

export function ResultsScreen({ results, onRestart }: Props) {
  const total = results.length;

  const full = results.filter((r) => r.rating === "full").length;
  const partial = results.filter((r) => r.rating === "partial").length;
  const none = results.filter((r) => r.rating === "none").length;

  const score = results.reduce((acc, r) => acc + ratingPoints(r.rating), 0);
  const pct = total === 0 ? 0 : Math.round((score / total) * 100);

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

  // donut
  const size = 220;
  const stroke = 18;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  let offsetAcc = 0;

  // Punkte als hübsche Darstellung (0,5 → ½)
  const scoreLabel = formatPoints(score);
  const totalLabel = formatPoints(total);

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
            const barPct = total === 0 ? 0 : (b.value / total) * 100;
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
                    {b.value} / {total}
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

function formatPoints(n: number): string {
  // 1.5 → "1,5"; 2 → "2"
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(1).replace(".", ",");
}
