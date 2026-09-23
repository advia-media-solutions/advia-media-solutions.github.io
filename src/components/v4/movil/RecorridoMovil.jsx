import React, { useCallback, useEffect, useRef } from "react";
import { CORTE_ESCENA } from "../escena";
import { tramo } from "./useProgresoPegado";

/**
 * El recorrido de Navegación Activa en móvil: la escena de escritorio, en
 * vertical, sin WebGL y ordenada como una línea de tiempo.
 *
 * Arriba, la esfera a la izquierda y a su lado la premisa (la mujer de 35
 * años que quiere cambiar de coche): quien entra ve desde el primer momento
 * de quién va la historia. Debajo de la esfera baja una línea recta que se va
 * dibujando con el scroll; en cada parada una bola se posa sobre ella y a su
 * derecha aparecen el medio y la pregunta.
 *
 * Se probó el zigzag de escritorio llevado a vertical y confundía: en 390px
 * la curva obliga a alternar fichas a los dos lados y el ojo no sabe qué va
 * después de qué. Una recta con todo alineado a la izquierda se lee de un
 * vistazo, y el argumento («nadie lo planifica») ya lo cuenta la sección.
 *
 * No se pega: la columna va en el flujo y la punta de la línea sigue a una
 * marca fija de la pantalla (MARCA). Cada parada se completa cuando pasa por
 * esa marca, así que las bolas van saliendo a medida que se baja, sin frenar
 * el scroll. Antes iba pegada casi dos pantallas y en móvil se sentía como
 * una página atascada. Por frame solo se tocan `transform` y `opacity`; las
 * posiciones de las paradas se miden al montar y al cambiar de tamaño.
 *
 * El texto de las paradas y de la premisa es el mismo que en escritorio y
 * está en el DOM aunque aún no se vea: lo que se anima es cómo aparece, no
 * si existe.
 */

const MEDIOS = { Web: "v4-chip--gold", YouTube: "v4-chip--rojo", ChatGPT: "" };
/* Altura de la pantalla, en fracción desde arriba, a la que va la punta de la
   línea: una parada se completa cuando cruza esta marca, con aire por debajo
   para leerla antes de que llegue la siguiente. */
const MARCA = 0.62;

/**
 * Centro de la bola de una parada, relativo al cuadro. Se mide desde la fila
 * (que no se mueve) y no desde la bola, que puede estar a medio viaje con su
 * `translateY` puesto cuando se vuelve a medir.
 */
const centroBola = (bola, base) =>
  bola.parentElement.getBoundingClientRect().top +
  bola.offsetHeight / 2 -
  base.getBoundingClientRect().top;

export default function RecorridoMovil({ paradas, nota }) {
  const cuadro = useRef(null);
  const esfera = useRef(null);
  const linea = useRef(null);
  const bolas = useRef([]);
  const fichas = useRef([]);
  /* Geometría medida: arranque de la línea y centro de cada parada. */
  const medidas = useRef(null);

  /* `cabeza` es dónde va la punta de la línea, en px desde arriba del cuadro.
     Cada bola viaja de la parada anterior a la suya montada en la punta. */
  const pintar = useCallback((cabeza) => {
    const m = medidas.current;
    if (!m || !linea.current) return;
    const punta = Math.min(m.fin, Math.max(m.inicio, cabeza));
    m.paradas.forEach((destino, i) => {
      const origen = i === 0 ? m.inicio : m.paradas[i - 1];
      const t = tramo(punta, origen, destino);
      const bola = bolas.current[i];
      if (bola) {
        bola.style.opacity = t > 0 ? "1" : "0";
        bola.style.transform = `translateY(${(origen + (destino - origen) * t) - destino}px)`;
      }
      if (fichas.current[i]) fichas.current[i].dataset.puesta = t >= 1 ? "true" : "";
    });
    const largo = m.fin - m.inicio;
    linea.current.style.transform = `scaleY(${largo > 0 ? (punta - m.inicio) / largo : 1})`;
  }, []);

  useEffect(() => {
    const caja = cuadro.current;
    if (!caja || !window.matchMedia(CORTE_ESCENA).matches) return undefined;
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pedido = 0;
    const dondeVa = () =>
      quieto ? Infinity : window.innerHeight * MARCA - caja.getBoundingClientRect().top;
    const alScroll = () => {
      pedido = 0;
      pintar(dondeVa());
    };
    const pedir = () => {
      if (!pedido) pedido = requestAnimationFrame(alScroll);
    };
    /* Se mide al montar, al cambiar de tamaño y cuando llegan las fuentes (el
       alto de las preguntas depende de ellas). */
    const medir = () => {
      if (!esfera.current || !linea.current) return;
      const e = esfera.current.getBoundingClientRect();
      /* La línea nace bajo la esfera, un poco metida en ella: el dibujo no
         llena la imagen y así el trazo sale del cuerpo, no del aire. */
      const inicio = e.bottom - caja.getBoundingClientRect().top - e.height * 0.12;
      const ys = bolas.current.filter(Boolean).map((b) => centroBola(b, caja));
      const fin = ys.length ? ys[ys.length - 1] : inicio;
      linea.current.style.top = `${inicio}px`;
      linea.current.style.height = `${Math.max(0, fin - inicio)}px`;
      medidas.current = { inicio, fin, paradas: ys };
      pintar(dondeVa());
    };
    medir();
    const obs = new ResizeObserver(medir);
    obs.observe(caja);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(medir);
    if (!quieto) {
      window.addEventListener("scroll", pedir, { passive: true });
      window.addEventListener("resize", pedir);
    }
    return () => {
      cancelAnimationFrame(pedido);
      obs.disconnect();
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
    };
  }, [pintar]);

  return (
    <div className="v4-rmov">
      <div className="v4-rmov__cuadro" ref={cuadro}>
        <div className="v4-rmov__cabeza">
          <img
            ref={esfera}
            className="v4-rmov__esfera"
            src="/img/esfera-hero.webp"
            alt=""
            width="510"
            height="400"
            loading="lazy"
            decoding="async"
          />
          {nota ? <div className="v4-rmov__premisa">{nota}</div> : null}
        </div>
        <span className="v4-rmov__linea" ref={linea} aria-hidden="true" />
        <ol className="v4-rmov__fichas">
          {paradas.map((parada, i) => (
            <li
              key={`${parada.chip}-${i}`}
              className="v4-rmov__ficha"
              ref={(el) => {
                fichas.current[i] = el;
              }}
            >
              <img
                className="v4-rmov__bola"
                src="/img/bola.webp"
                alt=""
                width="28"
                height="28"
                loading="lazy"
                decoding="async"
                ref={(el) => {
                  bolas.current[i] = el;
                }}
              />
              <div className="v4-rmov__texto">
                <span className={`v4-chip ${MEDIOS[parada.chip] || ""}`.trim()}>
                  {parada.chip}
                </span>
                <p className="v4-body">{parada.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
