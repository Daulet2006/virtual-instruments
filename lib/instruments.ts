export type InstrumentCategory = "string" | "percussion" | "plucked" | "wind"

export interface InstrumentString {
  id: string
  note: string
  frequency: number
  y: number
  color: string
}

export interface Instrument {
  id: string
  name: string
  kazakh: string
  category: InstrumentCategory
  era: string
  description: string
  history: string
  cultural: string
  tuning: string
  strings?: InstrumentString[]
  icon: string
  color: string
}

export const instruments: Instrument[] = [
  {
    id: "dombra",
    name: "Dombra",
    kazakh: "Домбыра",
    category: "string",
    era: "Ancient — 2000+ years",
    description: "The heart and soul of Kazakh music. A long-necked two-string lute played by akyns (bards).",
    history:
      "The Dombra is Kazakhstan's most beloved national instrument, with origins traced back over 2,000 years. It was the instrument of choice for akyns — Kazakh poet-musicians who used it to accompany epic oral poetry called 'zhyrau'. The instrument was so central to Kazakh identity that Soviet-era attempts to suppress it only strengthened its cultural significance.",
    cultural:
      "The Dombra is considered a symbol of the Kazakh soul. Every home traditionally had one hanging on the wall. It features prominently in national mythology, with the legendary hero Koblandy Batyr said to have composed battle songs on his Dombra before every campaign.",
    tuning: "Open tuning in fourths or fifths. Primary: A-D or G-D. The two strings create a resonant drone-melody texture unique to the steppe tradition.",
    strings: [
      { id: "s1", note: "A4", frequency: 440, y: 35, color: "#C8942A" },
      { id: "s2", note: "D4", frequency: 293.66, y: 55, color: "#B87D2E" },
    ],
    icon: "𝄞",
    color: "#C8942A",
  },
  {
    id: "kobyz",
    name: "Kobyz",
    kazakh: "Қобыз",
    category: "string",
    era: "Ancient — 1000+ years",
    description: "A mystical bowed string instrument used by shamans (baksy) for healing rituals.",
    history:
      "The Kobyz is one of the oldest instruments in Central Asia, attributed to the legendary shaman-musician Korkyt Ata, who according to legend created it to ward off death. Originally made from birch wood with strings from horsehair, it was exclusively used by shamans in spiritual ceremonies and was believed to communicate with spirits.",
    cultural:
      "The Kobyz holds deep spiritual significance in Kazakh culture. The haunting, mournful sound was said to connect the living world with the spirit realm. Today it is recognized as a UNESCO Intangible Cultural Heritage, and its unique sound has been incorporated into modern orchestral compositions.",
    tuning: "Two horsehair strings tuned in fifths. Traditional: A-E or D-A. The overtone-rich timbre creates an otherworldly resonance ideal for the instrument's ceremonial roots.",
    strings: [
      { id: "s1", note: "A3", frequency: 220, y: 33, color: "#2A7B7C" },
      { id: "s2", note: "E3", frequency: 164.81, y: 53, color: "#3A8B8C" },
    ],
    icon: "♩",
    color: "#2A7B7C",
  },
  {
    id: "jetigen",
    name: "Jetigen",
    kazakh: "Жетіген",
    category: "string",
    era: "Medieval — 800+ years",
    description: "A seven-string plucked zither representing the seven stars of the Ursa Major constellation.",
    history:
      "The Jetigen (meaning 'seven strings') is a board zither with deep mythological roots. Legend says it was created by a father who lost his seven sons in battle, dedicating each string to one son's memory. The seven strings represent both mourning and cosmic order — mirroring the seven stars of the Great Bear constellation.",
    cultural:
      "The Jetigen occupies a unique place in Kazakh cosmology. Unlike the Dombra which accompanied epic poetry, the Jetigen was played for introspective meditation. Court musicians played it for khans, and its delicate sound was considered a bridge between earthly and celestial realms.",
    tuning: "Seven strings in pentatonic scale: G-A-C-D-E-G-A. Each string is traditionally tuned to a specific natural harmonic, creating a shimmering resonance.",
    strings: [
      { id: "s1", note: "G4", frequency: 392, y: 20, color: "#C8942A" },
      { id: "s2", note: "A4", frequency: 440, y: 30, color: "#B87D2E" },
      { id: "s3", note: "C5", frequency: 523.25, y: 40, color: "#C8942A" },
      { id: "s4", note: "D5", frequency: 587.33, y: 50, color: "#B87D2E" },
      { id: "s5", note: "E5", frequency: 659.25, y: 60, color: "#C8942A" },
      { id: "s6", note: "G5", frequency: 784, y: 70, color: "#B87D2E" },
      { id: "s7", note: "A5", frequency: 880, y: 80, color: "#C8942A" },
    ],
    icon: "♬",
    color: "#6B8C3A",
  },
  {
    id: "dangyra",
    name: "Dangyra",
    kazakh: "Дангыра",
    category: "percussion",
    era: "Ancient — shamanic origins",
    description: "A sacred shamanic frame drum beaten during healing ceremonies and spiritual rituals.",
    history:
      "The Dangyra is the ritual drum of Kazakh shamans (baksy), used in healing ceremonies, divination, and spiritual communication. Made from an animal hide stretched over a wooden frame and decorated with sacred symbols, each drum was considered a living entity — a spirit vessel that the shaman inhabited during trance states.",
    cultural:
      "The Dangyra's rhythmic patterns were believed to open pathways between worlds. Each beat was a heartbeat of the cosmic order, and complex polyrhythms could guide souls through the spirit world during healing rituals. The drum was buried with its shaman, as no other person could use it safely.",
    tuning: "Single membrane drum, traditionally tuned to a low fundamental around A2-D3. Pitch varies with humidity; shamans would warm the drum head over fire to tighten it before ceremonies.",
    icon: "◉",
    color: "#8B2B2B",
  },
  {
    id: "sherter",
    name: "Sherter",
    kazakh: "Шертер",
    category: "plucked",
    era: "Ancient — variant of Dombra",
    description: "A compact three-string lute with a spherical body, favored by Kazakh women musicians.",
    history:
      "The Sherter is a smaller, rounder variant of the Dombra with three strings instead of two. Its compact size made it ideal for women musicians and traveling performers. The third string added harmonic richness, and the instrument was often used to accompany lyrical songs about love, nature, and daily steppe life.",
    cultural:
      "The Sherter was associated with the domestic and feminine sphere of Kazakh culture. While men played the Dombra for epic poetry and public performance, women played the Sherter in the yurt, creating an intimate musical tradition that preserved a different dimension of Kazakh lyrical expression.",
    tuning: "Three strings in a major or minor triad configuration. Standard: D-A-D or G-D-G. The middle string often serves as a melody string while outer strings provide drone harmonics.",
    strings: [
      { id: "s1", note: "D5", frequency: 587.33, y: 30, color: "#C8942A" },
      { id: "s2", note: "A4", frequency: 440, y: 50, color: "#B87D2E" },
      { id: "s3", note: "D4", frequency: 293.66, y: 70, color: "#C8942A" },
    ],
    icon: "𝄞",
    color: "#B87D2E",
  },
  {
    id: "adyrna",
    name: "Adyrna",
    kazakh: "Адырна",
    category: "string",
    era: "Ancient — harp tradition",
    description: "A ceremonial angular harp with multiple strings, played at royal courts and festivals.",
    history:
      "The Adyrna is Kazakhstan's ancient harp, an angular instrument with multiple strings stretched between an upright post and a curved sound box. Evidence of similar harps appears in ancient Saka burial mounds, suggesting a tradition going back over 2,500 years. The instrument was associated with nobility and was played at the courts of Kazakh khans.",
    cultural:
      "The Adyrna represented divine order and cosmic harmony in Kazakh philosophy. Each string was associated with a celestial body, and playing the full instrument was considered a microcosm of the universe in sound. It was also used in storytelling performances of the great Kazakh epics like Alpamys and Koblandy.",
    tuning: "Multiple strings (typically 14-18) in a diatonic or pentatonic scale across several octaves. Range spans C3 to G6. Traditional tuning follows a descending scale from the longest to shortest string.",
    strings: [
      { id: "s1", note: "C4", frequency: 261.63, y: 15, color: "#C8942A" },
      { id: "s2", note: "D4", frequency: 293.66, y: 25, color: "#B87D2E" },
      { id: "s3", note: "E4", frequency: 329.63, y: 35, color: "#C8942A" },
      { id: "s4", note: "G4", frequency: 392, y: 45, color: "#B87D2E" },
      { id: "s5", note: "A4", frequency: 440, y: 55, color: "#C8942A" },
      { id: "s6", note: "C5", frequency: 523.25, y: 65, color: "#B87D2E" },
      { id: "s7", note: "D5", frequency: 587.33, y: 75, color: "#C8942A" },
      { id: "s8", note: "E5", frequency: 659.25, y: 85, color: "#B87D2E" },
    ],
    icon: "♭",
    color: "#5B7E9E",
  },
]

export const categoryLabels: Record<InstrumentCategory, string> = {
  string: "Ішекті",
  percussion: "Ұрмалы",
  plucked: "Шертіп ойналатын",
  wind: "Үрмелі",
}

export const categoryColors: Record<InstrumentCategory, string> = {
  string: "#C8942A",
  percussion: "#8B2B2B",
  plucked: "#B87D2E",
  wind: "#2A7B7C",
}
