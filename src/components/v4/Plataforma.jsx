import React, { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/router";
import ESCENAS from "./PlataformaEscenas";
import { BriefModal } from "./PlataformaBrief";
import T from "./T";
import { Key } from "./primitives";
import usePlataformaSecuencia from "./usePlataformaSecuencia";

/**
 * La plataforma, enseñada en vez de descrita.
 *
 * «Sabemos dónde publicar y cómo redactar» es una afirmación; esto es la prueba.
 * Una ventana de la aplicación con las pantallas por las que pasa un cliente,
 * en el orden en que se trabaja: dónde está, de dónde sale la respuesta, el
 * plan y lo que se ha movido en la siguiente medición. El brief no es una
 * pantalla: se abre desde una fila del plan, encima, como en el producto.
 *
 * Hace las veces de vídeo, pero de alguien navegando: un cursor va a la
 * pestaña de Prompts y la pulsa, baja por la barra lateral, pulsa la fila de
 * autohero y se abre el brief. Cada pantalla entra por partes —las barras
 * crecen, la rosca se dibuja, las filas llegan en orden—. Y sigue siendo el
 * producto que imita: todo lo que el cursor pulsa se puede pulsar de verdad,
 * y hacerlo para la secuencia y deja mandar a quien mira. El botón de pausa
 * está siempre: algo que se mueve solo más de cinco segundos tiene que poder
 * pararse.
 *
 * Los comentarios van dentro de la pantalla, no debajo: una nota en grafito
 * anclada a lo que se está mirando (NOTAS, por `data-ancla`), que sale poco
 * después de cada clic y se va con el siguiente. Debajo de la ventana no había
 * quien los leyera.
 *
 * El movimiento es CSS (v4-plataforma-motion.css): la pantalla se vuelve a
 * montar al cambiar y sus entradas corren de nuevo. Con `prefers-reduced-motion`
 * no hay secuencia, cursor ni entradas: queda la pieza en estático,
 * navegable, que es el contenido.
 *
 * Los datos son de ejemplo. Las cifras viven en las pantallas; los textos, en
 * `plataforma` del diccionario de la página. Las notas no hablan de la marca
 * ni de sus cifras: cuentan lo que hacemos en cada paso.
 */

/* Qué entrada del diccionario (`plataforma.escenas`) describe cada pantalla
   de la barra lateral, y cuál describe el brief. */
const DICC = [0, 1, 2, 4];
const DICC_BRIEF = 3;
const PLAN = 2;

/* Las notas: para cada estado, a qué se ancla el comentario, qué texto lleva
   y cuánto tarda en salir. En citas espera a que se ilumine el hueco. */
const NOTAS = [
  { si: (e) => e.escena === 0 && e.sub === 0, ancla: "ranking", texto: "visibilidad", tras: 1600 },
  { si: (e) => e.escena === 0 && e.sub === 3, ancla: "menciones", texto: "prompts", tras: 1600 },
  { si: (e) => e.escena === 1, ancla: "hueco", texto: "citas", tras: 3000 },
  { si: (e) => e.escena === 2 && !e.modal, ancla: "porque", texto: "plan", tras: 1600 },
  { si: (e) => e.modal, ancla: "reglas", texto: "brief", tras: 1400 },
  { si: (e) => e.escena === 3, ancla: "evo", texto: "evolucion", tras: 2200 },
];
const ANCHO_NOTA = 300;

/* El guion: qué se pulsa, qué pantalla queda y cuánto se lee. */
/* Cada pantalla se queda lo que tarda en salir su nota más unos seis segundos
   de lectura. Una vuelta entera ronda el minuto. */
const PASOS = [
  { estado: { escena: 0, sub: 0, modal: false }, espera: 7600 },
  { clic: "sub:3", estado: { escena: 0, sub: 3, modal: false }, espera: 7200 },
  { clic: "tab:1", estado: { escena: 1, sub: 0, modal: false }, espera: 8800 },
  { clic: "tab:2", estado: { escena: 2, sub: 0, modal: false }, espera: 7400 },
  { clic: "fila:autohero.com", estado: { escena: 2, sub: 0, modal: true }, espera: 7400 },
  { clic: "cerrar", estado: { escena: 2, sub: 0, modal: false }, espera: 900 },
  { clic: "tab:3", estado: { escena: 3, sub: 0, modal: false }, espera: 8400 },
];

export default function Plataforma({ t }) {
  const raiz = useRef(null);
  const nav = useRef(null);
  const { estado, cursor, enMarcha, parada, quieto, manual, alternar } = usePlataformaSecuencia(
    PASOS,
    raiz
  );
  const { escena: activa, sub, modal } = estado;
  const id = useId();
  const { locale = "es" } = useRouter();
  const escenas = t("plataforma.escenas", { returnObjects: true });
  const Escena = ESCENAS[activa];

  const irA = (i) => manual({ escena: i, sub: 0, modal: false });

  /* La nota del estado actual. Se coloca cuando la pantalla ya está pintada y
     su ancla existe; se pega bajo el ancla, sin salirse de la ventana. */
  const [nota, setNota] = useState(null);
  useEffect(() => {
    setNota(null);
    if (quieto) return undefined;
    const cual = NOTAS.find((n) => n.si(estado));
    if (!cual) return undefined;
    const reloj = setTimeout(() => {
      const ventana = raiz.current?.querySelector(".v4-plat__ventana");
      const ancla = ventana?.querySelector(`[data-ancla="${cual.ancla}"]`);
      if (!ancla) return;
      const r = ancla.getBoundingClientRect();
      const base = ventana.getBoundingClientRect();
      const x = Math.min(Math.max(r.left - base.left, 16), base.width - ANCHO_NOTA - 16);
      setNota({ x, y: r.bottom - base.top + 10, texto: t(`plataforma.notas.${cual.texto}`) });
    }, cual.tras);
    return () => clearTimeout(reloj);
  }, [estado, quieto, t]);

  /* Flechas entre pestañas, como pide el patrón de tabs. */
  const alTeclear = (e) => {
    const salto = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!salto) return;
    e.preventDefault();
    const siguiente = (activa + salto + ESCENAS.length) % ESCENAS.length;
    irA(siguiente);
    document.getElementById(`${id}-tab-${siguiente}`)?.focus();
  };

  /* En móvil las pestañas van en fila y no caben: la activa se trae a la vista
     moviendo solo su carril, nunca la página. */
  useEffect(() => {
    const carril = nav.current;
    const tab = carril?.children[activa];
    if (tab) carril.scrollTo({ left: tab.offsetLeft - carril.offsetLeft - 16, behavior: "smooth" });
  }, [activa]);

  return (
    <figure className="v4-plat" ref={raiz} data-marcha={enMarcha || undefined}>
      <div className="v4-plat__ventana">
        <div className="v4-plat__barra">
          <span className="v4-plat__marca">
            <strong>BYD</strong>
            <span>{t("plataforma.mercado")}</span>
          </span>
          <span className="v4-plat__barra-fin">
            {quieto ? null : (
              <button type="button" className="v4-plat__pausa" onClick={alternar}>
                {t(parada ? "plataforma.reproducir" : "plataforma.pausar")}
              </button>
            )}
          </span>
        </div>

        <div
          className="v4-plat__nav"
          ref={nav}
          role="tablist"
          aria-label={t("plataforma.navegacion")}
          aria-orientation="vertical"
          onKeyDown={alTeclear}
        >
          {DICC.map((d, i) => (
            <button
              key={d}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              data-diana={`tab:${i}`}
              aria-selected={i === activa}
              aria-controls={`${id}-panel`}
              tabIndex={i === activa ? 0 : -1}
              className="v4-plat__tab"
              onClick={() => irA(i)}
            >
              <span className="v4-plat__tab-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              {escenas[d].tab}
            </button>
          ))}
        </div>

        <div
          className="v4-plat__escena"
          key={`${activa}-${sub}`}
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${activa}`}
        >
          {/* El plan trae su propia cabecera, con el nombre del plan: el título
              genérico se queda solo para lectores de pantalla. La última
              palabra va en oro, como los títulos del producto. */}
          <h3 className={Escena.conCabecera ? "v4-oculto" : "v4-plat__titulo"}>
            <T
              t={t}
              k={`plataforma.escenas.${DICC[activa]}.titulo`}
              components={{ key: <Key animado={false} /> }}
            />
          </h3>
          <Escena
            t={t}
            idioma={locale}
            sub={sub}
            alCambiarSub={(n) => manual({ sub: n })}
            alAbrir={activa === PLAN ? () => manual({ modal: true }) : undefined}
          />
        </div>

        {modal ? (
          <BriefModal
            t={t}
            titulo={escenas[DICC_BRIEF].titulo.replace(/<\/?key>/g, "")}
            alCerrar={() => manual({ modal: false })}
          />
        ) : null}

        {nota ? (
          <aside
            className="v4-plat__nota"
            role="note"
            style={{ transform: `translate(${nota.x}px, ${nota.y}px)` }}
          >
            {nota.texto}
          </aside>
        ) : null}

        {/* El cursor de la secuencia. Va por encima de todo y no se puede
            pulsar: es un dibujo de alguien navegando. */}
        <span
          className="v4-plat__cursor"
          aria-hidden="true"
          data-visible={cursor.visible || undefined}
          data-pulsa={cursor.pulsa || undefined}
          style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
        >
          <svg viewBox="0 0 24 24">
            <path d="M5 3l14 8.5-6.2 1.4-3.5 5.6z" />
          </svg>
        </span>
      </div>
    </figure>
  );
}
