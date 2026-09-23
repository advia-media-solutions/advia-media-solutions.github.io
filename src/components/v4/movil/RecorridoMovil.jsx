import React, { useCallback, useEffect, useRef } from "react";
import { CORTE_ESCENA } from "../escena";
import useProgresoPegado, { posa } from "./useProgresoPegado";
import { pintarTrazo, prepararTrazo } from "./trazo";

/**
 * El recorrido de Navegación Activa en móvil: la escena de escritorio, en
 * vertical y sin WebGL.
 *
 * Mismo argumento, mismo gesto: la esfera arriba a la derecha suelta cinco
 * bolas y cada una baja por el camino hasta su parada, donde aparece la
 * pregunta. El camino se dibuja por delante de la bola que va en cabeza. Todo
 * lo gobierna el scroll: la escena se queda pegada una pantalla mientras el
 * contenedor pasa (ver useProgresoPegado), así que quien mira lleva el ritmo.
 *
 * El texto de las paradas es el mismo que en escritorio y está en el DOM
 * aunque su bola no haya llegado: lo que se anima es cómo aparece, no si
 * existe.
 */

/* El cuadro, en unidades: portrait, con la esfera arriba a la derecha y el
   camino bajando en zigzag para que cada parada tenga hueco para su ficha. */
export const ANCHO = 390;
export const ALTO = 640;
const ESFERA = { x: 296, y: 92, r: 62 };
const PARADAS = [
  { x: 232, y: 186, lado: "izda" },
  { x: 118, y: 292, lado: "dcha" },
  { x: 258, y: 398, lado: "izda" },
  { x: 116, y: 500, lado: "dcha" },
  { x: 256, y: 596, lado: "izda" },
];
const CAMINO =
  "M296 114 C288 146 258 160 232 186 C196 224 138 246 118 292 C98 340 232 352 258 398 " +
  "C286 448 148 452 116 500 C88 546 230 552 256 596 C270 620 282 630 292 640";
/* Cuándo sale y cuándo llega cada bola, en progreso 0..1. Se solapan: la
   siguiente arranca cuando la anterior va por la mitad, como en escritorio. */
const VIAJES = PARADAS.map((_, i) => ({
  desde: 0.04 + i * 0.16,
  hasta: 0.04 + i * 0.16 + 0.26,
}));
const MEDIOS = { Web: "v4-chip--gold", YouTube: "v4-chip--rojo", ChatGPT: "" };

export default function RecorridoMovil({ paradas }) {
  const contenedor = useRef(null);
  const path = useRef(null);
  const bolas = useRef([]);
  const fichas = useRef([]);
  const trazo = useRef(null);
  const ultimo = useRef(0);

  useEffect(() => {
    if (path.current && !trazo.current) {
      trazo.current = prepararTrazo(
        path.current,
        PARADAS.map((p) => [p.x, p.y]),
      );
      pintarTrazo(
        trazo.current,
        path.current,
        bolas.current,
        fichas.current,
        VIAJES,
        ultimo.current,
        posa,
      );
    }
  }, []);

  const pintar = useCallback((p) => {
    ultimo.current = p;
    if (!trazo.current || !path.current) return;
    pintarTrazo(
      trazo.current,
      path.current,
      bolas.current,
      fichas.current,
      VIAJES,
      p,
      posa,
    );
  }, []);
  useProgresoPegado(contenedor, pintar, { solo: CORTE_ESCENA });

  return (
    <div className="v4-rmov" ref={contenedor}>
      <div className="v4-rmov__pegado">
        <div
          className="v4-rmov__cuadro"
          style={{ aspectRatio: `${ANCHO} / ${ALTO}` }}
        >
          <svg
            viewBox={`0 0 ${ANCHO} ${ALTO}`}
            className="v4-rmov__svg"
            aria-hidden="true"
          >
            <path ref={path} d={CAMINO} className="v4-rmov__camino" />
            {PARADAS.map((p, i) => (
              <image
                key={`${p.x}-${p.y}`}
                href="/img/bola.webp"
                x="-14"
                y="-14"
                width="28"
                height="28"
                className="v4-rmov__bola"
                ref={(el) => {
                  bolas.current[i] = el;
                }}
              />
            ))}
          </svg>
          <img
            className="v4-rmov__esfera"
            src="/img/esfera-hero.webp"
            alt=""
            width="510"
            height="400"
            loading="lazy"
            decoding="async"
            style={{
              left: `${(ESFERA.x / ANCHO) * 100}%`,
              top: `${(ESFERA.y / ALTO) * 100}%`,
              width: `${((ESFERA.r * 2.2) / ANCHO) * 100}%`,
            }}
          />
          <ol className="v4-rmov__fichas">
            {paradas.map((parada, i) => {
              const p = PARADAS[i] || PARADAS[PARADAS.length - 1];
              return (
                <li
                  key={`${parada.chip}-${i}`}
                  className="v4-rmov__ficha"
                  data-lado={p.lado}
                  ref={(el) => {
                    fichas.current[i] = el;
                  }}
                  style={{
                    left: `${(p.x / ANCHO) * 100}%`,
                    top: `${(p.y / ALTO) * 100}%`,
                  }}
                >
                  <span
                    className={`v4-chip ${MEDIOS[parada.chip] || ""}`.trim()}
                  >
                    {parada.chip}
                  </span>
                  <p className="v4-body">{parada.texto}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
