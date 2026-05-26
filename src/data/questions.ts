// ============================================================================
// PFLEGEASSESSMENT - FRAGEN-DATENBANK
// ----------------------------------------------------------------------------
// Diese Datei enthält alle Fragen für die Prüfungssimulation.
// Schema unten dokumentiert. Neue Fragen einfach im jeweiligen Array ergänzen.
// ============================================================================

export type Difficulty = "leicht" | "mittel" | "schwer";

export interface MultipleChoiceOption {
  id: string;
  text: string;
}

export interface EasyQuestion {
  id: string;
  difficulty: "leicht";
  question: string;
  options: MultipleChoiceOption[];
  correctOptionId: string;
  explanation: string;
}

export interface MediumQuestion {
  id: string;
  difficulty: "mittel";
  question: string;
  modelAnswer: string;
}

export interface HardQuestion {
  id: string;
  difficulty: "schwer";
  caseDescription: string;
  question: string;
  modelAnswer: string;
}

export type Question = EasyQuestion | MediumQuestion | HardQuestion;

// ----------------------------------------------------------------------------
// LEICHT — Multiple Choice
// ----------------------------------------------------------------------------
export const easyQuestions: EasyQuestion[] = [
  {
    id: "leicht-001",
    difficulty: "leicht",
    question:
      "Welche drei Faktoren bilden die Virchow-Trias zur Entstehung einer Thrombose?",
    options: [
      {
        id: "a",
        text: "Hypertonie, Hyperlipidämie, Hyperglykämie",
      },
      {
        id: "b",
        text: "Endothelschaden, veränderte Blutströmung, veränderte Blutzusammensetzung",
      },
      {
        id: "c",
        text: "Immobilität, Adipositas, Rauchen",
      },
      {
        id: "d",
        text: "Entzündung, Infektion, Nekrose",
      },
    ],
    correctOptionId: "b",
    explanation:
      "Die Virchow-Trias beschreibt die drei pathophysiologischen Hauptfaktoren der Thromboseentstehung: 1) Endothelschaden (Schädigung der Gefäßwand), 2) veränderte Blutströmung (z. B. Stase durch Immobilität), 3) veränderte Blutzusammensetzung (Hyperkoagulabilität). Sie ist die Grundlage jeder Thromboseprophylaxe.",
  },
];

// ----------------------------------------------------------------------------
// MITTEL — Kurze offene Fragen
// ----------------------------------------------------------------------------
export const mediumQuestions: MediumQuestion[] = [
  {
    id: "mittel-001",
    difficulty: "mittel",
    question:
      "Was versteht man unter dem Phänomen 'Stops walking when talking' im Rahmen des Sturzassessments?",
    modelAnswer:
      "'Stops walking when talking' ist ein einfacher klinischer Test zur Sturzrisiko-Einschätzung nach Lundin-Olsson. Dabei wird der Patient während des Gehens in ein Gespräch verwickelt. Bleibt er stehen, um zu antworten, gilt der Test als positiv. Dies weist auf eine eingeschränkte kognitive und motorische Doppelaufgabenfähigkeit (Dual-Tasking) hin und ist ein signifikanter Prädiktor für ein erhöhtes Sturzrisiko, insbesondere bei geriatrischen Patient:innen.",
  },
];

// ----------------------------------------------------------------------------
// SCHWER / OSCE — Fallbasierte offene Fragen
// ----------------------------------------------------------------------------
export const hardQuestions: HardQuestion[] = [
  {
    id: "schwer-001",
    difficulty: "schwer",
    caseDescription:
      "Herr Weber, 72 Jahre, wird auf Ihre Station aufgenommen. Er klagt seit zwei Tagen über zunehmende Schmerzen am linken Unterschenkel. Bei der Inspektion zeigt sich eine flächige, scharf begrenzte, hochrote und überwärmte Hautrötung mit Schwellung. Vitalzeichen: Temperatur 38,9 °C, Puls 102/min, RR 135/80 mmHg, SpO₂ 96 %. Der Patient wirkt reduziert. Verdachtsdiagnose: Erysipel am linken Unterschenkel.",
    question:
      "Strukturieren Sie eine vollständige Übergabe an die diensthabende Ärztin nach dem ISBAR-Schema.",
    modelAnswer:
      "I — Identifikation:\nGuten Tag, hier ist [Name], Pflegefachperson auf Station [X]. Es geht um Herrn Weber, 72 Jahre, Zimmer [Y].\n\nS — Situation:\nHerr Weber wurde heute mit Verdacht auf ein Erysipel am linken Unterschenkel aufgenommen. Sein Zustand hat sich seit der Aufnahme verschlechtert: Temperatur aktuell 38,9 °C, Puls 102/min, RR 135/80, SpO₂ 96 %.\n\nB — Background (Hintergrund):\nSeit zwei Tagen zunehmende Schmerzen, Rötung und Schwellung am linken Unterschenkel. Vorerkrankungen: arterielle Hypertonie, Diabetes mellitus Typ 2. Keine bekannten Allergien. Letzte Medikation siehe Kurve.\n\nA — Assessment (Einschätzung):\nKlinisch zeigt sich das typische Bild eines Erysipels mit scharf begrenzter Rötung, Überwärmung und systemischer Entzündungsreaktion. Ich werte die Tachykardie und das Fieber als Hinweis auf eine beginnende systemische Beteiligung — qSOFA-Kriterien sollten überprüft werden.\n\nR — Recommendation (Empfehlung):\nIch bitte um eine zeitnahe ärztliche Visite, Abnahme von Entzündungsparametern (CRP, Leukozyten, Blutkulturen) sowie Anordnung einer kalkulierten Antibiotikatherapie. Außerdem schlage ich Hochlagerung, Kühlung und engmaschige Vitalzeichenkontrolle alle 2 Stunden vor.",
  },
];

// ----------------------------------------------------------------------------
// Helper
// ----------------------------------------------------------------------------
export function getQuestionsByDifficulty(difficulty: Difficulty): Question[] {
  switch (difficulty) {
    case "leicht":
      return easyQuestions;
    case "mittel":
      return mediumQuestions;
    case "schwer":
      return hardQuestions;
  }
}

export function pickSessionQuestions(
  difficulty: Difficulty,
  count: number | "all",
): Question[] {
  const pool = getQuestionsByDifficulty(difficulty);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  if (count === "all") return shuffled;
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
