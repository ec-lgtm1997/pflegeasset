import { useMemo } from "react";
import { motion } from "framer-motion";
import { getCases } from "@/data/questions";
import { ArrowRight, Check, FileText } from "lucide-react";

interface Props {
  selected: Set<string>;
  onToggle: (caseId: string) => void;
  onSelectAll: () => void;
  onSelectNone: () => void;
  onStart: () => void;
}

export function StartScreen({
  selected,
  onToggle,
  onSelectAll,
  onSelectNone,
  onStart,
}: Props) {
  const cases = useMemo(() => getCases(), []);
  const totalQuestions = useMemo(
    () =>
      cases
        .filter((c) => selected.has(c.caseId))
        .reduce((acc, c) => acc + c.questions.length, 0),
    [cases, selected],
  );
  const canStart = selected.size > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-3xl px-6 py-16"
    >
      <div className="text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Pflegeassessment
        </div>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Prüfungssimulation
        </h1>
        <p className="mx-auto mt-3 max-w-md text-pretty text-base text-muted-foreground">
          Wähle die Fallbeispiele aus, die du trainieren möchtest.
        </p>
      </div>

      <section className="mt-12">
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <div className="flex items-baseline gap-3">
            <span className="text-xs font-mono tabular-nums text-muted-foreground">
              01
            </span>
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Fallbeispiele
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={onSelectAll}
              className="rounded-full px-3 py-1 font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              Alle
            </button>
            <button
              onClick={onSelectNone}
              className="rounded-full px-3 py-1 font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              Keine
            </button>
          </div>
        </div>

        <div className="grid gap-2.5">
          {cases.map((c, i) => {
            const active = selected.has(c.caseId);
            return (
              <motion.button
                key={c.caseId}
                onClick={() => onToggle(c.caseId)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i, 12) * 0.02, duration: 0.3 }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.995 }}
                className={`group relative flex items-start gap-4 rounded-2xl border bg-card p-4 text-left transition-all duration-200 ${
                  active
                    ? "border-primary/60 shadow-[0_6px_24px_-12px_oklch(0.52_0.13_248/0.35)] ring-1 ring-primary/30"
                    : "border-border hover:border-foreground/15 hover:shadow-sm"
                }`}
              >
                <div
                  className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition-all ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background"
                  }`}
                >
                  {active && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[0.7rem] font-mono uppercase tracking-wider text-muted-foreground">
                      Fall {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.7rem] font-medium text-muted-foreground">
                      ·
                    </span>
                    <span className="inline-flex items-center gap-1 text-[0.7rem] font-medium text-muted-foreground">
                      <FileText className="h-3 w-3" />
                      {c.questions.length} Frage
                      {c.questions.length === 1 ? "" : "n"}
                    </span>
                  </div>
                  <div className="mt-1 text-sm font-medium leading-snug text-foreground">
                    {c.title}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      <div className="mt-10 flex flex-col items-center gap-3">
        <motion.button
          onClick={onStart}
          disabled={!canStart}
          whileHover={canStart ? { scale: 1.02 } : {}}
          whileTap={canStart ? { scale: 0.98 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className={`group inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-medium transition-all ${
            canStart
              ? "bg-foreground text-background shadow-[0_10px_30px_-12px_oklch(0.22_0.025_257/0.5)] hover:shadow-[0_14px_40px_-12px_oklch(0.22_0.025_257/0.6)]"
              : "cursor-not-allowed bg-muted text-muted-foreground"
          }`}
        >
          Simulation starten
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </motion.button>
        {canStart && (
          <p className="text-xs text-muted-foreground">
            {selected.size} Fall{selected.size === 1 ? "" : "ä"}lle ·{" "}
            {totalQuestions} Frage{totalQuestions === 1 ? "" : "n"}
          </p>
        )}
      </div>
    </motion.div>
  );
}
