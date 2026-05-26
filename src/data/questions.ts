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
// ============================================================================
// SCHWER / OSCE — Fallbasierte offene Fragen (15 Fälle)
// ----------------------------------------------------------------------------
// Extrahiert aus den Katalogen für die datenbankunabhängige Architektur.
// Jede Frage folgt dem exakten Workflow-Schema des Pflegeassessments.
// ============================================================================

export const hardQuestions: HardQuestion[] = [
  {
    id: "schwer-001",
    difficulty: "schwer",
    caseDescription:
      "Frau S. (58 Jahre) stellt sich mit akuten, heftigen Schmerzen im unteren Rückenbereich vor, die vor allem nach der Gartenarbeit gestern aufgetreten sind. Sie nimmt eine deutliche Schonhaltung (Rumpfneigung nach links) ein. Auf Nachfrage gibt sie an, dass der Schmerz ziehend über die Vorderseite des rechten Oberschenkels bis zum Knie zieht. Sie habe das Gefühl, das rechte Bein fühle sich beim Gehen „instabil“ an und sie müsse aktiv aufpassen, nicht einzuknicken.",
    question:
      "Nennen Sie Ihre pflegerische Arbeitshypothese (Verdachtsdiagnose) für Frau S. Begründen Sie Ihre Annahme anhand der anatomischen und symptomatischen Kriterien des Falls und grenzen Sie das Krankheitsbild von einer rein mechanischen Lumbalgie ab.",
    modelAnswer:
      "Arbeitshypothese: Lumboradikuläres Syndrom (LRS) mit Kompression der Nervenwurzel L4 rechts, sekundär bei Lumbalgie / akutem Bandscheibenvorfall.\n\nBegründung: Die Schmerzausstrahlung folgt präzise dem Dermatomschema L4 (ventrolateraler Oberschenkel über die Knieregion verlaufend). Das subjektive Gefühl der Instabilität im Knie weist auf eine motorische Schwäche des M. quadriceps femoris (Kennmuskel für L4) hin, welcher für die Knieextension und die Stabilisierung des Kniegelenks essenziell ist.\n\nAbgrenzung zur mechanischen Lumbalgie (LVS): Ein Lumbovertebrales Syndrom (LVS) äußert sich durch lokale, rein mechanische Schmerzen im Lendenbereich ohne radikuläre Ausstrahlung in die Extremitäten, ohne neurologische Defizite (Parästhesien) und ohne motorische Ausfälle."
  },
  {
    id: "schwer-002",
    difficulty: "schwer",
    caseDescription:
      "Frau S. (58 Jahre) stellt sich mit akuten, heftigen Schmerzen im unteren Rückenbereich vor, die vor allem nach der Gartenarbeit gestern aufgetreten sind. Sie nimmt eine deutliche Schonhaltung (Rumpfneigung nach links) ein. Auf Nachfrage gibt sie an, dass der Schmerz ziehend über die Vorderseite des rechten Oberschenkels bis zum Knie zieht. Sie habe das Gefühl, das rechte Bein fühle sich beim Gehen „instabil“ an und sie müsse aktiv aufpassen, nicht einzuknicken.",
    question:
      "Formulieren Sie fünf präzise offene Fragen im Rahmen der symptomfokussierten Anamnese (subjektive Daten), um den Schmerzverlauf und mögliche neurologische Defizite differenziert zu explizieren.",
    modelAnswer:
      "Fünf offene Fragen zur Symptompräzisierung:\n1. Lokalisation/Ausstrahlung: „Können Sie mit dem Finger den genauen Weg beschreiben, den der Schmerz von Ihrem Rücken in das rechte Bein nimmt, und wo genau er aufhört?“\n2. Qualität: „Wie fühlt sich der Schmerz im Bein an – ist er eher stechend-elektrisierend, dumpf drückend oder brennend?“\n3. Quantität: „Wenn 0 kein Schmerz ist und 10 der unerträglichste Schmerz: Wie stark ist der Schmerz aktuell im Ruhezustand und wie stark bei Bewegung?“\n4. Modifizierende Faktoren: „Gibt es bestimmte Körperpositionen, wie zum Beispiel das Hinlegen mit angewinkelten Beinen oder das Vorbeugen im Sitzen, die Ihren Schmerz merklich lindern oder verstärken?“\n5. Begleitsymptome (Neurologie): „Haben Sie neben den Schmerzen ein Taubheitsgefühl, ein Kribbeln oder ein Gefühl von 'pelziger Haut' auf der Vorderseite Ihres Oberschenkels oder Knies bemerkt?“"
  },
  {
    id: "schwer-003",
    difficulty: "schwer",
    caseDescription:
      "Herr M. (44 Jahre, Fliesenleger) kommt aufgrund seit drei Tagen zunehmender Rückenschmerzen in die Ambulanz. Die Schmerzen strahlen über die dorsolaterale Seite des linken Oberschenkels und die ventrolaterale Seite des Unterschenkels direkt bis in den Fußrücken aus. Zudem klagt er über ein pelziges Gefühl („Ameisenlaufen“) im Bereich der großen Zehe. Bei der Gehprobe fällt auf, dass der linke Vorfuß beim Aufsetzen hörbar auf den Boden klatscht.",
    question:
      "Welches spezifische Nervenwurzelsyndrom liegt hier vor? Begründen Sie Ihre pathophysiologische Zuordnung anhand der sensiblen Dermatome und der betroffenen Muskelgruppen (Kennmuskel).",
    modelAnswer:
      "Wurzelsyndrom: Lumboradikuläres Syndrom (LRS) der Nervenwurzel L5 links (häufig bedingt durch einen Bandscheibenvorfall im Segment LWK 4/5).\n\nPathophysiologische Begründung: Die Schmerzausstrahlung verläuft exakt entlang des linken L5-Dermatoms (Oberschenkel dorsolateral, Unterschenkel ventrolateral, Fußrücken bis zur Großzehe). Die Parästhesie („Ameisenlaufen“) betrifft das sensible Versorgungsgebiet von L5 (Großzehenregion). Das auffällige Klatschen des Fußes beim Gehen beweist eine ausgeprägte Fußheberparese. Der verantwortliche Kennmuskel für die Fußextension (Dorsalextension) und die Großzehenbewegung ist der M. extensor hallucis longus (und der M. tibialis anterior, welcher funktionell überlappt), welcher durch die L5-Kompression neurologisch blockiert ist."
  },
  {
    id: "schwer-004",
    difficulty: "schwer",
    caseDescription:
      "Herr M. (44 Jahre, Fliesenleger) kommt aufgrund seit drei Tagen zunehmender Rückenschmerzen in die Ambulanz. Die Schmerzen strahlen über die dorsolaterale Seite des linken Oberschenkels und die ventrolaterale Seite des Unterschenkels direkt bis in den Fußrücken aus. Zudem klagt er über ein pelziges Gefühl („Ameisenlaufen“) im Bereich der großen Zehe. Bei der Gehprobe fällt auf, dass der linke Vorfuß beim Aufsetzen hörbar auf den Boden klatscht.",
    question:
      "Welche akuten Alarmzeichen („Red Flags“ oder „Vital Flags“) müssen bei Herrn M. explizit erfragt und ausgeschlossen werden, um eine notfallmäßige Operationsindikation rechtzeitig zu erkennen? Nennen Sie mindestens vier spezifische Symptome.",
    modelAnswer:
      "Zur Vermeidung irreversibler Schäden müssen folgende Symptome im Akut-Assessment ausgeschlossen werden:\n1. Störungen bei Miktion oder Defäkation: Harnretention (Harnverhalt), Überlaufblase oder unwillkürlicher Stuhl-/Urinverlust (Inkontinenz) als Zeichen eines Kauda-Syndroms.\n2. Sattelanästhesie: Taubheitsgefühl im Perianal- und Genitalbereich (Reithosenanästhesie).\n3. Perakute, progrediente Lähmung: Rasch zunehmender Kraftverlust der Fußheber (vollständiger Fußheberfall), Kraftgrad < 3/5.\n4. Systemische Zeichen / Infektion: Hohes Fieber (> 38.5 °C) kombiniert mit lokalem Klopfschmerz zum Ausschluss einer Spondylodisitis oder eines epiduralen Abszesses."
  },
  {
    id: "schwer-005",
    difficulty: "schwer",
    caseDescription:
      "Herr K. (39 Jahre) hat vor zwei Tagen beim Versuch, eine schwere Waschmaschine zu heben, einen plötzlichen, einschießenden Schmerz im lumbosakralen Übergang verspürt. Seither leidet er unter Schmerzen, die stechend über die Rückseite (dorsal) des rechten Beins bis hin zum lateralen Fußrand ausstrahlen. Das Auftreten auf den rechten Fuß bereitet ihm extreme Probleme; er kann sich kaum auf die Zehenspitzen stellen.",
    question:
      "Erklären Sie die Durchführung und klinische Interpretation des Lasègue-Tests (Straight Leg Test) bei Herrn K. Gehen Sie dabei präzise auf die Winkelbereiche (ROM) und die Unterscheidung zwischen neurogenen und mechanischen Schmerzursachen ein.",
    modelAnswer:
      "Durchführung: Der Patient liegt flach und entspannt in Rückenlage. Der Untersucher fasst das gestreckte Bein am Knöchel und hebt es langsam passiv an. Der Patient wird angewiesen, sofort Bescheid zu geben, wenn der bekannte Schmerz einschießends.\n\nInterpretation & Winkelbereiche:\n- Positiver Lasègue (Neurogen): Wenn zwischen einem Bewegungsumfang (ROM) von 30° und 60° ein plötzlicher, stechender, elektrisierender Schmerz einschießt, der vom Rücken direkt in das Bein (entlang des Dermatoms) ausstrahlt. Dies zeigt eine Reizung des Ischiasnervs bzw. eine Nervenwurzelkompression an.\n- Mechanische Schmerzursache: Tritt erst ein Schmerz bei einem Winkel von > 60° oder gegen 90° auf, der primär als Dehnungsschmerz in der Rückseite des Oberschenkels (Ischiokrurale Muskulatur) beschrieben wird, liegt in der Regel ein mechanisch-muskuläres Problem und keine akute Radikulopathie vor."
  },
  {
    id: "schwer-006",
    difficulty: "schwer",
    caseDescription:
      "Frau B. (82 Jahre) befindet sich am vierten postoperativen Tag nach einer elektiven Knie-Totalendoprothese (TEP) links auf der orthopädischen Station. Sie ist leicht desorientiert, klagt über nächtliche Schlaflosigkeit und erhält ein Sedativum zur Nacht. Sie hat einen liegenden intravenösen Zugang für die postoperative Analgetikatherapie. Bei der Mobilisation zeigt sie deutliche Balanceschwierigkeiten, hält sich an Wänden fest und neigt zu drängendem Toilettendrang aufgrund einer bekannten Dranginkontinenz. In der Patientengeschichte ist ein Sturz zu Hause vor drei Monaten dokumentiert.",
    question:
      "Wählen Sie zwei standardisierte Assessmentinstrumente aus der Vorlesung zur systematischen Einschätzung des Sturzrisikos aus. Beschreiben Sie deren konkrete Durchführung und erklären Sie die punktuelle Auswertung (Cut-off-Werte), die bei Frau B. ein erhöhtes Risiko anzeigen würden.",
    modelAnswer:
      "Leitlinienkonforme Instrumente aus dem Unterrichtsstoff:\n1. STRATIFY Fall Risk Assessment Tool: Fragebogen mit 5 Ja/Nein-Items (Kürzlicher Sturz, mentale Veränderung, Toilettendrang, Sehbehinderung, Mobilität/Transfer). Auswertung bei Frau B.: Sie erfüllt mindestens 4 Kriterien (Sturz = Ja; Desorientierung = Ja; Dranginkontinenz = Ja; Transfer eingeschränkt = Ja). Ein Score von >= 2 Ja-Antworten zeigt klinisch ein signifikant erhöhtes Sturzrisiko an.\n2. Timed Up and Go Test (TUG): Die Patientin steht von einem Stuhl mit Armlehnen auf, geht eine Strecke von 3 Metern, dreht sich um, geht zurück und setzt sich wieder hin. Die Zeit wird gemessen. Auswertung: Ein Wert von < 14 Sekunden gilt als normal. Ein Messwert von > 30 Sekunden dokumentiert eine erhebliche Mobilitätseinschränkung und ein hochgradiges Sturzrisiko."
  },
  {
    id: "schwer-007",
    difficulty: "schwer",
    caseDescription:
      "Herr V. (34 Jahre) stürzt bei Dacharbeiten aus ca. 3 Metern Höhe von einer Leiter und schlägt auf einer Blechkante auf. Sie treffen als Ersthelfer/Pflegekraft ein. Der Patient liegt auf dem Boden, stöhnt laut vor Schmerz, ist aber ansprechbar. Am rechten Oberschenkel zeigt sich eine tiefe Riss-Lazerationswunde, aus der hellrotes Blut stoßweise/spritzend ausreckt. Der Hosenboden ist bereits großflächig durchnässt, eine Blutlache bildet sich rasch auf dem Boden.",
    question:
      "Beschreiben Sie das konkrete, mechanische Vorgehen zur Stillung dieser kritischen Extremitätenblutung unter Verwendung des vorlesungsspezifischen Algorithmus (Tourniquet, Wound Packing, Druckverband). Wie gehen Sie Schritt für Schritt vor und wie lagern Sie den Patienten?",
    modelAnswer:
      "Schritt-für-Schritt-Blutstillungsalgorithmus:\n1. Manueller Druck: Sofortiger, maximaler digitaler Druck direkt auf die arterielle Verlaufsbahn oberhalb der Wunde (Druckpunkt Leiste/A. femoralis) bzw. direkt in die Wunde.\n2. Tourniquet-Anlage: Da das Blut spritzend austritt, wird sofort ein Tourniquet ca. 5–7 cm oberhalb der Wunde („high and tight“) appliziert. Knebel drehen, bis die Blutung stoppt. Zeit der Anlage zwingend auf dem Tourniquet notieren!\n3. Wound Packing & Druckverband: Die Wundhöhle fest mit (hämostatischer) Gaze austamponiert (Wound Packing), gefolgt von einem rigiden Druckverband.\n4. Lagerung: Da bei einem Sturz aus 3m Höhe ein hochgradiger V.a. ein Polytrauma / eine Wirbelsäulenverletzung besteht, erfolgt eine Flachlagerung in Rückenlage (Neutralposition), Immobilisation der Halswirbelsäule (Minitrauma-Check) und Wärmeerhalt mittels Rettungsdecke zur Vermeidung der Koagulopathie."
  },
  {
    id: "schwer-008",
    difficulty: "schwer",
    caseDescription:
      "Im Rahmen Ihres Dienstes in der interdisziplinären Notaufnahme wird Frau T. (28 Jahre) nach einem ungebremsten Sturz mit dem E-Bike eingeliefert. Sie trug keinen Helm. Bei der Übernahme ist die Patientin somnolent (Augenöffnen nur auf lautes Ansprechen), reagiert verlangsamt, ist zeitlich und örtlich desorientiert. Es zeigt sich eine großflächige Schürfwunde und Hämatombildung parietal rechts sowie eine sichtbare Fehlstellung des linken Unterarms.",
    question:
      "Erklären Sie das methodische Vorgehen beim vollständigen, systematischen traumatologischen Notfallcheck von Kopf bis Fuß (O-Daten). Welche Parameter (Pupillen, GCS, pDMS-Kontrolle) erheben Sie wie, und wie betten Sie die Patientin zwingend bis zum Ausschluss von Sekundärschäden?",
    modelAnswer:
      "Systematischer Notfallcheck von Kopf bis Fuß:\n1. Kopf & Pupillen: Palpation auf Stufenbildung, Inspektion auf Otorrhö/Rhinorrhö. Beurteilung der Pupillen auf Gleichheit (Isokorie) und Lichtreaktion. Eine einseitig erweiterte, träge Pupille (Anisokorie) zeigt eine akute Hirndrucksteigerung an.\n2. Neurologie / GCS: Erhebung der Glasgow Coma Scale (Augenöffnen, verbale Antwort, motorische Reaktion). Somnolenz mit Desorientierung entspricht ca. GCS 10–12.\n3. HWS & Lagerung: Zwingende absolute Immobilisation in Rückenlage mittels Cervicalstütze (Stifneck) und Spineboard/Vakuummatratze, bis eine Fraktur radiologisch ausgeschlossen ist.\n4. Extremitäten (pDMS-Kontrolle): Vor und nach Bewegung der Fraktur links wird der periphere Status erhoben: p = Puls (A. radialis links tastbar?), D = Durchblutung (Rekap-Zeit < 2 Sek.?), M = Motorik (Finger aktiv bewegen?), S = Sensibilität (Berührungen an allen Fingern spürbar?)."
  },
  {
    id: "schwer-009",
    difficulty: "schwer",
    caseDescription:
      "Der Student Jan (21 Jahre) stellt sich mit stark zunehmenden Bauchschmerzen vor, die gestern Abend diffus im Bereich des Bauchnabels (periumbilikal) begonnen haben und im Verlauf der Nacht in den rechten Unterbauch gewandert sind. Er klagt über Appetitlosigkeit, leichte Übelkeit und hat sich einmal erbrochen. Die körperliche Messung ergibt eine axilläre Temperatur von 37,6 °C und eine rektale Temperatur von 38,5 °C. Das Gangbild ist gebeugt, das rechte Bein wird schonend nachgezogen.",
    question:
      "Beschreiben Sie den exakten Ablauf der körperlichen Abdominaluntersuchung (O-Daten). In welcher Reihenfolge wenden Sie die Techniken (Inspektion, Auskultation, Palpation, Perkussion) an, warum ist diese Reihenfolge zwingend einzuhalten und wie überprüfen Sie vier spezifische klinische Appendizitiszeichen konkret am Patienten?",
    modelAnswer:
      "Reihenfolge: 1. Inspektion -> 2. Auskultation -> 3. Perkussion -> 4. Palpation. Zwingender Grund: Palpation und Perkussion manipulieren die Darmschlingen mechanisch und können die Peristaltik künstlich verändern, was die Auskultation verfälscht. Man beginnt immer entfernt vom Schmerzquadranten.\n\nÜberprüfung der vier Appendizitiszeichen:\n- McBurney-Punkt: Druckschmerz auf der Mitte der gedachten Linie zwischen der rechten Spina iliaca anterior superior und dem Bauchnabel.\n- Lanz-Punkt: Druckschmerz auf dem Übergang vom rechten zum mittleren Drittel der Verbindungslinie zwischen beiden oberen Beckenkämmen.\n- Blumberg-Zeichen (Gekreuzter Loslassschmerz): Der Untersucher palpiert langsam und tief den linken Unterbauch und lässt abrupt los. Positiv bei akutem Schmerzeinschlag im rechten Unterbauch.\n- Psoas-Zeichen: Patient versucht in Rückenlage das gestreckte rechte Bein aktiv gegen den manuellen Widerstand des Untersuchers anzuheben. Positiv bei Schmerz im rechten Unterbauch."
  },
  {
    id: "schwer-010",
    difficulty: "schwer",
    caseDescription:
      "Frau K. (72 Jahre, Zustand nach gynäkologischer Laparotomie vor 5 Tagen) klagt über ein starkes, schmerzhaftes Völlegefühl und zunehmende, krampfartige Bauchschmerzen. Bei der Inspektion zeigt sich das Abdomen massiv aufgetrieben und prall-elastisch (Meteorismus). Sie gibt an, seit über 36 Stunden weder Stuhlgang noch Winde gehabt zu haben. Seit zwei Stunden leidet sie unter heftigem, schwallartigem Erbrechen einer grünlich-bräunlichen Flüssigkeit, die einen fäkalen Geruch aufweist.",
    question:
      "Welches lebensbedrohliche Krankheitsbild liegt hier vor? Differenzieren Sie pathophysiologisch und klinisch-auskultatorisch präzise zwischen einem mechanischen und einem paralytischen Verlauf basierend auf der Entstehung und den Darmgeräuschen.",
    modelAnswer:
      "Krankheitsbild: Akuter Ileus (Darmverschluss) mit fortgeschrittenem Miserere (Koterbrechen).\n\nDifferenzierung:\n- Mechanischer Ileus: Ursache ist ein physisches Hindernis im Darmlumen (z. B. postoperative Verwachsungen/Briden). Auskultation: Hyperperistaltik / Stenoseperistaltik. Man hört hochgestellte, spritzende, metallisch-klingende Darmgeräusche, da die Darmmuskulatur krampfartig versucht, gegen das mechanische Hindernis anzukämpfen.\n- Paralytischer Ileus: Ursache ist eine neurogene oder myogene Lähmung der Darmmotorik (häufig als postoperativer atonischer Ileus nach großen OPs). Auskultation: Absolutes Fehlen von Darmgeräuschen („Totenstille“)."
  },
  {
    id: "schwer-011",
    difficulty: "schwer",
    caseDescription:
      "Herr D. (55 Jahre, bekannter chronischer Alkoholabusus) wird von seinem Sohn auf die Station gebracht. Dem Sohn ist aufgefallen, dass die Augen (Skleren) und die Haut des Vaters intensiv gelb gefärbt sind. Der Patient wirkt apathisch, klagt über chronische Müdigkeit und einen stark juckenden Hautausschlag (Pruritus). Der Bauch ist massiv prall vorgewölbt, der Bauchnabel ist verstrichen und es zeigen sich geschwungene, erweiterte Venenzeichnungen um den Nabel herum. Schmerzen werden verneint. Der Stuhl sei seit Tagen hell-grau, der Urin bierbraun.",
    question:
      "Beschreiben Sie die objektive körperliche Untersuchung (O-Daten). Welche klassischen „Leberhautzeichen“ inspizieren Sie von den Händen bis zum Gesicht, wie führen Sie die Perkussion und Lagerung zum klinischen Nachweis von freier Flüssigkeit im Abdomen (Aszites) durch und wie funktioniert die „Kratzauskultation“ der Lebergrenzen?",
    modelAnswer:
      "1. Leberhautzeichen (Inspektion): Hände: Palmarerythem (Rötung der Handflächen), Weißnägel. Haut/Gesicht: Spider-Naevi (sternförmige Gefäßneubildungen), rote glatte Lackzunge, Verlust der Sekundärbehaarung (Bauchglatze). Abdomen: Caput medusae (Kollateralvenen um den Nabel).\n2. Aszites-Nachweis (Perkussion & Shifting Dullness): In Rückenlage zeigt sich mittig tympanitischer Klopfschall (aufschwimmende Darmschlingen), in den Flanken ein gedämpfter Schenkelschall (Flüssigkeit folgt Schwerkraft). Dreht sich der Patient in Seitenlage, verlagert sich die Dämpfungsgrenze nach unten, während die Darmschlingen nach oben steigen (nachgewiesene Shifting Dullness).\n3. Kratzauskultation der Leber: Das Stethoskop wird kaudal des Sternums fixiert. Der Untersucher kratzt mit dem Fingernagel parallel zum Rippenbogen von kranial nach kaudal (beginnend auf Nabelhöhe Richtung Kopf). Sobald der Finger die solide Lebergrenze erreicht, wird das Geräusch im Stethoskop schlagartig laut fortgeleitet (Bestimmung der Lebergröße, normal ca. 10 cm)."
  },
  {
    id: "schwer-012",
    difficulty: "schwer",
    caseDescription:
      "Herr N. (68 Jahre, starker Raucher, bekanntes metabolisch-vaskuläres Syndrom) berichtet, dass er beim Gehen bereits nach einer Strecke von ca. 80 bis 100 Metern gezwungen sei, stehenzubleiben, da ein unerträglicher, krampfartiger Schmerz in der rechten Wadenmuskulatur einschieße. Nach einer kurzen Pause im Stehen lasse der Schmerz nach, sodass er weitergehen könne. Bei der Inspektion der Füße fällt auf, dass die Haut rechts blass, kühl und haarlos ist; Ödeme liegen nicht vor.",
    question:
      "Erklären Sie die genaue klinische Durchführung und Interpretation zweier spezifischer angiologischer Funktionstests aus der Vorlesung: Der Ratschow-Lagerungsprobe und der Berechnung des Knöchel-Arm-Index (ABI). Welche Werte/Zeiten bestätigen Ihre Verdachtsdiagnose?",
    modelAnswer:
      "1. Ratschow-Lagerungsprobe: Patient liegt in Rückenlage, hebt beide Beine im 90°-Winkel an und führt über 2 Minuten Fußbewegungen (Beugen/Strecken) durch. Danach setzt er sich zügig an die Bettkante und lässt die Beine herabhängen. Interpretation: Eine verzögerte reaktive Rötung > 15 Sekunden (physiologisch < 10s), anhaltende ischämische Blässe oder vorzeitiger Schmerz bestätigen eine manifeste arterielle Durchblutungsstörung.\n2. Knöchel-Arm-Index (ABI): Systolischer Blutdruck wird mittels Doppler-Sonde vergleichend an beiden Oberarmen (A. brachialis) und an beiden Knöcheln (A. tibialis posterior/dorsalis pedis) gemessen. Berechnung: ABI = systolischer Blutdruck Knöchel / systolischer Blutdruck Arm. Interpretation: Normalwert > 0,9. Ein Wert zwischen 0,5 und 0,75 bestätigt eine mittelschwere pAVK (passend zu Herrn N.s Stadium IIb, Gehstrecke < 200m)."
  },
  {
    id: "schwer-013",
    difficulty: "schwer",
    caseDescription:
      "Frau G. (61 Jahre, Zustand nach ausgedehnter abdominaler Tumorchirurgie vor 2 Wochen) klagt über ein akutes Schwere- und Spannungsgefühl im linken Unterschenkel. Bei der Inspektion zeigt sich eine deutliche Schwellung des linken Beins, die Haut ist lokal zyanotisch verfärbt und die oberflächlichen Venen treten verstärkt hervor (Kollateralvenen). Beim Abtasten klagt sie über massiven Druckschmerz entlang der tiefen Venenbahn. Während Sie die Patientin untersuchen, klagt sie plötzlich über akut einsetzende Atemnot (Dyspnoe), stechende Schmerzen im rechten Brustkorb (Thoraxschmerz) und beginnt trocken zu husten. Sie wirkt kaltschweißig und hochgradig ängstlich.",
    question:
      "Welches standardisierte klinische Score-System (z. B. Wells-Score) wenden Sie zur Einschätzung der Wahrscheinlichkeit einer Lungenembolie an? Nennen Sie mindestens vier Kriterien direkt aus dem Fallbeispiel, die den Score erhöhen.",
    modelAnswer:
      "Score-System: Wells-Score für Lungenembolie.\n\nErhöhende Kriterien direkt aus dem Fallbeispiel:\n1. Klinische Zeichen einer TVT vorhanden (einseitige Unterschenkelschwellung, lokale Zyanose, Druckschmerz tiefe Venenbahn) -> +3 Punkte.\n2. Andere Diagnosen als eine Lungenembolie sind unwahrscheinlich (akuter thorakaler Schmerz + plötzliche Dyspnoe post-OP bei bestehender TVT-Symptomatik) -> +3 Punkte.\n3. Immobilisation oder chirurgischer Eingriff vor weniger als 4 Wochen (grose abdominale OP vor genau 2 Wochen) -> +1,5 Punkte.\n4. Malignom / Aktive Tumorerkrankung (Zustand nach abdominaler Tumorchirurgie) -> +1 Punkt.\n\nAuswertung: Ein Gesamt-Score von 8,5 Punkten liegt weit über dem kritischen Grenzwert (> 6 Punkte) und dokumentiert eine hohe klinische Wahrscheinlichkeit für eine Lungenembolie."
  },
  {
    id: "schwer-014",
    difficulty: "schwer",
    caseDescription:
      "Frau G. (61 Jahre, Zustand nach ausgedehnter abdominaler Tumorchirurgie vor 2 Wochen) klagt über ein akutes Schwere- und Spannungsgefühl im linken Unterschenkel. Bei der Inspektion zeigt sich eine deutliche Schwellung des linken Beins, die Haut ist lokal zyanotisch verfärbt und die oberflächlichen Venen treten verstärkt hervor (Kollateralvenen). Beim Abtasten klagt sie über massiven Druckschmerz entlang der tiefen Venenbahn. Während Sie die Patientin untersuchen, klagt sie plötzlich über akut einsetzende Atemnot (Dyspnoe), stechende Schmerzen im rechten Brustkorb (Thoraxschmerz) und beginnt trocken zu husten. Sie wirkt kaltschweißig und hochgradig ängstlich.",
    question:
      "Welche unmittelbaren pflegerischen Erstinterventionsmaßnahmen müssen bei Frau G. bezüglich Lagerung, Aktivitätsgrad und Sauerstoffzufuhr getroffen werden, um eine Progression der Embolie zu verhindern? Welche Untersuchungstechniken (pDMS, Vitalparameter) führen Sie sofort durch?",
    modelAnswer:
      "Sofortmaßnahmen zur Lebensrettung:\n1. Absolute Ruhigstellung / Bettruhe (Striktestes Bewegungsverbot): Patientin darf sich nicht physisch belasten oder aufstehen. Jede Muskelkontraktion (Muskelpumpe) kann weitere Thrombusanteile ablösen und eine rezidivierende, tödliche Embolie auslösen.\n2. Oberkörperhochlagern (Herz-Lungen-Entlastung): Erleichtert die Atemmechanik und senkt den venösen Rückfluss zum überlasteten rechten Herzen.\n3. Sauerstoff-Therapie: Sofortige Applikation von hochdosiertem Sauerstoff (6–10 l/min) via Maske zur Kompensation der pulmonalen Diffusionsstörung.\n4. Vitalparameter-Akutdiagnostik & pDMS: Kontinuierliche Messung von BD, Puls, AF und SpO2 zum Ausschluss eines Rechtsherzschocks (Tachypnoe, Tachykardie, Hypotonie). Sofortige pDMS-Kontrolle der betroffenen linken Extremität zur Verlaufsdokumentation."
  },
  {
    id: "schwer-015",
    difficulty: "schwer",
    caseDescription:
      "Frau L. (74 Jahre) stellt sich mit zunehmender Belastungsdyspnoe und gelegentlichem Schwindelgefühl vor. Im Rahmen der klinischen Untersuchung führen Sie ein Pflegeassessment des kardiovaskulären Systems durch. Bei der Herzauskultation mit dem Stethoskop hören Sie über dem 2. Interkostalraum (ICR) rechts sternal ein lautes, raues, spindelförmiges Geräusch während der Systole (Systolikum), das deutlich hörbar in die Halsschlagadern (Aa. carotides) ausstrahlt. Das zeitgleich geschriebene Ruhe-EKG zeigt eine unregelmäßige Kammerfrequenz von 115/min, das komplette Fehlen von P-Wellen und unregelmäßige, chaotische Zackenabstände (QRS-Komplexe).",
    question:
      "Erklären Sie die exakte anatomische Platzierung aller sechs Brustwandelektroden (C1 bis C6) nach dem internationalen IEC-Standard für das 12-Kanal-EKG inklusive der jeweiligen Farbcodierung. Welche Vorbereitungsschritte und Fehlerquellen müssen pflegerisch beachtet werden?",
    modelAnswer:
      "Exakte Platzierung und Farbcodierung (IEC):\n- C1 (Rot): 4. Interkostalraum (ICR) rechts direkt am Sternalrand.\n- C2 (Gelb): 4. Interkostalraum (ICR) links direkt am Sternalrand.\n- C4 (Braun): 5. Interkostalraum (ICR) links auf der Medioklavikularlinie (MCL) (wird vor C3 geklebt!).\n- C3 (Grün): Exakt mittig auf der Verbindungslinie zwischen Elektrode C2 und C4.\n- C5 (Schwarz): Vordere Axillarlinie (VAL), exakt auf horizontaler Höhe von Elektrode C4.\n- C6 (Violett): Mittlere Axillarlinie (MAL), exakt auf horizontaler Höhe von Elektrode C4 und C5.\n\nVorbereitung & Fehlerquellen: Patient muss vor Messung 5 Minuten entspannt ruhen. Bei starker Behaarung ist eine Rasur zwingend erforderlich (Minderung des Übergangswiderstandes). Haut entfetten. Fehlerquellen/Artefakte: Muskelzittern durch Frieren oder Anspannung (unruhige Basislinie), lose Kontakte, verpolte Kabel, oder elektromagnetische Störfelder (z. B. Smartphone in Patientennähe)."
  }
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
