import React, { useEffect, useRef, useState } from "react";
import escenaMerecePena from "./escena";
import { useTranslation } from "next-i18next/pages";

/**
 * El loop de GEO: medir → diseñar → crear → medir.
 *
 * Una bola de cristal recorre un anillo sin parar y pasa por tres paradas,
 * que son bolas como las del mapa de /technology (ver CicloEscena). El paso
 * que toca se enciende en la lista de al lado cuando la bola llega a su
 * parada: es lo que convierte la lista en ciclo.
 *
 * La bola no salta de parada en parada: frena al llegar y arranca al salir,
 * como una que de verdad se detuviera. El reloj vive aquí y le da a la escena
 * el instante de la vuelta; la escena solo pinta.
 *
 * Se para cuando no se ve —no hay razón para gastar batería animando algo
 * fuera de pantalla— y con prefers-reduced-motion no gira: se pinta un cuadro
 * con la bola en la primera parada y los tres pasos por igual, que es el
 * contenido.
 *
 * El dibujo va aparte y solo en cliente: three.js no debe entrar en el bundle
 * inicial. Si no llega —o el equipo no da para WebGL— queda la lista, que
 * sigue encendiéndose por turnos.
 */

/** Lo que tarda una vuelta entera, en ms. */
const POR_VUELTA = 8400;

/** Lado del lienzo, en píxeles. Fijo: es una pieza, no un lienzo adaptable. */
const LADO = 300;

const REDUCIDO = "(prefers-reduced-motion: reduce)";

/** Entra y sale suave: la bola frena en cada parada y arranca al salir. */
const suave = (t) => t * t * (3 - 2 * t);

/**
 * Instante de la vuelta a partir del tiempo: cada tramo entre paradas lleva
 * su propia rampa, así la bola se detiene un poco en cada una sin que el
 * reloj se pare.
 */
function vueltaDe(ms, tramos) {
  const bruto = ((ms % POR_VUELTA) / POR_VUELTA) * tramos;
  const tramo = Math.floor(bruto);
  return (tramo + suave(bruto - tramo)) / tramos;
}

export default function Ciclo({ pasos }) {
  const { t } = useTranslation("common");
  const [activo, setActivo] = useState(0);
  const caja = useRef(null);
  const lienzo = useRef(null);
  const motor = useRef(null);

  useEffect(() => {
    const nodo = caja.current;
    const canvas = lienzo.current;
    if (!nodo || !canvas) return undefined;

    const reducido = window.matchMedia(REDUCIDO).matches;
    const total = pasos.length;
    let vivo = true;
    let cuadro = 0;
    let dentro = false;
    /* El reloj cuenta solo mientras se ve: al volver, la bola sigue donde se
       quedó en vez de saltar a donde estaría. */
    let acumulado = 0;
    let desde = 0;

    const pintar = (u) => {
      if (motor.current) motor.current.pintar(u);
      /* El paso activo es la parada más cercana a la bola. */
      setActivo(Math.round(u * total) % total);
    };

    const paso = (ahora) => {
      if (!vivo || !dentro) return;
      pintar(vueltaDe(acumulado + (ahora - desde), total));
      cuadro = requestAnimationFrame(paso);
    };

    const arrancar = () => {
      if (dentro || reducido) return;
      dentro = true;
      desde = performance.now();
      cuadro = requestAnimationFrame(paso);
    };
    const parar = () => {
      if (!dentro) return;
      dentro = false;
      acumulado += performance.now() - desde;
      cancelAnimationFrame(cuadro);
    };

    /* Sin sitio para el dibujo (móvil), la lista sigue encendiéndose por
       turnos, que es el contenido; three.js no se descarga. */
    if (escenaMerecePena(canvas)) {
      import("./CicloEscena")
        .then(({ default: crearCiclo }) => {
          if (!vivo) return;
          motor.current = crearCiclo(canvas, { paradas: total, lado: LADO });
          nodo.dataset.listo = "true";
          /* Un cuadro de entrada, esté girando o no: sin él, hasta que el
             observador dispare el lienzo está vacío. */
          pintar(vueltaDe(acumulado, total));
        })
        .catch(() => {
          /* Sin WebGL queda la lista, que es el contenido. */
        });
    }

    const io = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) arrancar();
        else parar();
      },
      { threshold: 0.2 }
    );
    io.observe(nodo);

    return () => {
      vivo = false;
      io.disconnect();
      cancelAnimationFrame(cuadro);
      if (motor.current) motor.current.destruir();
      motor.current = null;
    };
  }, [pasos.length]);

  return (
    <div className="v4-ciclo" ref={caja}>
      <div className="v4-ciclo__pieza" aria-hidden="true">
        <canvas ref={lienzo} width={LADO} height={LADO} />
      </div>
      {/* Lo que leen los crawlers y quien no ve el dibujo. */}
      <span className="v4-oculto">
        {t("ciclo.oculto", { pasos: pasos.map((p) => p.chip).join(" → ") })}
      </span>
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
