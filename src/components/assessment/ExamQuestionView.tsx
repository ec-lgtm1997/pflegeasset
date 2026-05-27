import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { HardQuestion } from "@/data/questions";
import type { GradeResult } from "@/lib/grade.functions";
import { useServerFn } from "@tanstack/react-start";
import { gradeAnswer } from "@/lib/grade.functions";
import { ArrowRight, Flag } from "lucide-react";

interface Props {
  question: HardQuestion;
  onSubmit: (answer: string, aiResult: GradeResult | null) => void;
  isLast: boolean;
}

export function ExamQuestionView({ question, onSubmit, isLast }: Props) {
  const [answer, setAnswer] = useState("");
  const [grading, setGrading] = useState(false);
  const [aiResult, setAiResult] = useState<GradeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const grade = useServerFn(gradeAnswer);

  // Trigger background grading when answer changes significantly
  // but we won't await it - just start the process
  useEffect(() => {
    if (answer.trim().length < 20) return;

    const timeoutId = setTimeout(() => {
      // Start grading in background (don't wait for it)
      grade({
        data: {
          question: question.question,
          modelAnswer: question.modelAnswer,
          userAnswer: answer.trim(),
        },
      })
        .then((result) => {
          setAiResult(result);
          setError(null);
        })
        .catch((err) => {
          console.error("Background grading failed:", err);
          setError("KI-Bewertung fehlgeschlagen");
        });
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [answer, question, grade]);

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    setGrading(true);

    try {
      // If we already have a result from background grading, use it
      if (aiResult && answer.trim().length >= 20) {
        onSubmit(answer.trim(), aiResult);
        return;
      }

      // Otherwise, trigger grading now and wait for it
      const result = await grade({
        data: {
          question: question.question,
          modelAnswer: question.modelAnswer,
          userAnswer: answer.trim(),
        },
      });
      onSubmit(answer.trim(), result);
    } catch (err) {
      console.error(err);
      // Still submit even if grading fails
      onSubmit(answer.trim(), null);
      setError("KI-Bewertung fehlgeschlagen");
    } finally {
      setGrading(false);
    }
  };

  const canSubmit = answer.trim().length > 0 && !grading;

  return (
    <div>
      <h2 className="text-balance text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
        {question.question}
      </h2>

      {error && (
        <div className="mt-4 rounded-lg border border-warning/40 bg-warning-soft px-4 py-3 text-sm text-foreground">
          {error}
        </div>
      )}

      <div className="mt-6">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Deine Antwort hier formulieren …"
          rows={8}
          disabled={grading}
          className="w-full resize-none rounded-2xl border border-border bg-card px-5 py-4 text-[0.95rem] leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all disabled:opacity-70"
        />
      </div>

      {grading && aiResult === null && (
        <div className="mt-4 text-xs text-muted-foreground italic">
          Antwort wird ausgewertet …
        </div>
      )}

      <motion.button
        onClick={handleSubmit}
        disabled={!canSubmit}
        whileHover={canSubmit ? { scale: 1.02 } : {}}
        whileTap={canSubmit ? { scale: 0.98 } : {}}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background shadow-[0_10px_30px_-12px_oklch(0.22_0.025_257/0.5)] transition-colors hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {isLast ? (
          <>
            <Flag className="h-4 w-4" />
            Simulation abschließen
          </>
        ) : (
          <>
            Nächste Frage
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </motion.button>

      {!isLast && (
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Dein Antwort wird im Hintergrund ausgewertet.
        </p>
      )}
    </div>
  );
}
