import React, { useEffect, useRef } from "react";

/**
 * El funnel de Paid Media: el embudo lo dibuja la escena, las etiquetas son
 * HTML encima. Cada tramo ocupa su peso, así que el texto se coloca en la misma
 * proporción que la forma y ambos siguen cuadrados a cualquier ancho.
 *
 * Si three no llega o no hay WebGL, quedan las etiquetas apiladas con su filete:
 * el contenido —qué tramo cubre cada quién— se lee igual.
 */
export default function Funnel({ segmentos }) {
  const lienzo = useRef(null);
  const pieza = useRef(null);
  const motor = useRef(null);

  useEffect(() => {
    let vivo = true;
    const canvas = lienzo.current;
    const caja = pieza.current;
    if (!canvas || !caja) return undefined;

    const medir = () => {
      if (motor.current) motor.current.disponer(caja.clientWidth, caja.clientHeight);
    };
    const ro = new ResizeObserver(medir);
    let io;

    import("./FunnelEscena")
      .then(({ default: crearFunnel }) => {
        if (!vivo) return;
        motor.current = crearFunnel(canvas, { tramos: segmentos });
        caja.dataset.listo = "true";
        medir();
        ro.observe(caja);

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          motor.current.completar();
          return;
        }
        io = new IntersectionObserver(
          (entradas) => {
            if (entradas.some((e) => e.isIntersecting)) {
              motor.current.dibujar();
              io.disconnect();
            }
          },
          { threshold: 0.3 }
        );
        io.observe(caja);
      })
      .catch(() => {
        /* Sin dibujo, las etiquetas se bastan. */
      });

    return () => {
      vivo = false;
      ro.disconnect();
      if (io) io.disconnect();
      if (motor.current) motor.current.destruir();
      motor.current = null;
    };
  }, [segmentos]);

  const total = segmentos.reduce((n, s) => n + (s.peso || 1), 0);

  return (
    <div className="v4-funnel v4-mt-12">
      <div className="v4-funnel__pieza" ref={pieza} aria-hidden="true">
        <canvas ref={lienzo} />
      </div>
      <ol className="v4-funnel__tramos">
        {segmentos.map((seg) => (
          <li
            key={seg.label}
            className="v4-funnel__tramo"
            data-destacado={seg.destacado ? "true" : undefined}
            style={{ flexGrow: seg.peso || 1, "--v4-peso": (seg.peso || 1) / total }}
          >
            <div className="v4-label v4-funnel__label">{seg.label}</div>
            <span className="v4-funnel__texto">{seg.texto}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
