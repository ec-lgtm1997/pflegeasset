import { motion } from "framer-motion";
import type { Difficulty } from "@/data/questions";
import { getQuestionsByDifficulty } from "@/data/questions";
import { Stethoscope, BookOpen, Activity, ArrowRight } from "lucide-react";

type CountOption = 3 | 5 | 10 | "all";

interface Props {
  difficulty: Difficulty | null;
  count: CountOption;
  onSelectDifficulty: (d: Difficulty) => void;
  onSelectCount: (c: CountOption) => void;
  onStart: () => void;
}

const DIFFICULTIES: {
  id: Difficulty;
  label: string;
  sub: string;
  desc: string;
  icon: typeof Stethoscope;
}[] = [
  {
    id: "leicht",
    label: "Leicht",
    sub: "Multiple-Choice",
    desc: "Schnelle Wissensabfrage mit vier Antwortoptionen.",
    icon: BookOpen,
  },
  {
    id: "mittel",
    label: "Mittel",
    sub: "Kurze offene Fragen",
    desc: "Eigene Formulierung, Abgleich mit Musterlösung.",
    icon: Stethoscope,
  },
  {
    id: "schwer",
    label: "Schwer",
    sub: "OSCE — Fallbasiert",
    desc: "Klinische Szenarien nach strukturiertem Schema.",
    icon: Activity,
  },
];

const COUNTS: CountOption[] = [3, 5, 10, "all"];

export function StartScreen({
  difficulty,
  count,
  onSelectDifficulty,
  onSelectCount,
  onStart,
}: Props) {
  const available = difficulty ? getQuestionsByDifficulty(difficulty).length : 0;
  const canStart = difficulty !== null && available > 0;

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
          Trainiere strukturiert. Wähle einen Schwierigkeitsgrad und beginne deine Session.
        </p>
      </div>

      {/* Schritt 1 */}
      <section className="mt-14">
        <StepLabel index={1} title="Schwierigkeitsgrad" />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {DIFFICULTIES.map((d, i) => {
            const Icon = d.icon;
            const active = difficulty === d.id;
            return (
              <motion.button
                key={d.id}
                onClick={() => onSelectDifficulty(d.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
                className={`group relative flex flex-col items-start rounded-2xl border bg-card p-5 text-left transition-all duration-300 ${
                  active
                    ? "border-primary/60 shadow-[0_8px_30px_-12px_oklch(0.52_0.13_248/0.35)] ring-1 ring-primary/40"
                    : "border-border hover:border-foreground/15 hover:shadow-sm"
                }`}
              >
                <div
                  className={`mb-4 inline-flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground group-hover:bg-accent"
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </div>
                <div className="text-base font-semibold text-foreground">
                  {d.label}
                </div>
                <div className="mt-0.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {d.sub}
                </div>
                <div className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {d.desc}
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Schritt 2 */}
      <section className="mt-10">
        <StepLabel index={2} title="Anzahl Fragen" />
        <div className="mt-4 inline-flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-1.5">
          {COUNTS.map((c) => {
            const active = count === c;
            const label = c === "all" ? "Alle" : String(c);
            return (
              <button
                key={String(c)}
                onClick={() => onSelectCount(c)}
                className={`relative rounded-xl px-5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        {difficulty && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-xs text-muted-foreground"
          >
            {available} Frage{available === 1 ? "" : "n"} im Pool verfügbar
            {count !== "all" && available < (count as number)
              ? ` — Session wird auf ${available} begrenzt.`
              : ""}
          </motion.p>
        )}
      </section>

      {/* Start */}
      <div className="mt-12 flex justify-center">
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
      </div>
    </motion.div>
  );
}

function StepLabel({ index, title }: { index: number; title: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-xs font-mono tabular-nums text-muted-foreground">
        0{index}
      </span>
      <h2 className="text-sm font-medium tracking-wide text-foreground">
        {title}
      </h2>
    </div>
  );
}
