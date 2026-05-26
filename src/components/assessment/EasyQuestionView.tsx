import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { EasyQuestion } from "@/data/questions";
import { Check, X, ArrowRight } from "lucide-react";

interface Props {
  question: EasyQuestion;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
}

export function EasyQuestionView({ question, onAnswer, onNext }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const answered = selected !== null;

  const handleSelect = (id: string) => {
    if (answered) return;
    setSelected(id);
    onAnswer(id === question.correctOptionId);
  };

  return (
    <div>
      <h2 className="text-balance text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
        {question.question}
      </h2>

      <div className="mt-8 space-y-2.5">
        {question.options.map((opt, i) => {
          const isSelected = selected === opt.id;
          const isCorrect = opt.id === question.correctOptionId;
          const showCorrect = answered && isCorrect;
          const showWrong = answered && isSelected && !isCorrect;

          return (
            <motion.button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={answered}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={!answered ? { x: 2 } : {}}
              className={`group flex w-full items-center gap-4 rounded-xl border bg-card px-5 py-4 text-left transition-all ${
                showCorrect
                  ? "border-success/50 bg-success-soft"
                  : showWrong
                    ? "border-destructive/50 bg-destructive-soft"
                    : answered
                      ? "border-border opacity-60"
                      : "border-border hover:border-foreground/20 hover:shadow-sm"
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-mono font-semibold transition-colors ${
                  showCorrect
                    ? "bg-success text-success-foreground"
                    : showWrong
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-muted text-muted-foreground group-hover:bg-accent"
                }`}
              >
                {showCorrect ? (
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                ) : showWrong ? (
                  <X className="h-3.5 w-3.5" strokeWidth={3} />
                ) : (
                  opt.id.toUpperCase()
                )}
              </span>
              <span className="text-[0.95rem] leading-relaxed text-foreground">
                {opt.text}
              </span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-6">
              <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Erklärung
              </div>
              <p className="whitespace-pre-line text-[0.95rem] leading-relaxed text-foreground">
                {question.explanation}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <motion.button
                onClick={onNext}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-[0_8px_24px_-12px_oklch(0.22_0.025_257/0.5)]"
              >
                Weiter
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
