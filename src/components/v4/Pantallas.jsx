import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next/pages";

/**
 * Los dos momentos de la home, enfrentados como lo que de verdad son: dos
 * pantallas.
 *
 * Antes esto eran dos párrafos que definían el concepto entero, y ese es el
 * contenido de /navegacion-activa: si aquí se explica del todo, el botón que
 * lleva allí deja de tener sentido. El contraste lo hace ahora la composición.
 *
 * Cada pantalla lleva su rótulo dentro, en una franja superior con filete:
 * suelto y a 15px, fuera de la caja, quedaba huérfano entre dos tamaños que
 * no eran el suyo; dentro es la barra de la ventana y dice qué se está
 * mirando. A la izquierda, un feed social que no para: posts y reels
 * pasando solos. A la derecha, una pregunta concreta y los sitios a los que
 * lleva. La asimetría es
 * el argumento —una pantalla no para de dar cosas que nadie ha pedido, la otra
 * responde a algo que alguien ha preguntado—, y el oro marca cuál de las dos es
 * el negocio.
 *
 * Todo es HTML y CSS a propósito: la home ya carga tres escenas de WebGL, y
 * esta pieza tiene que leerse en móvil, sin GPU y en medio segundo.
 */

/* Ritmo de tecleo, en ms por carácter. Más lento que el de la respuesta
   generativa (22ms): allí escribe un modelo, aquí escribe una persona. */
const POR_CARACTER = 45;
/* Borrar es un gesto, no una frase: se va mucho más rápido de lo que se
   escribe, igual que cuando uno limpia el campo para preguntar otra cosa. */
const POR_BORRADO = 16;
/* Lo que tarda en haber resultados, y lo que tardan entre sí. */
const ANTES_DE_RESPONDER = 420;
const ENTRE_RESULTADOS = 160;
/* Lo que la pregunta se queda en pantalla con sus resultados puestos: tiene
   que dar tiempo a leerla entera sin que la sección se vuelva un carrusel. */
const LECTURA = 2600;
const ANTES_DE_BORRAR = 320;
const ENTRE_PREGUNTAS = 420;

/* El feed: piezas con la silueta de lo que todo el mundo reconoce —posts con
   foto y reels con su play—. Ni una palabra legible: en cuanto hay texto de
   verdad el ojo se va a leerlo, y lo que cuenta este lado es que no hay nada
   que leer. Una sola columna, como cualquier feed: dos cintas desplazándose a
   la vez se leen como dos cosas compitiendo, no como una sola que no para.
   Las alturas se alternan para que ninguna vuelta del bucle se parezca a la
   anterior. */
const PIEZAS = [
  { formato: "post", media: 170 },
  { formato: "reel", media: 230 },
  { formato: "post", media: 150 },
  { formato: "reel", media: 210 },
];

/* Los sitios donde aterriza la pregunta. Anchos en porcentaje para que las
   líneas del esqueleto no salgan todas iguales. */
const RESULTADOS = [64, 78, 52];

/* Material Symbols Outlined · search (24px, wght 400) */
function IconoBuscar() {
  return (
    <svg className="v4-icon" viewBox="0 -960 960 960" aria-hidden="true">
      <path d="M796-121 533-384q-30 26-70 40.5T378-329q-108 0-183-75t-75-181q0-106 75-181t182-75q106 0 180.5 75T632-585q0 43-14 83t-42 75l264 262-44 44ZM377-389q81 0 138-57.5T572-585q0-81-57-138.5T377-781q-82 0-139.5 57.5T180-585q0 81 57.5 138.5T377-389Z" />
    </svg>
  );
}

/* El feed va duplicado y se desplaza exactamente su mitad: cuando el primer
   juego termina de salir, el segundo está donde arrancó aquel, así que el bucle
   no tiene costura. */
function Feed() {
  const juego = PIEZAS.map((pieza, i) => (
    <div className="v4-pantalla__pieza" data-formato={pieza.formato} key={i}>
      <div className="v4-pantalla__autor">
        <span className="v4-pantalla__avatar" />
        <div className="v4-pantalla__lineas">
          <span className="v4-pantalla__linea" style={{ width: "38%" }} />
          <span className="v4-pantalla__linea" style={{ width: "22%" }} />
        </div>
      </div>
      <div className="v4-pantalla__media" style={{ height: `${pieza.media}px` }}>
        {pieza.formato === "reel" ? <span className="v4-pantalla__play" /> : null}
      </div>
      <div className="v4-pantalla__acciones">
        <span />
        <span />
        <span />
      </div>
    </div>
  ));
  return (
    <div className="v4-pantalla__feed" aria-hidden="true">
      {juego}
      {juego}
    </div>
  );
}

/**
 * Las preguntas se escriben, encuentran sus sitios y dejan paso a la
 * siguiente, en bucle.
 *
 * Una sola pregunta contaba un caso; varias cuentan lo que de verdad importa,
 * que esto pasa en cualquier categoría. Los resultados se apagan antes de
 * borrar: primero deja de valer la respuesta, después se cambia la pregunta.
 *
 * Con prefers-reduced-motion se muestra la primera pregunta ya escrita y con
 * sus sitios puestos: el ciclo es el gesto, pero el contenido es el mensaje.
 */
function Busqueda({ preguntas }) {
  const [indice, setIndice] = useState(0);
  const [escrito, setEscrito] = useState(0);
  const [respuestas, setRespuestas] = useState(0);
  const caja = useRef(null);

  useEffect(() => {
    const nodo = caja.current;
    if (!nodo) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEscrito(preguntas[0].length);
      setRespuestas(RESULTADOS.length);
      return undefined;
    }

    let vivo = true;
    let cuadro = 0;
    let temporizadores = [];

    const dormir = (ms) =>
      new Promise((listo) => temporizadores.push(setTimeout(listo, ms)));

    /* Por tiempo y no por ticks, igual que la respuesta generativa: un
       setInterval por carácter se arrastra en cuanto el navegador decide que
       la pestaña no es prioritaria. */
    const teclear = (desde, hasta, porCaracter) =>
      new Promise((listo) => {
        const inicio = performance.now();
        const sentido = hasta > desde ? 1 : -1;
        const paso = () => {
          const avance = Math.round((performance.now() - inicio) / porCaracter);
          const bruto = desde + sentido * avance;
          const cuantos = sentido > 0 ? Math.min(bruto, hasta) : Math.max(bruto, hasta);
          setEscrito(cuantos);
          if (cuantos !== hasta) {
            cuadro = requestAnimationFrame(paso);
            return;
          }
          listo();
        };
        cuadro = requestAnimationFrame(paso);
      });

    const ciclo = async () => {
      for (let i = 0; vivo; i = (i + 1) % preguntas.length) {
        setIndice(i);
        await teclear(0, preguntas[i].length, POR_CARACTER);
        if (!vivo) return;
        for (let k = 0; k < RESULTADOS.length; k += 1) {
          await dormir(k === 0 ? ANTES_DE_RESPONDER : ENTRE_RESULTADOS);
          if (!vivo) return;
          setRespuestas(k + 1);
        }
        await dormir(LECTURA);
        if (!vivo) return;
        setRespuestas(0);
        await dormir(ANTES_DE_BORRAR);
        await teclear(preguntas[i].length, 0, POR_BORRADO);
        await dormir(ENTRE_PREGUNTAS);
      }
    };

    const io = new IntersectionObserver(
      (entradas) => {
        if (!entradas.some((e) => e.isIntersecting)) return;
        io.disconnect();
        ciclo();
      },
      { threshold: 0.4 }
    );
    io.observe(nodo);

    return () => {
      vivo = false;
      io.disconnect();
      cancelAnimationFrame(cuadro);
      temporizadores.forEach(clearTimeout);
    };
  }, [preguntas]);

  const pregunta = preguntas[indice];

  return (
    <div className="v4-pantalla__busqueda" ref={caja}>
      <div className="v4-pantalla__campo">
        <IconoBuscar />
        <span className="v4-pantalla__pregunta">
          {pregunta.slice(0, escrito)}
          <span className="v4-pantalla__cursor" data-activo="true" />
        </span>
      </div>
      <div className="v4-pantalla__resultados" aria-hidden="true">
        {RESULTADOS.map((ancho, i) => (
          <div
            className="v4-pantalla__resultado"
            key={ancho}
            data-visible={i < respuestas ? "true" : undefined}
          >
            <span className="v4-pantalla__favicon" />
            <div className="v4-pantalla__lineas">
              <span className="v4-pantalla__linea" style={{ width: `${ancho}%` }} />
              <span className="v4-pantalla__linea" style={{ width: `${ancho - 22}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Pantallas({ pasiva, activa }) {
  const { t } = useTranslation("common");
  return (
    <figure className="v4-pantallas">
      <div className="v4-pantalla" data-tono="pasiva">
        <div className="v4-pantalla__rotulo">
          <span className="v4-chip">{pasiva.label}</span>
          <p>{pasiva.pie}</p>
        </div>
        <div className="v4-pantalla__cuerpo">
          <Feed />
          <div className="v4-pantalla__velo" aria-hidden="true" />
        </div>
      </div>

      <div className="v4-pantalla" data-tono="activa">
        <div className="v4-pantalla__rotulo">
          <span className="v4-chip v4-chip--gold">{activa.label}</span>
          <p>{activa.pie}</p>
        </div>
        <div className="v4-pantalla__cuerpo">
          <Busqueda preguntas={activa.preguntas} />
        </div>
      </div>

      {/* Lo que leen los crawlers y quien no ve el dibujo. */}
      <figcaption className="v4-oculto">
        {pasiva.label}: {pasiva.pie} {activa.label}: {t("pantallas.busca")}{" "}
        {activa.preguntas.map((p) => `«${p}»`).join(", ")}. {activa.pie}
      </figcaption>
    </figure>
  );
}
