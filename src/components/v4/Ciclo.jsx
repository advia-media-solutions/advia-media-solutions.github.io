import React, { useEffect, useRef, useState } from "react";

/**
 * El loop de GEO: medir → estrategia → contenido → medir.
 *
 * Gira solo. El wireframe lo pide explícito —"el bucle debe leerse como ciclo,
 * no como lista"—, y un ciclo se entiende viéndolo dar la vuelta, no empujándolo
 * con el scroll: el lector llega, mira dos segundos y ya sabe que aquello no
 * tiene final. El arco dorado recorre el anillo y va encendiendo cada paso.
 *
 * Se para cuando no se ve —no hay razón para gastar batería animando algo fuera
 * de pantalla— y con prefers-reduced-motion no gira: se muestran los tres pasos
 * por igual, que es el contenido.
 */

/** Lo que se queda en cada paso antes de pasar al siguiente. */
const POR_PASO = 2600;

const R = 104;
const CENTRO = 130;

/** Ángulo de cada nodo: arranca arriba y gira en el sentido de las agujas. */
function puntoDe(i, total) {
  const a = (i / total) * Math.PI * 2 - Math.PI / 2;
  return { x: CENTRO + R * Math.cos(a), y: CENTRO + R * Math.sin(a) };
}

export default function Ciclo({ pasos }) {
  const [activo, setActivo] = useState(0);
  const [girando, setGirando] = useState(true);
  const caja = useRef(null);

  useEffect(() => {
    const nodo = caja.current;
    if (!nodo) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let reloj;
    const arrancar = () => {
      if (reloj) return;
      reloj = setInterval(() => setActivo((i) => (i + 1) % pasos.length), POR_PASO);
    };
    const parar = () => {
      clearInterval(reloj);
      reloj = null;
    };

    const io = new IntersectionObserver(
      (entradas) => {
        const dentro = entradas.some((e) => e.isIntersecting);
        setGirando(dentro);
        if (dentro) arrancar();
        else parar();
      },
      { threshold: 0.2 }
    );
    io.observe(nodo);

    return () => {
      io.disconnect();
      parar();
    };
  }, [pasos.length]);

  const total = pasos.length;
  const puntos = pasos.map((_, i) => puntoDe(i, total));

  return (
    <div className="v4-ciclo" ref={caja}>
      <svg
        className="v4-ciclo__anillo"
        viewBox="0 0 260 260"
        role="img"
        aria-label={`Ciclo de ${pasos.map((p) => p.chip).join(" a ")}, y vuelta a empezar.`}
      >
        <circle cx={CENTRO} cy={CENTRO} r={R} className="v4-ciclo__pista" pathLength="100" />
        {/* El arco que gira: cubre un tramo y avanza de paso en paso, así el
            anillo se lee como recorrido y no como adorno. */}
        <circle
          cx={CENTRO}
          cy={CENTRO}
          r={R}
          className="v4-ciclo__arco"
          pathLength="100"
          data-girando={girando ? "true" : undefined}
          style={{
            strokeDasharray: `${100 / total} ${100 - 100 / total}`,
            strokeDashoffset: -(100 / total) * activo,
          }}
        />
        {puntos.map((p, i) => (
          <g key={pasos[i].chip}>
            <circle
              cx={p.x}
              cy={p.y}
              r={i === activo ? 13 : 8}
              className="v4-ciclo__nodo"
              data-activo={i === activo ? "true" : undefined}
            />
          </g>
        ))}
      </svg>
      <ol className="v4-ciclo__pasos">
        {pasos.map((paso, i) => (
          <li
            key={paso.chip}
            className="v4-ciclo__paso"
            data-activo={i === activo ? "true" : undefined}
            aria-current={i === activo ? "step" : undefined}
          >
            <span className="v4-chip">{paso.chip}</span>
            <p className="v4-body">{paso.texto}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
