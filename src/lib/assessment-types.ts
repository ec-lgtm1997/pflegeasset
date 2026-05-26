export type SelfRating = "full" | "partial" | "none";

export type SessionResult =
  | { kind: "easy"; correct: boolean }
  | { kind: "open"; rating: SelfRating };
