import React, { useCallback, useEffect, useRef } from "react";
import { CORTE_ESCENA } from "../escena";
import useProgresoPegado, { posa, suave, tramo } from "./useProgresoPegado";

/**
 * El recorrido de Navegación Activa en móvil: la escena de escritorio, en
 * vertical, sin WebGL y ordenada como una línea de tiempo.
 *
 * Arriba, la esfera a la izquierda y a su lado la premisa (la mujer de 35
 * años que quiere cambiar de coche): quien entra ve desde el primer momento
 * de quién va la historia. Debajo de la esfera baja una línea recta y, con el
 * scroll, se va dibujando; en cada parada una bola se posa sobre ella y a su
 * derecha aparecen el medio y la pregunta.
 *
 * Se probó el zigzag de escritorio llevado a vertical y confundía: en 390px
 * la curva obliga a alternar fichas a los dos lados y el ojo no sabe qué va
 * después de qué. Una recta con todo alineado a la izquierda se lee de un
 * vistazo, y el argumento («nadie lo planifica») ya lo cuenta la sección.
 *
 * Todo lo gobierna el scroll (useProgresoPegado): la escena se queda pegada
 * mientras el contenedor pasa. Por frame solo se tocan `transform` y
 * `opacity`; las posiciones de las paradas se miden al montar y al cambiar
 * de tamaño, nunca por frame.
 *
 * El texto de las paradas y de la premisa es el mismo que en escritorio y
 * está en el DOM aunque aún no se vea: lo que se anima es cómo aparece, no
 * si existe.
 */

/* Cuándo sale y cuándo llega cada bola, en progreso 0..1. Seguidas y sin
   solaparse: en una recta, dos bolas bajando a la vez se leerían como una
   sola. La primera sale casi al entrar, para que no haya pantalla vacía. */
const SALIDA = 0.03;
const TRAMO_BOLA = 0.17;
const VIAJES = [0, 1, 2, 3, 4].map((i) => ({
  desde: SALIDA + i * TRAMO_BOLA,
  hasta: SALIDA + (i + 1) * TRAMO_BOLA,
}));
const MEDIOS = { Web: "v4-chip--gold", YouTube: "v4-chip--rojo", ChatGPT: "" };
/* La escena empieza a contar cuando su borde superior está a esta fracción
   de pantalla, antes de pegarse: así la primera parada ya está llegando
   mientras la escena sube, y no se entra a un hueco en blanco. */
const ANTES = 0.75;

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
  const contenedor = useRef(null);
  const pegado = useRef(null);
  const cuadro = useRef(null);
  const esfera = useRef(null);
  const linea = useRef(null);
  const bolas = useRef([]);
  const fichas = useRef([]);
  /* Geometría medida: arranque de la línea, centro de cada parada y cuánto
     sobra la columna respecto a la pantalla pegada. */
  const medidas = useRef(null);
  const ultimo = useRef(0);

  const pintar = useCallback((p) => {
    ultimo.current = p;
    const m = medidas.current;
    if (!m || !linea.current) return;
    let cabeza = m.inicio;
    VIAJES.forEach((v, i) => {
      const t = tramo(p, v.desde, v.hasta);
      const origen = i === 0 ? m.inicio : m.paradas[i - 1];
      const destino = m.paradas[i];
      if (destino === undefined) return;
      const y = origen + (destino - origen) * posa(t);
      if (t > 0) cabeza = Math.max(cabeza, y);
      const bola = bolas.current[i];
      if (bola) {
        /* La bola va en la punta de la línea: baja con ella y se posa. */
        bola.style.opacity = t > 0 ? "1" : "0";
        bola.style.transform = `translateY(${y - destino}px)`;
      }
      if (fichas.current[i]) fichas.current[i].dataset.puesta = t >= 1 ? "true" : "";
    });
    const largo = m.fin - m.inicio;
    linea.current.style.transform = `scaleY(${largo > 0 ? (cabeza - m.inicio) / largo : 0})`;
    /* Si la columna no cabe en la pantalla pegada, sube a la vez que avanza
       el recorrido para que la parada activa quede siempre a la vista. */
    if (cuadro.current) {
      const sube = m.exceso * suave(tramo(p, VIAJES[0].hasta, VIAJES[VIAJES.length - 1].hasta));
      cuadro.current.style.transform = sube ? `translateY(${-sube}px)` : "";
    }
  }, []);

  /* Se mide al montar, al cambiar de tamaño y cuando llegan las fuentes (el
     alto de las preguntas depende de ellas). Va antes que useProgresoPegado
     para que el primer pintado ya tenga geometría. */
  useEffect(() => {
    const caja = cuadro.current;
    if (!caja || !window.matchMedia(CORTE_ESCENA).matches) return undefined;
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
      const hueco = pegado.current ? pegado.current.clientHeight : caja.offsetHeight;
      const estilo = pegado.current ? getComputedStyle(pegado.current) : null;
      const relleno = estilo
        ? parseFloat(estilo.paddingTop) + parseFloat(estilo.paddingBottom)
        : 0;
      medidas.current = {
        inicio,
        fin,
        paradas: ys,
        exceso: Math.max(0, caja.offsetHeight - (hueco - relleno)),
      };
      pintar(ultimo.current);
    };
    medir();
    const obs = new ResizeObserver(medir);
    obs.observe(caja);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(medir);
    return () => obs.disconnect();
  }, [pintar]);

  useProgresoPegado(contenedor, pintar, { solo: CORTE_ESCENA, antes: ANTES });

  return (
    <div className="v4-rmov" ref={contenedor}>
      <div className="v4-rmov__pegado" ref={pegado}>
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
    </div>
  );
}
