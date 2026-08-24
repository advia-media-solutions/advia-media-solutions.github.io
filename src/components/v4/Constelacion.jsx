import React from "react";

/**
 * Constelación de recorridos: decenas de rutas distintas cruzándose sobre un
 * conjunto pequeño de paradas que se repiten. Es el fallback estático del
 * scroll animado — un crawler o un LLM tienen que poder leer este scroll.
 *
 * Las rutas se generan con un LCG de semilla fija, no con Math.random: el
 * dibujo debe ser idéntico en servidor y en cliente o la hidratación se rompe.
 */

const PARADAS = [
  [120, 250],
  [300, 90],
  [470, 300],
  [640, 140],
  [810, 260],
  [980, 110],
];

function generarRutas(numeroDeRutas) {
  let semilla = 7;
  const siguiente = () => {
    semilla = (semilla * 1103515245 + 12345) % 2147483648;
    return semilla;
  };
  const rutas = [];
  for (let r = 0; r < numeroDeRutas; r += 1) {
    let actual = siguiente() % PARADAS.length;
    const puntos = [];
    for (let paso = 0; paso < 5; paso += 1) {
      const s = siguiente();
      actual = (actual + 1 + (s % 3)) % PARADAS.length;
      const [x, y] = PARADAS[actual];
      puntos.push(`${x + (s % 37) - 18},${y + ((s >> 5) % 31) - 15}`);
    }
    rutas.push(puntos.join(" "));
  }
  return rutas;
}

const RUTAS = generarRutas(34);

export default function Constelacion() {
  return (
    <svg
      viewBox="0 0 1120 390"
      width="100%"
      height="390"
      role="img"
      aria-label="Decenas de recorridos de decisión distintos que se cruzan sobre un conjunto pequeño de paradas repetidas"
    >
      {RUTAS.map((puntos) => (
        <polyline
          key={puntos}
          points={puntos}
          fill="none"
          style={{ stroke: "var(--brand-ivory)", strokeWidth: 1, opacity: 0.16 }}
        />
      ))}
      {PARADAS.map(([x, y], i) => (
        <circle
          key={`halo-${x}-${y}`}
          cx={x}
          cy={y}
          r={24 + (i % 3) * 9}
          style={{ fill: "var(--accent-gold)", opacity: 0.12 }}
        />
      ))}
      {PARADAS.map(([x, y]) => (
        <circle key={`dot-${x}-${y}`} cx={x} cy={y} r="7" style={{ fill: "var(--accent-gold)" }} />
      ))}
    </svg>
  );
}
