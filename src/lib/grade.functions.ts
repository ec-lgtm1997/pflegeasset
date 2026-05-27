import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type AiGrade = "correct" | "partial" | "wrong";

export interface GradeResult {
  grade: AiGrade;
  reasoning: string;
}

const InputSchema = z.object({
  question: z.string().min(1).max(4000),
  modelAnswer: z.string().min(1).max(8000),
  userAnswer: z.string().min(1).max(8000),
});

const SYSTEM_PROMPT = `Du bist ein erfahrener Prüfer für Pflege- und Medizinexamina. Du bewertest die offene Antwort einer studierenden Person fair, präzise und konstruktiv im Vergleich zur Musterlösung.

Bewertungsschema:
- "correct"  = inhaltlich vollständig oder nahezu vollständig korrekt, alle Kernpunkte enthalten.
- "partial"  = teilweise korrekt, wichtige Aspekte fehlen oder sind ungenau, aber Grundverständnis erkennbar.
- "wrong"    = falsch, am Thema vorbei, leer oder ohne erkennbares Verständnis.

Antworte AUSSCHLIESSLICH als reines JSON-Objekt in dieser Form (keine Markdown-Codeblöcke, kein Fließtext drum herum):
{"grade":"correct|partial|wrong","reasoning":"kurze, freundliche Begründung auf Deutsch (max. 3 Sätze), die konkret nennt, was korrekt war und was fehlt."}`;

export const gradeAnswer = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }): Promise<GradeResult> => {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("GROQ_API_KEY ist nicht konfiguriert.");
    }

    const userPrompt = `FRAGE:\n${data.question}\n\nMUSTERLÖSUNG:\n${data.modelAnswer}\n\nANTWORT DER STUDIERENDEN PERSON:\n${data.userAnswer}\n\nBewerte die Antwort und gib das JSON-Objekt zurück.`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("Groq API error:", res.status, errText);
      throw new Error(`KI-Dienst nicht erreichbar (${res.status}).`);
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = json.choices?.[0]?.message?.content ?? "";

    let parsed: { grade?: string; reasoning?: string };
    try {
      parsed = JSON.parse(content);
    } catch {
      throw new Error("Antwort der KI konnte nicht gelesen werden.");
    }

    const grade =
      parsed.grade === "correct" || parsed.grade === "partial" || parsed.grade === "wrong"
        ? (parsed.grade as AiGrade)
        : "partial";
    const reasoning =
      typeof parsed.reasoning === "string" && parsed.reasoning.trim().length > 0
        ? parsed.reasoning.trim()
        : "Keine Begründung verfügbar.";

    return { grade, reasoning };
  });
