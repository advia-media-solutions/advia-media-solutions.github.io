import React, { useEffect, useRef, useState } from "react";
import { Label } from "./primitives";

/**
 * Escena de construcción: los pasos a la izquierda y la esfera a la derecha,
 * ambos gobernados por la misma barra de scroll.
 *
 * NO retiene el scroll. La versión anterior era un carril de varias pantallas
 * con un panel pegado dentro: por corto que se hiciera el carril, ese exceso de
 * alto es scroll vacío cuyo único fin es animar, y se siente como un peaje.
 * Aquí la sección ocupa lo que ocupa su contenido y el progreso sale de por
 * dónde va cruzando la pantalla. La página nunca deja de avanzar al ritmo
 * normal; la esfera cambia mientras pasas por delante.
 *
 * La esfera se carga aparte y solo en cliente: three.js no debe entrar en el
 * bundle inicial. Mientras llega —o si nunca llega, o si el equipo no da para
 * WebGL— los pasos funcionan igual, porque el acordeón no depende de ella.
 */

/** t del motor en cada parada. El 0.42 es el INTRO_SPLIT del prototipo. */
const PARADAS = [0, 0.42, 1];

/**
 * Reposo al entrar y al salir de cada tramo, en fracción del tramo. Sin esto la
 * esfera no para nunca: llega a la forma del paso y ya está saliendo de ella,
 * y no llegas a ver ninguna de las tres claves quieta. Con el carril acortado
 * se recorta también el reposo, para que la parte que se mueve siga siendo la
 * mayor parte del tramo: con tramos cortos, un reposo generoso convierte la
 * transición en un salto brusco entre dos esperas.
 */
const REPOSO = 0.16;

/**
 * Ventana útil dentro de la travesía: las paradas ocurren mientras la sección
 * está francamente en pantalla, no cuando asoma por el borde o ya se va.
 *
 * La ventana está calzada entre dos fallos opuestos. Abierta al final (0.78) el
 * tercer paso se abría con la escena ya saliendo por arriba, y lo leías cuando
 * estabas en la sección siguiente. Abierta al principio (0.22) arrancaba con el
 * bloque apenas asomando, y cuando llegabas a mirarlo ya se lo había contado
 * todo. Con 0.32–0.72 los tres pasos caen mientras la escena cruza el centro.
 */
const ENTRADA = 0.32;
const SALIDA = 0.72;

function progresoDeForma(p) {
  const tramos = PARADAS.length - 1;
  const x = p * tramos;
  const i = Math.min(tramos - 1, Math.floor(x));
  const bruto = (x - i - REPOSO) / (1 - 2 * REPOSO);
  const s = Math.max(0, Math.min(1, bruto));
  const suave = s * s * (3 - 2 * s);
  return PARADAS[i] + (PARADAS[i + 1] - PARADAS[i]) * suave;
}

export default function EscenaConstruccion({ pasos }) {
  const carril = useRef(null);
  const lienzo = useRef(null);
  const motor = useRef(null);
  const [activo, setActivo] = useState(0);

  // ── La esfera ─────────────────────────────────────────────────────────────
  useEffect(() => {
    let vivo = true;
    const canvas = lienzo.current;
    if (!canvas) return undefined;

    import("./EsferaFacetada")
      .then(({ default: crearEsfera }) => {
        if (!vivo) return;
        const m = crearEsfera(canvas, { fondo: "#FCFDFD" });
        // El precálculo de los tres campos bloquea ~1s: se deja para después
        // del primer pintado para no comerse la entrada de la sección.
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            if (!vivo) return;
            m.preparar();
            motor.current = m;
            canvas.parentElement.dataset.listo = "true";
          })
        );
      })
      .catch(() => {
        /* Sin WebGL o sin three: la columna de pasos se basta sola. */
      });

    return () => {
      vivo = false;
      if (motor.current) motor.current.destruir();
      motor.current = null;
    };
  }, []);

  // ── El scroll manda ───────────────────────────────────────────────────────
  useEffect(() => {
    const nodo = carril.current;
    if (!nodo) return undefined;

    let pedido = 0;
    const medir = () => {
      pedido = 0;
      const caja = nodo.getBoundingClientRect();
      // Travesía completa: de asomar por abajo a desaparecer por arriba.
      const recorrido = caja.height + window.innerHeight;
      if (recorrido <= 0) return;
      const bruto = (window.innerHeight - caja.top) / recorrido;
      // Se estira la ventana central sobre todo el rango [0,1]
      const p = Math.min(1, Math.max(0, (bruto - ENTRADA) / (SALIDA - ENTRADA)));

      const tramos = PARADAS.length - 1;
      setActivo(Math.min(tramos, Math.round(p * tramos)));
      if (motor.current) motor.current.progreso(progresoDeForma(p));
    };
    const alScroll = () => {
      if (!pedido) pedido = requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener("scroll", alScroll, { passive: true });
    window.addEventListener("resize", alScroll);
    return () => {
      cancelAnimationFrame(pedido);
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alScroll);
    };
  }, []);

  return (
    <div className="v4-escena" ref={carril} data-paradas={pasos.length}>
      <div className="v4-escena__panel">
        <ol className="v4-escena__pasos">
          {pasos.map((paso, i) => (
            <li
              key={paso.num}
              className="v4-paso-abre"
              data-abierto={i === activo ? "true" : undefined}
              aria-current={i === activo ? "step" : undefined}
            >
              <div className="v4-paso-abre__head">
                <span className="v4-fila__num">{paso.num}</span>
                <h3 className="v4-subheading">{paso.titulo}</h3>
              </div>
              <div className="v4-paso-abre__cuerpo">
                <div className="v4-paso-abre__interior">
                  <p className="v4-body">{paso.desc}</p>
                  <div className="v4-fila__eco">
                    <Label tono="faint">{paso.rotulo}</Label>
                    <p>{paso.eco}</p>
                  </div>
                  <span className="v4-chip">{paso.tag}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="v4-escena__pieza">
          <canvas ref={lienzo} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
