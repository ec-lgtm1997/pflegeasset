import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MediumQuestion, HardQuestion } from "@/data/questions";
import type { SelfRating } from "@/lib/assessment-types";
import { ChevronDown, FileText } from "lucide-react";

interface Props {
  question: MediumQuestion | HardQuestion;
  onRate: (rating: SelfRating) => void;
}

const RATINGS: {
  id: SelfRating;
  label: string;
  classes: string;
  dot: string;
}[] = [
  {
    id: "full",
    label: "Vollständig gewusst",
    classes:
      "border-success/40 hover:border-success/70 hover:bg-success-soft text-foreground",
    dot: "bg-success",
  },
  {
    id: "partial",
    label: "Teilweise gewusst",
    classes:
      "border-warning/40 hover:border-warning/70 hover:bg-warning-soft text-foreground",
    dot: "bg-warning",
  },
  {
    id: "none",
    label: "Nicht gewusst",
    classes:
      "border-destructive/40 hover:border-destructive/70 hover:bg-destructive-soft text-foreground",
    dot: "bg-destructive",
  },
];

export function OpenQuestionView({ question, onRate }: Props) {
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const isHard = question.difficulty === "schwer";

  return (
    <div>
      {isHard && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-2xl border border-border bg-card p-6"
        >
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <FileText className="h-3.5 w-3.5" />
            Klinisches Fallbeispiel
          </div>
          <p className="whitespace-pre-line text-[0.95rem] leading-relaxed text-foreground">
            {(question as HardQuestion).caseDescription}
          </p>
        </motion.div>
      )}

      <h2 className="text-balance text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
        {question.question}
      </h2>

      <div className="mt-6">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Deine Antwort hier formulieren …"
          rows={8}
          className="w-full resize-none rounded-2xl border border-border bg-card px-5 py-4 text-[0.95rem] leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
        />
      </div>

      {!revealed && (
        <motion.button
          onClick={() => setRevealed(true)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          <ChevronDown className="h-4 w-4" />
          Musterlösung anzeigen
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
            <div className="mt-6 rounded-2xl border border-border bg-gradient-to-b from-card to-muted/40 p-6 shadow-[0_4px_20px_-12px_oklch(0.22_0.025_257/0.25)]">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-xs font-medium uppercase tracking-wider text-primary">
                  Musterlösung
                </div>
                <div className="h-px flex-1 ml-4 bg-border" />
              </div>
              <div className="whitespace-pre-line text-[0.95rem] leading-relaxed text-foreground">
                {question.modelAnswer}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Selbstbewertung
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {RATINGS.map((r) => (
                  <motion.button
                    key={r.id}
                    onClick={() => onRate(r.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 rounded-xl border bg-card px-4 py-3.5 text-sm font-medium transition-all ${r.classes}`}
                  >
                    <span className={`h-2 w-2 rounded-full ${r.dot}`} />
                    {r.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
