import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next/pages";

/**
 * La respuesta generativa, en un móvil, como la ve el consumidor.
 *
 * No es un adorno: es el producto. Lo que se vende en esta página es aparecer
 * dentro de esa respuesta, así que la pieza tiene que comportarse como lo que
 * imita —un chat con un modelo— y no como un párrafo ya escrito.
 *
 * Va en el orden en que pasa de verdad: la pregunta del consumidor entra en su
 * burbuja; el modelo "piensa" un momento (los tres puntos); la respuesta sale
 * a golpes de token, no letra a letra, con la marca del cliente entre marcas
 * reales de la categoría; y al terminar cita de dónde lo ha sacado, en una
 * línea discreta, que es como lo hacen los motores generativos.
 *
 * El móvil es el mismo marco que enseña los canales en /products/paid-media:
 * el hero de la portada tiene la esfera, el del concepto tiene los planos, y
 * este tiene la pantalla en la que ocurre la conversación.
 *
 * Con prefers-reduced-motion se muestra todo de entrada: la animación es el
 * gesto, pero el contenido es el mensaje.
 */

/* Lo que tarda en entrar la pregunta. */
const ANTES_DE_PREGUNTAR = 320;
/* Lo que el modelo "piensa" antes de escribir. Sin esta pausa la respuesta
   sale pegada a la pregunta y deja de parecer un chat. */
const PENSANDO = 1100;
/* Ritmo de salida, en ms por token. Un modelo no escribe letras: suelta
   palabras y trozos de palabra a un ritmo irregular. */
const POR_TOKEN = 64;
/* Lo que espera antes de citar, y lo que tardan las fuentes entre sí. */
const ANTES_DE_CITAR = 420;
const ENTRE_FUENTES = 220;

/* Material Symbols Outlined · arrow_upward (24px, wght 400). El botón de
   enviar de los chats de LLM es una flecha hacia arriba, no un avión. */
function IconoEnviar() {
  return (
    <svg className="v4-icon" viewBox="0 -960 960 960" aria-hidden="true">
      <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
    </svg>
  );
}

/** Parte el texto en tokens: palabras con su espacio delante. */
function tokenizar(texto) {
  return texto.match(/\s*\S+/g) || [];
}

/**
 * Cuántos caracteres van escritos según el tiempo. Los tokens salen con un
 * ritmo irregular determinista —según su longitud— para que no parezca un
 * metrónomo; la suma sigue siendo POR_TOKEN de media.
 */
function escritoA(tokens, ms) {
  let reloj = 0;
  let chars = 0;
  for (let i = 0; i < tokens.length; i += 1) {
    reloj += POR_TOKEN * (0.6 + Math.min(tokens[i].length, 8) / 10);
    if (ms < reloj) return chars;
    chars += tokens[i].length;
  }
  return chars;
}

/** Cada cuánto cambia la marca una vez escrita la respuesta. */
const POR_MARCA = 3800;

/**
 * `marca` admite una lista: la primera es la que se escribe, y cuando la
 * respuesta está entera van rotando las demás. Es el argumento dicho sin
 * decirlo: la respuesta vale para cualquier marca, y podría ser la tuya.
 */
export default function RespuestaIA({ pregunta, antes, marca, despues, fuentes }) {
  const { t } = useTranslation("common");
  const marcas = [].concat(marca);
  const [iMarca, setIMarca] = useState(0);
  const completo = `${antes}${marcas[0]}${despues}`;
  const cuantasFuentes = fuentes.length;
  /* Fases: 0 vacío · 1 pregunta · 2 pensando · 3 escribiendo/escrito. */
  const [fase, setFase] = useState(0);
  const [escrito, setEscrito] = useState(0);
  const [citadas, setCitadas] = useState(0);
  const caja = useRef(null);

  useEffect(() => {
    const nodo = caja.current;
    if (!nodo) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFase(3);
      setEscrito(completo.length);
      setCitadas(cuantasFuentes);
      return undefined;
    }

    const tokens = tokenizar(completo);
    let temporizadores = [];
    let cuadro = 0;
    let arrancado = false;

    /* El avance va por TIEMPO, no por ticks: con un setInterval por token, en
       pestaña de fondo el navegador no lo respeta y la respuesta sale a paso
       de caracol. Con rAF se calcula cuánto toca según lo transcurrido. */
    const escribir = () => {
      setFase(3);
      const inicio = performance.now();
      const paso = () => {
        const cuantos = escritoA(tokens, performance.now() - inicio);
        setEscrito(cuantos);
        if (cuantos < completo.length) {
          cuadro = requestAnimationFrame(paso);
          return;
        }
        for (let k = 0; k < cuantasFuentes; k += 1) {
          temporizadores.push(
            setTimeout(() => setCitadas(k + 1), ANTES_DE_CITAR + k * ENTRE_FUENTES)
          );
        }
      };
      cuadro = requestAnimationFrame(paso);
    };

    const arrancar = () => {
      if (arrancado) return;
      arrancado = true;
      temporizadores.push(setTimeout(() => setFase(1), ANTES_DE_PREGUNTAR));
      temporizadores.push(setTimeout(() => setFase(2), ANTES_DE_PREGUNTAR + 500));
      temporizadores.push(setTimeout(escribir, ANTES_DE_PREGUNTAR + 500 + PENSANDO));
    };

    /* Si ya está en pantalla al montar, arranca sin más. El observador es solo
       para cuando la pieza queda por debajo del fold y el lector llega luego. */
    const enPantalla = () => {
      const r = nodo.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight * 0.92;
    };

    let io;
    if (enPantalla()) {
      arrancar();
    } else {
      io = new IntersectionObserver(
        (entradas) => {
          if (!entradas.some((e) => e.isIntersecting)) return;
          io.disconnect();
          arrancar();
        },
        { threshold: 0 }
      );
      io.observe(nodo);
    }

    return () => {
      if (io) io.disconnect();
      cancelAnimationFrame(cuadro);
      temporizadores.forEach(clearTimeout);
    };
    /* `fuentes` es un literal en la página, así que su referencia cambia en
       CADA render; depender de él reiniciaba la animación con cada token. Se
       depende del contenido, no del array. */
  }, [completo, fuentes.length]); // eslint-disable-line react-hooks/exhaustive-deps

  /* El texto se reparte en tres tramos para que la marca del cliente conserve su
     realce mientras sale, en vez de aparecer como texto plano y colorearse al
     final. */
  const finAntes = Math.min(escrito, antes.length);
  const finMarca = Math.min(Math.max(escrito - antes.length, 0), marcas[0].length);
  const finDespues = Math.max(escrito - antes.length - marcas[0].length, 0);
  const escribiendo = fase === 3 && escrito < completo.length;
  const escrita = fase === 3 && escrito >= completo.length;

  /* Con la respuesta entera, la marca va cambiando. Solo mientras se ve —fuera
     de pantalla no hay nadie a quien contárselo— y nunca con el movimiento
     reducido, que se queda en la primera. */
  useEffect(() => {
    const nodo = caja.current;
    if (!nodo || !escrita || marcas.length < 2) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let reloj;
    const io = new IntersectionObserver(
      (entradas) => {
        clearInterval(reloj);
        if (entradas.some((e) => e.isIntersecting)) {
          reloj = setInterval(() => setIMarca((n) => (n + 1) % marcas.length), POR_MARCA);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(nodo);
    return () => {
      io.disconnect();
      clearInterval(reloj);
    };
  }, [escrita, marcas.length]);

  const marcaVisible = escrita ? marcas[iMarca] : marcas[0].slice(0, finMarca);

  return (
    <div className="v4-respuesta v4-movil" ref={caja}>
      <div className="v4-movil__pantalla v4-respuesta__pantalla" aria-hidden="true">
        <div className="v4-maqueta__barra" />

        <div className="v4-respuesta__hilo">
          <p className="v4-respuesta__pregunta" data-visible={fase >= 1 ? "true" : undefined}>
            {pregunta}
          </p>

          <div className="v4-respuesta__mensaje" data-visible={fase >= 2 ? "true" : undefined}>
            {fase === 2 ? (
              <span className="v4-respuesta__pensando">
                <i />
                <i />
                <i />
              </span>
            ) : (
              <p className="v4-respuesta__texto">
                {antes.slice(0, finAntes)}
                <span className="v4-respuesta__marca" key={escrita ? marcaVisible : "escribiendo"}>
                  {marcaVisible}
                </span>
                {despues.slice(0, finDespues)}
                <span
                  className="v4-respuesta__cursor"
                  data-activo={escribiendo ? "true" : undefined}
                />
              </p>
            )}
            <p className="v4-respuesta__fuentes" data-visible={citadas > 0 ? "true" : undefined}>
              <span>{t("respuesta.fuentes")}</span>
              {fuentes.map((fuente, i) => (
                <span
                  key={fuente}
                  className="v4-respuesta__fuente"
                  data-visible={i < citadas ? "true" : undefined}
                >
                  {fuente}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="v4-respuesta__campo">
          <span>{t("respuesta.campo")}</span>
          <span className="v4-respuesta__enviar">
            <IconoEnviar />
          </span>
        </div>
      </div>

      {/* Lo que leen los crawlers y quien no ve la animación. */}
      <span className="v4-oculto">
        {t("respuesta.oculto", { pregunta, respuesta: completo, fuentes: fuentes.join(", ") })}
      </span>
    </div>
  );
}
