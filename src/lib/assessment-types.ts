export type SelfRating = "full" | "partial" | "none";

export type SessionResult = { kind: "open"; rating: SelfRating };

export function ratingPoints(r: SelfRating): number {
  if (r === "full") return 1;
  if (r === "partial") return 0.5;
  return 0;
}
