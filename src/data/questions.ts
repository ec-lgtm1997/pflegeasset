// ============================================================================
// PFLEGEASSESSMENT - FRAGEN-DATENBANK
// ----------------------------------------------------------------------------
// Alle Fragen sind fallbasiert (OSCE). Mehrere Fragen können denselben `caseId`
// teilen — sie gehören dann zum gleichen klinischen Fall.
// ============================================================================

export interface HardQuestion {
  id: string;
  caseId: string;
  difficulty: "schwer";
  caseDescription: string;
  question: string;
  modelAnswer: string;
}

export type Question = HardQuestion;

export interface CaseGroup {
  caseId: string;
  caseDescription: string;
  title: string;
  questions: HardQuestion[];
}

// ----------------------------------------------------------------------------
// SCHWER / OSCE — Fallbasierte offene Fragen
// ----------------------------------------------------------------------------
export const hardQuestions: HardQuestion[] = [
  {
    id: "schwer-001",
    caseId: "case-01",
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
    caseId: "case-01",
    difficulty: "schwer",
    caseDescription:
      "Frau S. (58 Jahre) stellt sich mit akuten, heftigen Schmerzen im unteren Rückenbereich vor, die vor allem nach der Gartenarbeit gestern aufgetreten sind. Sie nimmt eine deutliche Schonhaltung (Rumpfneigung nach links) ein. Auf Nachfrage gibt sie an, dass der Schmerz ziehend über die Vorderseite des rechten Oberschenkels bis zum Knie zieht. Sie habe das Gefühl, das rechte Bein fühle sich beim Gehen „instabil“ an und sie müsse aktiv aufpassen, nicht einzuknicken.",
    question:
      "Formulieren Sie fünf präzise offene Fragen im Rahmen der symptomfokussierten Anamnese (subjektive Daten), um den Schmerzverlauf und mögliche neurologische Defizite differenziert zu explizieren.",
    modelAnswer:
      "Fünf open Fragen zur Symptompräzisierung:\n1. Lokalisation/Ausstrahlung: „Können Sie mit dem Finger den genauen Weg beschreiben, den der Schmerz von Ihrem Rücken in das rechte Bein nimmt, und wo genau er aufhört?“\n2. Qualität: „Wie fühlt sich der Schmerz im Bein an – ist er eher stechend-elektrisierend, dumpf drückend oder brennend?“\n3. Quantität: „Wenn 0 kein Schmerz ist und 10 der unerträglichste Schmerz: Wie stark ist der Schmerz aktuell im Ruhezustand und wie stark bei Bewegung?“\n4. Modifizierende Faktoren: „Gibt es bestimmte Körperpositionen, wie zum Beispiel das Hinlegen mit angewinkelten Beinen oder das Vorbeugen im Sitzen, die Ihren Schmerz merklich lindern oder verstärken?“\n5. Begleitsymptome (Neurologie): „Haben Sie neben den Schmerzen ein Taubheitsgefühl, ein Kribbeln oder ein Gefühl von 'pelziger Haut' auf der Vorderseite Ihres Oberschenkels oder Knies bemerkt?“"
  },
  {
    id: "schwer-003",
    caseId: "case-02",
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
    caseId: "case-02",
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
    caseId: "case-03",
    difficulty: "schwer",
    caseDescription:
      "Herr K. (39 Jahre) hat vor zwei Tagen beim Versuch, eine schwere Waschmaschine zu heben, einen plötzlichen, einschießenden Schmerz im lumbosakralen Übergang verspürt. Seither leidet er unter Schmerzen, die stechend über die Rückseite (dorsal) des rechten Beins bis hin zum lateralen Fußrand ausstrahlen. Das Auftreten auf den rechten Fuß bereitet ihm extreme Probleme; er kann sich kaum auf die Zehenspitzen stellen.",
    question:
      "Erklären Sie die Durchführung und klinische Interpretation des Lasègue-Tests (Straight Leg Test) bei Herrn K. Gehen Sie dabei präzise auf die Winkelbereiche (ROM) und die Unterscheidung zwischen neurogenen und mechanischen Schmerzursachen ein.",
    modelAnswer:
      "Durchführung: Der Patient liegt flach und entspannt in Rückenlage. Der Untersucher fasst das gestreckte Bein am Knöchel und hebt es langsam passiv an. Der Patient wird angewiesen, sofort Bescheid zu geben, wenn der bekannte Schmerz einschießt.\n\nInterpretation & Winkelbereiche:\n- Positiver Lasègue (Neurogen): Wenn zwischen einem Bewegungsumfang (ROM) von 30° und 60° ein plötzlicher, stechender, elektrisierender Schmerz einschießt, der vom Rücken direkt in das Bein (entlang des Dermatoms) ausstrahlt. Dies zeigt eine Reizung des Ischiasnervs bzw. eine Nervenwurzelkompression an.\n- Mechanische Schmerzursache: Tritt erst ein Schmerz bei einem Winkel von > 60° oder gegen 90° auf, der primär als Dehnungsschmerz in der Rückseite des Oberschenkels (Ischiokrurale Muskulatur) beschrieben wird, liegt in der Regel ein mechanisch-muskuläres Problem und keine akute Radikulopathie vor."
  },
  {
    id: "schwer-006",
    caseId: "case-04",
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
    caseId: "case-05",
    difficulty: "schwer",
    caseDescription:
      "Herr V. (34 Jahre) stürzt bei Dacharbeiten aus ca. 3 Metern Höhe von einer Leiter und schlägt auf einer Blechkante auf. Sie treffen als Ersthelfer/Pflegekraft ein. Der Patient liegt auf dem Boden, stöhnt laut vor Schmerz, ist aber ansprechbar. Am rechten Oberschenkel zeigt sich eine tiefe Riss-Lazerationswunde, aus der hellrotes Blut stoßweise/spritzend austritt. Der Hosenboden ist bereits großflächig durchnässt, eine Blutlache bildet sich rasch auf dem Boden.",
    question:
      "Beschreiben Sie das konkrete, mechanische Vorgehen zur Stillung dieser kritischen Extremitätenblutung unter Verwendung des vorlesungsspezifischen Algorithmus (Tourniquet, Wound Packing, Druckverband). Wie gehen Sie Schritt für Schritt vor und wie lagern Sie den Patienten?",
    modelAnswer:
      "Schritt-für-Schritt-Blutstillungsalgorithmus:\n1. Manueller Druck: Sofortiger, maximaler digitaler Druck direkt auf die arterielle Verlaufsbahn oberhalb der Wunde (Druckpunkt Leiste/A. femoralis) bzw. direkt in die Wunde.\n2. Tourniquet-Anlage: Da das Blut spritzend austritt, wird sofort ein Tourniquet ca. 5–7 cm oberhalb der Wunde („high and tight“) appliziert. Knebel drehen, bis die Blutung stoppt. Zeit der Anlage zwingend auf dem Tourniquet notieren!\n3. Wound Packing & Druckverband: Die Wundhöhle fest mit (hämostatischer) Gaze austamponiert (Wound Packing), gefolgt von einem rigiden Druckverband.\n4. Lagerung: Da bei einem Sturz aus 3m Höhe ein hochgradiger V.a. ein Polytrauma / eine Wirbelsäulenverletzung besteht, erfolgt eine Flachlagerung in Rückenlage (Neutralposition), Immobilisation der Halswirbelsäule (Minitrauma-Check) und Wärmeerhalt mittels Rettungsdecke zur Vermeidung der Koagulopathie."
  },
  {
    id: "schwer-008",
    caseId: "case-06",
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
    caseId: "case-07",
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
    caseId: "case-08",
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
    caseId: "case-09",
    difficulty: "schwer",
    caseDescription:
      "Herr D. (55 Jahre, bekannter chronischer Alkoholabusus) wird von seinem Sohn auf die Station gebracht. Dem Sohn ist aufgefallen, dass die Augen (Skleren) und die Haut des Vaters intensiv gelb gefärbt sind. Der Patient wirkt apathisch, klagt über chronische Müiredigkeit und einen stark juckenden Hautausschlag (Pruritus). Der Bauch ist massiv prall vorgewölbt, der Bauchnabel ist verstrichen und es zeigen sich geschwungene, erweiterte Venenzeichnungen um den Nabel herum. Schmerzen werden verneint. Der Stuhl sei seit Tagen hell-grau, der Urin bierbraun.",
    question:
      "Beschreiben Sie die objektive körperliche Untersuchung (O-Daten). Welche klassischen „Leberhautzeichen“ inspizieren Sie von den Händen bis zum Gesicht, wie führen Sie die Perkussion und Lagerung zum klinischen Nachweis von freier Flüssigkeit im Abdomen (Aszites) durch und wie funktioniert die „Kratzauskultation“ der Lebergrenzen?",
    modelAnswer:
      "1. Leberhautzeichen (Inspektion): Hände: Palmarerythem (Rötung der Handflächen), Weißnägel. Haut/Gesicht: Spider-Naevi (sternförmige Gefäßneubildungen), rote glatte Lackzunge, Verlust der Sekundärbehaarung (Bauchglatze). Abdomen: Caput medusae (Kollateralvenen um den Nabel).\n2. Aszites-Nachweis (Perkussion & Shifting Dullness): In Rückenlage zeigt sich mittig tympanitischer Klopfschall (aufschwimmende Darmschlingen), in den Flanken ein gedämpfter Schenkelschall (Flüssigkeit folgt Schwerkraft). Dreht sich der Patient in Seitenlage, verlagert sich die Dämpfungsgrenze nach unten, während die Darmschlingen nach oben steigen (nachgewiesene Shifting Dullness).\n3. Kratzauskultation der Leber: Das Stethoskop wird kaudal des Sternums fixiert. Der Untersucher kratzt mit dem Fingernagel parallel zum Rippenbogen von kranial nach kaudal (beginnend auf Nabelhöhe Richtung Kopf). Sobald der Finger die solide Lebergrenze erreicht, wird das Geräusch im Stethoskop schlagartig laut fortgeleitet (Bestimmung der Lebergröße, normal ca. 10 cm)."
  },
  {
    id: "schwer-012",
    caseId: "case-10",
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
    caseId: "case-11",
    difficulty: "schwer",
    caseDescription:
      "Frau G. (61 Jahre, Zustand nach ausgedehnter abdominaler Tumorchirurgie vor 2 Wochen) klagt über ein akutes Schwere- und Spannungsgefühl im linken Unterschenkel. Bei der Inspektion zeigt sich eine deutliche Schwellung des linken Beins, die Haut ist lokal zyanotisch verfärbt und die oberflächlichen Venen treten verstärkt hervor (Kollateralvenen). Beim Abtasten klagt sie über massiven Druckschmerz entlang der tiefen Venenbahn. Während Sie die Patientin untersuchen, klagt sie plötzlich über akut einsetzende Atemnot (Dyspnoe), stehende Schmerzen im rechten Brustkorb (Thoraxschmerz) und beginnt trocken zu husten. Sie wirkt kaltschweißig und hochgradig ängstlich.",
    question:
      "Welches standardisierte klinische Score-System (z. B. Wells-Score) wenden Sie zur Einschätzung der Wahrscheinlichkeit einer Lungenembolie an? Nennen Sie mindestens vier Kriterien direkt aus dem Fallbeispiel, die den Score erhöhen.",
    modelAnswer:
      "Score-System: Wells-Score für Lungenembolie.\n\nErhöhende Kriterien direkt aus dem Fallbeispiel:\n1. Klinische Zeichen einer TVT vorhanden (einseitige Unterschenkelschwellung, lokale Zyanose, Druckschmerz tiefe Venenbahn) -> +3 Punkte.\n2. Andere Diagnosen als eine Lungenembolie sind unwahrscheinlich (akuter thorakaler Schmerz + plötzliche Dyspnoe post-OP bei bestehender TVT-Symptomatik) -> +3 Punkte.\n3. Immobilisation oder chirurgischer Eingriff vor weniger als 4 Wochen (große abdominale OP vor genau 2 Wochen) -> +1,5 Punkte.\n4. Malignom / Aktive Tumorerkrankung (Zustand nach abdominaler Tumorchirurgie) -> +1 Punkt.\n\nAuswertung: Ein Gesamt-Score von 8,5 Punkten liegt weit über dem kritischen Grenzwert (> 6 Punkte) und dokumentiert eine hohe klinische Wahrscheinlichkeit für eine Lungenembolie."
  },
  {
    id: "schwer-014",
    caseId: "case-11",
    difficulty: "schwer",
    caseDescription:
      "Frau G. (61 Jahre, Zustand nach ausgedehnter abdominaler Tumorchirurgie vor 2 Wochen) klagt über ein akutes Schwere- und Spannungsgefühl im linken Unterschenkel. Bei der Inspektion zeigt sich eine deutliche Schwellung des linken Beins, die Haut ist lokal zyanotisch verfärbt und die oberflächlichen Venen treten verstärkt hervor (Kollateralvenen). Beim Abtasten klagt sie über massiven Druckschmerz entlang der tiefen Venenbahn. Während Sie die Patientin untersuchen, klagt sie plötzlich über akut einsetzende Atemnot (Dyspnoe), stehende Schmerzen im rechten Brustkorb (Thoraxschmerz) und beginnt trocken zu husten. Sie wirkt kaltschweißig und hochgradig ängstlich.",
    question:
      "Welche unmittelbaren pflegerischen Erstinterventionsmaßnahmen müssen bei Frau G. bezüglich Lagerung, Aktivitätsgrad und Sauerstoffzufuhr getroffen werden, um eine Progression der Embolie zu verhindern? Welche Untersuchungstechniken (pDMS, Vitalparameter) führen Sie sofort durch?",
    modelAnswer:
      "Sofortmaßnahmen zur Lebensrettung:\n1. Absolute Ruhigstellung / Bettruhe (Striktestes Bewegungsverbot): Patientin darf sich nicht physisch belasten oder aufstehen. Jede Muskelkontraktion (Muskelpumpe) kann weitere Thrombusanteile ablösen und eine rezidivierende, tödliche Embolie auslösen.\n2. Oberkörperhochlagern (Herz-Lungen-Entlastung): Erleichtert die Atemmechanik und senkt den venösen Rückfluss zum überlasteten rechten Herzen.\n3. Sauerstoff-Therapie: Sofortige Applikation von hochdosiertem Sauerstoff (6–10 l/min) via Maske zur Kompensation der pulmonalen Diffusionsstörung.\n4. Vitalparameter-Akutdiagnostik & pDMS: Kontinuierliche Messung von BD, Puls, AF und SpO2 zum Ausschluss eines Rechtsherzschocks (Tachypnoe, Tachykardie, Hypotonie). Sofortige pDMS-Kontrolle der betroffenen linken Extremität zur Verlaufsdokumentation."
  },
  {
    id: "schwer-015",
    caseId: "case-12",
    difficulty: "schwer",
    caseDescription:
      "Frau L. (74 Jahre) stellt sich mit zunehmender Belastungsdyspnoe und gelegentlichem Schwindelgefühl vor. Im Rahmen der klinischen Untersuchung führen Sie ein Pflegeassessment des kardiovaskulären Systems durch. Bei der Herzauskultation mit dem Stethoskop hören Sie über dem 2. Interkostalraum (ICR) rechts sternal ein lautes, raues, spindelförmiges Geräusch während der Systole (Systolikum), das deutlich hörbar in die Halsschlagadern (Aa. carotides) ausstrahlt. Das zeitgleich geschriebene Ruhe-EKG zeigt eine unregelmäßige Kammerfrequenz von 115/min, das komplette Fehlen von P-Wellen und unregelmäßige, chaotische Zackenabstände (QRS-Komplexe).",
    question:
      "Erklären Sie die exakte anatomische Platzierung aller sechs Brustwandelektroden (C1 bis C6) nach dem internationalen IEC-Standard für das 12-Kanal-EKG inklusive der jeweiligen Farbcodierung. Welche Vorbereitungsschritte und Fehlerquellen müssen pflegerisch beachtet werden?",
    modelAnswer:
      "Exakte Platzierung und Farbcodierung (IEC):\n- C1 (Rot): 4. Interkostalraum (ICR) rechts direkt am Sternalrand.\n- C2 (Gelb): 4. Interkostalraum (ICR) links direkt am Sternalrand.\n- C4 (Braun): 5. Interkostalraum (ICR) links auf der Medioklavikularlinie (MCL) (wird vor C3 geklebt!).\n- C3 (Grün): Exakt mittig auf der Verbindungslinie zwischen Elektrode C2 und C4.\n- C5 (Schwarz): Vordere Axillarlinie (VAL), exakt auf horizontaler Höhe von Elektrode C4.\n- C6 (Violett): Mittlere Axillarlinie (MAL), exakt auf horizontaler Höhe von Elektrode C4 und C5.\n\nVorbereitung & Fehlerquellen: Patient muss vor Messung 5 Minuten entspannt ruhen. Bei starker Behaarung ist eine Rasur zwingend erforderlich (Minderung des Übergangswiderstandes). Haut entfetten. Fehlerquellen/Artefakte: Muskelzittern durch Frieren oder Anspannung (unruhige Basislinie), lose Kontakte, verpolte Kabel, oder elektromagnetische Störfelder (z. B. Smartphone in Patientennähe)."
  },
  {
    id: "schwer-016",
    caseId: "case-13",
    difficulty: "schwer",
    caseDescription:
      "Frau M. (32 Jahre) krümmt sich vor Schmerzen im Untersuchungszimmer. Sie berichtet von plötzlich einschießenden, unerträglichen, wellenartigen Schmerzen (Intensität 9/10), die in der rechten Flanke begonnen haben und nun phasenweise bis in die Schamlippen ausstrahlen. Ihr ist extrem übel, sie hat sich bereits zweimal erbrochen. Bei der Urinstix-Untersuchung zeigt sich eine deutliche Makrohämaturie (Blut im Urin).",
    question:
      "Welche pathophysiologische Verdachtsdiagnose liegt hier vor? Erklären Sie das typische Schmerzmuster, die Entstehung der Hämaturie sowie die zwei schwerwiegenden klinischen Gefahren (Komplikationen), die bei diesem Krankheitsbild drohen.",
    modelAnswer:
      "Verdachtsdiagnose: Akute Nierenkolik / Ureterolithiasis (Nierenstein im Harnleiter) rechts.\n\nPathophysiologie des Schmerzes & Hämaturie: Die wellenartigen Koliken (bis zu 60 Minuten anhaltend) entstehen durch die krampfartige Peristaltik der glatten Muskulatur des Harnleiters, die versucht, den festsitzenden Stein vorwärts zu bewegen. Die Schmerzwanderung von der Flanke bis in das Genitaltrakt folgt dem anatomischen Verlauf des Harnleiters bei der Steinwanderung. Die Makrohämaturie resultiert aus der direkten mechanischen Reizung und Mikrotraumatisierung der empfindlichen Urothel-Schleimhaut durch die scharfen Kanten des Steins.\n\nGefahren / Komplikationen:\n1. Hydronephrose (Nierenstauung): Der Stein verlegt das Lumen komplett, Urin staut sich bis in das Nierenbecken zurück, was zu irreversiblem Parenchymschaden führt.\n2. Urosepsis: Durch den Harnstau können Bakterien aszendieren und eine lebensgefährliche systemische Blutvergiftung auslösen."
  },
  {
    id: "schwer-017",
    caseId: "case-14",
    difficulty: "schwer",
    caseDescription:
      "Frau J. (26 Jahre) bittet Sie auf der gynäkologischen Station dringend um Hilfe. Sie klagt über plötzlich aufgetretene, stechende, einseitige Unterbauchschmerzen links, die progressiv an Intensität zunehmen. Sie gibt an, dass ihre Periode seit ca. zwei Wochen überfällig sei. Bei den Vitalzeichen stellen Sie eine zunehmende Tachykardie (Puls 108/min) und einen sinkenden Blutdruck (95/60 mmHg) fest. Die Haut ist blass und kaltschweißig.",
    question:
      "Welche lebensbedrohliche gynäkologische Verdachtshypothese müssen Sie formularisieren? Bewerten Sie die erhobenen Vitalzeichen im Sinne der Triage (Red/Vital Flags) und beschreiben Sie das unmittelbare pflegerische Notfallmanagement.",
    modelAnswer:
      "Verdachtsdiagnose: Rupturierte Extrauteringravidität (Eileiterschwangerschaft) links mit akutem intraabdominellem hämorrhagischen Schock.\n\nBewertung der Triage-Parameter (Vital Flags): Es liegt eine akute Lebensgefahr vor (Triage-Kategorie Rot / Sofortiger Handlungsbedarf). Die Kombination aus plötzlichem Unterbauchschmerz, überfälliger Menses, Tachykardie (Puls > 100/min), Hypotonie (RR < 100 mmHg) und Kaltschweißigkeit beweist einen massiven inneren Blutverlust (hämorrhagischer Schock) nach Tubenruptur.\n\nNotfallmanagement:\n1. Unverzügliche Alarmierung des Notarztteams / Dienstarztes (Notruf 144 bzw. hausinterner Reanimationsruf).\n2. Absolute Bettruhe, flache Rückenlage und sofortige Bereitstellung/Verabreichung von hochdosiertem Sauerstoff via Maske.\n3. Vorbereitung für die sofortige Anlage von mindestens zwei großlumigen peripheren Venenzugängen zur aggressiven Volumensubstitution und Vorbereitung der operativen Notfall-Laparotomie."
  },
  {
    id: "schwer-018",
    caseId: "case-15",
    difficulty: "schwer",
    caseDescription:
      "Herr O. (62 Jahre, Diabetiker) stellt sich in der Notaufnahme vor. Er berichtet von seit einer Stunde anhaltenden, unerträglichen Schmerzen hinter dem Brustbein (retrosternal), die er als massives Druck- und Engegefühl beschreibt. Der Schmerz strahle in den linken Arm und den Unterkiefer aus. Er leidet unter akuter Atemnot, ist kaltschweißig und äußert extreme Todesangst. Das Akut-EKG zeigt signifikante ST-Streckenhebungen in den Vorderwandableitungen.",
    question:
      "Klassifizieren Sie das vorliegende kardiovaskuläre Ereignis exakt. Erklären Sie die zugrundeliegende Pathophysiologie, die Bedeutung des Ausspruchs 'Zeit ist Muskel' und begründen Sie, warum Diabetiker bei diesem Krankheitsbild eine besondere Risikogruppe für atypische Verläufe darstellen.",
    modelAnswer:
      "Klassifikation: Akuter ST-Hebungs-Myokardinfarkt (STEMI) der Vorderwand.\n\nPathophysiologie: Durch einen akuten, kompletten Verschluss einer Herzkranzarterie (meist infolge eines Plaqueeinrisses mit thrombotischer Auflagerung) wird ein Myokardareal vollständig von der Sauerstoffzufuhr abgeschnitten. Dies führt zur Ischämie und nachfolgend zum Absterben der betroffenen Herzmuskelzellen (Nekrose).\n\nBedeutung von 'Zeit ist Muskel': Je länger das Gefäß verschlossen bleibt, desto mehr Herzmuskelgewebe stirbt irreversibel ab. Eine sofortige Wiedereröffnung im Herzkatheterlabor (Koronarangiographie mit Stent) innerhalb der ersten Goldenen Stunde entscheidet maßgeblich über das Überleben und die verbleibende Herzleistung des Patienten.\n\nBesonderheit bei Diabetikern: Durch die chronische hyperglykämische Schädigung des autonomen Nervensystems (autonome diabetische Neuropathie) ist die Schmerzwahrnehmung massiv gestört. Diabetiker erleiden häufig einen sogenannten 'stummen Infarkt' ohne typische Brustschmerzen, welcher sich nur durch unspezifische Symptome wie plötzliche Luftnot oder unerklärliche Müdigkeit äußert, was die Diagnose gefährlich verzögert."
  },
  {
    id: "schwer-019",
    caseId: "case-16",
    difficulty: "schwer",
    caseDescription:
      "Bei der Visite untersuchen Sie das Abdomen eines Patienten mit Verdacht auf eine akute Cholezystitis (Gallenblasenentzündung). Sie führen die strukturierte Palpation des rechten Oberbauchs durch, um das spezifische Murphy-Zeichen zu überprüfen.",
    question:
      "Beschreiben Sie die exakte manuelle Durchführung des Murphy-Zeichens am Patienten. Welche spezifische Reaktion des Patienten definiert einen positiven Befund und wie unterscheidet sich der Schmerzcharakter einer Cholezystitis grundlegend von dem einer Nierenkolik?",
    modelAnswer:
      "Durchführung des Murphy-Zeichens: Der Patient befindet sich in entspannter Rückenlage. Der Pflegende/Untersucher platziert die Fingerkuppen der tastenden Hand medial der Medioklavikularlinie (MCL) direkt unterhalb des rechten Rippenbogens (über der anatomischen Lage der Gallenblase). Der Patient wird nun aufgefordert, maximal tief einzuatmen, wodurch das Zwerchfell die Leber und die Gallenblase nach kaudal gegen die tastenden Finger drückt.\n\nPositiver Befund: Sobald die entzündete Gallenblase die Finger des Untersuchers berührt, bricht der Patient die Einatmung schmerzbedingt abrupt ab (reflektorischer Atemstopp).\n\nUnterschied im Schmerzcharakter:\n- Akute Cholezystitis: Verursacht einen lokalisierten, anhaltenden, dumpfen bis stechenden Entzündungsschmerz im rechten Oberbauch, der häufig in die rechte Schulter ausstrahlt und eine lokale Abwehrspannung zeigt.\n- Nierenkolik: Verursacht wellenartig an- und abschwellende (kolikartige), extrem heftige Schmerzen, die dynamisch von der Flanke in Richtung Genitaltrakt wandern; das Abdomen ist dabei meist weich und nicht druckempfindlich."
  },
  {
    id: "schwer-020",
    caseId: "case-17",
    difficulty: "schwer",
    caseDescription:
      "Frau B. (48 Jahre) stellt sich mit starkem Juckreiz, Brennen und Schmerzen in den Hautfalten unterhalb beider Brüste (Submammärraum) vor. Bei der Inspektion sehen Sie eine spiegelbildliche, intensiv gerötete, feuchte und mazerierte Hautoberfläche. An den Rändern der Rötung zeigen sich kleine, punktförmige Pusteln und Schuppungen. Die Patientin ist übergewichtig und leidet unter Diabetes mellitus Typ 2.",
    question:
      "Formulieren Sie die pflegerische Arbeitshypothese. Erklären Sie die Pathophysiologie dieser Erkrankung unter Einbezug der spezifischen Risikofaktoren der Patientin und nennen Sie vier pflegetherapeutische Maßnahmen zur kausalen Behandlung.",
    modelAnswer:
      "Arbeitshypothese: Intertrigo (entzündliche Hauterkrankung der Hautfalten), sekundär kompliziert durch eine kutane Candida-Pilzinfektion (Intertriginöse Candidose).\n\nPathophysiologie & Risikofaktoren: Durch das Aneinanderreiben von Haut-auf-Haut in der Falte entsteht mechanische Reibung. In Kombination mit lokalem Schweiß (Feuchtigkeit) und Körperwärme kommt es zur Quellung und Schädigung der Hornschicht (Mazeration), wodurch die epidermale Barrierefunktion zerstört wird. Dies bietet Hefepilzen (Candida albicans), die das Keratin besiedeln, einen idealen Nährboden. Die Adipositas (vergrößerte Hautfalten/Reibung) und der Diabetes mellitus (erhöhter Glukosegehalt im Gewebe fördert das Pilzwachstum) wirken als massive pathophysiologische Treiber.\n\nPflegetherapeutische Maßnahmen:\n1. Hautpflege & Trockenhaltung: Nach dem Waschen mit pH-neutralen Syndets die Hautfalten extrem gründlich trockentupfen (nicht reiben!).\n2. Feuchtigkeitsmanagement: Einlegen von weichen, atmungsaktiven Kompressen oder Baumwolltüchern in die Hautfalten, um Schweiß aktiv aufzusaugen und Haut-auf-Haut-Kontakt zu verhindern.\n3. Antimykotische Therapie: Konsequente Applikation der ärztlich verordneten topischen Antipilzsalbe oder -creme.\n4. Druck- und Reibungsentlastung durch das Tragen von gut sitzender, atmungsaktiver Baumwollunterwäsche (Vermeidung von Synthetik)."
  },
  {
    id: "schwer-021",
    caseId: "case-18",
    difficulty: "schwer",
    caseDescription:
      "Im Rahmen einer kardiologischen Funktionskontrolle führen Sie bei einem Patienten eine systematische Untersuchung des peripheren Venensystems durch. Sie prüfen den Status der Vena jugularis interna zur Abschätzung des zentralen Venendrucks (ZVD).",
    question:
      "Beschreiben Sie die exakte Vorgehensweise und die korrekte Positionierung/Lagerung des Patienten für die Beurteilung der Jugularvenenstauung. Welche anatomischen Befunde gelten als physiologisch normal und ab welchem Punkt liegt ein pathologischer Wert vor?",
    modelAnswer:
      "Vorgehensweise und Lagerung: Der Patient wird in eine entspannte Rückenlage gebracht, bei der der Oberkörper exakt in einem 35- bis 45-Grad-Winkel mittels Kopfteil hochgestellt wird. Der Kopf wird leicht zur kontralateralen (gegenüberliegenden) Seite gedreht, um die Halsregion optimal freizulegen.\n\nPhysiologischer Normalbefund: Unter normalen Druckverhältnissen im rechten Vorhof muss die Vena jugularis am Jugulum (oberhalb des Schlüsselbeins) in dieser 45°-Lage vollständig kollabiert bzw. nicht mehr sichtbar gestaut sein. Dies entspricht einem normalen Druck von ca. 8 cm Wassersäule bzw. 5–6 mmHg vor dem rechten Vorhof.\n\nPathologischer Befund: Ist die Jugularvene in der 45°-Oberkörperhochlage weiterhin deutlich sichtbar über das Jugulum hinaus gestaut oder pulsierend tastbar, liegt eine pathologische Jugularvenenstauung vor. Dies beweist einen erhöhten zentralen Venendruck (ZVD), wie er typisch für eine dekompensierte Rechtsherzinsuffizienz, einen Perikarderguss oder eine Volumenüberlastung ist."
  },
  {
    id: "schwer-022",
    caseId: "case-19",
    difficulty: "schwer",
    caseDescription:
      "Bei der körperlichen Untersuchung eines Patienten, der über chronische Abgeschlagenheit klagt, führen Sie die Palpation des Herzens durch, um den Herzspitzenstoß (Apeximpuls) strukturiert zu beurteilen.",
    question:
      "In welchem exakten anatomischen Interkostalraum (ICR) und entlang welcher Orientierungslinie palpieren Sie physiologischerweise den Herzspitzenstoß? Wie verändern Sie die Position des Patienten, falls der Impuls in Rückenlage nicht tastbar ist, und welche klinische Bedeutung hat ein 'hebender, nach links verlagerter' Stoß?",
    modelAnswer:
      "Anatomische Lokalisation: Der Herzspitzenstoß wird physiologischerweise im 5. Interkostalraum (ICR) links exakt auf oder leicht medial der Medioklavikularlinie (MCL) palpiert.\n\nPositionsänderung bei Nicht-Tastbarkeit: Lässt sich der Impuls in flacher Rückenlage (z. B. bei adipösen Patienten oder tiefem Thoraxdurchmesser) nicht tasten, wird der Patient in die Linksseitenlage gebracht oder aufgefordert, sich aufzusetzen und den Oberkörper leicht nach vorne zu neigen. Dies bringt die Herzspitze mechanisch näher an die vordere Brustwand.\n\nKlinische Bedeutung eines hebenden, verlagerten Stoßes: Ein kräftiger, verlängerter und tastbar breiterer Impuls, der zudem nach links-kaudal über die Medioklavikularlinie hinaus verlagert ist, wird als hebender Herzspitzenstoß klassifiziert. Er ist das klassische klinische Zeichen einer Linksherzhypertrophie (Muskelmassenvergrößerung des linken Ventrikels), ausgelöst durch chronisch erhöhten Nachlast-Druck wie bei einer langjährigen arteriellen Hypertonie oder einer hochgradigen Aortenklappenstenose."
  },
  {
    id: "schwer-023",
    caseId: "case-20",
    difficulty: "schwer",
    caseDescription:
      "Frau P. (71 Jahre) stellt sich mit einer ausgeprägten, schmerzhaften Schwellung des gesamten rechten Beins vor. Bei der pflegerischen Inspektion stellen Sie fest, dass im Gegensatz zu einem klassischen venösen Ödem hier auch die Zehen massiv quaderförmig geschwollen sind. Zwischen den Zehengelenken zeigen sich tiefe Querfalten. Sie versuchen, eine Hautfalte über dem Mittelglied der zweiten Zehe abzuheben, was komplett fehlschlägt.",
    question:
      "Benennen Sie das spezifische klinische Hautphänomen, das Sie hier überprüft haben. Welche exakte klinische Diagnose liegt vor und grenzen Sie die Pathophysiologie dieses Krankheitsbildes von den Entstehungsmechanismen eines kardialen oder nephrotischen Ödems ab.",
    modelAnswer:
      "Klinisches Phänomen & Diagnose: Es handelt sich um ein positives Stemmer-Zeichen (Unfähigkeit, eine Hautfalte über den Zehenrücken abzuheben). Die exakte Diagnose lautet Lymphödem der rechten unteren Extremität.\n\nPathophysiologische Differenzierung:\n- Lymphödem: Ist ein eiweißreiches Exsudat, bedingt durch eine mechanische Blockade oder Schädigung der Lymphgefäße (primär kongenital oder sekundär nach OP, Tumor oder Trauma). Da der Rücktransport der hochmolekularen Proteine blockiert ist, verbleiben diese im Interstitium, binden Wasser und führen zur fibrotischen Gewebeverhärtung (weshalb Zehen mitbetroffen sind und das Ödem derb/nicht eindrückbar ist).\n- Kardiales / Nephrotisches Ödem: Sind eiweißarme Transsudate. Ein kardiales Ödem (z. B. bei Rechtsherzinsuffizienz) entsteht durch einen erhöhten hydrostatischen Kapillardruck infolge venösen Rückstaus; ein nephrotisches Ödem entsteht durch einen verminderten kolloidosmotischen Druck im Blut infolge massiven Eiweißverlusts über die Nieren (Hypalbuminämie). Beide Formen betreffen die Zehen nicht direkt und sind weich/eindrückbar."
  },
  {
    id: "schwer-024",
    caseId: "case-21",
    difficulty: "schwer",
    caseDescription:
      "Im Rahmen der pflegerischen Aufnahme eines chronisch bettlägerigen Patienten führen Sie ein umfassendes Haut- und Gefässassessment durch. Am Fußrücken und an den Zehengelenken des linken Fußes entdecken Sie zwei kreisrunde, scharf begrenzte, tiefe Gewebedefekte (Ulzera), die mit einer harten, schwarzen Kruste (trockenes Gangrän) bedeckt sind. Die umgebende Haut ist extrem blass, glänzend, haarlos und fühlt sich eiskalt an. Ödeme oder Hautpigmentierungen liegen nicht vor.",
    question:
      "Ordnen Sie diese Ulzeration begründet der korrekten vaskulären Ursache zu. Welche Differenzialdiagnose wenden Sie an ( CEAP-Klassifikation vs. Fontaine-Stadien) und nennen Sie drei essenzielle pflegerische Kontraindikationen (Verbote) im Umgang mit dieser Extremität.",
    modelAnswer:
      "Vaskuläre Ursache & Stadium: Es handelt sich um ein ischämisches Ulkus infolge einer peripheren arteriellen Verschlusskrankheit (pAVK), klassifiziert als Stadium IV nach Fontaine (Gewebsnekrose/Gangrän).\n\nBegründung der Differenzialdiagnose: Die Lokalisation an den Zehen/Fußrücken, die fehlenden Ödeme, die eiskalte, haarlose Haut und das trockene Gangrän sind pathognomonisch für den arteriellen Sauerstoffmangel. Die CEAP-Klassifikation findet hier keine Anwendung, da diese ausschließlich zur Graduierung der chronisch-venösen Insuffizienz (CVI) dient (welche stattdessen durch braune Pigmentierungen, Ödeme und Ulzera an den Knöcheln charakterisiert wäre).\n\nPflegerische Kontraindikationen (Absolute Verbote):\n1. KEINE Kompressionstherapie: Das Anlegen von Kompressionsverbänden oder -strümpfen ist absolut kontraindiziert, da es die verbleibende, kritische arterielle Durchblutung komplett abschnüren und zur sofortigen Amputationsnotwendigkeit führen würde.\n2. KEINE Hochlagerung des Beines: Die Extremität darf nicht hochgelagert werden, da die Schwerkraft benötigt wird, um das Blut durch die verengten Arterien in den Fuß zu leiten (Lagerung stattdessen immer tief/herabhängend).\n3. KEINE lokale Wärmeanwendung: Das Auflegen von Wärmflaschen oder Heizkissen ist verboten, da das ischämische Gewebe durch den erhöhten Sauerstoffbedarf bei Wärme sofort abstirbt und zudem eine schmerzmindernde Neuropathie vorliegen kann (Verbrennungsgefahr)."
  },
  {
    id: "schwer-025",
    caseId: "case-22",
    difficulty: "schwer",
    caseDescription:
      "Bei einem Patienten mit Verdacht auf ein akutes lumboradikuläres Syndrom führen Sie im Rahmen des physischen Assessments die systematische Überprüfung des Patellarsehnenreflexes (PSR) und des Achillessehnenreflexes (ASR) im Seitenvergleich durch.",
    question:
      "Verknüpfen Sie das Reflexgeschehen funktionell mit den anatomischen Nervenwurzelebenen. Welcher Reflex testet welche spezifische Nervenwurzel, wie dokumentiert sich der pathologische Befund bei einer echten mechanischen Wurzelkompression und welche motorische Gehprobe (z. B. Fersengang) korrespondiert mit welchem neurologischen Defizit?",
    modelAnswer:
      "Reflex- und Wurzelzuordnung:\n- Patellarsehnenreflex (PSR): Korrespondiert funktionell mit der Nervenwurzel L4. Der Kennmuskel ist der M. quadriceps femoris.\n- Achillessehnenreflex (ASR): Korrespondiert funktionell mit der Nervenwurzel S1. Der Kennmuskel ist der M. triceps surae.\n\nPathologischer Befund bei Wurzelkompression: Bei einer echten mechanischen Nervenwurzelkompression (z. B. durch einen Bandscheibenvorfall) zeigt sich der entsprechende Eigenreflex im Seitenvergleich auf der betroffenen Seite abgeschwächt (Hyporeflexie) oder komplett erloschen (Areflexie).\n\nKorrespondierende Gehproben:\n- Fersengang: Ist bei einer Schädigung der Wurzel L5 (Kennmuskel M. tibialis anterior / Fußheber) links oder rechts aufgehoben; der Fuß klatscht auf den Boden.\n- Zehenspitzenstand: Ist bei einer Schädigung der Wurzel S1 (Kennmuskel M. triceps surae / Plantarflexion) auf der betroffenen Seite nicht mehr möglich; der Patient kann das Körpergewicht nicht auf den Vorfuß verlagern."
  },

  {
    "id": "schwer-026",
    "caseId": "case-23",
    "difficulty": "schwer",
    "caseDescription": "Herr Schmidt, 58 Jahre, männlich, Hypertoniker, übergewichtig (BMI 32), wird vom Rettungsdienst eingeliefert. Er berichtet über plötzlich einsetzende starke Brustschmerzen mit Druckgefühl, die in den linken Arm und den Kiefer ausstrahlen. Er schwitzt stark, ist blass und wirkt ängstlich. Die Schmerzen bestehen seit ca. 45 Minuten. Vitalzeichen: RR 160/95 mmHg, Puls 110/min, SpO2 94%, AF 22/min.",
    "question": "Was ist Ihre Verdachtsdiagnose und welche Sofortmaßnahmen leiten Sie ein?",
    "modelAnswer": "VERDACHTSDIAGNOSE: Akuter Myokardinfarkt (Herzinfarkt) wahrscheinlich STEMI (ST-Elevation Myocardial Infarction) aufgrund der typischen Symptomatik.\n\nSOFORTMASSNAHMEN (VITAL FLAGS - sofort handeln!):\n1. Notruf / Arzt sofort informieren.\n2. Patient hinlegen, Oberkörper leicht erhöht (30°), Ruhe.\n3. Venösen Zugang legen.\n4. O2-Gabe (bei SpO2 <95%).\n5. Monitoring: EKG anlegen, kontinuierliche RR- und SpO2-Messung.\n6. Nitro nach ärztlicher Anordnung.\n7. Blutabnahme: Troponin, CK-MB, Blutbild, Gerinnung.\n8. Vorbereitung auf Herzkatheter ('Zeit ist Muskel').\n9. Nichts essen/trinken lassen (OP-Vorbereitung)."
  },
  {
    "id": "schwer-027",
    "caseId": "case-23",
    "difficulty": "schwer",
    "caseDescription": "Herr Schmidt, 58 Jahre, männlich, Hypertoniker, übergewichtig (BMI 32), wird vom Rettungsdienst eingeliefert. Er berichtet über plötzlich einsetzende starke Brustschmerzen mit Druckgefühl, die in den linken Arm und den Kiefer ausstrahlen. Er schwitzt stark, ist blass und wirkt ängstlich. Die Schmerzen bestehen seit ca. 45 Minuten. Vitalzeichen: RR 160/95 mmHg, Puls 110/min, SpO2 94%, AF 22/min.",
    "question": "Was ist der Unterschied zwischen STEMI und NSTEMI?",
    "modelAnswer": "STEMI (ST-Elevation MI): kompletter Verschluss einer Koronararterie → ST-Streckenhebung im EKG → akuter Notfall, sofortige Revaskularisation (Herzkatheter) notwendig. 'Zeit ist Muskel!'\n\nNSTEMI (Non-ST-Elevation MI): partieller Gefäßverschluss, keine ST-Hebung, evtl. ST-Senkung oder T-Veränderungen. Diagnose über erhöhtes Troponin. Behandlung medikamentös + frühzeitiger Herzkatheter."
  },

  {
    "id": "schwer-028",
    "caseId": "case-23",
    "difficulty": "schwer",
    "caseDescription": "Herr Schmidt, 58 Jahre, männlich, Hypertoniker, übergewichtig (BMI 32), wird vom Rettungsdienst eingeliefert. Er berichtet über plötzlich einsetzende starke Brustschmerzen mit Druckgefühl, die in den linken Arm und den Kiefer ausstrahlen. Er schwitzt stark, ist blass und wirkt ängstlich. Die Schmerzen bestehen seit ca. 45 Minuten. Vitalzeichen: RR 160/95 mmHg, Puls 110/min, SpO2 94%, AF 22/min.",
    "question": "Beschreiben Sie die Vorbereitung und Durchführung eines 12-Kanal-EKGs inklusive korrekter Elektrodenanlage.",
    "modelAnswer": "VORBEREITUNG:\n- Material: 12-Kanal-EKG-Gerät, Klebeelektroden oder Saugelektroden, Elektrodenspray, ggf. Einmalrasierer.\n- Patient: Oberkörper, Unterarme und Unterschenkel frei machen, Pat. soll einige Minuten ausruhen, angenehmes Raumklima, über Untersuchung informieren.\n\nELEKTRODENANLAGE:\n- Extremitätenableitungen: R (rot) = rechter Arm, L (gelb) = linker Arm, F (grün) = linker Fuß, N (schwarz) = rechter Fuß.\n- Brustwandableitungen: C1 (rot) = 4. ICR rechts Sternalrand, C2 (gelb) = 4. ICR links Sternalrand, C3 (grün) = zwischen C2 und C4, C4 (braun) = 5. ICR MCL, C5 (schwarz) = vordere Axillarlinie auf Höhe C4, C6 (violett) = mittlere Axillarlinie auf Höhe C4/C5.\n\nNACHBEARBEITUNG:\nEKG beschriften (Name, Geburtsdatum, Datum, Uhrzeit, Anlass), Qualität beurteilen, Elektroden entfernen, dokumentieren, Saugelektroden desinfizieren."
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
