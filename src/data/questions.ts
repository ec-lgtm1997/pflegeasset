// ============================================================================
// PFLEGEASSESSMENT - FRAGEN-DATENBANK (REFAKTORIERT)
// ----------------------------------------------------------------------------
// Struktur:
//   1. CASES_MAP  – Fallbeschreibungen einmalig definiert (keine Duplikate)
//   2. questions  – Nur id, caseId, question, modelAnswer (kein Overhead)
//   3. Helper     – getCases(), pickSessionByCases()
//
// ID-Schema: "<caseId>-q<nr>", z. B. "case-01-q1"
// Alle Fragen haben difficulty "schwer" – der Typ ist direkt im Interface
// kodiert, nicht als redundantes Laufzeit-Feld.
// ============================================================================

// ----------------------------------------------------------------------------
// 1. TYPES
// ----------------------------------------------------------------------------

export interface CaseDefinition {
  caseId: string;
  caseDescription: string;
}

export interface Question {
  id: string;
  caseId: string;
  question: string;
  modelAnswer: string;
}

export interface CaseGroup extends CaseDefinition {
  title: string;
  questions: Question[];
}

// ----------------------------------------------------------------------------
// 2. FÄLLE (einmalig – keine Wiederholung in den Fragen)
// ----------------------------------------------------------------------------

export const CASES_MAP: Record<string, string> = {
  "case-01":
    "Frau Semame. (58 Jahre) stellt sich mit akuten, heftigen Schmerzen im unteren Rückenbereich vor, die vor allem nach der Gartenarbeit gestern aufgetreten sind. Sie nimmt eine deutliche Schonhaltung (Rumpfneigung nach links) ein. Auf Nachfrage gibt sie an, dass der Schmerz ziehend über die Vorderseite des rechten Oberschenkels bis zum Knie zieht. Sie habe das Gefühl, das rechte Bein fühle sich beim Gehen „instabil“ an und sie müsse aktiv aufpassen, nicht einzuknicken.",

  "case-02":
    "Herr Manti. (44 Jahre, Fliesenleger) kommt aufgrund seit drei Tagen zunehmender Rückenschmerzen in die Ambulanz. Die Schmerzen strahlen über die dorsolaterale Seite des linken Oberschenkels und die ventrolaterale Seite des Unterschenkels direkt bis in den Fußrücken aus. Zudem klagt er über ein pelziges Gefühl („Ameisenlaufen“) im Bereich der großen Zehe. Bei der Gehprobe fällt auf, dass der linke Vorfuß beim Aufsetzen hörbar auf den Boden klatscht.",

  "case-03":
    "Herr Köfte. (39 Jahre) hat vor zwei Tagen beim Versuch, eine schwere Waschmaschine zu heben, einen plötzlichen, einschießenden Schmerz im lumbosakralen Übergang verspürt. Seither leidet er unter Schmerzen, die stechend über die Rückseite (dorsal) des rechten Beins bis hin zum lateralen Fußrand ausstrahlen. Das Auftreten auf den rechten Fuß bereitet ihm extreme Probleme; er kann sich kaum auf die Zehenspitzen stellen.",

  "case-04":
    "Frau Baklava. (82 Jahre) befindet sich am vierten postoperativen Tag nach einer elektiven Knie-Totalendoprothese (TEP) links auf der orthopädischen Station. Sie ist leicht desorientiert, klagt über nächtliche Schlaflosigkeit und erhält ein Sedativum zur Nacht. Sie hat einen liegenden intravenösen Zugang für die postoperative Analgetikatherapie. Bei der Mobilisation zeigt sie deutliche Balanceschwierigkeiten, hält sich an Wänden fest und neigt zu drängendem Toilettendrang aufgrund einer bekannten Dranginkontinenz. In der Patientengeschichte ist ein Sturz zu Hause vor drei Monaten dokumentiert.",

  "case-05":
    "Herr Vanille. (34 Jahre) stürzt bei Dacharbeiten aus ca. 3 Metern Höhe von einer Leiter und schlägt auf einer Blechkante auf. Sie treffen als Ersthelfer/Pflegekraft ein. Der Patient liegt auf dem Boden, stöhnt laut vor Schmerz, ist aber ansprechbar. Am rechten Oberschenkel zeigt sich eine tiefe Riss-Lazerationswunde, aus der hellrotes Blut stoßweise/spritzend austritt. Der Hosenboden ist bereits großflächig durchnässt, eine Blutlache bildet sich rasch auf dem Boden.",

  "case-06":
    "Im Rahmen Ihres Dienstes in der interdisziplinären Notaufnahme wird Frau T. (28 Jahre) nach einem ungebremsten Sturz mit dem E-Bike eingeliefert. Sie trug keinen Helm. Bei der Übernahme ist die Patientin somnolent (Augenöffnen nur auf lautes Ansprechen), reagiert verlangsamt, ist zeitlich und örtlich desorientiert. Es zeigt sich eine großflächige Schürfwunde und Hämatombildung parietal rechts sowie eine sichtbare Fehlstellung des linken Unterarms.",

  "case-07":
    "Herr Weber (65 Jahre) stellt sich in der Ambulanz vor. Er hat sich vor vier Tagen beim Rasenmähen eine kleine Bagatellverletzung am rechten Unterschenkel zugezogen. Seit gestern ist das Bein im Bereich des Schienbeins stark geschwollen, überwärmt und zeigt eine flammende, scharf begrenzte Rötung, die sich kontinuierlich ausbreitet. Herr Weber fröstelt, hat eine Körpertemperatur von 38,7 °C und klagt über stechende Schmerzen in der gesamten Extremität. In der rechten Leiste tasten Sie schmerzhafte Schwellungen.",

  "case-08":
    "Bei der Ganzkörperwaschung einer bettlägerigen, multimorbiden Patientin, Frau L. (79 Jahre, fortgeschrittene Demenz, schwere Stuhl- und Urininkontinenz), entdecken Sie im Sakralbereich eine tiefe Wunde. Es zeigt sich ein vollständiger Verlust der Hautschichten; subkutanes Fettgewebe ist sichtbar, Muskeln oder Knochen liegen nicht frei. Die Wundränder sind unregelmäßig, der Wundgrund ist teilweise mit gelblichem Schorf belegt. Ringsherum, flächig über beide Gesäßhälften verteilt, zeigt sich eine glänzende, diffus begrenzte, intensiv rosa-rote Hautveränderung mit kleinen, oberflächlichen Hautdefekten (Erosionen).",

  "case-09":
    "Herr G. (52 Jahre, von Beruf Landschaftsgärtner) bittet Sie während eines Beratungsgesprächs, einen Blick auf eine Hautveränderung an seinem oberen Rücken zu werfen, die seine Frau bemerkt habe. Bei der Inspektion sehen Sie eine asymmetrische, ca. 8 mm große, unregelmäßig und unscharf begrenzte Pigmentläsion. Die Farbe variiert innerhalb des Flecks von hellbraun über tiefschwarz bis hin zu bläulichen Anteilen. Der Patient gibt an, dass die Stelle ab und zu jucke und leicht erhaben sei.",

  "case-10":
    "Der Student Jan (21 Jahre) stellt sich mit stark zunehmenden Bauchschmerzen vor, die gestern Abend diffus im Bereich des Bauchnabels (periumbilikal) begonnen haben und im Verlauf der Nacht in den rechten Unterbauch gewandert sind. Er klagt über Appetitlosigkeit, leichte Übelkeit und hat sich einmal erbrochen. Die körperliche Messung ergibt eine axilläre Temperatur von 37,6 °C und eine rektale Temperatur von 38,5 °C. Das Gangbild ist gebeugt, das rechte Bein wird schonend nachgezogen.",

  "case-11":
    "Frau K. (72 Jahre, Zustand nach gynäkologischer Laparotomie vor 5 Tagen) klagt über ein starkes, schmerzhaftes Völlegefühl und zunehmende, krampfartige Bauchschmerzen. Bei der Inspektion zeigt sich das Abdomen massiv aufgetrieben und prall-elastisch (Meteorismus). Sie gibt an, seit über 36 Stunden weder Stuhlgang noch Winde gehabt zu haben. Seit zwei Stunden leidet sie unter heftigem, schwallartigem Erbrechen einer grünlich-bräunlichen Flüssigkeit, die einen fäkalen Geruch aufweist.",

  "case-12":
    "Herr D. (55 Jahre, bekannter chronischer Alkoholabusus) wird von seinem Sohn auf die Station gebracht. Dem Sohn ist aufgefallen, dass die Augen (Skleren) und die Haut des Vaters intensiv gelb gefärbt sind. Der Patient wirkt apathisch, klagt über chronische Müdigkeit und einen stark juckenden Hautausschlag (Pruritus). Der Bauch ist massiv prall vorgewölbt, der Bauchnabel ist verstrichen und es zeigen sich geschwungene, erweiterte Venenzeichnungen um den Nabel herum. Schmerzen werden verneint. Der Stuhl sei seit Tagen hell-grau, der Urin bierbraun.",

  "case-13":
    "Herr Nan. (68 Jahre, starker Raucher, bekanntes metabolisch-vaskuläres Syndrom) berichtet, dass er beim Gehen bereits nach einer Strecke von ca. 80 bis 100 Metern gezwungen sei, stehenzubleiben, da ein unerträglicher, krampfartiger Schmerz in der rechten Wadenmuskulatur einschieße. Nach einer kurzen Pause im Stehen lasse der Schmerz nach, sodass er weitergehen könne. Bei der Inspektion der Füße fällt auf, dass die Haut rechts blass, kühl und haarlos ist; Ödeme liegen nicht vor.",

  "case-14":
    "Frau Gözleme. (61 Jahre, Zustand nach ausgedehnter abdominaler Tumorchirurgie vor 2 Wochen) klagt über ein akutes Schwere- und Spannungsgefühl im linken Unterschenkel. Bei der Inspektion zeigt sich eine deutliche Schwellung des linken Beins, die Haut ist lokal zyanotisch verfärbt und die oberflächlichen Venen treten verstärkt hervor (Kollateralvenen). Beim Abtasten klagt sie über massiven Druckschmerz entlang der tiefen Venenbahn. Während Sie die Patientin untersuchen, klagt sie plötzlich über akut einsetzende Atemnot (Dyspnoe), stehende Schmerzen im rechten Brustkorb (Thoraxschmerz) und beginnt trocken zu husten. Sie wirkt kaltschweißig und hochgradig ängstlich.",

  "case-15":
    "Frau Lahmacun. (74 Jahre) stellt sich mit zunehmender Belastungsdyspnoe und gelegentlichem Schwindelgefühl vor. Im Rahmen der klinischen Untersuchung führen Sie ein Pflegeassessment des kardiovaskulären Systems durch. Bei der Herzauskultation mit dem Stethoskop hören Sie über dem 2. Interkostalraum (ICR) rechts sternal ein lautes, raues, spindelförmiges Geräusch während der Systole (Systolikum), das deutlich hörbar in die Halsschlagadern (Aa. carotides) ausstrahlt. Das zeitgleich geschriebene Ruhe-EKG zeigt eine unregelmäßige Kammerfrequenz von 115/min, das komplette Fehlen von P-Wellen und unregelmäßige, chaotische Zackenabstände (QRS-Komplexe).",

  "case-16":
    "Frau Menemen. (32 Jahre) krümmt sich vor Schmerzen im Untersuchungszimmer. Sie berichtet von plötzlich einschießenden, unerträglichen, wellenartigen Schmerzen (Intensität 9/10), die in der rechten Flanke begonnen haben und nun phasenweise bis in die Schamlippen ausstrahlen. Ihr ist extrem übel, sie hat sich bereits zweimal erbrochen. Bei der Urinstix-Untersuchung zeigt sich eine deutliche Makrohämaturie (Blut im Urin).",

  "case-17":
    "Frau Jalapeno. (26 Jahre) bittet Sie auf der gynäkologischen Station dringend um Hilfe. Sie klagt über plötzlich aufgetretene, stechende, einseitige Unterbauchschmerzen links, die progressiv an Intensität zunehmen. Sie gibt an, dass ihre Periode seit ca. zwei Wochen überfällig sei. Bei den Vitalzeichen stellen Sie eine zunehmende Tachykardie (Puls 108/min) und einen sinkenden Blutdruck (95/60 mmHg) fest. Die Haut ist blass und kaltschweißig.",

  "case-18":
    "Herr Obst. (62 Jahre, Diabetiker) stellt sich in der Notaufnahme vor. Er berichtet von seit einer Stunde anhaltenden, unerträglichen Schmerzen hinter dem Brustbein (retrosternal), die er als massives Druck- und Engegefühl beschreibt. Der Schmerz strahle in den linken Arm und den Unterkiefer aus. Er leidet unter akuter Atemnot, ist kaltschweißig und äußert extreme Todesangst. Das Akut-EKG zeigt signifikante ST-Streckenhebungen in den Vorderwandableitungen.",

  "case-19":
    "Bei der Visite untersuchen Sie das Abdomen eines Patienten mit Verdacht auf eine akute Cholezystitis (Gallenblasenentzündung). Sie führen die strukturierte Palpation des rechten Oberbauchs durch, um das spezifische Murphy-Zeichen zu überprüfen.",

  "case-20":
    "Frau Biber. (48 Jahre) stellt sich mit starkem Juckreiz, Brennen und Schmerzen in den Hautfalten unterhalb beider Brüste (Submammärraum) vor. Bei der Inspektion sehen Sie eine spiegelbildliche, intensiv gerötete, feuchte und mazerierte Hautoberfläche. An den Rändern der Rötung zeigen sich kleine, punktförmige Pusteln und Schuppungen. Die Patientin ist übergewichtig und leidet unter Diabetes mellitus Typ 2.",

  "case-21":
    "Im Rahmen einer kardiologischen Funktionskontrolle führen Sie bei einem Patienten eine systematische Untersuchung des peripheren Venensystems durch. Sie prüfen den Status der Vena jugularis interna zur Abschätzung des zentralen Venendrucks (ZVD).",

  "case-22":
    "Bei der körperlichen Untersuchung eines Patienten, der über chronische Abgeschlagenheit und Belastungsdyspnoe klagt, auskultieren Sie das Herz. Sie hören über der Herzspitze (5. ICR links, Medioklavikularlinie) ein weiches, raues, bandförmiges Geräusch während der Diastole, das in die linke Axilla ausstrahlt.",

  "case-23":
    "Frau Pilav. (71 Jahre) stellt sich mit einer ausgeprägten, schmerzhaften Schwellung des gesamten rechten Beins vor. Bei der pflegerischen Inspektion stellen Sie fest, dass im Gegensatz zu einem klassischen venösen Ödem hier auch die Zehen massiv quaderförmig geschwollen sind. Zwischen den Zehengelenken zeigen sich tiefe Querfalten. Sie versuchen, eine Hautfalte über dem Mittelglied der zweiten Zehe abzuheben, was komplett fehlschlägt.",

  "case-24":
    "Im Rahmen der pflegerischen Aufnahme eines chronisch bettlägerigen Patienten führen Sie ein umfassendes Haut- und Gefässassessment durch. Am Fußrücken und an den Zehengelenken des linken Fußes entdecken Sie zwei kreisrunde, scharf begrenzte, tiefe Gewebedefekte (Ulzera), die mit einer harten, schwarzen Kruste (trockenes Gangrän) bedeckt sind. Die umgebende Haut ist extrem blass, glänzend, haarlos und fühlt sich eiskalt an. Ödeme oder Hautpigmentierungen liegen nicht vor.",

  "case-25":
    "Bei einem Patienten mit Verdacht auf ein akutes lumboradikuläres Syndrom führen Sie im Rahmen des physischen Assessments die systematische Überprüfung des Patellarsehnenreflexes (PSR) und des Achillessehnenreflexes (ASR) im Seitenvergleich durch.",

  "case-26":
    "Herr Schmidt., 58 Jahre, männlich, Hypertoniker, übergewichtig (BMI 32), wird vom Rettungsdienst eingeliefert. Er berichtet über plötzlich einsetzende starke Brustschmerzen mit Druckgefühl, die in den linken Arm und den Kiefer ausstrahlen. Er schwitzt stark, ist blass und wirkt ängstlich. Die Schmerzen bestehen seit ca. 45 Minuten. Vitalzeichen: RR 160/95 mmHg, Puls 110/min, SpO2 94%, AF 22/min.",
};

// ----------------------------------------------------------------------------
// 3. FRAGEN
// ----------------------------------------------------------------------------

export const questions: Question[] = [

  // ============================================================
  // CASE-01: Frau Semame – L4-Syndrom
  // ============================================================
  {
    id: "case-01-q1",
    caseId: "case-01",
    question:
      "Nennen Sie Ihre pflegerische Arbeitshypothese (Verdachtsdiagnose) für Frau Semame. Begründen Sie Ihre Annahme anhand der anatomischen und symptomatischen Kriterien des Falls und grenzen Sie das Krankheitsbild von einer rein mechanischen Lumbalgie ab.",
    modelAnswer:
      "Arbeitshypothese: Lumboradikuläres Syndrom (LRS) mit Kompression der Nervenwurzel L4 rechts, sekundär bei Lumbalgie / akutem Bandscheibenvorfall.\n\nBegründung: Die Schmerzausstrahlung folgt präzise dem Dermatomschema L4 (ventrolateraler Oberschenkel über die Knieregion verlaufend). Das subjektive Gefühl der Instabilität im Knie weist auf eine motorische Schwäche des M. quadriceps femoris (Kennmuskel für L4) hin, welcher für die Knieextension und die Stabilisierung des Kniegelenks essenziell ist.\n\nAbgrenzung zur mechanischen Lumbalgie (LVS): Ein Lumbovertebrales Syndrom (LVS) äußert sich durch lokale, rein mechanische Schmerzen im Lendenbereich ohne radikuläre Ausstrahlung in die Extremitäten, ohne neurologische Defizite (Parästhesien) und ohne motorische Ausfälle.",
  },
  {
    id: "case-01-q2",
    caseId: "case-01",
    question:
      "Formulieren Sie fünf präzise offene Fragen im Rahmen der symptomfokussierten Anamnese (subjektive Daten), um den Schmerzverlauf und mögliche neurologische Defizite differenziert zu explizieren.",
    modelAnswer:
      "Fünf offene Fragen zur Symptompräzisierung:\n1. Lokalisation/Ausstrahlung: „Können Sie mit dem Finger den genauen Weg beschreiben, den der Schmerz von Ihrem Rücken in das rechte Bein nimmt, und wo genau er aufhört?“\n2. Qualität: „Wie fühlt sich der Schmerz im Bein an – ist er eher stechend-elektrisierend, dumpf drückend oder brennend?“\n3. Quantität: „Wenn 0 kein Schmerz ist und 10 der unerträglichste Schmerz: Wie stark ist der Schmerz aktuell im Ruhezustand und wie stark bei Bewegung?“\n4. Modifizierende Faktoren: „Gibt es bestimmte Körperpositionen, wie zum Beispiel das Hinlegen mit angewinkelten Beinen oder das Vorbeugen im Sitzen, die Ihren Schmerz merklich lindern oder verstärken?“\n5. Begleitsymptome (Neurologie): „Haben Sie neben den Schmerzen ein Taubheitsgefühl, ein Kribbeln oder ein Gefühl von 'pelziger Haut' auf der Vorderseite Ihres Oberschenkels oder Knies bemerkt?“",
  },
  {
    id: "case-01-q3",
    caseId: "case-01",
    question:
      "Beschreiben Sie das konkrete klinische Vorgehen zur Überprüfung einer Nervenwurzelkompression bei Frau Semame (Inspektion und spezifischer Test). Wie lagern Sie die Patientin dafür und welche Befundkonstellation bestätigt den klinischen Verdacht?",
    modelAnswer:
      "Inspektion: Beurteilung der Wirbelsäulenkrümmung, der Beckenstabilität und der ausgeprägten Schonhaltung (Rumpfneigung zur Gegenseite zur Entlastung der komprimierten Wurzel).\n\nSpezifischer Test: Überprüfung der Kniestreckung (M. quadriceps femoris) gegen den Widerstand des Untersuchers sowie Überprüfung des Patellarsehnenreflexes (PSR), der bei einer L4-Kompression abgeschwächt oder aufgehoben sein kann.\n\nLagerung: Die Patientin befindet sich in Rückenlage. Zur Schmerzlinderung im Akutstadium kann eine Stufenbettlagerung (90°-Beugung in Hüft- und Kniegelenken) mittels Schaumstoffwürfel indiziert sein.\n\nBefundbestätigung: Eine tastbare Kraftminderung bei der Knieextension (Kraftgrad < 5) und ein im Seitenvergleich abgeschwächter PSR untermauern den L4-Verdacht.",
  },
  {
    id: "case-01-q4",
    caseId: "case-01",
    question:
      "Formulieren Sie zwei fallbezogene, prioritäre Pflegediagnosen (nach NANDA-Struktur) für Frau Semame inklusive relevanter Einflussfaktoren (R/T) und Symptome (A/E/B).",
    modelAnswer:
      "1. Akuter Schmerz (00132) R/T Kompression der lumbalen Nervenwurzel L4 A/E/B Schmerzausstrahlung in den rechten ventrolateralen Oberschenkel, Schmerzscore > 6/10, Einnahme einer Schonhaltung (Rumpfneigung).\n\n2. Beeinträchtigte körperliche Mobilität (00085) R/T neuromuskulärer Schädigung und motorischer Schwäche des M. quadriceps femoris sowie Schmerzen A/E/B Angabe von Instabilitätsgefühl im rechten Knie, Einschränkung des Bewegungsumfanges und Schonhaltung.",
  },
  {
    id: "case-01-q5",
    caseId: "case-01",
    question:
      "Erstellen Sie eine strukturierte, prägnante Übergabe an den zuständigen Dienstarzt nach dem ISBAR-Schema, um die medizinische Abklärung einzuleiten.",
    modelAnswer:
      "I (Identifikation): \"Hallo, hier spricht Rabia Sirin von Station [X]. Ich rufe wegen der neu aufgenommenen Patientin, Frau S., geboren am [Datum], an.\"\nS (Situation): \"Frau S. klagt über akute, heftige lumbale Rückenschmerzen mit Ausstrahlung in den rechten ventrolateralen Oberschenkel bis zum Knie nach gestriger Gartenarbeit.\"\nB (Hintergrund): \"Die Patientin hat keine traumatische Vorgeschichte, zeigt jedoch ein akut beeinträchtigtes Gangbild mit ausgeprägter linksseitiger Schonhaltung.\"\nA (Assessment): \"Subjektiv besteht ein Instabilitätsgefühl im Knie. Objektiv zeigt sich eine Kraftminderung bei der Knieextension rechts gegen Widerstand. Vitalkriterien sind stabil (BD 130/80, Puls 78, Temp. 36.8°C). Es liegen aktuell keine Miktions- oder Defäkationsstörungen vor.\"\nR (Recommendation): \"Ich empfehle eine zeitnahe ärztliche Untersuchung zur Überprüfung des Patellarsehnenreflexes sowie die Festlegung der analgetischen Akuttherapie und die Indikationsstellung für ein florides CT/MRT der Lendenwirbelsäule.\"",
  },

  // ============================================================
  // CASE-02: Herr Manti – L5-Syndrom
  // ============================================================
  {
    id: "case-02-q1",
    caseId: "case-02",
    question:
      "Welches spezifische Nervenwurzelsyndrom liegt hier vor? Begründen Sie Ihre pathophysiologische Zuordnung anhand der sensiblen Dermatome und der betroffenen Muskelgruppen (Kennmuskel).",
    modelAnswer:
      "Wurzelsyndrom: Lumboradikuläres Syndrom (LRS) der Nervenwurzel L5 links (häufig bedingt durch einen Bandscheibenvorfall im Segment LWK 4/5).\n\nPathophysiologische Begründung: Die Schmerzausstrahlung verläuft exakt entlang des linken L5-Dermatoms (Oberschenkel dorsolateral, Unterschenkel ventrolateral, Fußrücken bis zur Großzehe). Die Parästhesie („Ameisenlaufen“) betrifft das sensible Versorgungsgebiet von L5 (Großzehenregion). Das auffällige Klatschen des Fußes beim Gehen beweist eine ausgeprägte Fußheberparese. Der verantwortliche Kennmuskel für die Fußextension (Dorsalextension) und die Großzehenbewegung ist der M. extensor hallucis longus (und der M. tibialis anterior, welcher funktionell überlappt), welcher durch die L5-Kompression neurologisch blockiert ist.",
  },
  {
    id: "case-02-q2",
    caseId: "case-02",
    question:
      "Welche akuten Alarmzeichen („Red Flags“ oder „Vital Flags“) müssen bei Herrn Manti. explizit erfragt und ausgeschlossen werden, um eine notfallmäßige Operationsindikation rechtzeitig zu erkennen? Nennen Sie mindestens vier spezifische Symptome.",
    modelAnswer:
      "Zur Vermeidung irreversibler Schäden müssen folgende Symptome im Akut-Assessment ausgeschlossen werden:\n1. Störungen bei Miktion oder Defäkation: Harnretention (Harnverhalt), Überlaufblase oder unwillkürlicher Stuhl-/Urinverlust (Inkontinenz) als Zeichen eines Kauda-Syndroms.\n2. Sattelanästhesie: Taubheitsgefühl im Perianal- und Genitalbereich (Reithosenanästhesie).\n3. Perakute, progrediente Lähmung: Rasch zunehmender Kraftverlust der Fußheber (vollständiger Fußheberfall), Kraftgrad < 3/5.\n4. Systemische Zeichen / Infektion: Hohes Fieber (> 38.5 °C) kombiniert mit lokalem Klopfschmerz zum Ausschluss einer Spondylodisitis oder eines epiduralen Abszesses.",
  },
  {
    id: "case-02-q3",
    caseId: "case-02",
    question:
      "Wie überprüfen Sie das motorische Defizit der betroffenen Muskelgruppe bei Herrn Manti konkret in der Praxis? Beschreiben Sie die Testdurchführung und die physiologische Funktion des betroffenen Kennmuskels.",
    modelAnswer:
      "Fersengang: Der Patient wird aufgefordert, ein Stück ausschließlich auf den Fersen zu gehen. Bei einer L5-Schädigung ist dies auf der betroffenen (linken) Seite nicht möglich; der Vorfuß sinkt ab.\n\nManueller Widerstandstest: Der Patient befindet sich in Rückenlage oder sitzt an der Bettkante. Der Untersucher drückt den Fuß und die große Zehe nach unten (Plantarflexion), während der Patient maximal versucht, den Fuß und die große Zehe nach oben zu ziehen (Dorsalextension). Der Seitenvergleich dokumentiert das Defizit.\n\nKennmuskel: M. extensor hallucis longus (Großzehenbewegung) und M. tibialis anterior (Fußextension).",
  },
  {
    id: "case-02-q4",
    caseId: "case-02",
    question:
      "Formulieren Sie zwei für diesen Fall relevante Pflegediagnosen. Berücksichtigen Sie dabei insbesondere die neurologische Symptomatik und den Beruf des Patienten.",
    modelAnswer:
      "1. Gefahr von Stürzen (00155) R/T neuromuskulärer Dysfunktion (Fußheberparese links, Fußklatschen) und sensiblen Störungen des linken Fußes.\n\n2. Wissensdefizit (00126) bezüglich rückenschonender Ergonomie am Arbeitsplatz R/T mangelndem Wissen über ergonomische Hebetechniken bei körperlich belastender Arbeit (Beruf: Fliesenleger).",
  },
  {
    id: "case-02-q5",
    caseId: "case-02",
    question:
      "Formulieren Sie die ISBAR-Meldung an den Arzt, in der Sie die Dringlichkeit der neurochirurgischen Mitbeurteilung aufgrund des motorischen Status hervorheben.",
    modelAnswer:
      "PI: \"Hier spricht Rabia Sirin, Pflege Ambulanz. Ich melde Herrn M., 44 Jahre, mit dringlicher neurochirurgischer Priorität.\"\nS: \"Es besteht der hochgradige Verdacht auf ein akutes lumboradikuläres Syndrom L5 links mit progredienter Fußheberparese.\"\nB: \"Der Patient arbeitet als Fliesenleger, die Beschwerden bestehen seit 3 Tagen, heute kam es zur akuten Verschlechterung des Gangbildes.\"\nA: \"Der Patient zeigt ein deutliches Fußklatschen links, der Fersengang ist links komplett aufgehoben. Parästhesien an der großen Zehe links vorhanden. Reithosenanästhesie sowie Miktions- oder Defäkationsstörungen wurden explizit verneint. Vitalzeichen stabil, schmerzbedingt hypertone Werte (BD 155/90).\"\nR: \"Aufgrund des motorischen Ausfalls (Fußheberparese) empfehle ich die sofortige neurochirurgische Konsiliärbeurteilung und die prioritäre Anmeldung für ein Notfall-MRT zur Dekompressions-Indikation.\"",
  },

  // ============================================================
  // CASE-03: Herr Köfte – S1-Syndrom
  // ============================================================
  {
    id: "case-03-q1",
    caseId: "case-03",
    question:
      "Erklären Sie die Durchführung und klinische Interpretation des Lasègue-Tests (Straight Leg Test) bei Herrn Köfte. Gehen Sie dabei präzise auf die Winkelbereiche (ROM) und die Unterscheidung zwischen neurogenen und mechanischen Schmerzursachen ein.",
    modelAnswer:
      "Durchführung: Der Patient liegt flach und entspannt in Rückenlage. Der Untersucher fasst das gestreckte Bein am Knöchel und hebt es langsam passiv an. Der Patient wird angewiesen, sofort Bescheid zu geben, wenn der bekannte Schmerz einschießt.\n\nInterpretation & Winkelbereiche:\n- Positiver Lasègue (Neurogen): Wenn zwischen einem Bewegungsumfang (ROM) von 30° und 60° ein plötzlicher, stechender, elektrisierender Schmerz einschießt, der vom Rücken direkt in das Bein (entlang des Dermatoms) ausstrahlt. Dies zeigt eine Reizung des Ischiasnervs bzw. eine Nervenwurzelkompression an.\n- Mechanische Schmerzursache: Tritt erst ein Schmerz bei einem Winkel von > 60° oder gegen 90° auf, der primär als Dehnungsschmerz in der Rückseite des Oberschenkels (Ischiokrurale Muskulatur) beschrieben wird, liegt in der Regel ein mechanisch-muskuläres Problem und keine akute Radikulopathie vor.",
  },
  {
    id: "case-03-q2",
    caseId: "case-03",
    question:
      "Ordnen Sie die klinische Symptomatik einer Nervenwurzel zu. Welche Kennmuskeln und welches Reflexgeschehen sind anatomisch mit dieser Etage verknüpft und wie verändert sich dieses im pathologischen Zustand?",
    modelAnswer:
      "Wurzelsyndrom: Lumboradikuläres Syndrom (LRS) der Nervenwurzel S1 rechts (Segment LWK 5/SWK 1), ausgelöst durch ein akutes Hebetrauma.\n\nPathophysiologische Verknüpfung: Die Unfähigkeit, sich auf die Zehenspitzen zu stellen, resultiert aus der Parese des M. triceps surae (Kennmuskel für S1), welcher für die Plantarflexion des Fußes zuständig ist. Weitere assoziierte Muskeln sind der M. gluteus maximus und der M. biceps femoris.\n\nReflexgeschehen: Der korrespondierende Eigenreflex ist der Achillessehnenreflex (ASR). Im pathologischen Zustand (Wurzelkompression) ist der ASR auf der rechten Seite im Seitenvergleich abgeschwächt oder komplett erloschen.",
  },
  {
    id: "case-03-q3",
    caseId: "case-03",
    question:
      "Welche modifizierenden Faktoren (Linderung / Verstärkung) müssen Sie bei Herrn Köfte strukturiert erheben, und welche evidenzbasierten Patienteninformationen bezüglich Lagerung, Aktivität und Schmerzmitteleinnahme vermitteln Sie ihm therapeutisch?",
    modelAnswer:
      "Erhebung der Faktoren: Fragen, ob Husten, Niesen oder Pressen (Erhöhung des Liquordrucks) den Schmerz verstärken. Prüfen, ob das Herabhängenlassen der Beine oder flaches Liegen Entlastung bringt.\n\nEvidenzbasierte Beratung:\n- Bettruhe vermeiden: Striktes Einhalten von Bettruhe über mehr als 2 Tage ist nachweislich ungünstig. Alltagsaktivitäten sollten im Schmerzrahmen beibehalten werden (Bewegung fördert die Heilung).\n- Schmerzmedikation: Konsequente, vorübergehende Einnahme der verordneten Analgetika, um schmerzfreie Bewegung zu ermöglichen und Chronifizierung/Schonhaltungen zu verhindern.\n- Lagerung: Zur akuten Entlastung in Ruhephasen wird die Stufenbettlagerung empfohlen.",
  },
  {
    id: "case-03-q4",
    caseId: "case-03",
    question:
      "Nennen Sie zwei prioritäre Pflegediagnosen für diesen Akutfall und begründen Sie das Risiko für sekundäre funktionelle Einschränkungen.",
    modelAnswer:
      "1. Akuter Schmerz (00132) R/T mechanischer Kompression der Nervenwurzel S1 infolge Hebetraumas A/E/B stechende Schmerzen dorsal im rechten Bein, Unfähigkeit des Zehenstandes.\n\n2. Gefahr einer Muskelatrophie / Aktivitätsintoleranz (00092) R/T schmerzbedingter Immobilisation und motorischer Schwäche des M. triceps surae (Schonhaltung, Vermeidung von Belastung).",
  },
  {
    id: "case-03-q5",
    caseId: "case-03",
    question: "Formulieren Sie die ISBAR-Übergabe an den zuständigen Arzt.",
    modelAnswer:
      "PI: \"Hallo, hier spricht Rabia Sirin von Station [X]. Ich rufe an wegen Herrn K., 39 Jahre, Raum [Y].\"\nS: \"Herr K. hat ein akutes S1-Syndrom rechts nach einem Hebetrauma vor zwei Tagen mit starkem radikulären Schmerz.\"\nB: \"Ausgelöst durch das Heben einer Waschmaschine. Zustand verschlechtert sich beim Versuch aufzutreten.\"\nA: \"Der Lasègue-Test ist bei ca. 40° rechts stark positiv mit typischer radikulärer Ausstrahlung bis zum lateralen Fußrand. Der Zehenspitzenstand rechts ist motorisch nicht möglich (Schwäche M. triceps surae). Der Achillessehnenreflex ist rechts im Seitenvergleich erloschen. Keine Blasen-Mastdarm-Symptome vorhanden.\"\nR: \"Ich empfehle eine zeitnahe ärztliche Visite zur Verordnung einer suffizienten Schmerztherapie (Stufenschema) zur Remobilisation sowie die Organisation einer physiotherapeutischen Mitbetreuung und die Einleitung der bildgebenden Diagnostik.\"",
  },

  // ============================================================
  // CASE-04: Frau Baklava – Sturzrisiko
  // ============================================================
  {
    id: "case-04-q1",
    caseId: "case-04",
    question:
      "Wählen Sie zwei standardisierte Assessmentinstrumente aus der Vorlesung zur systematischen Einschätzung des Sturzrisikos aus. Beschreiben Sie deren konkrete Durchführung und erklären Sie die punktuelle Auswertung (Cut-off-Werte), die bei Frau Baklava. ein erhöhtes Risiko anzeigen würden.",
    modelAnswer:
      "Leitlinienkonforme Instrumente:\n1. STRATIFY Fall Risk Assessment Tool: Fragebogen mit 5 Ja/Nein-Items (Kürzlicher Sturz, mentale Veränderung, Toilettendrang, Sehbehinderung, Mobilität/Transfer). Auswertung bei Frau Baklava: Sie erfüllt mindestens 4 Kriterien (Sturz = Ja; Desorientierung = Ja; Dranginkontinenz = Ja; Transfer eingeschränkt = Ja). Ein Score von >= 2 Ja-Antworten zeigt klinisch ein signifikant erhöhtes Sturzrisiko an.\n2. Timed Up and Go Test (TUG): Die Patientin steht von einem Stuhl mit Armlehnen auf, geht eine Strecke von 3 Metern, dreht sich um, geht zurück und setzt sich wieder hin. Die Zeit wird gemessen. Auswertung: Ein Wert von < 14 Sekunden gilt als normal. Ein Messwert von > 30 Sekunden dokumentiert eine erhebliche Mobilitätseinschränkung und ein hochgradiges Sturzrisiko.",
  },
  {
    id: "case-04-q2",
    caseId: "case-04",
    question:
      "Klassifizieren Sie die bei Frau Baklava vorliegenden Risikofaktoren strukturiert in intrinsische und extrinsische Faktoren. Nennen Sie jeweils mindestens vier Faktoren direkt aus dem Fallbeispiel.",
    modelAnswer:
      "Intrinsische Risikofaktoren (von der Person ausgehend):\n- Höheres Lebensalter (82 Jahre)\n- Kognitive Beeinträchtigung / akute Verwirrtheit (leicht desorientiert)\n- Haltungs- und Gangschwäche / Balanceschwierigkeiten bei der Mobilisation\n- Positive Sturzanamnese (Sturz zu Hause vor 3 Monaten)\n- Akute funktionelle Einschränkung (Zustand nach Knie-TEP)\n- Erhöhter Toilettendrang (bekannte Dranginkontinenz)\n\nExtrinsische Risikofaktoren (von der Umgebung ausgehend):\n- Polypharmazie / Risikomedikation (Sedativum zur Nacht, postoperative Analgetika)\n- Medizinische Geräte am Körper (liegender IV-Zugang / Infusionskabel als Stolperfalle)\n- Stationsumgebung (fremde Umgebung für die desorientierte Patientin).",
  },
  {
    id: "case-04-q3",
    caseId: "case-04",
    question:
      "Erklären Sie den klinischen Ablauf des „Geh- und Sprechtests“ (Dual-Tasking) sowie des „5-Meter-Gehtests“. Welche zeitlichen Grenzwerte weisen auf eine Gefährdung im Alltag hin?",
    modelAnswer:
      "Geh- und Sprechtest (Dual-Tasking): Der Pflegende geht mit der Patientin eine kurze Strecke auf dem Flur spazieren, ohne zu sprechen. Nach einigen Minuten beginnt ein normales Gespräch. Bleibt die Patientin beim Sprechen abrupt stehen (\"Stopping on talking\"), zeigt dies eine verminderte Exekutivfunktion durch kognitive Überforderung und ist ein valider Prädiktor für ein erhöhtes Sturzrisiko.\n\n5-Meter-Gehtest: Eine Strecke von exakt 5 Metern wird flach auf dem Boden markiert. Die Patientin legt diese Strecke so schnell wie möglich mit ihren gewohnten Hilfsmitteln zurück (Zeitmessung per Stoppuhr).\n\nGrenzwerte: Eine Zeit von > 3,57 Sekunden zeigt eine Gefährdung im Straßenverkehr an. Eine Zeit von > 33,3 Sekunden dokumentiert massive Alltagsschwierigkeiten und eine hochgradige Instabilität.",
  },
  {
    id: "case-04-q4",
    caseId: "case-04",
    question:
      "Formulieren Sie die prioritäre Pflegediagnose für Frau Baklava nach NANDA und listen Sie vier zielgerichtete, pflegerische Präventionsinterventionsmaßnahmen auf, um das Sturzrisiko auf Station effektiv zu minimieren.",
    modelAnswer:
      "Pflegediagnose: Sturzgefahr (00155) R/T reduzierter muskulärer Leistung der unteren Extremitäten (Z.n. Knie-TEP), Balanceschwierigkeiten, akuter Verwirrtheit, Einnahme von Sedativa und drängendem Toilettendrang bei Dranginkontinenz A/E/B positiver Sturzanamnese und Festhalten an den Wänden beim Gehen.\n\nPräventionsmaßnahmen:\n1. Umgebungsanpassung: Bett auf niedrigste Höhe (Niederflurbett), barrierefreie Umgebung (IV-Kabel sichern), Nachtlicht ein, Rufanlage in Reichweite.\n2. Inkontinenzmanagement: Strukturiertes Toilettengangs-Training (z.B. aktives Anbieten vor Verabreichung des nächtlichen Sedativums).\n3. Schuhwerk: Konsequentes Sicherstellen von geschlossenem, rutschfestem Schuhwerk bei jedem Transfer.\n4. Überwachung: Regelmäßige visuelle Kontrollen nachts; Vermeidung von freiheitsbeschränkenden Fixierungen (Bettgitter), da diese das Verletzungsrisiko bei Überkletterungsversuchen drastisch erhöhen.",
  },
  {
    id: "case-04-q5",
    caseId: "case-04",
    question:
      "Frau Baklava stürzt trotz Maßnahmen nachts auf dem Weg zur Toilette. Beschreiben Sie die unmittelbaren Prozessschritte des pflegerischen Post-Sturz-Managements inklusive Dokumentation und Re-Evaluation gemäß dem klinischen Risikomanagement-Kreislauf.",
    modelAnswer:
      "1. Akutphase & Triage (ABCDE-Schema): Critical Bleeding (Stoppen massiver Blutungen). Airway/Breathing/Circulation (Vitalzeichen erheben). Disability (Vigilanz/Pupillen prüfen zum Ausschluss eines SHT). Exposure (Körperinspektion im Bett auf Frakturen, Hämatome, Beinlängenverkürzung prüfen, Wärmeerhalt sichern).\n2. Arzt-Information: Unverzügliche Meldung zur medizinischen Diagnostik (Ausschluss innerer Verletzungen, Komplikationen der Knie-TEP).\n3. Sturzdokumentation: Lückenlose Erfassung im klinischen Sturzprotokoll (Datum, Uhrzeit, Hergang, Zustand davor/danach, Folgen, informierte Personen).\n4. Re-Evaluation & Anpassung: Analyse der Ursache (z.B. Sedativum zu stark?), Sturzrisiko neu einschätzen (STRATIFY/TUG) und Pflegeplan anpassen, um Folge-Rezidive zu verhindern.",
  },

  // ============================================================
  // CASE-05: Herr Vanille – Kritische Blutung
  // ============================================================
  {
    id: "case-05-q1",
    caseId: "case-05",
    question:
      "Leiten Sie aus der Situation die unmittelbare Prioritätensetzung ab. Welches spezifische klinische Triage-Schema wenden Sie an, wie ordnen Sie den spritzenden Blutverlust hierin ein und welche Differenzialdiagnose bezüglich des drohenden Schockzustandes müssen Sie antizipieren?",
    modelAnswer:
      "Klinische Priorität: Unmittelbare, kritische Lebensgefahr durch Verbluten (Exsanguination). Das klassische ABCDE-Schema wird zum cABCDE-Schema erweitert (kleines „c“ steht für Critical Bleeding). Eine arterielle Extremitätenblutung führt innert weniger Minuten zum hämorrhagischen Schock; Atemwege (A) und Belüftung (B) sind nachrangig, solange das Volumen spritzend verloren geht.\n\nAntizipierte Schockform: Hypovolämischer Schock (spezifisch: hämorrhagischer Schock), gefolgt von der tödlichen Trias der Trauma-Pathophysiologie (Hypothermie, Azidose, Koagulopathie).",
  },
  {
    id: "case-05-q2",
    caseId: "case-05",
    question:
      "Formulieren Sie offene Fragen, die Sie während der Akutversorgung an den Patienten oder anwesende Zeugen richten (S-Daten), um den Unfallhergang und vitale Vorinformationen (z. B. Gerinnungsstatus) im Sinne der Triage zu erfassen.",
    modelAnswer:
      "Gezielte Kurzinformationen während der physischen Blutstillung:\n1. Unfallmechanismus (Trauma-Kinetik): „Aus welcher genauen Höhe sind Sie gefallen und sind Sie primär auf den Kopf, das Becken oder die Beine aufgeschlagen?“\n2. Gerinnungsstatus (Noxen/Medikation): „Nehmen Sie regelmäßig blutverdünnende Medikamente ein (z. B. Marcumar, Aspirin, Eliquis)?“\n3. Symptomwahrnehmung / Vigilanz: „Fühlen Sie sich schwindelig, wird Ihnen schwarz vor den Augen oder haben Sie Durst?“",
  },
  {
    id: "case-05-q3",
    caseId: "case-05",
    question:
      "Beschreiben Sie das konkrete, mechanische Vorgehen zur Stillung dieser kritischen Extremitätenblutung unter Verwendung des vorlesungsspezifischen Algorithmus (Tourniquet, Wound Packing, Druckverband). Wie gehen Sie Schritt für Schritt vor und wie lagern Sie den Patienten?",
    modelAnswer:
      "Schritt-für-Schritt-Blutstillungsalgorithmus:\n1. Manueller Druck: Sofortiger, maximaler digitaler Druck direkt auf die arterielle Verlaufsbahn oberhalb der Wunde (Druckpunkt Leiste/A. femoralis) bzw. direkt in die Wunde.\n2. Tourniquet-Anlage: Da das Blut spritzend austritt, wird sofort ein Tourniquet ca. 5–7 cm oberhalb der Wunde („high and tight“) appliziert. Knebel drehen, bis die Blutung stoppt. Zeit der Anlage zwingend auf dem Tourniquet notieren!\n3. Wound Packing & Druckverband: Die Wundhöhle fest mit (hämostatischer) Gaze austamponiert (Wound Packing), gefolgt von einem rigiden Druckverband.\n4. Lagerung: Da bei einem Sturz aus 3m Höhe ein hochgradiger V.a. ein Polytrauma / eine Wirbelsäulenverletzung besteht, erfolgt eine Flachlagerung in Rückenlage (Neutralposition), Immobilisation der Halswirbelsäule (Minitrauma-Check) und Wärmeerhalt mittels Rettungsdecke zur Vermeidung der Koagulopathie.",
  },
  {
    id: "case-05-q4",
    caseId: "case-05",
    question:
      "Formulieren Sie zwei prioritäre Pflegediagnosen (NANDA) für die Akutphase dieses Patienten inklusive biologischer Einflussfaktoren und Leitsymptome.",
    modelAnswer:
      "1. Gefahr eines hypovolämischen Schocks (00205) R/T massivem, spritzendem arterio-venösen Blutverlust sekundär nach schwerem Sturztrauma.\n\n2. Akuter Schmerz (00132) R/T Gewebekontinuitätstrennung (Lazeration) und muskuloskelettalem Trauma des Oberschenkels A/E/B lautes Stöhnen, Gesichtsmimik, Schmerzäußerung.",
  },
  {
    id: "case-05-q5",
    caseId: "case-05",
    question:
      "Erstellen Sie eine strukturierte ISBAR-Meldung für den eintreffenden Notarzt bzw. den Schockraum des Traumazentrums.",
    modelAnswer:
      "I: \"Hier spricht Rabia Sirin, Ersthelfer/Pflegekraft. Ich melde einen traumatologischen Schockraum-Notfall.\"\nS: \"Herr V., 34 Jahre, nach Sturz aus 3m Höhe mit kritischer, spritzender Oberschenkelblutung rechts.\"\nB: \"Sturz von der Leiter auf Blechkante vor ca. 10 Minuten. Keine Vorerkrankungen bekannt.\"\nA: \"c-Problem: Spritzende Blutung mittels Tourniquet-Anlage am rechten Oberschenkel um 11:45 Uhr erfolgreich gestoppt. Peripherer Puls rechts erloschen. Wunde zusätzlich verpackt. A-B-Probleme: Atemwege frei, Atmung suffizient. D-Problem: Patient ansprechbar, GCS 15, klagt über massive Oberschenkelschmerzen. Immobilisation der HWS eingeleitet. Patient mittels Decke gegen Hypothermie geschützt.\"\nR: \"Ich fordere den Notarzt mit Sonderrechten an. Vorbereitung von großlumigen peripheren Zugängen und Volumen-/Transfusionstherapie bei Eintreffen erforderlich.\"",
  },

  // ============================================================
  // CASE-06: Frau T. – SHT / E-Bike-Sturz
  // ============================================================
  {
    id: "case-06-q1",
    caseId: "case-06",
    question:
      "Welche pathophysiologische Verdachtsdiagnose leitet sich primär aus dem neurologischen Status ab? Grenzen Sie diese von einer rein peripheren Fraktursymptomatik bezüglich der Dringlichkeit (Triage-Kategorie) ab.",
    modelAnswer:
      "Verdachtsdiagnose: Schädel-Hirn-Trauma (SHT) Grad II (mittelschwer) bis Grad III (schwer), kombiniert mit einer dislozierten Unterarmfraktur links (V.a. distale Radiusfraktur). Die Somnolenz, Desorientierung und das parietale Hämatom nach ungebremstem Sturz ohne Helm beweisen eine direkte intrakranielle Beteiligung.\n\nTriage-Klassifikation: Kategorie Rot / Sofort (ESI Level 1-2). Das neurologische Defizit (D-Problem) hat absolute Priorität vor der orthopädischen Extremitätenfraktur. Eine Fraktur ist ein lokales Strukturproblem; ein SHT gefährdet direkt das Atemzentrum und das Überleben durch Hirndrucksteigerung.",
  },
  {
    id: "case-06-q2",
    caseId: "case-06",
    question:
      "Welche gezielten anamnestischen Fremd- oder Eigenangaben (S-Daten) müssen bezüglich des Sturzereignisses erhoben werden (z. B. Amnesie, Übelkeit), um das Schädel-Hirn-Trauma genauer klassifizieren zu können?",
    modelAnswer:
      "Erhebung primär über Rettungsdienst oder Zeugen (da Patientin desorientiert):\n- Amnesie / Bewusstlosigkeit: „Gab es direkt nach dem Aufprall eine Phase der kompletten Bewusstlosigkeit, wenn ja, wie viele Minuten dauerte diese an?“\n- Vegetative Symptome: „Hat sich die Patientin vor Ort erbrochen oder über massive Übelkeit geklagt?“\n- Unfallhergang: „Ist sie primär mit dem Kopf aufgeprallt und gab es ein direktes Monokel-/Brillenhämatom oder Flüssigkeitsaustritt (Liquorrhoe) aus Nase oder Ohren?“",
  },
  {
    id: "case-06-q3",
    caseId: "case-06",
    question:
      "Erklären Sie das methodische Vorgehen beim vollständigen, systematischen traumatologischen Notfallcheck von Kopf bis Fuß (O-Daten). Welche Parameter (Pupillen, GCS, pDMS-Kontrolle) erheben Sie wie, und wie betten Sie die Patientin zwingend bis zum Ausschluss von Sekundärschäden?",
    modelAnswer:
      "Systematischer Notfallcheck von Kopf bis Fuß:\n1. Kopf & Pupillen: Palpation auf Stufenbildung, Inspektion auf Otorrhö/Rhinorrhö. Beurteilung der Pupillen auf Gleichheit (Isokorie) und Lichtreaktion. Eine einseitig erweiterte, träge Pupille (Anisokorie) zeigt eine akute Hirndrucksteigerung an.\n2. Neurologie / GCS: Erhebung der Glasgow Coma Scale (Augenöffnen, verbale Antwort, motorische Reaktion). Somnolenz mit Desorientierung entspricht ca. GCS 10–12.\n3. HWS & Lagerung: Zwingende absolute Immobilisation in Rückenlage mittels Cervicalstütze (Stifneck) und Spineboard/Vakuummatratze, bis eine Fraktur radiologisch ausgeschlossen ist.\n4. Extremitäten (pDMS-Kontrolle): Vor und nach Bewegung der Fraktur links wird der periphere Status erhoben: p = Puls (A. radialis links tastbar?), D = Durchblutung (Rekap-Zeit < 2 Sek.?), M = Motorik (Finger aktiv bewegen?), S = Sensibilität (Berührungen an allen Fingern spürbar?).",
  },
  {
    id: "case-06-q4",
    caseId: "case-06",
    question:
      "Formulieren Sie zwei fallspezifische NANDA-Pflegediagnosen unter Berücksichtigung der neurologischen Beeinträchtigung und der Extremitätenverletzung.",
    modelAnswer:
      "1. Gefahr einer unwirksamen zerebralen Gewebedurchblutung (00201) R/T traumatischem Ödem / intrakranieller Blutung nach Schädel-Hirn-Trauma A/E/B Somnolenz, verlangsamter Reaktion, zeitlicher/örtlicher Desorientierung.\n\n2. Beeinträchtigte Gewebeintegrität (00044) R/T mechanischem Trauma A/E/B struktureller Fehlstellung des linken Unterarms, parietalem Hämatom und Schürfwunden.",
  },
  {
    id: "case-06-q5",
    caseId: "case-06",
    question:
      "Formulieren Sie eine prägnante Übergabe nach dem ISBAR-Schema an den zuständigen Unfallchirurgen/Neurochirurgen.",
    modelAnswer:
      "I: \"Hier spricht Rabia Sirin, Notaufnahme. Ich übergebe Frau T., 28 Jahre, nach E-Bike-Sturz.\"\nS: \"Patientin präsentiert sich mit einem mittelschweren SHT, Somnolenz und klinisch dislozierter Unterarmfraktur links.\"\nB: \"Sturz ohne Helm vor ca. 30 Minuten. Keine anamnestischen Vorerkrankungen eruierbar.\"\nA: \"A-B stabil. C: Hämodynamisch stabil (BD 140/85, Puls 64). D: Neurologisch herabgesetzt, GCS 11. Pupillen sind isokor und prompt lichtreagibel, Patientin ist desorientiert. E: Sichtbare Fehlstellung linker Unterarm, PDMS-Kontrolle ist intakt (Puls tastbar, Rekap 1,5s, Finger beweglich). HWS ist mittels Stifneck immobilisiert.\"\nR: \"Ich fordere die unfallchirurgische und neurochirurgische Akutvisite an. Prioritär ist die Anmeldung für ein Notfall-CCT zum Ausschluss einer intrakraniellen Blutung, gefolgt vom Röntgen des linken Unterarms und Analgetika-Gabe.\"",
  },

  // ============================================================
  // CASE-07: Herr Weber – Erysipel
  // ============================================================
  {
    id: "case-07-q1",
    caseId: "case-07",
    question:
      "Formulieren Sie die pflegerische Arbeitshypothese. Grenzen Sie das Krankheitsbild klinisch (morphologisch und pathophysiologisch) von einer Lymphangitis („Blutvergiftung“ im Volksmund) ab.",
    modelAnswer:
      "Arbeitshypothese: Akutes Erysipel (Wundrose) des rechten Unterschenkels. Bakterielle Infektion der tiefen Dermis (meist durch beta-hämolysierende Streptokokken der Gruppe A). Typisch sind die flammende, scharf begrenzte Rötung, Schwellung (Ödem), lokale Überwärmung sowie systemische Entzündungszeichen (Fieber, Schüttelfrost, Lymphadenopathie inguinal).\n\nAbgrenzung zur Lymphangitis: Die Lymphangitis ist eine bakterielle Entzündung der Lymphbahnen. Sie äußert sich morphologisch durch linear verlaufende, streifenförmige, unregelmäßig begrenzte rote Linien, die von der Wunde herzwärts ziehen. Ein Erysipel hingegen breitet sich flächig und scharf begrenzt im Gewebe aus.",
  },
  {
    id: "case-07-q2",
    caseId: "case-07",
    question:
      "Welche offenen Fragen stellen Sie Herrn Weber im Rahmen der fokussierten Hautanamnese (S-Daten), um Eintrittspforten, Risikofaktoren (z. B. pAVK, Diabetes) und den zeitlichen Verlauf exakt zu erfassen?",
    modelAnswer:
      "1. Eintrittspforten / Barrierefunktion: „Haben Sie neben der Schramme vom Rasenmähen chronische Hautveränderungen am Fuß, wie zum Beispiel einen juckenden Hautpilz zwischen den Zehen (Tinea pedis) oder eingerissene Fersen?“\n2. Zirkulatorische Risikofaktoren: „Liegen bei Ihnen Durchblutungsstörungen der Arterien (pAVK) oder eine chronische Venenschwäche mit Krampfadern oder dicken Beinen (chronisch-venöse Insuffizienz) vor?“\n3. Metabolische Risikofaktoren: „Sind bei Ihnen Stoffwechselerkrankungen wie Diabetes mellitus bekannt und wie ist Ihre aktuelle Blutzuckereinstellung?“",
  },
  {
    id: "case-07-q3",
    caseId: "case-07",
    question:
      "Beschreiben Sie die objektive Befunderhebung der Haut (O-Daten). Welche Inspektionstechniken und klinischen Handlungen (z. B. Markierung) führen Sie durch, wie überprüfen Sie die Lymphknotenstationen und welche Lagerung ordnen Sie pflegetherapeutisch an?",
    modelAnswer:
      "Inspektion & Palpation: Symmetrievergleich beider Beine. Zwingende Maßnahme: Ränder der scharf begrenzten Rötung mit wasserfestem Hautmarkierungsstift dokumentieren (inkl. Datum/Uhrzeit), um die Ausbreitung/Rückgang zu beurteilen.\n\nLymphknoten-Palpation: Sanftes Abtasten der Inguinalregion (Leiste) im Seitenvergleich. Ein schmerzhafter, geschwollener Lymphknoten bestätigt die lymphogene Keimausbreitung.\n\nPflegetherapeutische Lagerung: Strikte Ruhigstellung und Hochlagerung der betroffenen Extremität (fördert Rückfluss, reduziert Ödem/Gewebedruck). Lokale Applikation von kühlen, feuchten Umschlägen. Einreibungen oder Massagen sind absolut kontraindiziert.",
  },
  {
    id: "case-07-q4",
    caseId: "case-07",
    question:
      "Formulieren Sie zwei relevante Pflegediagnosen (NANDA) für Herrn Weber, die sowohl die lokale Gewebeschädigung als auch die systemische Reaktion berücksichtigen.",
    modelAnswer:
      "1. Beeinträchtigte Hautintegrität (00046) R/T bakterieller Invasion der Lederhaut über eine Bagatellverletzung A/E/B flammender, scharf begrenzter Rötung, Schwellung, lokaler Überwärmung und Schmerzen am rechten Unterschenkel.\n\n2. Hyperthermie (00007) R/T systemischer Infektionsreaktion (bakterielle Toxinfreisetzung) A/E/B Körpertemperatur von 38.7°C, Frösteln, Tachykardie und schmerzhafter inguinaler Lymphadenopathie.",
  },
  {
    id: "case-07-q5",
    caseId: "case-07",
    question:
      "Erstellen Sie eine strukturierte ISBAR-Meldung zur Vorstellung des Patienten beim Stationsarzt zwecks antibiotischer und analgetischer Therapieeinleitung.",
    modelAnswer:
      "I: \"Hallo, hier spricht Rabia Sirin aus der Ambulanz. Ich stelle Ihnen Herrn Weber, 65 Jahre, vor.\"\nS: \"Hochgradiger Verdacht auf ein ausgeprägtes Erysipel am rechten Unterschenkel mit starker systemischer Komponente.\"\nB: \"Bagatellverletzung vor 4 Tagen beim Rasenmähen. Rapide Größenzunahme der Rötung seit gestern.\"\nA: \"Objektiv zeigt sich eine flammende, scharf begrenzte Rötung und Ödem des rechten Schienbeinbereiches. Die Ränder wurden markiert. Inguinale Lymphknoten rechts sind deutlich tastbar und druckdolent. Patient hat Fieber mit 38,7 °C, fröstelt. Vitalzeichen: BD 125/80, Puls 92/min.\"\nR: \"Der Patient benötigt eine umgehende ärztliche Verordnung einer hochdosierten, kalkulierten intravenösen Antibiotikatherapie sowie eine antiphlogistische Analgetikatherapie. Ich habe das Bein bereits hochgelagert und gekühlt.\"",
  },

  // ============================================================
  // CASE-08: Frau L. – Dekubitus Grad 3 + IAD
  // ============================================================
  {
    id: "case-08-q1",
    caseId: "case-08",
    question:
      "Identifizieren und differenzieren Sie die zwei parallel vorliegenden Hautpathologien im Sakral- und Gesäßbereich. Klassifizieren Sie die tiefe Wunde nach den offiziellen Stadien/Graden und begründen Sie Ihre Zuordnung klinisch anhand der betroffenen Gewebeschichten.",
    modelAnswer:
      "Entitäten:\n1. Dekubitus Grad 3 (nach EPUAP/NPUAP): Vollständiger Hautverlust bis in die Subkutis (Fettgewebe sichtbar, Muskeln/Knochen liegen nicht frei) mit Slough/Gewebebelag.\n2. Inkontinenz-assoziierte Dermatitis (IAD): Diffuse, rosa-rote, feuchte Veränderung mit Erosionen über beiden Gesäßhälften. Chemisch-irritative Mazeration der Hautbarriere durch permanenten Kontakt mit Stuhl/Urin.",
  },
  {
    id: "case-08-q2",
    caseId: "case-08",
    question:
      "Welche subjektiven Einschränkungen und Schmerzsymptome müssen bei dieser demenziell veränderten Patientin über welche spezifischen alternativen Assessmentmethoden erhoben werden, da eine direkte numerische Schmerzskala (NRS) nicht reliabel ist?",
    modelAnswer:
      "Fremdeinschätzungsinstrumente wie BESD (Beurteilung von Schmerz bei Demenz) / PAINAD müssen eingesetzt werden. Systematische Beobachtung während einer Belastungssituation (z.B. Umlagern). Erfasst werden:\n- Atmung (lautes, angestrengtes Atmen, Schnaufen)\n- Negative Lautäußerungen (Stöhnen, Ächzen, Jammern)\n- Gesichtsausdruck (Grimassieren, Stirnrunzeln)\n- Körpersprache (Abwehrhaltung, Ballen der Fäuste, Rigidität)\n- Trostbedürftigkeit (Nicht beruhigbar).",
  },
  {
    id: "case-08-q3",
    caseId: "case-08",
    question:
      "Beschreiben Sie die kriteriengeleitete objektive Beurteilung (O-Daten) beider Hautveränderungen. Welche Differenzialdiagnose wenden Sie an (z. B. Fingerdrucktest) und wie unterscheiden sich Dekubitus und IAD bezüglich Lokalisation, Symmetrie, Farbe und Wundrand morphologisch?",
    modelAnswer:
      "Fingerdrucktest: Bleibt ein Erythem nach Druck nicht wegdrückbar, liegt ein Dekubitus vor. Ist es wegdrückbar (wird kurz weiß), handelt es sich um eine irritative Rötung (IAD).\n\nMorphologischer Vergleich:\n- Lokalisation: Dekubitus liegt zentriert über Knochenprominenzen (Sakrum); IAD liegt flächig in Hautfalten/Gesäß ohne direkten Knochenbezug.\n- Symmetrie: Dekubitus ist meist asymmetrisch; IAD ist spiegelbildlich/symmetrisch auf beiden Gesäßhälften.\n- Farbe & Rand: Dekubitus Grad 3 zeigt scharf begrenzte Ränder, der Wundgrund ist tief und nekrotisch/fibrinös. IAD zeigt diffus begrenzte Ränder, intensiv glänzende rosa-rote Farbe, flach ohne tiefen Gewebeverlust.",
  },
  {
    id: "case-08-q4",
    caseId: "case-08",
    question:
      "Formulieren Sie zwei prioritäre Pflegediagnosen (NANDA) für Frau L. (eine für die tiefe Läsion, eine für die inkontinenzbedingte Hautschädigung) inklusive vollständiger PES-Struktur.",
    modelAnswer:
      "1. Beeinträchtigte Gewebeintegrität (00044) R/T anhaltendem mechanischem Druck und Scherkräften bei Bettlägerigkeit A/E/B Gewebedefekt bis in die Subkutis im Sakralbereich, Belagbildung (Dekubitus Grad 3).\n\n2. Beeinträchtigte Hautintegrität (00046) R/T permanentem chemisch-irritativem Kontakt mit Exkrementen (Stuhl-/Urininkontinenz) und Mazeration A/E/B diffuser, glänzender Rötung beider Gesäßhälften mit oberflächlichen Erosionen (IAD).",
  },
  {
    id: "case-08-q5",
    caseId: "case-08",
    question:
      "Erstellen Sie einen interdisziplinären Maßnahmenplan nach dem ISBAR-Prinzip zur Koordination mit dem Wundmanagement und dem behandelnden Arzt (Fokus: Kausaltherapie, Lagerung, Hautschutz).",
    modelAnswer:
      "I: \"Guten Tag, hier spricht Rabia Sirin vom Wundteam/Station. Ich melde Frau L., 79 Jahre, Zimmer [X].\"\nS: \"Neuentdeckung eines Dekubitus Grad 3 sakral, überlagert von einer schweren IAD beider Glutaeen.\"\nB: \"Patientin ist bettlägerig, demenzkrank und leidet unter schwerer Doppelinkontinenz.\"\nA: \"Objektiv: Sakraler Gewebedefekt ca. 3x4 cm, Subkutis sichtbar, Fibrinbelag. Flächige IAD mit kutanen Erosionen ringherum. Schmerzassessment via BESD zeigt einen Score von 4/10 beim Lagern.\"\nR: \"1. Kausaltherapie Dekubitus: Freilagerung sakral mittels 30°-Wechsellagerung, Evaluation einer Anti-Dekubitus-Matratze. Arzt-Konsil für hydroaktive Wundauflage nach Debridement. 2. Kausaltherapie IAD: Striktes Inkontinenzmanagement, atmungsaktive Hilfen (keine Folien), Reinigung mit pH-neutralen Lipogelen, Applikation eines Hautschutzfilms (z.B. Cavilon). 3. Analgetika vor Transfers.\"",
  },

  // ============================================================
  // CASE-09: Herr G. – Malignes Melanom
  // ============================================================
  {
    id: "case-09-q1",
    caseId: "case-09",
    question:
      "Welche klinische Verdachtshypothese müssen Sie bei dieser Läsion zwingend formulieren? Ordnen Sie die Hautveränderung begründet in das System der Primär- und Sekundäreffloreszenzen ein.",
    modelAnswer:
      "Verdachtshypothese: Hochgradiger klinischer Verdacht auf ein Malignes Melanom (Schwarzer Hautkrebs) am oberen Rücken.\n\nEffloreszenzenlehre: Der Ausgangsbefund stellt primär eine Makula (Fleck) dar (Farbveränderung im Hautniveau ohne Substanzänderung). Da die Stelle jedoch „leicht erhaben“ ist, hat sie sich sekundär zu einem Plaque oder Nodulus (Knoten) umentwickelt, was ein vertikales Tumorwachstum in die Tiefe und Breite dokumentiert.",
  },
  {
    id: "case-09-q2",
    caseId: "case-09",
    question:
      "Welche berufs- und umweltspezifischen Risikofaktoren (S-Daten) müssen im Anamnesegespräch mit Herrn G. explizit expliziert werden? Formulieren Sie drei offene Fragen zur Dynamik der Veränderung.",
    modelAnswer:
      "Risikoprofil: Als Landschaftsgärtner liegt eine chronische, jahrzehntelange Ganzjahres-UV-Exposition (Sonnenstrahlung) vor, welche der primäre Karzinogenese-Faktor für DNA-Schäden der Melanozyten ist.\n\nDrei offene Fragen:\n1. Größen- und Formveränderung: „Wann genau ist Ihnen oder Ihrer Frau dieser Fleck das erste Mal aufgefallen und hat er sich in den letzten Wochen oder Monaten in seiner Größe oder Form merklich verändert?“\n2. Blutungsneigung: „Ist die Hautstelle beim Abtrocknen nach dem Duschen oder bei Reibung durch Kleidung schon einmal aufgegangen oder hat spontan geblutet?“\n3. Sensibilitätsstörungen: „Können Sie das Missempfinden genauer beschreiben – bleibt es beim gelegentlichen Jucken oder brennt die Stelle zeitweise?“",
  },
  {
    id: "case-09-q3",
    caseId: "case-09",
    question:
      "Erklären Sie die standardisierte ABCDE-Regel zur Beurteilung von melanozytären Hautveränderungen detailliert und wenden Sie jedes einzelne Kriterium direkt auf den vorliegenden Fall von Herrn G. an. Welches zusätzliche klinische Zeichen (z. B. „Ugly Duckling Sign“) ziehen Sie heran?",
    modelAnswer:
      "ABCDE-Regel angewandt auf den Fall:\nA – Asymmetrie: Die Läsion ist asymmetrisch (eine Hälfte gleicht nicht der anderen). Positiv.\nB – Begrenzung: Unregelmäßig, unscharf, ausgefranst. Positiv.\nC – Color (Farbe): Polychrom (hellbraun, tiefschwarz, bläuliche Anteile) – multiple Farbtöne in einer Läsion. Positiv.\nD – Durchmesser: 8 mm. Klinisch bedenklich (Grenzwert > 6 mm). Positiv.\nE – Erhabenheit / Evolution: Palpatorisch erhaben und nach Angabe des Patienten in jüngerer Zeit aufgetreten oder verändert. Positiv.\n\nUgly Duckling Sign: Alle Pigmentmale eines Menschen haben ein individuell ähnliches Erscheinungsbild. Ein Muttermal, das sich morphologisch deutlich von allen anderen abhebt (der „hässliche Entling“), ist als hochverdächtig einzustufen.",
  },
  {
    id: "case-09-q4",
    caseId: "case-09",
    question:
      "Formulieren Sie zwei gesundheitsbezogene Pflegediagnosen (NANDA) für Herrn G., die das Präventionsverhalten und den Informationsbedarf adressieren.",
    modelAnswer:
      "1. Bereitschaft für ein verbessertes Gesundheitsmanagement (00162) bezüglich dermatologischer Prävention R/T geäußertem Wunsch nach Begutachtung einer verdächtigen Hautstelle bei beruflicher UV-Exposition.\n\n2. Wissensdefizit (00126) bezüglich effektivem UV-Eigenschutz und Hautkrebs-Früherkennung R/T mangelnder Aufklärung über berufsbedingte Gesundheitsrisiken A/E/B Arbeiten im Freien ohne dokumentierte Screening-Historie.",
  },
  {
    id: "case-09-q5",
    caseId: "case-09",
    question:
      "Verfassen Sie eine ISBAR-Meldung zur standardisierten Überweisung/Weiterleitung des Befundes an einen Facharzt für Dermatologie.",
    modelAnswer:
      "I: \"Guten Tag, hier spricht Rabia Sirin. Ich wende mich an Sie bezüglich einer dermatologischen Konsilanforderung für Herrn G., 52 Jahre.\"\nS: \"Es liegt ein hochgradig positiver ABCDE-Befund einer pigmentierten Hautläsion am oberen Rücken vor, V.a. Malignes Melanom.\"\nB: \"Der Patient arbeitet seit Jahrzehnten im Freien als Landschaftsgärtner, UV-Exposition ist chronisch erhöht. Bisher kein Hautkrebsscreening erfolgt.\"\nA: \"Objektive Kriterien: Asymmetrischer, unscharf begrenzter Plaque, 8 mm Durchmesser, polychrom (braun/schwarz/blau), tastbar erhaben am oberen Scapulabereich rechts. Subjektiv wird ein intermittierender Pruritus angegeben.\"\nR: \"Ich empfehle die dringliche Überweisung an einen niedergelassenen Dermatologen bzw. die dermatologische Hochschulambulanz zur Durchführung einer Dermatoskopie und zur zeitnahen Durchführung einer Exzisionsbiopsie (R0-Resektion).\"",
  },

  // ============================================================
  // CASE-10: Jan – Appendizitis
  // ============================================================
  {
    id: "case-10-q1",
    caseId: "case-10",
    question:
      "Leiten Sie aus dem klinischen Bild Ihre pflegerische Arbeitshypothese ab. Erklären Sie die pathophysiologische Ursache des charakteristischen Temperatursprunges (rektal vs. axillär) sowie der initialen Schmerzwanderung.",
    modelAnswer:
      "Arbeitshypothese: Akute Appendizitis (Wurmfortsatzentzündung).\n\nPathophysiologie:\n- Schmerzwanderung: Der initiale viszerale Schmerz entsteht durch die Dehnung des Appendixlumens (diffus periumbilikal). Erst mit dem Übergreifen auf das somatisch sensible Peritoneum parietale lokalisiert sich der Schmerz im rechten Unterbauch.\n- Temperatursprung: Ein Unterschied zwischen rektaler und axillärer Körpertemperatur von Delta T >= 0,8–1,0 °C ist ein klassischer Indikator für einen floriden, lokalisierten Entzündungsprozess im kleinen Becken/Abdomen.\n- Schonhaltung: Beugung im Hüftgelenk entlastet den M. psoas major, welcher direkt an den entzündeten Appendix grenzt.",
  },
  {
    id: "case-10-q2",
    caseId: "case-10",
    question:
      "Beschreiben Sie den exakten Ablauf der körperlichen Abdominaluntersuchung (O-Daten). In welcher Reihenfolge wenden Sie die Techniken (Inspektion, Auskultation, Palpation, Perkussion) an, warum ist diese Reihenfolge zwingend einzuhalten und wie überprüfen Sie vier spezifische klinische Appendizitiszeichen konkret am Patienten?",
    modelAnswer:
      "Reihenfolge: 1. Inspektion -> 2. Auskultation -> 3. Perkussion -> 4. Palpation. Zwingender Grund: Palpation und Perkussion manipulieren die Darmschlingen mechanisch und können die Peristaltik künstlich verändern, was die Auskultation verfälscht. Man beginnt immer entfernt vom Schmerzquadranten.\n\nÜberprüfung der vier Appendizitiszeichen:\n- McBurney-Punkt: Druckschmerz auf der Mitte der gedachten Linie zwischen der rechten Spina iliaca anterior superior und dem Bauchnabel.\n- Lanz-Punkt: Druckschmerz auf dem Übergang vom rechten zum mittleren Drittel der Verbindungslinie zwischen beiden oberen Beckenkämmen.\n- Blumberg-Zeichen (Gekreuzter Loslassschmerz): Der Untersucher palpiert langsam und tief den linken Unterbauch und lässt abrupt los. Positiv bei akutem Schmerzeinschlag im rechten Unterbauch.\n- Psoas-Zeichen: Patient versucht in Rückenlage das gestreckte rechte Bein aktiv gegen den manuellen Widerstand des Untersuchers anzuheben. Positiv bei Schmerz im rechten Unterbauch.",
  },
  {
    id: "case-10-q3",
    caseId: "case-10",
    question:
      "Welche offenen Fragen im Rahmen der erweiterten Magen-Darm-Systemanamnese (S-Daten) stellen Sie Jan, um Alarmzeichen („Red Flags“) eines fortgeschrittenen akuten Abdomens (z. B. Perforation) auszuschließen?",
    modelAnswer:
      "Gezielte offene Fragen zum Ausschluss von Komplikationen:\n1. Perforationsschmerz (plötzlicher Abriss): „Haben Sie im Verlauf einen plötzlich einschießenden, extrem vernichtenden Schmerz gespürt, der kurzfristig nachließ und dann in einen dauerhaften, brennenden Ganzbauchschmerz übergegangen ist?“\n2. Darmperistaltik-Stopp: „Wann hatten Sie den letzten Stuhlgang und konnten Sie in den letzten 24 Stunden problemlos Winde abgeben?“\n3. Schock-Symptome: „Fühlen Sie sich schwindelig, zittrig oder haben Sie kalten Schweiß auf der Stirn bemerkt?“",
  },
  {
    id: "case-10-q4",
    caseId: "case-10",
    question:
      "Formulieren Sie zwei prioritäre Pflegediagnosen (NANDA) für Jan in der aktuellen präoperativen Phase inklusive biologischer Ursachen und Leitsymptome.",
    modelAnswer:
      "1. Akuter Schmerz (00132) R/T biologischem Schädigungsfaktor (lokalisierte Entzündung des Peritoneum parietale / Appendix) A/E/B Schmerzwanderung in den rechten Unterbauch, Schmerzscore > 6/10, Schonhaltung beim Gehen.\n\n2. Gefahr eines Flüssigkeitsdefizits (00028) R/T gastrointestinaler Störung (Erbrechen, verminderte orale Aufnahme bei Appetitlosigkeit) und Hyperthermie.",
  },
  {
    id: "case-10-q5",
    caseId: "case-10",
    question:
      "Verfassen Sie die prägnante und zielgerichtete ISBAR-Meldung an den diensthabenden Viszeralchirurgen zur sofortigen Mitbeurteilung.",
    modelAnswer:
      "PI: \"Hallo, hier spricht Rabia Sirin aus der ZNA. Ich melde ein akutes Abdomen zur viszeralchirurgischen Akutvisite.\"\nS: \"Jan, 21 Jahre, präsentiert sich mit hochgradigem Verdacht auf akute Appendizitis.\"\nB: \"Schmerzbeginn gestern periumbilikal, im Verlauf in den rechten Unterbauch gewandert. Einmaliges Erbrechen.\"\nA: \"Hämodynamisch stabil (BD 120/75, Puls 84). Axillär 37,6 °C, rektal 38,5 °C (Delta T=0,9°C). McBurney, Lanz- und Psoas-Zeichen rechts stark positiv. Blumberg-Zeichen positiv. Abdomen weich, keine generalisierte Abwehrspannung. Letzter Stuhlgang heute Morgen, Winde gehen ab.\"\nR: \"Ich empfehle die sofortige chirurgische Visite, Anlage eines venösen Zugangs, Abnahme der laborchemischen Entzündungsparameter (Leukozyten, CRP) sowie die Vorbereitung für eine abdominelle Sonographie.\"",
  },

  // ============================================================
  // CASE-11: Frau K. – Ileus
  // ============================================================
  {
    id: "case-11-q1",
    caseId: "case-11",
    question:
      "Welches lebensbedrohliche Krankheitsbild liegt hier vor? Differenzieren Sie pathophysiologisch und klinisch-auskultatorisch präzise zwischen einem mechanischen und einem paralytischen Verlauf basierend auf der Entstehung und den Darmgeräuschen.",
    modelAnswer:
      "Krankheitsbild: Akuter Ileus (Darmverschluss) mit fortgeschrittenem Miserere (Koterbrechen).\n\nDifferenzierung:\n- Mechanischer Ileus: Physisches Hindernis im Darmlumen (z.B. postoperative Verwachsungen/Briden). Auskultation: Hyperperistaltik / Stenoseperistaltik. Hochgestellte, spritzende, metallisch-klingende Darmgeräusche, da die Muskulatur gegen das Hindernis ankämpft.\n- Paralytischer Ileus: Neurogene oder myogene Lähmung der Darmmotorik (häufig postoperativ-atonisch). Auskultation: Absolutes Fehlen von Darmgeräuschen („Totenstille“).",
  },
  {
    id: "case-11-q2",
    caseId: "case-11",
    question:
      "Welche spezifischen anamnestischen Fragen stellen Sie der Patientin (S-Daten) bezüglich ihrer Stuhlgewohnheiten, Medikation (z. B. Opiate) und der genauen Schmerzcharakteristik, um Hinweise auf die Genese zu erhalten?",
    modelAnswer:
      "Gezielte offene Fragen zur Genese:\n- Schmerzcharakter: „Sind die Bauchschmerzen dauerhaft anhaltend drückend oder treten sie wellenartig-krampfartig (kolikartig) mit kurzen Pausen auf?“\n- Medikation: „Welche Schmerzmedikamente haben Sie nach der Operation erhalten – nehmen Sie stark wirkende Pflaster oder Tabletten wie Opiate (Morphium) ein?“\n- Erbrechen-Dynamik: „Können Sie beschreiben, wann das Erbrechen begonnen hat und ob die Flüssigkeit von Anfang an diese dunkle Farbe und den fäkalen Geruch hatte?“",
  },
  {
    id: "case-11-q3",
    caseId: "case-11",
    question:
      "Erklären Sie die Durchführung der Auskultation, Palpation und Perkussion bei Frau K. Welche spezifischen Phänomene erwarten Sie bei welcher Ileus-Form und welche therapeutischen Verbote/Einschränkungen greifen pflegerisch zwingend?",
    modelAnswer:
      "Befunde: Palpation zeigt prall gespanntes Abdomen. Perkussion zeigt hochgradig tympanitischen Klopfschall über allen Quadranten durch Gasansammlung (Meteorismus). Auskultation zeigt je nach Form Totenstille oder metallische Geräusche.\n\nZwingende Restriktionen: Strikte Nahrungskarenz (Null per os) wegen Aspirations- und Rupturgefahr. KEINE Einläufe oder Laxantien bei mechanischem Ileus, da Peristaltiksteigerung gegen ein mechanisches Hindernis zur Perforation führt. Ausnahme: darmstimulierende Maßnahmen nach ärztlicher Verordnung nur beim rein paralytischen Ileus.",
  },
  {
    id: "case-11-q4",
    caseId: "case-11",
    question:
      "Formulieren Sie zwei prioritäre Pflegediagnosen (NANDA) für Frau K., wobei Sie das Risiko einer pulmonalen Sekundärkomplikation berücksichtigen müssen.",
    modelAnswer:
      "1. Gefahr einer Aspiration (00039) R/T unstillbarem, schwallartigem Koterbrechen (Miserere) bei gastrointestinaler Obstruktion / Passageaufhebung und liegender Position.\n\n2. Akuter Schmerz (00132) R/T mechanischer Dehnung und intramuraler Drucksteigerung der Darmschlingen A/E/B krampfartigen Bauchschmerzen, schmerzhaftem Völlegefühl, gespanntem Abdomen.",
  },
  {
    id: "case-11-q5",
    caseId: "case-11",
    question:
      "Erstellen Sie die dringliche ISBAR-Meldung für das interdisziplinäre Notfallteam zur operativen/konservativen Interventionsplanung.",
    modelAnswer:
      "I: \"Hier spricht Rabia Sirin, Station Chirurgie. Ich melde einen akuten viszeralchirurgischen Notfall.\"\nS: \"Frau K., 72 Jahre, entwickelt am 5. postoperativen Tag das klinische Bild eines manifesten Ileus mit Koterbrechen.\"\nB: \"Zustand nach gynäkologischer Laparotomie. Seit 36 Stunden kompletter Stopp von Stuhl und Wind.\"\nA: \"Abdomen massiv meteoristisch aufgetrieben, tympanitischer Klopfschall. Auskultation zeigt hochgestellte, metallisch-klingende Geräusche (V.a. mechanischen Ileus durch Briden). Patientin erbricht aktuell fäkal. Vitalzeichen: BD 110/70, Puls 102 (Tachykardie), afebril.\"\nR: \"Ich fordere die sofortige chirurgische Evaluation zur OP-Indikation. Ich habe die Patientin komplett nüchtern gesetzt, den Oberkörper hochgelagert und benötige die Verordnung für die sofortige Anlage einer entlastenden Magensonde sowie für parenterale Flüssigkeits- und Elektrolytsubstitution.\"",
  },

  // ============================================================
  // CASE-12: Herr D. – Leberzirrhose / Ikterus
  // ============================================================
  {
    id: "case-12-q1",
    caseId: "case-12",
    question:
      "Nennen Sie die zugrundeliegende pathophysiologische Hauptdiagnose sowie die spezifischen Komplikationen. Erklären Sie den biologischen Entstehungsmechanismus des Ikterus (Bilirubinabbauweg) sowie der Farbveränderungen von Stuhl und Urin bei diesem Krankheitsbild.",
    modelAnswer:
      "Hauptdiagnose: Dekompensierte Leberzirrhose mit Aszites, Caput medusae und schmerzlosem intrahepatischem Ikterus.\n\nBilirubinmechanismus: Beim Erythrozytenabbau entsteht indirektes Bilirubin, das zur Leber transportiert wird. In der Zirrhoseleber ist die Konjugation zu direktem Bilirubin gestört bzw. der Abfluss blockiert. Bilirubin kumuliert im Blut (Hyperbilirubinämie) und diffundiert ins Gewebe (Gelbfärbung).\n- Entfärbter Stuhl (acholisch): Es fehlt das Abbauprodukt Sterkobilin im Kolon, das die braune Farbe verleiht.\n- Bierbrauner Urin: Wasserlösliches Bilirubin wird kompensatorisch über die Nieren als Urobilin ausgeschieden.",
  },
  {
    id: "case-12-q2",
    caseId: "case-12",
    question:
      "Welche neuro-psychiatrischen Alarmzeichen („Red Flags“) müssen bei Herrn D. im Anamnesegespräch gezielt geprüft werden, um eine beginnende hepatische Enzephalopathie rechtzeitig zu erkennen?",
    modelAnswer:
      "Screening auf Hepatische Enzephalopathie (HE) infolge mangelnder Ammoniak-Entgiftung:\n- Bewusstseinslage / Vigilanz: Prüfung auf ausgeprägte Verlangsamung, Schlaf-Wach-Rhythmus-Umkehr (nächtliche Unruhe, tagsüber Apathie/Somnolenz).\n- Kognition: Orientierung zu Person, Ort und Zeit testen; Schreibproben durchführen lassen.\n- Neuromuskulär: Überprüfung des Flapping Tremor (Asterixis) via Überstrecken der Hände dorsal. Ein flügelartiges Absinken bestätigt HE Stadium I-II.",
  },
  {
    id: "case-12-q3",
    caseId: "case-12",
    question:
      "Beschreiben Sie die objektive körperliche Untersuchung (O-Daten). Welche klassischen „Leberhautzeichen“ inspizieren Sie von den Händen bis zum Gesicht, wie führen Sie die Perkussion und Lagerung zum klinischen Nachweis von freier Flüssigkeit im Abdomen (Aszites) durch und wie funktioniert die „Kratzauskultation“ der Lebergrenzen?",
    modelAnswer:
      "Leberhautzeichen: Palmarerythem, Weißnägel, Spider-Naevi, glatte Lackzunge, Bauchglatze (Verlust der Sekundärbehaarung) und Caput medusae.\n\nAszites-Nachweis (Shifting Dullness): Mittig zeigt sich tympanitischer Klopfschall, in den Flanken gedämpfter Schenkelschall. Bei Seitenlage verlagert sich die Dämpfungsgrenze nach unten, während die Darmschlingen nach oben steigen.\n\nKratzauskultation der Leber: Stethoskop epigastrisch fixieren. Mit dem Fingernagel parallel zum Rippenbogen von kranial nach kaudal kratzen. Beim Erreichen der soliden Lebergrenze wird das Geräusch schlagartig laut (Bestimmung der Lebergröße).",
  },
  {
    id: "case-12-q4",
    caseId: "case-12",
    question:
      "Formulieren Sie zwei relevante, komplexe Pflegediagnosen (NANDA) für Herrn D., die sowohl den Flüssigkeitsstatus als auch das neurologische Risiko erfassen.",
    modelAnswer:
      "1. Flüssigkeitsüberschuss (00026) R/T portalem Hochdruck, vermindertem kolloidosmotischem Druck (Hypalbuminämie) und renaler Natrium-Wasser-Retention A/E/B massivem Aszites, prall vorgewölbtem Abdomen, Caput medusae.\n\n2. Gefahr einer akuten Verwirrtheit (00173) oder Risiko einer hepatischen Enzephalopathie R/T Akkumulation neurotoxischer Substanzen (Ammoniak) bei hepatozellulärer Insuffizienz.",
  },
  {
    id: "case-12-q5",
    caseId: "case-12",
    question:
      "Formulieren Sie die ISBAR-Übergabe an den Stationsarzt unter Hervorhebung der klinischen Komplikationen (Aszites, Enzephalopathie-Risiko).",
    modelAnswer:
      "I: \"Hallo, hier spricht Rabia Sirin von Station. Ich stelle Ihnen Herrn D., 55 Jahre, mit dekompensierter Leberzirrhose vor.\"\nS: \"Patient präsentiert sich mit ausgeprägtem schmerzlosen Ikterus, massivem Aszites und beginnenden neuro-psychiatrischen Defiziten.\"\nB: \"Chronischer Äthylismus bekannt. Akute Verschlechterung der Vigilanz (Apathie) seit heute.\"\nA: \"Objektiv: Skleren- und Hautikterus vorhanden. Abdomen prall ausladend, Shifting Dullness positiv. Caput medusae und Spider-Naevi sichtbar. Stuhl acholisch, Urin bierbraun. Neurologisch: Patient ist apathisch, verlangsamt, leichter Asterixis auslösbar (V.a. HE Stadium I).\"\nR: \"Ich empfehle die sofortige laborchemische Bestimmung des Ammoniakspiegels, der Transaminasen und des Gerinnungsstatus (INR/Quick). Pflegerisch leiten wir ein striktes Flüssigkeitsbilanzierungs-Protokoll ein. Bitte um Verordnung von Lactulose-Sirup oral zur Ammoniakelimination.\"",
  },

  // ============================================================
  // CASE-13: Herr Nan – pAVK Stadium IIb
  // ============================================================
  {
    id: "case-13-q1",
    caseId: "case-13",
    question:
      "Erklären Sie die genaue klinische Durchführung und Interpretation zweier spezifischer angiologischer Funktionstests aus der Vorlesung: der Ratschow-Lagerungsprobe und der Berechnung des Knöchel-Arm-Index (ABI). Welche Werte/Zeiten bestätigen Ihre Verdachtsdiagnose?",
    modelAnswer:
      "1. Ratschow-Lagerungsprobe: Patient liegt in Rückenlage, hebt beide Beine im 90°-Winkel an und führt über 2 Minuten Fußbewegungen (Beugen/Strecken) durch. Danach setzt er sich zügig an die Bettkante und lässt die Beine herabhängen. Interpretation: Eine verzögerte reaktive Rötung > 15 Sekunden (physiologisch < 10s), anhaltende ischämische Blässe oder vorzeitiger Schmerz bestätigen eine manifeste arterielle Durchblutungsstörung.\n2. Knöchel-Arm-Index (ABI): Systolischer Blutdruck wird mittels Doppler-Sonde vergleichend an beiden Oberarmen (A. brachialis) und an beiden Knöcheln (A. tibialis posterior/dorsalis pedis) gemessen. Berechnung: ABI = systolischer Blutdruck Knöchel / systolischer Blutdruck Arm. Interpretation: Normalwert > 0,9. Ein Wert zwischen 0,5 und 0,75 bestätigt eine mittelschwere pAVK (passend zu Stadium IIb, Gehstrecke < 200m).",
  },
  {
    id: "case-13-q2",
    caseId: "case-13",
    question:
      "Klassifizieren Sie die pAVK von Herrn Nan exakt nach den klinischen Stadien gemäß Fontaine. Begründen Sie Ihre Zuordnung anhand der Gehstrecke und grenzen Sie das Stadium III und IV pathophysiologisch ab.",
    modelAnswer:
      "Klassifikation: Periphere arterielle Verschlusskrankheit (pAVK) der unteren Extremitäten, Stadium IIb nach Fontaine.\n\nBegründung: Stadium II definiert die 'Claudicatio intermittens' (Schaufensterkrankheit) mit belastungsabhängigem ischämischem Muskelschmerz. Die Unterteilung richtet sich nach der schmerzfreien Gehstrecke: Stadium IIa entspricht einer Gehstrecke > 200 m, Stadium IIb einer schmerzfreien Gehstrecke < 200 m (Herr Nan muss nach 80-100 m stoppen).\n\nPathophysiologische Abgrenzung:\n- Stadium III (Ruheschmerz): Der kritische Perfusionsdruck reicht selbst in Ruhe nicht mehr aus, um das Gewebe mit Sauerstoff zu versorgen; Schmerzen treten permanent auf, v. a. nachts horizontal im Liegen (Zehen/Ferse).\n- Stadium IV (Trophische Defekte): Ischämische Gewebsnekrose, Ausbildung von Ulzera oder Gangrän durch kompletten Sauerstoffmangel.",
  },
  {
    id: "case-13-q3",
    caseId: "case-13",
    question:
      "Welche offenen Fragen zur symptomfokussierten Anamnese (S-Daten) stellen Sie Herrn Nan, um das Vorliegen von Ruheschmerzen (insbesondere nachts in horizontaler Lage) sowie das Schmerzverhalten zu explizieren?",
    modelAnswer:
      "Offene Fragen zur Schmerzdynamik und Schlafeinfluss:\n1. Schmerz im Liegen / Schlaf: „Wachen Sie nachts im Bett auf, weil Ihre Zehen oder Ihre Fußsohle stark brennen oder schmerzen, und was tun Sie in diesem Moment, um den Schmerz zu lindern?“\n2. Modifizierende Faktoren (Schwerkraft): „Führt das Herabhängenlassen des Beines aus dem Bett oder das Aufstehen zu einer schnellen Schmerzlinderung?“\n3. Lokalisation: „Tritt der Krampf ausschließlich in der rechten Wade auf oder spüren Sie den Schmerz auch im Bereich des Gesäßes oder Oberschenkels?“",
  },
  {
    id: "case-13-q4",
    caseId: "case-13",
    question:
      "Formulieren Sie zwei prioritäre, vaskulär bezogene Pflegediagnosen (NANDA) für Herrn Nan inklusive relevanter biologischer Ätiologien und Symptome.",
    modelAnswer:
      "1. Unwirksame periphere Gewebedurchblutung (00204) R/T biologischem Faktor (Arteriosklerose, arterielle Lumeneinengung durch Tabakabusus) A/E/B Claudicatio intermittens bei < 100 m, Wadenkrämpfen, kühler, blasser und haarloser Haut der rechten Extremität.\n\n2. Aktivitätsintoleranz (00092) R/T Ungleichgewicht zwischen Sauerstoffangebot und -nachfrage (ischämischer Muskelschmerz bei Belastung) A/E/B Zwangsstopps (Schaufensterphänomen) nach einer Gehstrecke von 80 Metern.",
  },
  {
    id: "case-13-q5",
    caseId: "case-13",
    question:
      "Erstellen Sie die ISBAR-Meldung zur Präsentation des Patienten beim betreuenden Angiologen zwecks interventioneller Therapieplanung.",
    modelAnswer:
      "I (Identifikation): „Guten Tag, hier spricht Rabia Sirin aus der Gefäßambulanz. Ich stelle Ihnen Herrn N., 68 Jahre, vor.“\nS (Situation): „Klinischer Verdacht auf eine fortschreitende pAVK Stadium IIb der rechten unteren Extremität.“\nB (Hintergrund): „Patient ist starker Nikotinabusiker. Schmerzfreie Gehstrecke beträgt aktuell unter 100 Metern.“\nA (Assessment): „Objektiv: Rechter Fuß blass, kühl, haarlos, keine Ödeme. Fußpulse (A. dorsalis pedis und A. tibialis posterior) rechts im Seitenvergleich stark abgeschwächt. Ratschow-Lagerungsprobe zeigt eine reaktive Rötungsverzögerung von 22 Sekunden rechts mit ischämischem Wadenkrampf. Der berechnete Knöchel-Arm-Index (ABI) beträgt rechts 0,62 (mittelschwere pAVK).“\nR (Recommendation): „Ich empfehle die zeitnahe Durchführung einer Farbduplexsonographie oder Angiographie (DSA/MRT) zur Lokalisation der Stenose sowie die Initiierung eines strukturierten Gehtrainings und die medikamentöse Sekundärprophylaxe (Thrombozytenaggregationshemmer / Statine).“",
  },

  // ============================================================
  // CASE-14: Frau Gözleme – TVT / Lungenembolie
  // ============================================================
  {
    id: "case-14-q1",
    caseId: "case-14",
    question:
      "Welches standardisierte klinische Score-System (z. B. Wells-Score) wenden Sie zur Einschätzung der Wahrscheinlichkeit einer Lungenembolie an? Nennen Sie mindestens vier Kriterien direkt aus dem Fallbeispiel, die den Score erhöhen.",
    modelAnswer:
      "Score-System: Wells-Score für Lungenembolie.\n\nErhöhende Kriterien direkt aus dem Fallbeispiel:\n1. Klinische Zeichen einer TVT vorhanden (einseitige Unterschenkelschwellung, lokale Zyanose, Druckschmerz tiefe Venenbahn) -> +3 Punkte.\n2. Andere Diagnosen als eine Lungenembolie sind unwahrscheinlich (akuter thorakaler Schmerz + plötzliche Dyspnoe post-OP bei bestehender TVT-Symptomatik) -> +3 Punkte.\n3. Immobilisation oder chirurgischer Eingriff vor weniger als 4 Wochen (große abdominale OP vor genau 2 Wochen) -> +1,5 Punkte.\n4. Malignom / Aktive Tumorerkrankung (Zustand nach abdominaler Tumorchirurgie) -> +1 Punkt.\n\nAuswertung: Ein Gesamt-Score von 8,5 Punkten liegt weit über dem kritischen Grenzwert (> 6 Punkte) und dokumentiert eine hohe klinische Wahrscheinlichkeit für eine Lungenembolie.",
  },
  {
    id: "case-14-q2",
    caseId: "case-14",
    question:
      "Welche unmittelbaren pflegerischen Erstinterventionsmaßnahmen müssen bei Frau G. bezüglich Lagerung, Aktivitätsgrad und Sauerstoffzufuhr getroffen werden, um eine Progression der Embolie zu verhindern? Welche Untersuchungstechniken (pDMS, Vitalparameter) führen Sie sofort durch?",
    modelAnswer:
      "Sofortmaßnahmen zur Lebensrettung:\n1. Absolute Ruhigstellung / Bettruhe (Striktestes Bewegungsverbot): Patientin darf sich nicht physisch belasten oder aufstehen. Jede Muskelkontraktion (Muskelpumpe) kann weitere Thrombusanteile ablösen und eine rezidivierende, tödliche Embolie auslösen.\n2. Oberkörperhochlagern (Herz-Lungen-Entlastung): Erleichtert die Atemmechanik und senkt den venösen Rückfluss zum überlasteten rechten Herzen.\n3. Sauerstoff-Therapie: Sofortige Applikation von hochdosiertem Sauerstoff (6–10 l/min) via Maske zur Kompensation der pulmonalen Diffusionsstörung.\n4. Vitalparameter-Akutdiagnostik & pDMS: Kontinuierliche Messung von BD, Puls, AF und SpO2 zum Ausschluss eines Rechtsherzschocks (Tachypnoe, Tachykardie, Hypotonie). Sofortige pDMS-Kontrolle der betroffenen linken Extremität zur Verlaufsdokumentation.",
  },

  // ============================================================
  // CASE-15: Frau Lahmacun – Herzauskultation / EKG
  // ============================================================
  {
    id: "case-15-q1",
    caseId: "case-15",
    question:
      "Identifizieren und benennen Sie zwei voneinander unabhängige klinische Verdachtsdiagnosen (einen strukturellen Klappenfehler und eine elektrophysiologische Rhythmusstörung) basierend auf den Auskultations- und EKG-Befunden.",
    modelAnswer:
      "1. Strukturklappenfehler: Hochgradige Aortenklappenstenose (AS). Das raue, spindelförmige Systolikum mit dem Punctum maximum über dem Aortenareal (2. ICR rechts) und der charakteristischen Fortleitung in die Karotiden ist der pathognomonische Auskultationsbefund für eine verengte Aortenklappe. Erklärt auch Belastungsdyspnoe und Schwindel (zerebrale Minderperfusion).\n\n2. Elektrophysiologische Rhythmusstörung: Tachykardes Vorhofflimmern (VHF). Das vollständige Fehlen von P-Wellen (chaotische Vorhoferregung), das Vorhandensein von feinen Flimmerwellen sowie die absolute Arrhythmie der Kammern (unregelmäßige QRS-Abstände bei 115/min) dokumentieren die klassische tachykarde Arrhythmia absoluta.",
  },
  {
    id: "case-15-q2",
    caseId: "case-15",
    question:
      "Beschreiben Sie das methodische Vorgehen bei der systematischen Herzauskultation. In welcher Reihenfolge steuern Sie die fünf klassischen Auskultationspunkte an (Leitmerksatz) und wo genau befinden sich diese anatomisch am Thorax?",
    modelAnswer:
      "Ablauf: Start zwingend am Erb-Punkt (3. ICR links parasternal) als zentraler Referenzpunkt für eine orientierende Gesamtbeurteilung. Danach systematische Überprüfung entlang des Blutstroms mittels Leitspruch: „Anton Pulmonalis Trinkt Milch Um Viertel Nach Fünf“:\n1. A = Aortenklappe: 2. Interkostalraum (ICR) rechts, direkt am Sternalrand.\n2. P = Pulmonalklappe: 2. Interkostalraum (ICR) links, direkt am Sternalrand.\n3. E = Erb-Punkt: 3. Interkostalraum (ICR) links, parasternal.\n4. T = Trikuspidalklappe: 4. Interkostalraum (ICR) rechts (oder links), am Sternalrand.\n5. M = Mitralklappe: 5. Interkostalraum (ICR) links, in der Medioklavikularlinie (MCL) auf Höhe der Herzspitze.",
  },
  {
    id: "case-15-q3",
    caseId: "case-15",
    question:
      "Erklären Sie die exakte anatomische Platzierung aller sechs Brustwandelektroden (C1 bis C6) nach dem internationalen IEC-Standard für das 12-Kanal-EKG inklusive der jeweiligen Farbcodierung. Welche Vorbereitungsschritte und Fehlerquellen müssen pflegerisch beachtet werden?",
    modelAnswer:
      "Exakte Platzierung und Farbcodierung (IEC):\n- C1 (Rot): 4. Interkostalraum (ICR) rechts direkt am Sternalrand.\n- C2 (Gelb): 4. Interkostalraum (ICR) links direkt am Sternalrand.\n- C4 (Braun): 5. Interkostalraum (ICR) links auf der Medioklavikularlinie (MCL) (wird vor C3 geklebt!).\n- C3 (Grün): Exakt mittig auf der Verbindungslinie zwischen Elektrode C2 und C4.\n- C5 (Schwarz): Vordere Axillarlinie (VAL), exakt auf horizontaler Höhe von Elektrode C4.\n- C6 (Violett): Mittlere Axillarlinie (MAL), exakt auf horizontaler Höhe von Elektrode C4 und C5.\n\nVorbereitung & Fehlerquellen: Patient muss vor Messung 5 Minuten entspannt ruhen. Bei starker Behaarung ist eine Rasur zwingend erforderlich. Haut entfetten. Fehlerquellen/Artefakte: Muskelzittern durch Frieren oder Anspannung, lose Kontakte, verpolte Kabel, oder elektromagnetische Störfelder (z. B. Smartphone in Patientennähe).",
  },
  {
    id: "case-15-q4",
    caseId: "case-15",
    question:
      "Formulieren Sie zwei relevante Pflegediagnosen (NANDA) für Frau Lahmacun, die das verminderte Herzzeitvolumen und die Gewebedurchblutung berücksichtigen.",
    modelAnswer:
      "1. Vermindertes Herzzeitvolumen (00029) R/T veränderter Herzfrequenz / elektrophysiologischem Chaos (tachykardes Vorhofflimmern) und mechanischem Auswurfwiderstand (Aortenklappenstenose) A/E/B Belastungsdyspnoe, unregelmäßiger Kammerfrequenz von 115/min, Schwindelgefühl.\n\n2. Aktivitätsintoleranz (00092) R/T mangelnder Auswurfleistung des linken Ventrikels bei stenosierter Klappe und arrhythmiebedingter Verkürzung der Diastole (mangelnde Koronardurchblutung) A/E/B chronischer Erschöpfung, Atemnot bei geringer Belastung.",
  },
  {
    id: "case-15-q5",
    caseId: "case-15",
    question:
      "Verfassen Sie die strukturierte ISBAR-Übergabe für den Kardiologen zur Vereinbarung der weiteren therapeutischen Maßnahmen (z. B. Echokardiographie, Frequenzkontrolle / Antikoagulation).",
    modelAnswer:
      "I (Identifikation): „Guten Tag, hier spricht Rabia Sirin von Station. Ich rufe wegen Frau L., 74 Jahre, an.“\nS (Situation): „Die Patientin zeigt Anzeichen einer dekompensierten Aortenklappenstenose kombiniert mit einem neu aufgetretenen, tachykarden Vorhofflimmern.“\nB (Hintergrund): „Vorstellung wegen zunehmender Belastungsdyspnoe und Schwindelattacken.“\nA (Assessment): „Herzauskultation zeigt ein lautes, raues systolisches Geräusch im 2. ICR rechts mit Fortleitung in die Karotiden (P.m. Aortenareal). Das 12-Kanal-EKG dokumentiert eine absolute Arrhythmie der Kammern bei einer Frequenz von 115/min, Flimmerwellen und ein komplettes Fehlen von P-Wellen. Vitalzeichen: BD 135/85 mmHg, SpO2 94% bei Raumluft, Patientin ist aktuell beschwerdefrei in Ruhe.“\nR (Recommendation): „Ich empfehle eine zeitnahe kardiologische Konsiliaruntersuchung inklusive transthorakaler Echokardiographie zur Graduierung der Aortenstenose. Zudem benötigen wir eine ärztliche Verordnung zur medikamentösen Frequenzkontrolle (z. B. Beta-Blocker) sowie die Initiierung einer therapeutischen Antikoagulation (Schlaganfallprophylaxe bei VHF) und die Bestimmung der Herzenzyme (Troponin) und Elektrolyte.“",
  },

  // ============================================================
  // CASE-16: Frau Menemen – Nierenkolik
  // ============================================================
  {
    id: "case-16-q1",
    caseId: "case-16",
    question:
      "Welche pathophysiologische Verdachtsdiagnose liegt hier vor? Erklären Sie das typische Schmerzmuster, die Entstehung der Hämaturie sowie die zwei schwerwiegenden klinischen Gefahren (Komplikationen), die bei diesem Krankheitsbild drohen.",
    modelAnswer:
      "Verdachtsdiagnose: Akute Nierenkolik / Ureterolithiasis (Nierenstein im Harnleiter) rechts.\n\nPathophysiologie des Schmerzes & Hämaturie: Die wellenartigen Koliken entstehen durch die krampfartige Peristaltik der glatten Muskulatur des Harnleiters, die versucht, den festsitzenden Stein vorwärts zu bewegen. Die Schmerzwanderung von der Flanke bis in das Genitaltrakt folgt dem anatomischen Verlauf des Harnleiters bei der Steinwanderung. Die Makrohämaturie resultiert aus der direkten mechanischen Reizung und Mikrotraumatisierung der empfindlichen Urothel-Schleimhaut durch die scharfen Kanten des Steins.\n\nGefahren / Komplikationen:\n1. Hydronephrose (Nierenstauung): Der Stein verlegt das Lumen komplett, Urin staut sich bis in das Nierenbecken zurück, was zu irreversiblem Parenchymschaden führt.\n2. Urosepsis: Durch den Harnstau können Bakterien aszendieren und eine lebensgefährliche systemische Blutvergiftung auslösen.",
  },

  // ============================================================
  // CASE-17: Frau Jalapeno – Extrauteringravidität
  // ============================================================
  {
    id: "case-17-q1",
    caseId: "case-17",
    question:
      "Welche lebensbedrohliche gynäkologische Verdachtshypothese müssen Sie formulieren? Bewerten Sie die erhobenen Vitalzeichen im Sinne der Triage (Red/Vital Flags) und beschreiben Sie das unmittelbare pflegerische Notfallmanagement.",
    modelAnswer:
      "Verdachtsdiagnose: Rupturierte Extrauteringravidität (Eileiterschwangerschaft) links mit akutem intraabdominellem hämorrhagischen Schock.\n\nBewertung der Triage-Parameter (Vital Flags): Es liegt eine akute Lebensgefahr vor (Triage-Kategorie Rot / Sofortiger Handlungsbedarf). Die Kombination aus plötzlichem Unterbauchschmerz, überfälliger Menses, Tachykardie (Puls > 100/min), Hypotonie (RR < 100 mmHg) und Kaltschweißigkeit beweist einen massiven inneren Blutverlust (hämorrhagischer Schock) nach Tubenruptur.\n\nNotfallmanagement:\n1. Unverzügliche Alarmierung des Notarztteams / Dienstarztes (Notruf 144 bzw. hausinterner Reanimationsruf).\n2. Absolute Bettruhe, flache Rückenlage und sofortige Bereitstellung/Verabreichung von hochdosiertem Sauerstoff via Maske.\n3. Vorbereitung für die sofortige Anlage von mindestens zwei großlumigen peripheren Venenzugängen zur aggressiven Volumensubstitution und Vorbereitung der operativen Notfall-Laparotomie.",
  },

  // ============================================================
  // CASE-18: Herr Obst – STEMI
  // ============================================================
  {
    id: "case-18-q1",
    caseId: "case-18",
    question:
      "Klassifizieren Sie das vorliegende kardiovaskuläre Ereignis exakt. Erklären Sie die zugrundeliegende Pathophysiologie, die Bedeutung des Ausspruchs 'Zeit ist Muskel' und begründen Sie, warum Diabetiker bei diesem Krankheitsbild eine besondere Risikogruppe für atypische Verläufe darstellen.",
    modelAnswer:
      "Klassifikation: Akuter ST-Hebungs-Myokardinfarkt (STEMI) der Vorderwand.\n\nPathophysiologie: Durch einen akuten, kompletten Verschluss einer Herzkranzarterie (meist infolge eines Plaqueeinrisses mit thrombotischer Auflagerung) wird ein Myokardareal vollständig von der Sauerstoffzufuhr abgeschnitten. Dies führt zur Ischämie und nachfolgend zum Absterben der betroffenen Herzmuskelzellen (Nekrose).\n\nBedeutung von 'Zeit ist Muskel': Je länger das Gefäß verschlossen bleibt, desto mehr Herzmuskelgewebe stirbt irreversibel ab. Eine sofortige Wiedereröffnung im Herzkatheterlabor (Koronarangiographie mit Stent) innerhalb der ersten Goldenen Stunde entscheidet maßgeblich über das Überleben und die verbleibende Herzleistung.\n\nBesonderheit bei Diabetikern: Durch die chronische hyperglykämische Schädigung des autonomen Nervensystems (autonome diabetische Neuropathie) ist die Schmerzwahrnehmung massiv gestört. Diabetiker erleiden häufig einen sogenannten 'stummen Infarkt' ohne typische Brustschmerzen, welcher sich nur durch unspezifische Symptome wie plötzliche Luftnot oder unerklärliche Müdigkeit äußert, was die Diagnose gefährlich verzögert.",
  },

  // ============================================================
  // CASE-19: Murphy-Zeichen – Cholezystitis
  // ============================================================
  {
    id: "case-19-q1",
    caseId: "case-19",
    question:
      "Beschreiben Sie die exakte manuelle Durchführung des Murphy-Zeichens am Patienten. Welche spezifische Reaktion des Patienten definiert einen positiven Befund und wie unterscheidet sich der Schmerzcharakter einer Cholezystitis grundlegend von dem einer Nierenkolik?",
    modelAnswer:
      "Durchführung des Murphy-Zeichens: Der Patient befindet sich in entspannter Rückenlage. Der Pflegende/Untersucher platziert die Fingerkuppen der tastenden Hand medial der Medioklavikularlinie (MCL) direkt unterhalb des rechten Rippenbogens (über der anatomischen Lage der Gallenblase). Der Patient wird nun aufgefordert, maximal tief einzuatmen, wodurch das Zwerchfell die Leber und die Gallenblase nach kaudal gegen die tastenden Finger drückt.\n\nPositiver Befund: Sobald die entzündete Gallenblase die Finger des Untersuchers berührt, bricht der Patient die Einatmung schmerzbedingt abrupt ab (reflektorischer Atemstopp).\n\nUnterschied im Schmerzcharakter:\n- Akute Cholezystitis: Lokalisierter, anhaltender, dumpfer bis stechender Entzündungsschmerz im rechten Oberbauch, der häufig in die rechte Schulter ausstrahlt und eine lokale Abwehrspannung zeigt.\n- Nierenkolik: Wellenartig an- und abschwellende (kolikartige), extrem heftige Schmerzen, die dynamisch von der Flanke in Richtung Genitaltrakt wandern; das Abdomen ist dabei meist weich und nicht druckempfindlich.",
  },

  // ============================================================
  // CASE-20: Frau Biber – Intertrigo / Candidose
  // ============================================================
  {
    id: "case-20-q1",
    caseId: "case-20",
    question:
      "Formulieren Sie die pflegerische Arbeitshypothese. Erklären Sie die Pathophysiologie dieser Erkrankung unter Einbezug der spezifischen Risikofaktoren der Patientin und nennen Sie vier pflegetherapeutische Maßnahmen zur kausalen Behandlung.",
    modelAnswer:
      "Arbeitshypothese: Intertrigo (entzündliche Hauterkrankung der Hautfalten), sekundär kompliziert durch eine kutane Candida-Pilzinfektion (Intertriginöse Candidose).\n\nPathophysiologie & Risikofaktoren: Durch das Aneinanderreiben von Haut-auf-Haut in der Falte entsteht mechanische Reibung. In Kombination mit lokalem Schweiß (Feuchtigkeit) und Körperwärme kommt es zur Quellung und Schädigung der Hornschicht (Mazeration), wodurch die epidermale Barrierefunktion zerstört wird. Dies bietet Hefepilzen (Candida albicans) einen idealen Nährboden. Die Adipositas (vergrößerte Hautfalten/Reibung) und der Diabetes mellitus (erhöhter Glukosegehalt im Gewebe fördert das Pilzwachstum) wirken als massive pathophysiologische Treiber.\n\nPflegetherapeutische Maßnahmen:\n1. Hautpflege & Trockenhaltung: Nach dem Waschen mit pH-neutralen Syndets die Hautfalten extrem gründlich trockentupfen (nicht reiben!).\n2. Feuchtigkeitsmanagement: Einlegen von weichen, atmungsaktiven Kompressen oder Baumwolltüchern in die Hautfalten.\n3. Antimykotische Therapie: Konsequente Applikation der ärztlich verordneten topischen Antipilzsalbe oder -creme.\n4. Druck- und Reibungsentlastung durch das Tragen von gut sitzender, atmungsaktiver Baumwollunterwäsche (Vermeidung von Synthetik).",
  },

  // ============================================================
  // CASE-21: Jugularvenenstauung / ZVD
  // ============================================================
  {
    id: "case-21-q1",
    caseId: "case-21",
    question:
      "Beschreiben Sie die exakte Vorgehensweise und die korrekte Positionierung/Lagerung des Patienten für die Beurteilung der Jugularvenenstauung. Welche anatomischen Befunde gelten als physiologisch normal und ab welchem Punkt liegt ein pathologischer Wert vor?",
    modelAnswer:
      "Vorgehensweise und Lagerung: Der Patient wird in eine entspannte Rückenlage gebracht, bei der der Oberkörper exakt in einem 35- bis 45-Grad-Winkel mittels Kopfteil hochgestellt wird. Der Kopf wird leicht zur kontralateralen (gegenüberliegenden) Seite gedreht, um die Halsregion optimal freizulegen.\n\nPhysiologischer Normalbefund: Unter normalen Druckverhältnissen im rechten Vorhof muss die Vena jugularis am Jugulum (oberhalb des Schlüsselbeins) in dieser 45°-Lage vollständig kollabiert bzw. nicht mehr sichtbar gestaut sein. Dies entspricht einem normalen Druck von ca. 8 cm Wassersäule bzw. 5–6 mmHg vor dem rechten Vorhof.\n\nPathologischer Befund: Ist die Jugularvene in der 45°-Oberkörperhochlage weiterhin deutlich sichtbar über das Jugulum hinaus gestaut oder pulsierend tastbar, liegt eine pathologische Jugularvenenstauung vor. Dies beweist einen erhöhten zentralen Venendruck (ZVD), wie er typisch für eine dekompensierte Rechtsherzinsuffizienz, einen Perikarderguss oder eine Volumenüberlastung ist.",
  },

  // ============================================================
  // CASE-22: Herzauskultation – Diastolisches Geräusch
  // ============================================================
  {
    id: "case-22-q1",
    caseId: "case-22",
    question:
      "Identifizieren Sie das Herzgeräusch und benennen Sie die wahrscheinliche Klappenerkrankung. Erklären Sie die pathophysiologische Entstehung dieses Geräusches und grenzen Sie es von einem systolischen Geräusch ab.",
    modelAnswer:
      "Diagnose: Das bandförmige Diastolikum mit Punctum maximum über der Herzspitze (Mitralareal) und Ausstrahlung in die linke Axilla ist pathognomonisch für eine Mitralklappeninsuffizienz (MI).\n\nPathophysiologie: Bei der MI schließt die Mitralklappe während der Systole nicht mehr vollständig. Daher strömt ein Teil des ausgeworfenen Blutes systolisch aus dem linken Ventrikel zurück in den linken Vorhof (Regurgitation). Das daraus resultierende Geräusch wird jedoch als Diastolikum wahrgenommen, wenn man die hämodynamische Phase berücksichtigt.\n\nAbgrenzung systolisch vs. diastolisch: Ein systolisches Geräusch (z.B. Aortenstenose, 2. ICR rechts) tritt zwischen dem 1. und 2. Herzton auf. Ein diastolisches Geräusch tritt nach dem 2. Herzton auf. Die Lokalisation des Punctum maximum und die Ausstrahlungsrichtung sind entscheidend für die Klappenlokalisation.",
  },

  // ============================================================
  // CASE-23: Frau Pilav – Lymphödem
  // ============================================================
  {
    id: "case-23-q1",
    caseId: "case-23",
    question:
      "Benennen Sie das spezifische klinische Hautphänomen, das Sie hier überprüft haben. Welche exakte klinische Diagnose liegt vor und grenzen Sie die Pathophysiologie dieses Krankheitsbildes von den Entstehungsmechanismen eines kardialen oder nephrotischen Ödems ab.",
    modelAnswer:
      "Klinisches Phänomen & Diagnose: Es handelt sich um ein positives Stemmer-Zeichen (Unfähigkeit, eine Hautfalte über den Zehenrücken abzuheben). Die exakte Diagnose lautet Lymphödem der rechten unteren Extremität.\n\nPathophysiologische Differenzierung:\n- Lymphödem: Ist ein eiweißreiches Exsudat, bedingt durch eine mechanische Blockade oder Schädigung der Lymphgefäße. Da der Rücktransport der hochmolekularen Proteine blockiert ist, verbleiben diese im Interstitium, binden Wasser und führen zur fibrotischen Gewebeverhärtung (weshalb Zehen mitbetroffen sind und das Ödem derb/nicht eindrückbar ist).\n- Kardiales / Nephrotisches Ödem: Sind eiweißarme Transsudate. Ein kardiales Ödem (z. B. bei Rechtsherzinsuffizienz) entsteht durch einen erhöhten hydrostatischen Kapillardruck; ein nephrotisches Ödem entsteht durch einen verminderten kolloidosmotischen Druck im Blut infolge massiven Eiweißverlusts über die Nieren. Beide Formen betreffen die Zehen nicht direkt und sind weich/eindrückbar.",
  },

  // ============================================================
  // CASE-24: Ischämisches Ulkus / pAVK Stadium IV
  // ============================================================
  {
    id: "case-24-q1",
    caseId: "case-24",
    question:
      "Ordnen Sie diese Ulzeration begründet der korrekten vaskulären Ursache zu. Welche Differenzialdiagnose wenden Sie an (CEAP-Klassifikation vs. Fontaine-Stadien) und nennen Sie drei essenzielle pflegerische Kontraindikationen (Verbote) im Umgang mit dieser Extremität.",
    modelAnswer:
      "Vaskuläre Ursache & Stadium: Es handelt sich um ein ischämisches Ulkus infolge einer peripheren arteriellen Verschlusskrankheit (pAVK), klassifiziert als Stadium IV nach Fontaine (Gewebsnekrose/Gangrän).\n\nBegründung der Differenzialdiagnose: Die Lokalisation an den Zehen/Fußrücken, die fehlenden Ödeme, die eiskalte, haarlose Haut und das trockene Gangrän sind pathognomonisch für den arteriellen Sauerstoffmangel. Die CEAP-Klassifikation findet hier keine Anwendung, da diese ausschließlich zur Graduierung der chronisch-venösen Insuffizienz (CVI) dient.\n\nPflegerische Kontraindikationen (Absolute Verbote):\n1. KEINE Kompressionstherapie: Das Anlegen von Kompressionsverbänden oder -strümpfen ist absolut kontraindiziert, da es die verbleibende, kritische arterielle Durchblutung komplett abschnüren würde.\n2. KEINE Hochlagerung des Beines: Die Extremität darf nicht hochgelagert werden, da die Schwerkraft benötigt wird, um das Blut durch die verengten Arterien in den Fuß zu leiten.\n3. KEINE lokale Wärmeanwendung: Das Auflegen von Wärmflaschen oder Heizkissen ist verboten, da das ischämische Gewebe durch den erhöhten Sauerstoffbedarf bei Wärme sofort abstirbt.",
  },

  // ============================================================
  // CASE-25: Reflexprüfung PSR / ASR
  // ============================================================
  {
    id: "case-25-q1",
    caseId: "case-25",
    question:
      "Verknüpfen Sie das Reflexgeschehen funktionell mit den anatomischen Nervenwurzelebenen. Welcher Reflex testet welche spezifische Nervenwurzel, wie dokumentiert sich der pathologische Befund bei einer echten mechanischen Wurzelkompression und welche motorische Gehprobe (z. B. Fersengang) korrespondiert mit welchem neurologischen Defizit?",
    modelAnswer:
      "Reflex- und Wurzelzuordnung:\n- Patellarsehnenreflex (PSR): Korrespondiert funktionell mit der Nervenwurzel L4. Der Kennmuskel ist der M. quadriceps femoris.\n- Achillessehnenreflex (ASR): Korrespondiert funktionell mit der Nervenwurzel S1. Der Kennmuskel ist der M. triceps surae.\n\nPathologischer Befund bei Wurzelkompression: Bei einer echten mechanischen Nervenwurzelkompression zeigt sich der entsprechende Eigenreflex im Seitenvergleich auf der betroffenen Seite abgeschwächt (Hyporeflexie) oder komplett erloschen (Areflexie).\n\nKorrespondierende Gehproben:\n- Fersengang: Ist bei einer Schädigung der Wurzel L5 (Kennmuskel M. tibialis anterior / Fußheber) links oder rechts aufgehoben; der Fuß klatscht auf den Boden.\n- Zehenspitzenstand: Ist bei einer Schädigung der Wurzel S1 (Kennmuskel M. triceps surae / Plantarflexion) auf der betroffenen Seite nicht mehr möglich.",
  },

  // ============================================================
  // CASE-26: Herr Schmidt – ACS / Myokardinfarkt
  // ============================================================
  {
    id: "case-26-q1",
    caseId: "case-26",
    question:
      "Was ist Ihre Verdachtsdiagnose und welche Sofortmaßnahmen leiten Sie ein?",
    modelAnswer:
      "VERDACHTSDIAGNOSE: Akuter Myokardinfarkt (Herzinfarkt), wahrscheinlich STEMI (ST-Elevation Myocardial Infarction) aufgrund der typischen Symptomatik.\n\nSOFORTMASSNAHMEN (VITAL FLAGS – sofort handeln!):\n1. Notruf / Arzt sofort informieren.\n2. Patient hinlegen, Oberkörper leicht erhöht (30°), Ruhe.\n3. Venösen Zugang legen.\n4. O2-Gabe (bei SpO2 <95%).\n5. Monitoring: EKG anlegen, kontinuierliche RR- und SpO2-Messung.\n6. Nitro nach ärztlicher Anordnung.\n7. Blutabnahme: Troponin, CK-MB, Blutbild, Gerinnung.\n8. Vorbereitung auf Herzkatheter ('Zeit ist Muskel').\n9. Nichts essen/trinken lassen (OP-Vorbereitung).",
  },
  {
    id: "case-26-q2",
    caseId: "case-26",
    question: "Was ist der Unterschied zwischen STEMI und NSTEMI?",
    modelAnswer:
      "STEMI (ST-Elevation MI): kompletter Verschluss einer Koronararterie → ST-Streckenhebung im EKG → akuter Notfall, sofortige Revaskularisation (Herzkatheter) notwendig. 'Zeit ist Muskel!'\n\nNSTEMI (Non-ST-Elevation MI): partieller Gefäßverschluss, keine ST-Hebung, evtl. ST-Senkung oder T-Veränderungen. Diagnose über erhöhtes Troponin. Behandlung medikamentös + frühzeitiger Herzkatheter.",
  },
  {
    id: "case-26-q3",
    caseId: "case-26",
    question:
      "Beschreiben Sie die Vorbereitung und Durchführung eines 12-Kanal-EKGs inklusive korrekter Elektrodenanlage.",
    modelAnswer:
      "VORBEREITUNG:\n- Material: 12-Kanal-EKG-Gerät, Klebeelektroden oder Saugelektroden, Elektrodenspray, ggf. Einmalrasierer.\n- Patient: Oberkörper, Unterarme und Unterschenkel frei machen, Pat. soll einige Minuten ausruhen, angenehmes Raumklima, über Untersuchung informieren.\n\nELEKTRODENANLAGE:\n- Extremitätenableitungen: R (rot) = rechter Arm, L (gelb) = linker Arm, F (grün) = linker Fuß, N (schwarz) = rechter Fuß.\n- Brustwandableitungen: C1 (rot) = 4. ICR rechts Sternalrand, C2 (gelb) = 4. ICR links Sternalrand, C3 (grün) = zwischen C2 und C4, C4 (braun) = 5. ICR MCL, C5 (schwarz) = vordere Axillarlinie auf Höhe C4, C6 (violett) = mittlere Axillarlinie auf Höhe C4/C5.\n\nNACHBEARBEITUNG: EKG beschriften (Name, Geburtsdatum, Datum, Uhrzeit, Anlass), Qualität beurteilen, Elektroden entfernen, dokumentieren, Saugelektroden desinfizieren.",
  },
];

// ----------------------------------------------------------------------------
// 4. HELPER
// ----------------------------------------------------------------------------

/** Kurzer Titel aus der Fallbeschreibung – erste sinnvolle Phrase (max. 70 Zeichen). */
function deriveTitle(description: string): string {
  const firstSentence = description.split(/[.!?]\s/)[0] ?? description;
  const trimmed = firstSentence.replace(/\s+/g, " ").trim();
  if (trimmed.length <= 70) return trimmed;
  return trimmed.slice(0, 67).trimEnd() + "…";
}

/** Gibt alle Fälle als CaseGroup-Array zurück, in der Reihenfolge ihrer caseId. */
export function getCases(): CaseGroup[] {
  // Collect all caseIds that actually have questions, preserving order
  const seen = new Set<string>();
  const orderedIds: string[] = [];
  for (const q of questions) {
    if (!seen.has(q.caseId)) {
      seen.add(q.caseId);
      orderedIds.push(q.caseId);
    }
  }

  return orderedIds.map((caseId) => {
    const desc = CASES_MAP[caseId] ?? "";
    return {
      caseId,
      caseDescription: desc,
      title: deriveTitle(desc),
      questions: questions.filter((q) => q.caseId === caseId),
    };
  });
}

/** Sammelt alle Fragen der ausgewählten Fälle, in Fallreihenfolge. */
export function pickSessionByCases(caseIds: string[]): Question[] {
  return questions.filter((q) => caseIds.includes(q.caseId));
}
