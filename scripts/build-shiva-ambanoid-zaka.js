#!/usr/bin/env node

/**
 * Shiva Ambanoid Zaka - Sacred Geometry Data Flow Diagram
 *
 * Based on Yogic Sciences and the 4 primordial sounds:
 * - SA - Expansion (Shiva) - Circle
 * - HA - Contraction (Shakti) - Square
 * - NA - Resonance (Nada) - Triangle
 * - MA - Manifestation (Maya) - Diamond
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'diagrams');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'shiva-ambanoid-zaka.svg');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
  <defs>
    <style>
      .title { font: bold 24px sans-serif; fill: #1a0033; text-anchor: middle; }
      .label { font: bold 14px sans-serif; fill: white; text-anchor: middle; }
      .sublabel { font: 11px sans-serif; fill: white; text-anchor: middle; }
      .sanskrit { font: 16px sans-serif; fill: white; text-anchor: middle; }
      .flow-label { font: 10px sans-serif; fill: #666; text-anchor: middle; }
      .arrow { stroke: #333; stroke-width: 2; fill: none; marker-end: url(#arrowhead); }
      .return-arrow { stroke: #999; stroke-width: 1.5; stroke-dasharray: 5,3; fill: none; marker-end: url(#arrowhead-light); }
    </style>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
    <marker id="arrowhead-light" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#999"/>
    </marker>
  </defs>

  <!-- Background -->
  <rect width="600" height="800" fill="#fafafa"/>

  <!-- Title -->
  <text x="300" y="40" class="title">SHIVA AMBANOID ZAKA</text>
  <text x="300" y="60" style="font: 12px sans-serif; fill: #666; text-anchor: middle;">Sacred Geometry - The 4 Sounds</text>

  <!-- SOURCE - Bindu Point (small circle at top) -->
  <circle cx="300" cy="100" r="20" fill="#1a0033" stroke="#ffd700" stroke-width="3"/>
  <text x="300" y="105" class="label" style="font-size: 16px;">∞</text>

  <!-- SA - CIRCLE (Expansion/Shiva) - Purple -->
  <circle cx="300" cy="200" r="60" fill="#9400d3" stroke="#ffd700" stroke-width="2"/>
  <text x="300" y="190" class="label">SA</text>
  <text x="300" y="207" class="sanskrit">सः</text>
  <text x="300" y="225" class="sublabel">Expansion</text>

  <!-- HA - SQUARE (Contraction/Shakti) - Blue -->
  <rect x="240" y="290" width="120" height="120" fill="#4169e1" stroke="#00bfff" stroke-width="2"/>
  <text x="300" y="340" class="label">HA</text>
  <text x="300" y="357" class="sanskrit">हं</text>
  <text x="300" y="375" class="sublabel">Contraction</text>

  <!-- NA - TRIANGLE (Resonance/Nada) - Green -->
  <polygon points="300,440 240,540 360,540" fill="#228b22" stroke="#7fff00" stroke-width="2"/>
  <text x="300" y="500" class="label">NA</text>
  <text x="300" y="517" class="sanskrit">नं</text>
  <text x="300" y="534" class="sublabel">Resonance</text>

  <!-- MA - DIAMOND (Manifestation/Maya) - Red -->
  <polygon points="300,570 240,640 300,710 360,640" fill="#8b0000" stroke="#ff6347" stroke-width="2"/>
  <text x="300" y="630" class="label">MA</text>
  <text x="300" y="647" class="sanskrit">मं</text>
  <text x="300" y="664" class="sublabel">Manifestation</text>

  <!-- EARTH - Small square at bottom -->
  <rect x="275" y="740" width="50" height="50" fill="#4a3728" stroke="#8b7355" stroke-width="2"/>
  <text x="300" y="770" class="label" style="font-size: 11px;">BHUMI</text>

  <!-- Descending Flow Arrows (Pravritti) - Left side -->
  <path d="M 280 120 L 280 140" class="arrow"/>
  <path d="M 280 260 L 280 290" class="arrow"/>
  <path d="M 280 410 L 280 445" class="arrow"/>
  <path d="M 280 540 L 280 575" class="arrow"/>
  <path d="M 280 710 L 280 740" class="arrow"/>

  <!-- Ascending Flow Arrows (Nivritti) - Right side -->
  <path d="M 320 740 L 320 710" class="return-arrow"/>
  <path d="M 320 570 L 320 540" class="return-arrow"/>
  <path d="M 320 440 L 320 410" class="return-arrow"/>
  <path d="M 320 290 L 320 260" class="return-arrow"/>
  <path d="M 320 140 L 320 120" class="return-arrow"/>

  <!-- Flow Labels -->
  <text x="255" y="135" class="flow-label">↓ Pravritti</text>
  <text x="350" y="135" class="flow-label">↑ Nivritti</text>

  <!-- Legend -->
  <g transform="translate(480, 150)">
    <text x="0" y="0" style="font: bold 12px sans-serif; fill: #333;">LEGEND</text>

    <circle cx="15" cy="25" r="10" fill="#9400d3"/>
    <text x="35" y="30" style="font: 11px sans-serif; fill: #333;">Circle = SA</text>

    <rect x="5" y="45" width="20" height="20" fill="#4169e1"/>
    <text x="35" y="60" style="font: 11px sans-serif; fill: #333;">Square = HA</text>

    <polygon points="15,75 5,95 25,95" fill="#228b22"/>
    <text x="35" y="90" style="font: 11px sans-serif; fill: #333;">Triangle = NA</text>

    <polygon points="15,105 5,120 15,135 25,120" fill="#8b0000"/>
    <text x="35" y="125" style="font: 11px sans-serif; fill: #333;">Diamond = MA</text>
  </g>

  <!-- Side Labels -->
  <g transform="translate(50, 200)">
    <text x="0" y="0" style="font: 10px sans-serif; fill: #9400d3;">Crown Chakra</text>
    <text x="0" y="120" style="font: 10px sans-serif; fill: #4169e1;">Heart Chakra</text>
    <text x="0" y="280" style="font: 10px sans-serif; fill: #228b22;">Solar Plexus</text>
    <text x="0" y="440" style="font: 10px sans-serif; fill: #8b0000;">Root Chakra</text>
  </g>

</svg>`;

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Write the SVG
fs.writeFileSync(OUTPUT_FILE, svg);

console.log(`
╔══════════════════════════════════════════════════════════════════╗
║                    SHIVA AMBANOID ZAKA                           ║
║              Sacred Geometry Data Flow Diagram                   ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  The 4 Primordial Sounds & Their Geometric Forms:               ║
║                                                                  ║
║    ● SA (सः) - Circle   - Expansion (Shiva)                     ║
║    ■ HA (हं) - Square   - Contraction (Shakti)                  ║
║    ▲ NA (नं) - Triangle - Resonance (Nada)                      ║
║    ◆ MA (मं) - Diamond  - Manifestation (Maya)                  ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  Information Flow:                                               ║
║                                                                  ║
║    ↓ PRAVRITTI - Descent from Source to Earth                   ║
║    ↑ NIVRITTI  - Ascent from Earth to Source                    ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║  Output: diagrams/shiva-ambanoid-zaka.svg                        ║
╚══════════════════════════════════════════════════════════════════╝
`);

console.log('Open the SVG file in any browser or image viewer.');
console.log('');
