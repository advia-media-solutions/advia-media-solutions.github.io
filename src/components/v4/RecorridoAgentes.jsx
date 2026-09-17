import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "next-i18next/pages";
import {
  AGENTES, ALTO, ANCHO, CUES, FONDOS, MEDIOS, R_BOLA, R_CUERPO, SUAVE,
  acotar, cajaDe, camaraEn, coincidencias, contraEscala,
  morphEn, opticaDe, tiempos, anguloEn,
} from "./RecorridoAgentesEscena";

/**
 * El cuadro: las cinco esferas, sus recorridos y las marcas del mapa, en el
 * instante `T` que le pasen.
 *
 * No tiene reloj. El tiempo se lo da quien lo usa —aquí, el scroll (ver
 * Recorridos.jsx)—, y esta pieza solo sabe dibujar un instante. Esa es toda la
 * frontera: fuera, de dónde sale T; dentro, qué se ve en T.
 *
 * El agente 1 es especial y lo es a propósito: es la esfera de la portada. Se
 * construye con los pasos (el `progreso` del motor) antes de soltar su
 * recorrido (el `desmontar`), y es el único que existe desde el principio. Los
 * otros cuatro entran con el zoom y no se construyen: ya estaban ahí.
 */

/**
 * El valor resuelto de un token de color del sistema. Los fondos se declaran
 * como tokens (ver FONDOS) porque el motor necesita el color EXACTO contra el
 * que la página los va a pintar: el sombreador mezcla el fondo dentro del
 * vidrio, y un marfil aproximado deja un halo alrededor de la esfera.
 */
function color(token) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  return v || "#FCFDFD";
}

/**
 * Píxeles de dibujo por píxel de maqueta.
 *
 * El agente 1 se ve de cerca —la cámara lo agranda hasta 1.6x durante toda la
 * construcción—, así que su lienzo necesita grano de sobra para aguantar ese
 * aumento. Los otros cuatro no se ven nunca por encima del 1x y además son
 * cuatro: ahí lo que se paga es el número, no el detalle.
 *
 * Sale barato aunque parezca caro: el lienzo de un agente es enorme —cubre
 * todo el terreno por el que pasa su recorrido— pero está casi entero vacío, y
 * el sombreador solo corre donde hay esfera.
 */
const GRANO = { protagonista: 1.6, resto: 0.45 };

/**
 * Un agente: su esfera, su recorrido y su trazo, en un lienzo que cubre justo
 * la caja por la que pasa.
 *
 * Son lienzos separados y no uno solo porque cada esfera es una escena del
 * motor, con su encuadre y su cámara. Compartir lienzo obligaría a componer
 * cinco recorridos en un único sistema de coordenadas, que es exactamente el
 * problema que el motor ya resuelve por dentro.
 */
function Agente({ agente, tiempo, T, z, opacidad, fondo }) {
  const caja = useMemo(() => cajaDe(agente), [agente]);
  const lienzo = useRef(null);
  const motor = useRef(null);
  const [listo, setListo] = useState(false);
  const protagonista = agente.i === 0;
  /* El último instante recibido: el morph diferido tiene que aplicarlo al
     terminar, o la esfera se quedaría en la forma con la que se pintó. */
  const ultimoT = useRef(T);
  ultimoT.current = T;

  useEffect(() => {
    let vivo = true;
    const canvas = lienzo.current;
    if (!canvas) return undefined;

    import("./EsferaFacetada")
      .then(({ default: crearEsfera }) => {
        if (!vivo) return;
        const optica = opticaDe(caja);
        let intentos = 0;

        const crear = () => {
          if (!vivo) return;
          let m;
          try {
            m = crearEsfera(canvas, {
              fondo: color(FONDOS[fondo]),
              modo: "recorrido",
              sueltas: agente.paradas.length,
              ancla: [(agente.pos[0] - caja.l) / caja.w, (agente.pos[1] - caja.t) / caja.h],
              curva: agente.paradas.map((p) => [(p.x - caja.l) / caja.w, (p.y - caja.t) / caja.h]),
              escalaCuerpo: optica.escalaCuerpo,
              radioSuelta: optica.radioSuelta,
              grosorTrazo: optica.grosorTrazo,
              /* Cinco recorridos en el mismo cuadro: con colas se cruzarían
                 entre ellos y el mapa se leería como una maraña. */
              colasTrazo: false,
              /* El arco del vuelo, a escala del cuerpo: con los valores de una
                 esfera a pantalla completa las bolas salían fuera de la caja. */
              subidaVuelo: 0.5 * optica.escalaCuerpo,
              desvioVuelo: 0.45 * optica.escalaCuerpo,
              /* El tiempo es de fuera: el limitador por frame convertiría un
                 salto del scroll en un retraso que ya no se recupera. */
              inmediato: true,
              resolucionRecorrido: protagonista ? 104 : 96,
              pixelRatio: protagonista ? GRANO.protagonista : GRANO.resto,
              sombra: false,
            });
          } catch {
            /* Sin contexto WebGL libre —quedan vivos los de una carga
               anterior— se reintenta un rato en vez de rendirse. */
            if (++intentos < 20) setTimeout(crear, 400);
            return;
          }

          let esperas = 0;
          const cuandoHayaCaja = () => {
            if (!vivo) return;
            if (!canvas.clientWidth || !canvas.clientHeight) {
              /* Acotado: si la caja no llega en un segundo es que no va a
                 llegar, y un reintento cada 50 ms para siempre es una fuga. */
              if (++esperas < 20) setTimeout(cuandoHayaCaja, 50);
              return;
            }
            m.angulo(anguloEn(0, agente.fase));
            /* Precalienta el recorrido: la primera extracción cuesta, y pagarla
               en el frame en que la bola empieza a salir se ve como un tirón. */
            const precalentar = () => {
              m.desmontar(0.0001);
              m.render();
              m.desmontar(0);
              m.render();
            };

            if (!protagonista) {
              /* Los demás entran ya hechos: les basta la forma final. */
              m.prepararFinal();
              precalentar();
              motor.current = m;
              setListo(true);
              return;
            }

            /* El protagonista es la esfera de la portada, y la portada tiene
               que aparecer YA. Los tres campos del morph cuestan cerca de un
               segundo de hilo bloqueado, así que primero se pinta la forma de
               la primera clave —que es la que se ve en la portada—, y el
               morph y el recorrido se calculan después, en el primer hueco
               libre. Hasta entonces `progreso()` no hace nada, y da igual:
               en la portada el morph está en cero. */
            m.prepararPrimera();
            m.render();
            motor.current = m;
            setListo(true);
            /* Con tope: el bucle de render del motor no siempre deja hueco
               libre, y sin tope el cálculo podía no llegar nunca. */
            const enHueco = (fn) =>
              window.requestIdleCallback
                ? window.requestIdleCallback(fn, { timeout: 400 })
                : setTimeout(fn, 120);
            enHueco(() => {
              if (!vivo) return;
              m.preparar();
              precalentar();
              m.render();
              m.progreso(morphEn(ultimoT.current));
              m.render();
            });
          };
          cuandoHayaCaja();
        };

        crear();
      })
      .catch(() => {
        /* Sin WebGL la sección se lee entera: lo que cuenta es texto. */
      });

    return () => {
      vivo = false;
      if (motor.current) motor.current.destruir();
      motor.current = null;
    };
    /* `fondo` NO va en las dependencias a propósito: el color de arranque solo
       lo usa la creación, y los cambios los recoge el efecto de abajo con
       `m.fondo()`. Ponerlo aquí destruiría y recrearía la escena entera cada
       vez que la página cambia de superficie. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agente, caja, protagonista]);

  /* El ángulo del que partió el scroll. En la portada la esfera gira sola,
     como en la home; en cuanto el scroll toma el mando sigue desde donde
     estuviera, no salta a un ángulo fijo. Nulo mientras gira libre. */
  const base = useRef(null);

  useEffect(() => {
    const m = motor.current;
    if (!m) return;
    m.fondo(color(FONDOS[fondo]));
    if (protagonista && T <= 0) {
      base.current = null;
      m.girar(true);
    } else {
      if (base.current == null) base.current = m.anguloActual();
      m.angulo(base.current + anguloEn(T, agente.fase) - anguloEn(0, agente.fase));
    }
    /* El orden importa: primero la forma, luego el desprendimiento. Mientras el
       recorrido no ha empezado el motor sigue en morph, y en cuanto empieza
       deja de mirarlo — pero hasta entonces tiene que ir siguiéndolo. */
    if (protagonista) m.progreso(morphEn(T));
    m.desmontar(acotar((T - tiempo.t0) / tiempo.dur, 0, 1));
    m.render();
  }, [T, listo, fondo, protagonista, agente.fase, tiempo.t0, tiempo.dur]);

  return (
    <div
      className="v4-agentes__agente"
      style={{ left: caja.l, top: caja.t, width: caja.w, height: caja.h, zIndex: z, opacity: opacidad }}
    >
      <canvas ref={lienzo} />
    </div>
  );
}

/**
 * Las marcas del mapa: la etiqueta del medio en cada parada, y el pulso dorado
 * cuando un segundo agente aterriza en una parada que ya estaba ocupada.
 *
 * La etiqueta la pone el PRIMERO que llega. Las paradas no son de nadie: son
 * sitios, y el sitio ya está ahí cuando llega el siguiente.
 */
function Marcas({ T, compartidas, contra }) {
  const marcas = [];

  Object.entries(compartidas).forEach(([clave, llegadas]) => {
    const primera = llegadas[0];
    if (T < primera.cuando) return;
    const p = AGENTES[primera.i].paradas[primera.k];

    const brote = SUAVE.rebota(acotar((T - primera.cuando) / 0.5, 0, 1));
    const lado = p.lado < 0 ? -1 : 1;
    const aparece = acotar((T - primera.cuando) * 4, 0, 1);

    /* Toda parada lleva un anillo fino del color de su medio: es la marca, y
       no necesita letra. Va en unidades del cuadro para seguir a la bola, con
       el grosor deshecho de la escala para que en pantalla sea siempre fino. */
    const ra = R_BOLA + 9;
    marcas.push(
      <span
        key={`anillo-${clave}`}
        className="v4-agentes__anillo"
        data-medio={p.medio}
        style={{ left: p.x - ra, top: p.y - ra, width: 2 * ra, height: 2 * ra, opacity: aparece, "--v4-contra": contra }}
      />
    );

    /* La etiqueta con el nombre del medio, solo en el recorrido principal (el
       del agente 1): con cinco recorridos etiquetados el mapa era todo letra,
       y con uno se entiende el código de color de los demás. */
    if (llegadas.some((l) => l.i === 0)) marcas.push(
      <span
        key={`chip-${clave}`}
        className={`v4-agentes__marca v4-chip ${MEDIOS[p.medio] || ""}`.trim()}
        data-lado={lado < 0 ? "izda" : undefined}
        style={{
          left: p.x + lado * (R_BOLA + 22),
          top: p.y + (p.dy || 0),
          opacity: aparece,
          "--v4-contra": contra,
          "--v4-brote": `${(1 - brote) * 10}px`,
        }}
      >
        {p.medio}
      </span>
    );

    llegadas.slice(1).forEach((l, j) => {
      const v = acotar((T - l.cuando) / 1.4, 0, 1);
      if (v <= 0 || v >= 1) return;
      const r = R_BOLA * (1 + 1.4 * SUAVE.sale(v));
      marcas.push(
        <span
          key={`pulso-${clave}-${j}`}
          className="v4-agentes__pulso"
          style={{ left: p.x - r, top: p.y - r, width: 2 * r, height: 2 * r, opacity: (1 - v) * 0.5 }}
        />
      );
    });
  });

  return marcas;
}

/**
 * El rol de cada agente —quién es y qué busca—, encima de su esfera: debajo
 * chocaba con las paradas, que casi siempre caen por debajo del cuerpo.
 * Es lo que se le dio en la construcción, y es lo que explica que su recorrido
 * sea el suyo y no otro. Aparece con el agente: el 1 cuando empieza a soltar
 * (antes es la esfera de la portada, todavía sin nombre), los demás con su
 * entrada en el zoom.
 */
function Roles({ T, contra, entrada }) {
  /* El rol es una clave de `tecnologia`: quién es y qué busca, en el idioma de la página. */
  const { t } = useTranslation("tecnologia");
  return AGENTES.map((a) => {
    const v = a.i === 0 ? acotar((T - CUES.Suelta) / 0.8, 0, 1) : entrada(a.i);
    if (v <= 0 || !a.rol) return null;
    const rol = t(a.rol, { returnObjects: true });
    return (
      <div
        key={`rol-${a.i}`}
        className="v4-agentes__rol"
        style={{ left: a.pos[0], top: a.pos[1] - R_CUERPO - 24, opacity: v, "--v4-contra": contra }}
      >
        {/* Una línea por agente; la segunda —lo que busca— solo el principal.
            Sin caja: es un pie de foto, no un chip. */}
        <span className="v4-agentes__rol-quien">{rol[0]}</span>
        {a.i === 0 ? <span className="v4-agentes__rol-que">{rol[1]}</span> : null}
      </div>
    );
  });
}

export default function RecorridoAgentes({ T, montado, fondo = "mapa", children }) {
  const cuadro = useRef(null);
  const [escala, setEscala] = useState(0);

  const tm = useMemo(() => tiempos(), []);
  const compartidas = useMemo(() => coincidencias(tm), [tm]);
  const camara = camaraEn(T);
  /* Los otros cuatro agentes entran en escena con el zoom, en cadena. */
  const entrada = (i) => SUAVE.entraSale(acotar((T - CUES.Zoom - 0.4) / 1.6, 0, 1));

  /**
   * El lienzo autor, encajado ENTERO en la ventana.
   *
   * Encajar solo por el ancho era más simple y estaba mal: una ventana apaisada
   * —un portátil, casi cualquier pantalla ancha— es más baja que 16:9, y lo que
   * sobraba por arriba y por abajo se perdía. Justo por abajo es por donde cae
   * el recorrido, así que se cortaban las últimas paradas.
   *
   * Se mide el CUADRO y no un ancestro: a ancho de móvil el cuadro se oculta
   * (ver v4.css) y sus medidas pasan a 0, que es lo que deja a las esferas sin
   * montar. Midiendo otra cosa seguirían montándose dentro de algo invisible,
   * esperando para siempre una caja que nunca va a llegar.
   */
  useEffect(() => {
    const el = cuadro.current;
    if (!el) return undefined;
    const medir = () =>
      setEscala(Math.min(el.clientWidth / ANCHO, el.clientHeight / ALTO));
    const ojo = new ResizeObserver(medir);
    ojo.observe(el);
    medir();
    return () => ojo.disconnect();
  }, []);

  return (
    <div
      className="v4-agentes__cuadro"
      aria-hidden="true"
      ref={cuadro}
      data-fondo={fondo}
    >
      <div
        className="v4-agentes__lienzo"
        style={{ width: ANCHO, height: ALTO, transform: `scale(${escala})`, "--v4-escala": escala }}
      >
        <div
          className="v4-agentes__camara"
          style={{
            transform: `translate(${ANCHO / 2}px, ${ALTO / 2}px) scale(${camara.s}) ` +
                       `translate(${-camara.cx}px, ${-camara.cy}px)`,
          }}
        >
          {/* Los otros cuatro agentes no se crean hasta que la esfera principal
              ya está construida: cada uno es un contexto WebGL y una forma que
              calcular, y en la portada no se ven. Creados a la vez que la
              principal retrasaban su aparición. */}
          {montado && escala > 0
            ? AGENTES.filter((a) => a.i === 0 || T >= CUES.Construido).map((a) => (
                <Agente
                  key={a.i}
                  agente={a}
                  tiempo={tm[a.i]}
                  T={T}
                  z={a.i + 1}
                  fondo={fondo}
                  opacidad={a.i === 0 ? 1 : entrada(a.i)}
                />
              ))
            : null}
          <Marcas T={T} compartidas={compartidas} contra={contraEscala(camara.s, escala)} />
          <Roles T={T} contra={contraEscala(camara.s, escala)} entrada={entrada} />
        </div>
        {/* Lo que cuelgue de la escena va DENTRO del lienzo y fuera de la
            cámara: dentro, para que sus coordenadas sean las del cuadro y no
            las de la ventana —que no coinciden, porque el cuadro se encaja
            entero—; fuera de la cámara, porque son etiquetas del relato, no
            cosas que estén en el mundo. */}
        {children}
      </div>
    </div>
  );
}
