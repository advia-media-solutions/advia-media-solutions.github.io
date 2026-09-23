import React, { useCallback, useEffect, useRef, useState } from "react";
import Logo from "./LogoHerramienta";
import { CORTE_ESCENA } from "./escena";
import useProgresoPegado, {
  posa,
  suave,
  tramo,
} from "./movil/useProgresoPegado";
import { pintarTrazo, prepararTrazo } from "./movil/trazo";

/**
 * Tecnología en móvil: las dos escenas de la esfera, sin WebGL.
 *
 * Bajo el corte (escena.js) el anillo de agentes no se dibuja: no cabe. Estas
 * dos piezas cuentan lo mismo en vertical, con HTML, SVG y las imágenes del
 * render de escritorio (la gota, la esfera y una bola).
 *
 *   1. `EsferaGranos`: la esfera pegada arriba mientras los pasos pasan por
 *      debajo. Empieza siendo una gota lisa y se va facetando paso a paso —el
 *      morph de escritorio, en dos fotogramas fundidos—, y en cada paso le
 *      vuelan los granos que se le dan: el rol, las herramientas.
 *   2. `MapaAgentes`: la esfera suelta su recorrido, la cámara se aleja y
 *      aparecen los otros cuatro agentes con el suyo. Gobernado por el scroll
 *      con el mismo motor que el recorrido de Navegación Activa.
 *
 * Las dos son decorativas salvo por lo que ya es texto de la página —los
 * roles y los medios—, que aquí se repite para que se vea junto a su esfera.
 */

/* ── 1. La esfera alimentándose ─────────────────────────────────────────── */

/** Dónde nace cada grano: en un anillo más ancho que el móvil, en vueltas. */
function origen(k, total) {
  const angulo = (k / total) * Math.PI * 2 - Math.PI / 2;
  const rx = 210 + (k % 2) * 30;
  const ry = 150 + ((k + 1) % 2) * 26;
  return {
    dx: Math.round(Math.cos(angulo) * rx),
    dy: Math.round(Math.sin(angulo) * ry),
  };
}

export function EsferaGranos({ pasos }) {
  const raiz = useRef(null);
  const [activo, setActivo] = useState(0);

  /* El paso activo lo mide un observador propio sobre los pasos del relato:
     el de Recorridos mide los aires, que en móvil no existen. Se enciende el
     que cruza el tercio bajo de la ventana, que es donde se lee. */
  useEffect(() => {
    const bloque = raiz.current?.closest(".v4-recorridos");
    if (!bloque || !window.matchMedia(CORTE_ESCENA).matches) return undefined;
    const nodos = [...bloque.querySelectorAll(".v4-recorridos__paso")];
    if (!nodos.length) return undefined;
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) setActivo(nodos.indexOf(e.target));
        });
      },
      { rootMargin: "-45% 0px -25% 0px", threshold: 0 },
    );
    nodos.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const chips = pasos[activo]?.chips || [];

  return (
    <div
      className="v4-tecm v4-tecm-esfera"
      aria-hidden="true"
      ref={raiz}
      data-paso={activo}
    >
      <div className="v4-tecm-esfera__cuerpo">
        <img
          className="v4-tecm-esfera__gota"
          src="/img/gota.webp"
          alt=""
          width="330"
          height="330"
          loading="lazy"
          decoding="async"
        />
        <img
          className="v4-tecm-esfera__hecha"
          src="/img/esfera-hero.webp"
          alt=""
          width="510"
          height="400"
          loading="lazy"
          decoding="async"
        />
      </div>
      <ul className="v4-tecm-esfera__granos" key={activo}>
        {chips.map((chip, k) => {
          const texto = typeof chip === "string" ? chip : chip.texto;
          const logo = typeof chip === "string" ? null : chip.logo;
          const { dx, dy } = origen(k, chips.length);
          return (
            <li
              key={texto}
              className="v4-chip v4-tecm-esfera__grano"
              style={{
                "--v4-turno": k,
                "--v4-dx": `${dx}px`,
                "--v4-dy": `${dy}px`,
              }}
            >
              {logo ? <Logo id={logo} /> : null}
              {texto}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ── 2. El mapa de agentes ─────────────────────────────────────────────── */

/* El cuadro, en unidades de un lienzo portrait. El agente principal arriba a
   la derecha, como en escritorio; los otros cuatro en zigzag. Cuatro paradas
   están compartidas, y son el remate: caminos distintos, mismas paradas. */
const ANCHO = 360;
const ALTO = 540;
const AGENTES = [
  {
    pos: [246, 92],
    r: 56,
    paradas: [
      [200, 140],
      [156, 190],
      [122, 280],
      [182, 346],
    ],
    medios: ["ChatGPT", "YouTube", "Web", "ChatGPT"],
    d: "M246 92 C228 110 216 126 200 140 C184 154 168 176 156 190 C136 216 128 250 122 280 C118 306 164 320 182 346",
  },
  {
    pos: [70, 204],
    r: 36,
    paradas: [
      [122, 280],
      [156, 382],
      [206, 444],
    ],
    medios: ["Web", "Web", "YouTube"],
    d: "M70 204 C96 236 110 262 122 280 C136 316 146 352 156 382 C166 410 190 424 206 444",
  },
  {
    pos: [300, 310],
    r: 36,
    paradas: [
      [250, 386],
      [206, 444],
      [182, 346],
    ],
    medios: ["Web", "YouTube", "ChatGPT"],
    d: "M300 310 C272 332 256 356 250 386 C240 414 224 430 206 444 C190 412 186 380 182 346",
  },
  {
    pos: [74, 428],
    r: 36,
    paradas: [
      [156, 382],
      [176, 484],
    ],
    medios: ["Web", "ChatGPT"],
    d: "M74 428 C106 408 130 392 156 382 C176 396 178 450 176 484",
  },
  {
    pos: [288, 476],
    r: 36,
    paradas: [
      [176, 484],
      [206, 444],
    ],
    medios: ["ChatGPT", "YouTube"],
    d: "M288 476 C252 480 216 484 176 484 C190 472 200 458 206 444",
  },
];
/* Las paradas compartidas: dónde y de qué medio es su anillo. */
const COMPARTIDAS = [
  { x: 122, y: 280, medio: "Web" },
  { x: 182, y: 346, medio: "ChatGPT" },
  { x: 156, y: 382, medio: "Web" },
  { x: 206, y: 444, medio: "YouTube" },
];
const MEDIOS = { Web: "v4-chip--gold", YouTube: "v4-chip--rojo", ChatGPT: "" };
/* Hacia qué lado sale cada rótulo del recorrido principal. */
const LADOS = ["izda", "dcha", "dcha", "dcha"];

/* El guion, en progreso 0..1:
     0.00–0.42  la esfera principal suelta su recorrido, con la cámara cerca
     0.42–0.64  la cámara se aleja
     0.56–0.94  entran los otros cuatro y sueltan el suyo
     0.86–1.00  las paradas compartidas se marcan; el pie entra */
const VIAJES_PRINCIPAL = [0, 1, 2, 3].map((i) => ({
  desde: 0.02 + i * 0.09,
  hasta: 0.02 + i * 0.09 + 0.15,
}));
const viajesDe = (agente, i) =>
  agente.paradas.map((_, k) => {
    const base = 0.56 + (i - 1) * 0.05 + k * 0.07;
    return { desde: base, hasta: base + 0.12 };
  });
const ZOOM = 1.38;
/* El foco de la cámara cerca: a la altura del agente principal, para que al
   acercarse no se salga por arriba y pise el titular. */
const FOCO = [250, 128];

const pc = (v, total) => `${((v / total) * 100).toFixed(2)}%`;

export function MapaAgentes({ roles, titulo, pie }) {
  const contenedor = useRef(null);
  const camara = useRef(null);
  const pieRef = useRef(null);
  const paths = useRef([]);
  const bolas = useRef(AGENTES.map(() => []));
  const fichas = useRef([]);
  const agentesRef = useRef([]);
  const anillos = useRef([]);
  const trazos = useRef([]);
  const ultimo = useRef(0);

  const pintar = useCallback((p) => {
    ultimo.current = p;
    if (!trazos.current.length) return;
    /* La cámara: cerca del principal y alejándose. */
    const z = ZOOM - (ZOOM - 1) * suave(tramo(p, 0.42, 0.64));
    if (camara.current) camara.current.style.transform = `scale(${z})`;
    AGENTES.forEach((a, i) => {
      const viajes = i === 0 ? VIAJES_PRINCIPAL : viajesDe(a, i);
      pintarTrazo(
        trazos.current[i],
        paths.current[i],
        bolas.current[i],
        i === 0 ? fichas.current : [],
        viajes,
        p,
        posa,
      );
      const nodo = agentesRef.current[i];
      if (nodo) {
        const v =
          i === 0
            ? 1
            : suave(tramo(p, 0.54 + (i - 1) * 0.05, 0.64 + (i - 1) * 0.05));
        nodo.style.opacity = `${v}`;
        nodo.style.transform = `translate(-50%, -50%) scale(${0.7 + 0.3 * v})`;
      }
    });
    anillos.current.forEach((an, k) => {
      if (!an) return;
      const v = tramo(p, 0.86 + k * 0.03, 0.92 + k * 0.03);
      an.style.opacity = `${v}`;
      an.style.transform = `translate(-50%, -50%) scale(${1.6 - 0.6 * posa(v)})`;
    });
    if (pieRef.current) {
      const v = suave(tramo(p, 0.9, 1));
      pieRef.current.style.opacity = `${v}`;
      pieRef.current.style.transform = `translateY(${(1 - v) * 12}px)`;
    }
  }, []);

  useEffect(() => {
    if (!window.matchMedia(CORTE_ESCENA).matches) return undefined;
    if (trazos.current.length) return undefined;
    trazos.current = AGENTES.map((a, i) =>
      prepararTrazo(paths.current[i], a.paradas),
    );
    pintar(ultimo.current);
    return undefined;
  }, [pintar]);
  useProgresoPegado(contenedor, pintar, { solo: CORTE_ESCENA });

  return (
    <div className="v4-tecm v4-tecm-mapa" ref={contenedor}>
      <div className="v4-tecm-mapa__pegado">
        {titulo}
        <div
          className="v4-tecm-mapa__cuadro"
          aria-hidden="true"
          style={{ aspectRatio: `${ANCHO} / ${ALTO}` }}
        >
          <div
            className="v4-tecm-mapa__camara"
            ref={camara}
            style={{
              transformOrigin: `${pc(FOCO[0], ANCHO)} ${pc(FOCO[1], ALTO)}`,
            }}
          >
            <svg viewBox={`0 0 ${ANCHO} ${ALTO}`} className="v4-tecm-mapa__svg">
              {AGENTES.map((a, i) => (
                <path
                  key={a.d}
                  d={a.d}
                  className="v4-tecm-mapa__trazo"
                  ref={(el) => {
                    paths.current[i] = el;
                  }}
                />
              ))}
              {AGENTES.map((a, i) =>
                a.paradas.map((pt, k) => (
                  <image
                    key={`${i}-${k}`}
                    href="/img/bola.webp"
                    x="-11"
                    y="-11"
                    width="22"
                    height="22"
                    className="v4-tecm-mapa__bola"
                    ref={(el) => {
                      bolas.current[i][k] = el;
                    }}
                  />
                )),
              )}
            </svg>
            {COMPARTIDAS.map((c, k) => (
              <span
                key={`${c.x}-${c.y}`}
                className="v4-tecm-mapa__anillo"
                data-medio={c.medio}
                ref={(el) => {
                  anillos.current[k] = el;
                }}
                style={{ left: pc(c.x, ANCHO), top: pc(c.y, ALTO) }}
              />
            ))}
            {AGENTES[0].paradas.map((pt, k) => (
              <span
                key={`chip-${k}`}
                className={`v4-chip v4-tecm-mapa__chip ${MEDIOS[AGENTES[0].medios[k]]}`.trim()}
                data-lado={LADOS[k]}
                ref={(el) => {
                  fichas.current[k] = el;
                }}
                style={{ left: pc(pt[0], ANCHO), top: pc(pt[1], ALTO) }}
              >
                {AGENTES[0].medios[k]}
              </span>
            ))}
            {AGENTES.map((a, i) => (
              <span
                key={`agente-${i}`}
                className="v4-tecm-mapa__agente"
                data-principal={i === 0 ? "true" : undefined}
                ref={(el) => {
                  agentesRef.current[i] = el;
                }}
                style={{
                  left: pc(a.pos[0], ANCHO),
                  top: pc(a.pos[1], ALTO),
                  "--v4-r": pc(a.r, ANCHO),
                }}
              >
                <img
                  src="/img/esfera-hero.webp"
                  alt=""
                  width="510"
                  height="400"
                  loading="lazy"
                  decoding="async"
                />
                {roles[i] ? (
                  <span className="v4-tecm-mapa__rol">
                    <span>{roles[i][0]}</span>
                    {i === 0 ? <span>{roles[i][1]}</span> : null}
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        </div>
        <div className="v4-tecm-mapa__pie" ref={pieRef}>
          {pie}
        </div>
      </div>
    </div>
  );
}
