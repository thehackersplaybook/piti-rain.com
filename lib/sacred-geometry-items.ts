/**
 * Sacred Geometry Items (SGI)
 * Each item represents a unique sacred geometry pattern with its SVG and metadata
 */

export interface SGI {
  id: string;
  name: string;
  sanskrit?: string;
  description: string;
  keywords: string[];
  category: "yantra" | "chakra" | "mantra" | "element" | "cosmic";
  svg: string;
}

// Helper to generate consistent SVG wrapper
const svgWrapper = (content: string, viewBox = "0 0 200 200") =>
  `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="200" height="200">
  <rect width="200" height="200" fill="#0a0a0a"/>
  ${content}
</svg>`.trim();

export const sacredGeometryItems: SGI[] = [
  {
    id: "kbv8",
    name: "KBV8: Kaal Bhairava as Bāsūkhi Athva Rishi Sigil",
    sanskrit: "काल भैरव वासुकी अथवा ऋषि",
    description:
      "The digital sigil of Kaal Bhairava Vasukhi Athva Rishi. Twin serpents (Vasuki) guard the sacred terminal while the cyber-phoenix watches from above. A laser beam of pure consciousness pierces through the octagonal gateway of time.",
    keywords: [
      "kaal",
      "bhairava",
      "vasukhi",
      "rishi",
      "sigil",
      "hacker",
      "snake",
      "serpent",
      "bird",
      "phoenix",
      "laser",
      "digital",
      "cyber",
      "kbv8",
    ],
    category: "yantra",
    svg: svgWrapper(`
      <!-- Outer octagon frame (digital/geometric) -->
      <polygon fill="none" stroke="#ffd700" stroke-width="2" points="100,15 145,35 165,80 165,120 145,165 100,185 55,165 35,120 35,80 55,35"/>
      <polygon fill="none" stroke="#b8860b" stroke-width="1" points="100,25 138,42 155,80 155,120 138,158 100,175 62,158 45,120 45,80 62,42"/>

      <!-- Laser beam - horizontal through center -->
      <line x1="20" y1="100" x2="180" y2="100" stroke="#00ff00" stroke-width="2" opacity="0.8"/>
      <line x1="20" y1="100" x2="180" y2="100" stroke="#00ff00" stroke-width="6" opacity="0.2"/>
      <!-- Laser nodes -->
      <circle cx="35" cy="100" r="3" fill="#00ff00"/>
      <circle cx="165" cy="100" r="3" fill="#00ff00"/>

      <!-- Digital Snake (Vasuki) - coiled symmetrically, left side -->
      <path d="M 50,70 Q 40,80 45,95 Q 50,105 45,115 Q 40,125 50,135" fill="none" stroke="#ffd700" stroke-width="3" stroke-linecap="round"/>
      <!-- Snake head left -->
      <circle cx="50" cy="68" r="5" fill="#ffd700"/>
      <circle cx="48" cy="66" r="1.5" fill="#00ff00"/>

      <!-- Digital Snake - right side (mirrored) -->
      <path d="M 150,70 Q 160,80 155,95 Q 150,105 155,115 Q 160,125 150,135" fill="none" stroke="#ffd700" stroke-width="3" stroke-linecap="round"/>
      <!-- Snake head right -->
      <circle cx="150" cy="68" r="5" fill="#ffd700"/>
      <circle cx="152" cy="66" r="1.5" fill="#00ff00"/>

      <!-- Bird (Phoenix/Garuda) - top center, symmetrical -->
      <path d="M 100,45 L 85,60 L 70,55 L 85,70 L 100,65 L 115,70 L 130,55 L 115,60 Z" fill="#ffd700" stroke="#b8860b" stroke-width="1"/>
      <!-- Bird head -->
      <circle cx="100" cy="40" r="6" fill="#ffd700" stroke="#b8860b" stroke-width="1"/>
      <!-- Bird eye -->
      <circle cx="100" cy="39" r="2" fill="#00ff00"/>
      <!-- Bird beak -->
      <polygon fill="#b8860b" points="100,33 97,38 103,38"/>

      <!-- Center terminal/code symbol -->
      <rect x="88" y="88" width="24" height="24" fill="#0a0a0a" stroke="#00ff00" stroke-width="1.5" rx="2"/>
      <text x="100" y="105" font-size="12" fill="#00ff00" text-anchor="middle" font-family="monospace">&gt;_</text>

      <!-- Binary decorations -->
      <text x="65" cy="155" font-size="6" fill="#00ff00" opacity="0.6" font-family="monospace">01</text>
      <text x="125" cy="155" font-size="6" fill="#00ff00" opacity="0.6" font-family="monospace">10</text>

      <!-- KBV8 label -->
      <text x="100" y="150" font-size="12" fill="#ffd700" text-anchor="middle" font-weight="bold" font-family="monospace">KBV8</text>
    `),
  },
  {
    id: "shiva-ambanoid-zaka",
    name: "Shiva Ambanoid Zaka",
    sanskrit: "शिव अम्बनोइड ज़का",
    description:
      "The 4 primordial sounds (SA, HA, NA, MA) representing the complete cycle of information flow through the human energy system. SA expands, HA contracts, NA resonates, MA manifests.",
    keywords: [
      "shiva",
      "shakti",
      "sounds",
      "mantra",
      "chakra",
      "kundalini",
      "nada",
      "maya",
      "sa",
      "ha",
      "na",
      "ma",
    ],
    category: "mantra",
    svg: svgWrapper(`
      <circle cx="100" cy="40" r="25" fill="#9400d3" stroke="#ffd700" stroke-width="2"/>
      <text x="100" y="45" font-size="12" fill="white" text-anchor="middle">SA</text>
      <rect x="75" y="75" width="50" height="50" fill="#4169e1" stroke="#00bfff" stroke-width="2"/>
      <text x="100" y="105" font-size="12" fill="white" text-anchor="middle">HA</text>
      <polygon points="100,135 75,175 125,175" fill="#228b22" stroke="#7fff00" stroke-width="2"/>
      <text x="100" y="165" font-size="12" fill="white" text-anchor="middle">NA</text>
      <polygon points="100,135 75,175 125,175" fill="#228b22" stroke="#7fff00" stroke-width="2" transform="translate(100,180) rotate(180) translate(-100,-180)"/>
      <text x="100" y="165" font-size="10" fill="white" text-anchor="middle">NA</text>
    `),
  },
  {
    id: "sri-yantra",
    name: "Sri Yantra",
    sanskrit: "श्री यन्त्र",
    description:
      "The supreme yantra representing the cosmos and the human body. Nine interlocking triangles create 43 smaller triangles, symbolizing the union of masculine and feminine divine energies.",
    keywords: [
      "yantra",
      "goddess",
      "lakshmi",
      "prosperity",
      "triangles",
      "cosmos",
      "shakti",
      "tantra",
    ],
    category: "yantra",
    svg: svgWrapper(`
      <circle cx="100" cy="100" r="90" fill="none" stroke="#ffd700" stroke-width="1"/>
      <circle cx="100" cy="100" r="80" fill="none" stroke="#ffd700" stroke-width="1"/>
      <polygon points="100,25 175,140 25,140" fill="none" stroke="#ff6b6b" stroke-width="2"/>
      <polygon points="100,175 25,60 175,60" fill="none" stroke="#4ecdc4" stroke-width="2"/>
      <polygon points="100,40 160,130 40,130" fill="none" stroke="#ff6b6b" stroke-width="1.5"/>
      <polygon points="100,160 40,70 160,70" fill="none" stroke="#4ecdc4" stroke-width="1.5"/>
      <circle cx="100" cy="100" r="8" fill="#ffd700"/>
    `),
  },
  {
    id: "flower-of-life",
    name: "Flower of Life",
    sanskrit: "जीवन पुष्प",
    description:
      "An ancient symbol composed of multiple evenly-spaced, overlapping circles arranged in a flower-like pattern. Contains the patterns of creation and the building blocks of the universe.",
    keywords: [
      "flower",
      "life",
      "creation",
      "circles",
      "unity",
      "geometry",
      "universal",
      "pattern",
    ],
    category: "cosmic",
    svg: svgWrapper(`
      <circle cx="100" cy="100" r="20" fill="none" stroke="#00bfff" stroke-width="1.5"/>
      <circle cx="120" cy="100" r="20" fill="none" stroke="#00bfff" stroke-width="1.5"/>
      <circle cx="80" cy="100" r="20" fill="none" stroke="#00bfff" stroke-width="1.5"/>
      <circle cx="110" cy="117" r="20" fill="none" stroke="#00bfff" stroke-width="1.5"/>
      <circle cx="90" cy="117" r="20" fill="none" stroke="#00bfff" stroke-width="1.5"/>
      <circle cx="110" cy="83" r="20" fill="none" stroke="#00bfff" stroke-width="1.5"/>
      <circle cx="90" cy="83" r="20" fill="none" stroke="#00bfff" stroke-width="1.5"/>
      <circle cx="100" cy="100" r="60" fill="none" stroke="#ffd700" stroke-width="2"/>
    `),
  },
  {
    id: "metatrons-cube",
    name: "Metatron's Cube",
    description:
      "A complex sacred geometry figure containing all five Platonic solids. Represents the underlying geometric patterns found throughout nature and the universe.",
    keywords: [
      "metatron",
      "cube",
      "platonic",
      "solids",
      "archangel",
      "protection",
      "creation",
    ],
    category: "cosmic",
    svg: svgWrapper(`
      <circle cx="100" cy="50" r="8" fill="#9400d3"/>
      <circle cx="100" cy="150" r="8" fill="#9400d3"/>
      <circle cx="50" cy="75" r="8" fill="#9400d3"/>
      <circle cx="150" cy="75" r="8" fill="#9400d3"/>
      <circle cx="50" cy="125" r="8" fill="#9400d3"/>
      <circle cx="150" cy="125" r="8" fill="#9400d3"/>
      <circle cx="100" cy="100" r="8" fill="#ffd700"/>
      <line x1="100" y1="50" x2="50" y2="75" stroke="#666" stroke-width="1"/>
      <line x1="100" y1="50" x2="150" y2="75" stroke="#666" stroke-width="1"/>
      <line x1="100" y1="50" x2="100" y2="150" stroke="#666" stroke-width="1"/>
      <line x1="50" y1="75" x2="150" y2="75" stroke="#666" stroke-width="1"/>
      <line x1="50" y1="75" x2="50" y2="125" stroke="#666" stroke-width="1"/>
      <line x1="150" y1="75" x2="150" y2="125" stroke="#666" stroke-width="1"/>
      <line x1="50" y1="125" x2="150" y2="125" stroke="#666" stroke-width="1"/>
      <line x1="50" y1="125" x2="100" y2="150" stroke="#666" stroke-width="1"/>
      <line x1="150" y1="125" x2="100" y2="150" stroke="#666" stroke-width="1"/>
      <line x1="100" y1="100" x2="100" y2="50" stroke="#ffd700" stroke-width="1"/>
      <line x1="100" y1="100" x2="50" y2="75" stroke="#ffd700" stroke-width="1"/>
      <line x1="100" y1="100" x2="150" y2="75" stroke="#ffd700" stroke-width="1"/>
      <line x1="100" y1="100" x2="50" y2="125" stroke="#ffd700" stroke-width="1"/>
      <line x1="100" y1="100" x2="150" y2="125" stroke="#ffd700" stroke-width="1"/>
      <line x1="100" y1="100" x2="100" y2="150" stroke="#ffd700" stroke-width="1"/>
    `),
  },
  {
    id: "seed-of-life",
    name: "Seed of Life",
    sanskrit: "जीवन बीज",
    description:
      "Seven overlapping circles representing the seven days of creation. The foundation for the Flower of Life and a symbol of blessing and protection.",
    keywords: [
      "seed",
      "life",
      "seven",
      "circles",
      "creation",
      "genesis",
      "blessing",
    ],
    category: "cosmic",
    svg: svgWrapper(`
      <circle cx="100" cy="100" r="25" fill="none" stroke="#7fff00" stroke-width="2"/>
      <circle cx="100" cy="75" r="25" fill="none" stroke="#7fff00" stroke-width="1.5"/>
      <circle cx="100" cy="125" r="25" fill="none" stroke="#7fff00" stroke-width="1.5"/>
      <circle cx="78" cy="87" r="25" fill="none" stroke="#7fff00" stroke-width="1.5"/>
      <circle cx="122" cy="87" r="25" fill="none" stroke="#7fff00" stroke-width="1.5"/>
      <circle cx="78" cy="113" r="25" fill="none" stroke="#7fff00" stroke-width="1.5"/>
      <circle cx="122" cy="113" r="25" fill="none" stroke="#7fff00" stroke-width="1.5"/>
    `),
  },
  {
    id: "muladhara-chakra",
    name: "Muladhara Chakra",
    sanskrit: "मूलाधार",
    description:
      "The root chakra at the base of the spine. Represented by a four-petaled lotus, it governs survival, grounding, and connection to the Earth element.",
    keywords: [
      "root",
      "chakra",
      "muladhara",
      "grounding",
      "earth",
      "survival",
      "red",
      "base",
    ],
    category: "chakra",
    svg: svgWrapper(`
      <circle cx="100" cy="100" r="60" fill="none" stroke="#8b0000" stroke-width="3"/>
      <rect x="70" y="70" width="60" height="60" fill="none" stroke="#ff6347" stroke-width="2" transform="rotate(45 100 100)"/>
      <polygon points="100,60 85,90 115,90" fill="#ff6347"/>
      <text x="100" y="110" font-size="20" fill="#ffd700" text-anchor="middle">लं</text>
      <circle cx="60" cy="100" r="8" fill="#8b0000"/>
      <circle cx="140" cy="100" r="8" fill="#8b0000"/>
      <circle cx="100" cy="60" r="8" fill="#8b0000"/>
      <circle cx="100" cy="140" r="8" fill="#8b0000"/>
    `),
  },
  {
    id: "anahata-chakra",
    name: "Anahata Chakra",
    sanskrit: "अनाहत",
    description:
      "The heart chakra in the center of the chest. A twelve-petaled lotus containing two interlocking triangles (hexagram), representing the union of masculine and feminine.",
    keywords: [
      "heart",
      "chakra",
      "anahata",
      "love",
      "compassion",
      "green",
      "air",
      "twelve",
    ],
    category: "chakra",
    svg: svgWrapper(`
      <circle cx="100" cy="100" r="70" fill="none" stroke="#228b22" stroke-width="3"/>
      <polygon points="100,50 145,125 55,125" fill="none" stroke="#7fff00" stroke-width="2"/>
      <polygon points="100,150 55,75 145,75" fill="none" stroke="#7fff00" stroke-width="2"/>
      <text x="100" y="108" font-size="18" fill="#ffd700" text-anchor="middle">यं</text>
      ${Array.from({ length: 12 }, (_, i) => {
        const angle = ((i * 30 - 90) * Math.PI) / 180;
        const x = 100 + 70 * Math.cos(angle);
        const y = 100 + 70 * Math.sin(angle);
        return `<circle cx="${x}" cy="${y}" r="5" fill="#228b22"/>`;
      }).join("")}
    `),
  },
  {
    id: "ajna-chakra",
    name: "Ajna Chakra",
    sanskrit: "आज्ञा",
    description:
      "The third eye chakra between the eyebrows. A two-petaled lotus representing intuition, wisdom, and the seat of the mind. The command center of consciousness.",
    keywords: [
      "third",
      "eye",
      "chakra",
      "ajna",
      "intuition",
      "wisdom",
      "indigo",
      "mind",
      "pineal",
    ],
    category: "chakra",
    svg: svgWrapper(`
      <circle cx="100" cy="100" r="50" fill="none" stroke="#4b0082" stroke-width="3"/>
      <ellipse cx="60" cy="100" rx="20" ry="35" fill="none" stroke="#9400d3" stroke-width="2"/>
      <ellipse cx="140" cy="100" rx="20" ry="35" fill="none" stroke="#9400d3" stroke-width="2"/>
      <polygon points="100,60 85,100 100,140 115,100" fill="none" stroke="#ffd700" stroke-width="2"/>
      <text x="100" y="108" font-size="20" fill="#ffd700" text-anchor="middle">ॐ</text>
    `),
  },
  {
    id: "sahasrara-chakra",
    name: "Sahasrara Chakra",
    sanskrit: "सहस्रार",
    description:
      "The crown chakra at the top of the head. The thousand-petaled lotus representing cosmic consciousness, enlightenment, and unity with the divine.",
    keywords: [
      "crown",
      "chakra",
      "sahasrara",
      "enlightenment",
      "cosmic",
      "violet",
      "thousand",
      "divine",
    ],
    category: "chakra",
    svg: svgWrapper(`
      <circle cx="100" cy="100" r="70" fill="none" stroke="#9400d3" stroke-width="2"/>
      <circle cx="100" cy="100" r="50" fill="none" stroke="#9400d3" stroke-width="1.5"/>
      <circle cx="100" cy="100" r="30" fill="none" stroke="#ffd700" stroke-width="2"/>
      ${Array.from({ length: 24 }, (_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        const x1 = 100 + 30 * Math.cos(angle);
        const y1 = 100 + 30 * Math.sin(angle);
        const x2 = 100 + 70 * Math.cos(angle);
        const y2 = 100 + 70 * Math.sin(angle);
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#9400d3" stroke-width="1"/>`;
      }).join("")}
      <circle cx="100" cy="100" r="10" fill="#ffd700"/>
      <text x="100" y="105" font-size="14" fill="#1a0033" text-anchor="middle">∞</text>
    `),
  },
  {
    id: "om-symbol",
    name: "Om Symbol",
    sanskrit: "ॐ",
    description:
      "The primordial sound of the universe. Om encompasses all sounds and represents the past, present, and future. The most sacred mantra in Hinduism and Buddhism.",
    keywords: [
      "om",
      "aum",
      "mantra",
      "sound",
      "primordial",
      "universe",
      "sacred",
      "vibration",
    ],
    category: "mantra",
    svg: svgWrapper(`
      <circle cx="100" cy="100" r="80" fill="none" stroke="#ffd700" stroke-width="2"/>
      <text x="100" y="125" font-size="80" fill="#ff6b6b" text-anchor="middle" font-family="serif">ॐ</text>
    `),
  },
  {
    id: "torus-field",
    name: "Torus Field",
    description:
      "The fundamental shape of the human energy field and all living systems. A doughnut-shaped vortex of energy that flows in and through itself continuously.",
    keywords: [
      "torus",
      "field",
      "energy",
      "vortex",
      "flow",
      "magnetic",
      "heart",
      "aura",
    ],
    category: "cosmic",
    svg: svgWrapper(`
      <ellipse cx="100" cy="100" rx="70" ry="40" fill="none" stroke="#00bfff" stroke-width="2"/>
      <ellipse cx="100" cy="100" rx="50" ry="30" fill="none" stroke="#00bfff" stroke-width="1.5"/>
      <ellipse cx="100" cy="100" rx="30" ry="20" fill="none" stroke="#00bfff" stroke-width="1"/>
      <path d="M 100 40 Q 140 70 140 100 Q 140 130 100 160" fill="none" stroke="#ffd700" stroke-width="1.5"/>
      <path d="M 100 40 Q 60 70 60 100 Q 60 130 100 160" fill="none" stroke="#ffd700" stroke-width="1.5"/>
      <circle cx="100" cy="100" r="8" fill="#ff6b6b"/>
      <line x1="100" y1="30" x2="100" y2="50" stroke="#ffd700" stroke-width="2" marker-end="url(#arrow)"/>
      <line x1="100" y1="150" x2="100" y2="170" stroke="#ffd700" stroke-width="2"/>
    `),
  },
  {
    id: "vesica-piscis",
    name: "Vesica Piscis",
    sanskrit: "मत्स्य वेसिका",
    description:
      "The intersection of two circles of the same radius, where the center of each lies on the circumference of the other. Represents the womb of creation and duality becoming unity.",
    keywords: [
      "vesica",
      "piscis",
      "fish",
      "bladder",
      "intersection",
      "duality",
      "creation",
      "womb",
    ],
    category: "cosmic",
    svg: svgWrapper(`
      <circle cx="75" cy="100" r="50" fill="none" stroke="#4ecdc4" stroke-width="2"/>
      <circle cx="125" cy="100" r="50" fill="none" stroke="#ff6b6b" stroke-width="2"/>
      <path d="M 100 55 Q 85 100 100 145" fill="none" stroke="#ffd700" stroke-width="2"/>
      <path d="M 100 55 Q 115 100 100 145" fill="none" stroke="#ffd700" stroke-width="2"/>
    `),
  },
  {
    id: "prithvi-earth",
    name: "Prithvi - Earth Element",
    sanskrit: "पृथ्वी",
    description:
      "The Earth element representing stability, grounding, and material existence. Associated with the root chakra and the sense of smell.",
    keywords: [
      "earth",
      "prithvi",
      "element",
      "grounding",
      "stability",
      "matter",
      "root",
      "square",
    ],
    category: "element",
    svg: svgWrapper(`
      <rect x="40" y="40" width="120" height="120" fill="#4a3728" stroke="#8b7355" stroke-width="3"/>
      <rect x="60" y="60" width="80" height="80" fill="none" stroke="#ffd700" stroke-width="2"/>
      <text x="100" y="110" font-size="24" fill="#ffd700" text-anchor="middle">पृ</text>
    `),
  },
  {
    id: "jala-water",
    name: "Jala - Water Element",
    sanskrit: "जल",
    description:
      "The Water element representing fluidity, emotion, and adaptability. Associated with the sacral chakra and the sense of taste.",
    keywords: [
      "water",
      "jala",
      "element",
      "fluid",
      "emotion",
      "adaptability",
      "sacral",
      "crescent",
    ],
    category: "element",
    svg: svgWrapper(`
      <circle cx="100" cy="100" r="70" fill="none" stroke="#00bfff" stroke-width="2"/>
      <path d="M 40 100 Q 100 40 160 100 Q 100 160 40 100" fill="#1a5f7a" stroke="#00bfff" stroke-width="2"/>
      <path d="M 60 100 Q 100 60 140 100" fill="none" stroke="#ffd700" stroke-width="2"/>
      <text x="100" y="115" font-size="24" fill="#ffd700" text-anchor="middle">ज</text>
    `),
  },
  {
    id: "agni-fire",
    name: "Agni - Fire Element",
    sanskrit: "अग्नि",
    description:
      "The Fire element representing transformation, energy, and willpower. Associated with the solar plexus chakra and the sense of sight.",
    keywords: [
      "fire",
      "agni",
      "element",
      "transformation",
      "energy",
      "willpower",
      "solar",
      "triangle",
    ],
    category: "element",
    svg: svgWrapper(`
      <polygon points="100,30 40,160 160,160" fill="#8b0000" stroke="#ff6347" stroke-width="3"/>
      <polygon points="100,60 60,140 140,140" fill="none" stroke="#ffd700" stroke-width="2"/>
      <text x="100" y="125" font-size="24" fill="#ffd700" text-anchor="middle">अ</text>
    `),
  },
  {
    id: "vayu-air",
    name: "Vayu - Air Element",
    sanskrit: "वायु",
    description:
      "The Air element representing movement, breath, and freedom. Associated with the heart chakra and the sense of touch.",
    keywords: [
      "air",
      "vayu",
      "element",
      "breath",
      "movement",
      "freedom",
      "heart",
      "hexagram",
    ],
    category: "element",
    svg: svgWrapper(`
      <circle cx="100" cy="100" r="70" fill="none" stroke="#87ceeb" stroke-width="2"/>
      <polygon points="100,45 145,115 55,115" fill="none" stroke="#ffd700" stroke-width="2"/>
      <polygon points="100,155 55,85 145,85" fill="none" stroke="#ffd700" stroke-width="2"/>
      <circle cx="100" cy="100" r="15" fill="#87ceeb"/>
      <text x="100" y="107" font-size="18" fill="#1a0033" text-anchor="middle">वा</text>
    `),
  },
  {
    id: "akasha-ether",
    name: "Akasha - Ether Element",
    sanskrit: "आकाश",
    description:
      "The Ether/Space element representing consciousness, void, and infinite potential. Associated with the throat chakra and the sense of hearing.",
    keywords: [
      "ether",
      "akasha",
      "space",
      "element",
      "void",
      "consciousness",
      "throat",
      "circle",
    ],
    category: "element",
    svg: svgWrapper(`
      <circle cx="100" cy="100" r="70" fill="none" stroke="#9400d3" stroke-width="3"/>
      <circle cx="100" cy="100" r="50" fill="none" stroke="#9400d3" stroke-width="2"/>
      <circle cx="100" cy="100" r="30" fill="none" stroke="#ffd700" stroke-width="2"/>
      <circle cx="100" cy="100" r="10" fill="#ffd700"/>
      <text x="100" y="170" font-size="20" fill="#9400d3" text-anchor="middle">आ</text>
    `),
  },
  {
    id: "bindu-point",
    name: "Bindu - The Point",
    sanskrit: "बिन्दु",
    description:
      "The dimensionless point from which all creation emerges. Represents the seed of consciousness, the origin point of the universe, and the concentrated essence of Shakti.",
    keywords: [
      "bindu",
      "point",
      "origin",
      "seed",
      "consciousness",
      "shakti",
      "source",
      "zero",
    ],
    category: "cosmic",
    svg: svgWrapper(`
      <circle cx="100" cy="100" r="80" fill="none" stroke="#333" stroke-width="1"/>
      <circle cx="100" cy="100" r="60" fill="none" stroke="#444" stroke-width="1"/>
      <circle cx="100" cy="100" r="40" fill="none" stroke="#555" stroke-width="1"/>
      <circle cx="100" cy="100" r="20" fill="none" stroke="#666" stroke-width="1"/>
      <circle cx="100" cy="100" r="8" fill="#ffd700" stroke="#fff" stroke-width="2"/>
    `),
  },
  {
    id: "golden-spiral",
    name: "Golden Spiral",
    description:
      "A logarithmic spiral based on the golden ratio (phi). Found throughout nature in shells, galaxies, and hurricanes. Represents infinite growth and divine proportion.",
    keywords: [
      "golden",
      "spiral",
      "phi",
      "fibonacci",
      "ratio",
      "nature",
      "growth",
      "divine",
    ],
    category: "cosmic",
    svg: svgWrapper(`
      <path d="M 100 100
               Q 100 70 130 70
               Q 160 70 160 100
               Q 160 140 120 140
               Q 60 140 60 80
               Q 60 20 120 20
               Q 180 20 180 80
               Q 180 160 100 160"
            fill="none" stroke="#ffd700" stroke-width="2"/>
      <rect x="100" y="100" width="30" height="30" fill="none" stroke="#666" stroke-width="1"/>
      <rect x="100" y="70" width="30" height="30" fill="none" stroke="#666" stroke-width="1"/>
      <rect x="130" y="70" width="30" height="60" fill="none" stroke="#666" stroke-width="1"/>
      <circle cx="100" cy="100" r="3" fill="#ff6b6b"/>
    `),
  },
];

export function searchSGI(query: string): SGI[] {
  if (!query.trim()) return sacredGeometryItems;

  const lowerQuery = query.toLowerCase();
  return sacredGeometryItems.filter(
    (item) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.keywords.some((k) => k.includes(lowerQuery)) ||
      (item.sanskrit && item.sanskrit.includes(query)) ||
      item.category.includes(lowerQuery)
  );
}
