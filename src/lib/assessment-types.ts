import type { GradeResult } from "@/lib/grade.functions";

export type SelfRating = "full" | "partial" | "none";

export type AssessmentMode = "learn" | "exam";

// Lernmodus: Selbstbewertung durch Nutzer
export type LearningResult = { kind: "open"; rating: SelfRating };

// Prüfungsmodus: KI-Bewertung mit detaillierten Daten
export interface ExamAnswer {
  questionId: string;
  question: string;
  userAnswer: string;
  modelAnswer: string;
  aiResult: GradeResult | null;
}

export type SessionResult = LearningResult | ExamAnswer;

// Hilfsfunktion für Punktberechnung
export function ratingPoints(r: SelfRating): number {
  if (r === "full") return 1;
  if (r === "partial") return 0.5;
  return 0;
}

// Hilfsfunktion für KI-Grade zu SelfRating Mapping
export function aiGradeToRating(grade: "correct" | "partial" | "wrong"): SelfRating {
  if (grade === "correct") return "full";
  if (grade === "partial") return "partial";
  return "none";
}

// Prüft, ob ein Ergebnis ein Lernmodus-Ergebnis ist
export function isLearningResult(result: SessionResult): result is LearningResult {
  return result.kind === "open";
}

// Prüft, ob ein Ergebnis ein Prüfungsmodus-Ergebnis ist
export function isExamAnswer(result: SessionResult): result is ExamAnswer {
  return "questionId" in result;
}
