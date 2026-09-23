import React, { useCallback, useRef } from "react";
import { useRouter } from "next/router";
import EscenaChat from "./ComoFuncionaChat";
import {
  EscenaCalendario,
  EscenaMedicion,
  EscenaPlan,
  EscenaRelevancia,
} from "./ComoFuncionaEscenas";
import { INICIOS, FINALES, escenaEn, progreso, ventana } from "./comoFuncionaTiempo";
import useRelojEscenas from "./useRelojEscenas";

/**
 * Cómo funciona el posicionamiento en IA, en siete pasos que se cuentan solos:
 * simulamos, escaneamos, extraemos, priorizamos, planificamos, distribuimos y
 * volvemos a medir. Sustituye a la plataforma navegable: en vez de enseñar las
 * pantallas del producto, enseña el proceso de principio a fin con un caso
 * (BYD, eléctricos) y datos de ejemplo.
 *
 * A la izquierda, los pasos con su barra de progreso; a la derecha, un marco
 * donde cambia la escena. Las tres primeras comparten la conversación con
 * ChatGPT; las otras cuatro entran y salen con un fundido. En móvil los pasos
 * se vuelven una barra de siete segmentos bajo el paso actual.
 *
 * Todo depende de un reloj (useRelojEscenas): cada escena se pinta a partir de
 * `t`, así que pulsar un paso es mover el reloj. Se puede pausar siempre, se
 * para fuera de pantalla y con `prefers-reduced-motion` no corre: queda el
 * final de cada paso, navegable.
 *
 * Las cifras son de ejemplo y viven en las escenas; los textos, en
 * `plataforma` del diccionario de la página.
 */

const ESCENAS_SUELTAS = [
  { i: 3, Escena: EscenaRelevancia },
  { i: 4, Escena: EscenaPlan },
  { i: 5, Escena: EscenaCalendario },
  { i: 6, Escena: EscenaMedicion },
];

const dosCifras = (n) => String(n).padStart(2, "0");

function Pasos({ c, t, activa, irA }) {
  const pasos = c("pasos", { returnObjects: true });
  return (
    <div className="v4-cf__lateral">
      {/* En móvil solo se ve el paso actual en grande; en escritorio lo dice la
          lista, así que para el lector de pantalla sobra. */}
      <div className="v4-cf__actual" aria-hidden="true">
        <span className="v4-cf__actual-num">
          <span className="v4-key">{dosCifras(activa + 1)}</span> / {dosCifras(pasos.length)}
        </span>
        <span className="v4-cf__actual-titulo">{pasos[activa].titulo}</span>
        <span className="v4-cf__actual-desc">{pasos[activa].desc}</span>
      </div>
      <ol className="v4-cf__pasos" aria-label={c("pasosAria")}>
        {pasos.map((p, i) => {
          const avance = i < activa ? 1 : i === activa ? progreso(t, i) : 0;
          return (
            <li key={p.titulo}>
              <button
                type="button"
                className="v4-cf__paso"
                aria-current={i === activa ? "step" : undefined}
                onClick={() => irA(i)}
              >
                <span className="v4-cf__paso-pista" aria-hidden="true">
                  <span style={{ "--avance": avance }} />
                </span>
                <span className="v4-cf__paso-num">{dosCifras(i + 1)}</span>
                <span className="v4-cf__paso-texto">
                  <span className="v4-cf__paso-titulo">{p.titulo}</span>
                  <span className="v4-cf__paso-desc">{p.desc}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* Una capa del marco: todas ocupan la misma celda y se funden entre sí. La que
   no se ve no se lee ni se pulsa. */
function Capa({ opacidad, className = "", children }) {
  const oculta = opacidad < 0.5;
  return (
    <div
      className={`v4-cf__capa ${className}`}
      style={{ opacity: opacidad }}
      aria-hidden={oculta || undefined}
      inert={oculta ? "" : undefined}
    >
      {children}
    </div>
  );
}

export default function ComoFunciona({ t: tr }) {
  const raiz = useRef(null);
  const { locale = "es" } = useRouter();
  const { t, parada, quieto, irA, alternar } = useRelojEscenas(raiz);
  const activa = escenaEn(t);

  const c = useCallback((k, o) => tr(`plataforma.${k}`, o), [tr]);
  const separador = locale === "en" ? "," : ".";
  const fmt = useCallback(
    (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, separador),
    [separador]
  );

  return (
    <figure className="v4-cf" ref={raiz}>
      <Pasos c={c} t={t} activa={activa} irA={irA} />

      <div className="v4-cf__principal">
        <div className="v4-cf__marco">
          <div className="v4-cf__lienzo">
            <Capa opacidad={ventana(t, INICIOS[0], FINALES[2])}>
              <EscenaChat t={t} c={c} fmt={fmt} />
            </Capa>
            {ESCENAS_SUELTAS.map(({ i, Escena }) => (
              <Capa
                key={i}
                opacidad={ventana(t, INICIOS[i], FINALES[i])}
                className="v4-cf__capa--pila"
              >
                <Escena t={t} tr={tr} c={c} fmt={fmt} />
              </Capa>
            ))}
          </div>
        </div>

        <figcaption className="v4-cf__pie">
          {quieto ? <span /> : (
            <button type="button" className="v4-btn v4-btn--ghost v4-cf__pausa" onClick={alternar}>
              {c(parada ? "reproducir" : "pausar")}
            </button>
          )}
          <span className="v4-label v4-label--faint v4-cf__aviso">{c("aviso")}</span>
        </figcaption>
      </div>
    </figure>
  );
}
