import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Logo from "./LogoHerramienta";
import { CORTE_ESCENA } from "./escena";
import useProgresoPegado, {
  posa,
  suave,
  tramo,
} from "./movil/useProgresoPegado";
import { pintarTrazo, prepararTrazo } from "./movil/trazo";
import usePilaPasos from "./movil/usePilaPasos";

/**
 * Tecnología en móvil: las dos escenas de la esfera, sin WebGL.
 *
 * Bajo el corte (escena.js) el anillo de agentes no se dibuja: no cabe. Estas
 * dos piezas cuentan lo mismo en vertical, con HTML, SVG y las imágenes del
 * render de escritorio (la gota, la esfera y una bola).
 *
 *   1. `EsferaGranos`: la esfera arriba y los pasos apilándose debajo como
 *      tarjetas (usePilaPasos). Empieza siendo una gota lisa y se va facetando
 *      paso a paso —el morph de escritorio, en dos fotogramas fundidos—, y el
 *      paso que llega a su sitio le da sus granos: el rol, las herramientas.
 *   2. `MapaAgentes`: la esfera baja por el eje y suelta su recorrido, la
 *      cámara se aleja y los otros cuatro entran por los lados con el suyo.
 *      Gobernado por el scroll con el mismo motor que Navegación Activa.
 *
 * Las dos son decorativas salvo por lo que ya es texto de la página —los
 * roles y los medios—, que aquí se repite para que se vea junto a su esfera.
 */

/* ── 1. La esfera alimentándose ─────────────────────────────────────────── */

/* El compás de escritorio (CargaGranos.jsx): lo que dura el viaje de un grano y
   lo que espera cada uno al anterior. Casan con `v4-grano-movil` en v4.css. */
const VIAJE_MS = 3200;
const TURNO_MS = 620;

/* Dónde se lee cada grano antes de entrar: a los lados de la esfera, alternando
   izquierda y derecha. Las alturas van en ciclos de tres por lado para que los
   que están en el aire a la vez (unos cinco) nunca compartan renglón. */
const ALTURAS = { izda: [-62, 0, 62], dcha: [-31, 31, 93] };
function origen(k) {
  const lado = k % 2 ? "dcha" : "izda";
  const fila = Math.floor(k / 2) % 3;
  return { lado, dy: ALTURAS[lado][fila] - 16 };
}

/**
 * La esfera pegada arriba del escenario, con la pila de pasos debajo
 * (usePilaPasos). Se alimenta SOLO del paso que ha llegado a su tope, justo
 * bajo ella: antes de eso —en la portada, o con el paso subiendo— no le entra
 * nada.
 *
 * Los granos caen en TANDAS, como en escritorio: cada uno viaja una vez y la
 * tanda siguiente no sale hasta que ha entrado el último. En bucle por CSS, con
 * once granos el primero volvía a salir con la tanda a medias y se veían
 * etiquetas repetidas. La vuelta va en la `key`: remontar reinicia la tanda.
 */
export function EsferaGranos({ pasos }) {
  const raiz = useRef(null);
  const [activo, setActivo] = useState(-1);
  const [vuelta, setVuelta] = useState(0);
  usePilaPasos(raiz, setActivo);

  const chips = (activo >= 0 && pasos[activo]?.chips) || [];
  const tanda = Math.max(0, chips.length - 1) * TURNO_MS + VIAJE_MS;

  useEffect(() => {
    if (!chips.length) return undefined;
    setVuelta((v) => v + 1);
    const id = setInterval(() => setVuelta((v) => v + 1), tanda);
    return () => clearInterval(id);
  }, [activo, chips.length, tanda]);

  return (
    <div
      className="v4-tecm v4-tecm-esfera"
      aria-hidden="true"
      ref={raiz}
      data-paso={Math.max(0, activo)}
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
      <ul className="v4-tecm-esfera__granos" key={`${activo}-${vuelta}`}>
        {chips.map((chip, k) => {
          const texto = typeof chip === "string" ? chip : chip.texto;
          const logo = typeof chip === "string" ? null : chip.logo;
          const { lado, dy } = origen(k);
          return (
            <li
              key={texto}
              className="v4-chip v4-tecm-esfera__grano"
              data-lado={lado}
              style={{ "--v4-turno": k, "--v4-dy": `${dy}px` }}
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

/* El cuadro, en unidades de un lienzo portrait. Es una ESPINA: la principal
   baja recta por el eje y los otros cuatro entran por los lados, cada uno más
   abajo que el anterior, y se cruzan con ella y entre ellos en paradas
   concretas. Los caminos SIEMPRE bajan, como el scroll que los dibuja.

   Las paradas tienen nombre porque varias son de más de un agente: el sitio
   es uno, y el anillo y el pulso de llegada se pintan sobre él. */
const ANCHO = 360;
const ALTO = 540;
const EJE = 180;
const PARADAS = {
  eje1: { x: EJE, y: 176, medio: "ChatGPT" },
  eje2: { x: EJE, y: 257, medio: "Web" },
  eje3: { x: EJE, y: 350, medio: "YouTube" },
  eje4: { x: EJE, y: 434, medio: "Web" },
  izdaAlta: { x: 110, y: 252, medio: "YouTube" },
  dchaAlta: { x: 259, y: 325, medio: "ChatGPT" },
  dchaBaja: { x: 247, y: 409, medio: "ChatGPT" },
  izdaBaja: { x: 111, y: 421, medio: "Web" },
  fin1: { x: 104, y: 512, medio: "Web" },
  fin2: { x: EJE, y: 512, medio: "YouTube" },
  fin3: { x: 263, y: 512, medio: "ChatGPT" },
};
const AGENTES = [
  { pos: [EJE, 84], r: 44, paradas: ["eje1", "eje2", "eje3", "eje4"] },
  { pos: [79, 176], r: 32, paradas: ["izdaAlta", "eje2", "eje3", "dchaBaja"] },
  { pos: [301, 250], r: 32, paradas: ["dchaAlta", "eje3", "izdaBaja", "fin1"] },
  { pos: [60, 400], r: 32, paradas: ["izdaBaja", "eje4", "fin3"] },
  { pos: [306, 388], r: 32, paradas: ["dchaBaja", "eje4", "fin2"], rolAbajo: true },
];
/* La etiqueta del medio, solo en el recorrido principal, como en escritorio:
   con cinco etiquetados el mapa era todo letra, y con uno se entiende el
   código de color de los demás. `dy` la separa del rótulo de al lado. */
const ETIQUETAS = [
  { parada: "eje1", lado: "dcha" },
  { parada: "eje2", lado: "dcha" },
  { parada: "eje3", lado: "izda", dy: -12 },
];
const MEDIOS = { Web: "v4-chip--gold", YouTube: "v4-chip--rojo", ChatGPT: "" };
const punto = (clave) => [PARADAS[clave].x, PARADAS[clave].y];

/** Un camino suave que pasa por todos los puntos (Catmull-Rom en Bézier). */
function curva(pts) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const [a, b, c, e] = [pts[i - 1] || pts[i], pts[i], pts[i + 1], pts[i + 2] || pts[i + 1]];
    let c1 = [b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6];
    let c2 = [c[0] - (e[0] - b[0]) / 6, c[1] - (e[1] - b[1]) / 6];
    /* Entre dos paradas del eje, recto: el camino va MONTADO sobre el de la
       principal y se lee como uno solo. Con la curva se abría en un arco al
       lado y parecían dos caminos casi iguales. */
    if (b[0] === c[0]) {
      c1 = [b[0], b[1] + (c[1] - b[1]) / 3];
      c2 = [c[0], c[1] - (c[1] - b[1]) / 3];
    }
    d += ` C${c1.map(Math.round).join(" ")} ${c2.map(Math.round).join(" ")} ${c.join(" ")}`;
  }
  return d;
}
AGENTES.forEach((a) => {
  a.puntos = a.paradas.map(punto);
});
/* El dibujo llena el ancho. Si la pantalla no tiene alto para sus 540, se
   aplasta un poco en vertical (solo las alturas: bolas, anillos y esferas
   conservan su forma), pero apenas: más allá de este mínimo las filas se
   amontonan y el mapa deja de respirar, así que prefiere encoger entero. */
const APLASTE_MIN = 0.9;
const aplastar = (pts, f) => pts.map(([x, y]) => [x, y * f]);

/* El guion, en progreso 0..1:
     0.00–0.44  la esfera principal baja por el eje, con la cámara cerca
     0.42–0.64  la cámara se aleja
     0.56–0.96  entran los otros cuatro, cada uno más abajo, y sueltan el suyo
     0.90–1.00  el pie entra */
const VIAJES_PRINCIPAL = [0, 1, 2, 3].map((i) => ({
  desde: 0.02 + i * 0.09,
  hasta: 0.02 + i * 0.09 + 0.15,
}));
const viajesDe = (agente, i) =>
  agente.paradas.map((_, k) => {
    const base = 0.56 + (i - 1) * 0.05 + k * 0.066;
    return { desde: base, hasta: base + 0.11 };
  });
const VIAJES = AGENTES.map((a, i) => (i === 0 ? VIAJES_PRINCIPAL : viajesDe(a, i)));

/* Cuándo llega alguien a cada parada, en orden. El primero la marca con su
   anillo; cada uno de los siguientes la hace pulsar en oro: ahí dos caminos
   distintos acaban de coincidir, que es lo que el mapa cuenta. */
const LLEGADAS = {};
AGENTES.forEach((a, i) =>
  a.paradas.forEach((clave, k) => {
    (LLEGADAS[clave] = LLEGADAS[clave] || []).push(VIAJES[i][k].hasta);
  }),
);
Object.values(LLEGADAS).forEach((t) => t.sort((x, y) => x - y));
const PULSOS = Object.entries(LLEGADAS).flatMap(([clave, t]) =>
  t.slice(1).map((cuando) => ({ clave, cuando })),
);
/* El anillo, ceñido a la bola (26 de diámetro): un filo, no un aro suelto. */
const ANILLO = 30;

const ZOOM = 1.15;
/* El foco de la cámara cerca: a la altura del agente principal, para que al
   acercarse no se salga por arriba y pise el titular. */
const FOCO = [EJE, 24];

/**
 * «Hombre · 42 años» en dos renglones, quién arriba y la edad debajo: en una
 * sola línea los rótulos de los lados eran más anchos que su esfera. El punto
 * medio sigue en el texto, oculto a la vista, para que diga lo mismo que en
 * escritorio.
 */
function Partido({ texto }) {
  const [quien, ...resto] = texto.split(" · ");
  if (!resto.length) return <span>{texto}</span>;
  return (
    <>
      <span>
        {quien}
        <span className="v4-oculto"> · </span>
      </span>
      <span>{resto.join(" · ")}</span>
    </>
  );
}

const pc = (v, total) => `${((v / total) * 100).toFixed(2)}%`;

export function MapaAgentes({ roles, titulo, pie }) {
  const contenedor = useRef(null);
  const cuadro = useRef(null);
  const [aplaste, setAplaste] = useState(1);
  const camara = useRef(null);
  const paths = useRef([]);
  const bolas = useRef(AGENTES.map(() => []));
  const fichas = useRef([]);
  const agentesRef = useRef([]);
  const anillos = useRef({});
  const pulsos = useRef([]);
  const trazos = useRef([]);
  const ultimo = useRef(0);

  const pintar = useCallback((p) => {
    ultimo.current = p;
    if (!trazos.current.length) return;
    /* La cámara: cerca del principal y alejándose. */
    const z = ZOOM - (ZOOM - 1) * suave(tramo(p, 0.42, 0.64));
    if (camara.current) camara.current.style.transform = `scale(${z})`;
    AGENTES.forEach((a, i) => {
      pintarTrazo(
        trazos.current[i],
        paths.current[i],
        bolas.current[i],
        [],
        VIAJES[i],
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
    /* El anillo entra cerrándose sobre la bola cuando llega el primero. */
    Object.entries(anillos.current).forEach(([clave, an]) => {
      if (!an) return;
      const v = tramo(p, LLEGADAS[clave][0], LLEGADAS[clave][0] + 0.03);
      an.style.opacity = `${v}`;
      an.style.transform = `translate(-50%, -50%) scale(${1.5 - 0.5 * posa(v)})`;
    });
    /* El pulso: un halo dorado que se abre y se apaga desde la bola. */
    PULSOS.forEach(({ cuando }, k) => {
      const nodo = pulsos.current[k];
      if (!nodo) return;
      const v = tramo(p, cuando, cuando + 0.07);
      nodo.style.opacity = v > 0 && v < 1 ? `${(1 - v) * 0.7}` : "0";
      nodo.style.transform = `translate(-50%, -50%) scale(${1 + 1.6 * posa(v)})`;
    });
    ETIQUETAS.forEach(({ parada }, k) => {
      if (fichas.current[k]) fichas.current[k].dataset.puesta = p >= LLEGADAS[parada][0] ? "true" : "";
    });
  }, []);

  /* Cuánto hay que aplastar: el alto que deja el cuadro contra el que
     pediría el dibujo a todo el ancho. */
  useEffect(() => {
    const nodo = cuadro.current;
    if (!nodo || !window.matchMedia(CORTE_ESCENA).matches) return undefined;
    const medir = () => {
      const { width, height } = nodo.getBoundingClientRect();
      if (!width || !height) return;
      const f = Math.min(1, Math.max(APLASTE_MIN, height / ((width * ALTO) / ANCHO)));
      setAplaste(Math.round(f * 100) / 100);
    };
    const ojo = new ResizeObserver(medir);
    ojo.observe(nodo);
    medir();
    return () => ojo.disconnect();
  }, []);
  const alto = ALTO * aplaste;
  const caminos = useMemo(
    () => AGENTES.map((a) => curva(aplastar([a.pos, ...a.puntos], aplaste))),
    [aplaste],
  );

  /* Los trazos se preparan de nuevo con cada aplaste: cambia su largo y
     dónde cae cada parada. */
  useEffect(() => {
    if (!window.matchMedia(CORTE_ESCENA).matches) return;
    trazos.current = AGENTES.map((a, i) =>
      prepararTrazo(paths.current[i], aplastar(a.puntos, aplaste)),
    );
    pintar(ultimo.current);
  }, [pintar, aplaste]);
  useProgresoPegado(contenedor, pintar, { solo: CORTE_ESCENA });

  return (
    <>
      <div className="v4-tecm v4-tecm-mapa" ref={contenedor}>
        <div className="v4-tecm-mapa__pegado">
          {titulo}
          <div
            className="v4-tecm-mapa__cuadro"
            aria-hidden="true"
            ref={cuadro}
          >
            <div
              className="v4-tecm-mapa__camara"
              ref={camara}
              style={{
                transformOrigin: `${pc(FOCO[0], ANCHO)} ${pc(FOCO[1], ALTO)}`,
                aspectRatio: `${ANCHO} / ${alto}`,
                "--v4-proporcion": ANCHO / alto,
              }}
            >
              <svg viewBox={`0 0 ${ANCHO} ${alto}`} className="v4-tecm-mapa__svg">
                {AGENTES.map((a, i) => (
                  <path
                    key={`camino-${i}`}
                    d={caminos[i]}
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
                      x="-13"
                      y="-13"
                      width="26"
                      height="26"
                      className="v4-tecm-mapa__bola"
                      ref={(el) => {
                        bolas.current[i][k] = el;
                      }}
                    />
                  )),
                )}
              </svg>
              {Object.entries(PARADAS).map(([clave, s]) => (
                <span
                  key={`anillo-${clave}`}
                  className="v4-tecm-mapa__anillo"
                  data-medio={s.medio}
                  ref={(el) => {
                    anillos.current[clave] = el;
                  }}
                  style={{ left: pc(s.x, ANCHO), top: pc(s.y, ALTO), width: pc(ANILLO, ANCHO) }}
                />
              ))}
              {PULSOS.map(({ clave }, k) => (
                <span
                  key={`pulso-${clave}-${k}`}
                  className="v4-tecm-mapa__pulso"
                  ref={(el) => {
                    pulsos.current[k] = el;
                  }}
                  style={{
                    left: pc(PARADAS[clave].x, ANCHO),
                    top: pc(PARADAS[clave].y, ALTO),
                    width: pc(ANILLO, ANCHO),
                  }}
                />
              ))}
              {ETIQUETAS.map(({ parada, lado, dy = 0 }, k) => {
                const s = PARADAS[parada];
                return (
                  <span
                    key={`chip-${parada}`}
                    className={`v4-chip v4-tecm-mapa__chip ${MEDIOS[s.medio]}`.trim()}
                    data-lado={lado}
                    ref={(el) => {
                      fichas.current[k] = el;
                    }}
                    style={{ left: pc(s.x, ANCHO), top: pc(s.y + dy, ALTO) }}
                  >
                    {s.medio}
                  </span>
                );
              })}
              {AGENTES.map((a, i) => (
                <span
                  key={`agente-${i}`}
                  className="v4-tecm-mapa__agente"
                  data-principal={i === 0 ? "true" : undefined}
                  data-rol-abajo={a.rolAbajo ? "true" : undefined}
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
                    <span
                      className="v4-tecm-mapa__rol"
                      data-partido={i === 0 ? undefined : "true"}
                    >
                      {i === 0 ? (
                        <>
                          <span>{roles[i][0]}</span>
                          <span>{roles[i][1]}</span>
                        </>
                      ) : (
                        <Partido texto={roles[i][0]} />
                      )}
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* El pie, FUERA de la pantalla pegada: llega justo debajo del mapa
          cuando este se suelta. Dentro le quitaba al dibujo el alto que
          necesita para respirar. */}
      <div className="v4-tecm-mapa__pie">{pie}</div>
    </>
  );
}
