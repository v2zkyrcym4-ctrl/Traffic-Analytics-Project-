// Generates elegant branded SVG placeholder images for Greenwood Apartments.
// Replace these with real photography by dropping same-named .jpg/.png files
// into public/images/ (see README.md "Photos" section).
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const palette = {
  forestDark: "#0f271a",
  forest: "#204731",
  forestLight: "#3a6f4f",
  gold: "#cfa348",
  goldLight: "#f3e4bb",
  ivory: "#faf6ee",
};

function icon(kind, cx, cy, scale = 1) {
  const s = scale;
  switch (kind) {
    case "leaf":
      return `<g transform="translate(${cx} ${cy}) scale(${s})" fill="none" stroke="${palette.goldLight}" stroke-width="1.4" opacity="0.85">
        <path d="M -40 40 C -40 -10 -10 -40 40 -40 C 40 10 10 40 -40 40 Z" />
        <path d="M -38 38 C -10 10 10 -10 38 -38" />
      </g>`;
    case "bed":
      return `<g transform="translate(${cx} ${cy}) scale(${s})" fill="none" stroke="${palette.goldLight}" stroke-width="1.4" opacity="0.85">
        <rect x="-46" y="-6" width="92" height="34" rx="6" />
        <path d="M -46 -6 v -14 a 10 10 0 0 1 10 -10 h 20 a 10 10 0 0 1 10 10 v 14" />
        <path d="M 46 -6 v -14 a 10 10 0 0 0 -10 -10 h -20 a 10 10 0 0 0 -10 10 v 14" />
        <path d="M -54 46 v -16" />
        <path d="M 54 46 v -16" />
      </g>`;
    case "arch":
      return `<g transform="translate(${cx} ${cy}) scale(${s})" fill="none" stroke="${palette.goldLight}" stroke-width="1.4" opacity="0.85">
        <path d="M -40 46 V 0 A 40 40 0 0 1 40 0 V 46" />
        <path d="M -52 46 H 52" />
      </g>`;
    case "wave":
      return `<g transform="translate(${cx} ${cy}) scale(${s})" fill="none" stroke="${palette.goldLight}" stroke-width="1.4" opacity="0.85">
        <path d="M -50 -10 C -35 -25 -15 -25 0 -10 C 15 5 35 5 50 -10" />
        <path d="M -50 20 C -35 5 -15 5 0 20 C 15 35 35 35 50 20" />
      </g>`;
    case "sparkle":
      return `<g transform="translate(${cx} ${cy}) scale(${s})" fill="none" stroke="${palette.goldLight}" stroke-width="1.4" opacity="0.85">
        <path d="M 0 -46 L 8 -8 L 46 0 L 8 8 L 0 46 L -8 8 L -46 0 L -8 -8 Z" />
      </g>`;
    default:
      return "";
  }
}

function svg({ w, h, label, sub, kind, seed }) {
  const id = `g${seed}`;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.forestDark}" />
      <stop offset="55%" stop-color="${palette.forest}" />
      <stop offset="100%" stop-color="${palette.forestLight}" />
    </linearGradient>
    <pattern id="grid${seed}" width="42" height="42" patternUnits="userSpaceOnUse">
      <path d="M 42 0 L 0 0 0 42" fill="none" stroke="${palette.ivory}" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#${id})" />
  <rect width="${w}" height="${h}" fill="url(#grid${seed})" />
  ${icon(kind, w / 2, h / 2 - 20, Math.min(w, h) / 220)}
  <text x="50%" y="${h / 2 + h * 0.16}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(h * 0.045)}" fill="${palette.ivory}" letter-spacing="2">${label}</text>
  ${sub ? `<text x="50%" y="${h / 2 + h * 0.16 + h * 0.045}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="${Math.round(h * 0.022)}" fill="${palette.goldLight}" letter-spacing="4">${sub}</text>` : ""}
</svg>`;
}

function write(path, options) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, svg(options));
  console.log("wrote", path);
}

const base = "public/images";

write(`${base}/hero.svg`, { w: 1920, h: 1080, label: "GREENWOOD APARTMENTS", sub: "PHOTO PLACEHOLDER — ODESSA", kind: "leaf", seed: 1 });
write(`${base}/about.svg`, { w: 1200, h: 1400, label: "GREENWOOD", sub: "COURTYARD — PLACEHOLDER", kind: "arch", seed: 2 });

const rooms = [
  { id: "studio", label: "STUDIO GARDEN", kind: "leaf" },
  { id: "one-bedroom", label: "ONE BEDROOM DELUXE", kind: "bed" },
  { id: "suite", label: "EXECUTIVE SUITE", kind: "arch" },
  { id: "penthouse", label: "GREENWOOD PENTHOUSE", kind: "sparkle" },
];
rooms.forEach((r, i) => {
  write(`${base}/rooms/${r.id}.svg`, { w: 1200, h: 900, label: r.label, sub: "PHOTO PLACEHOLDER", kind: r.kind, seed: 10 + i });
});

const galleryKinds = ["leaf", "bed", "arch", "wave", "sparkle", "leaf", "bed", "arch"];
for (let i = 1; i <= 8; i++) {
  write(`${base}/gallery/${i}.svg`, { w: 1000, h: 1250, label: "GREENWOOD", sub: `GALLERY · 0${i}`, kind: galleryKinds[i - 1], seed: 20 + i });
}

write(`${base}/location.svg`, { w: 1400, h: 900, label: "GREENWOOD ODESSA", sub: "LOCATION — PLACEHOLDER", kind: "wave", seed: 30 });
