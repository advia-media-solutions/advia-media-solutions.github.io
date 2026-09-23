import React, { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "next-i18next/pages";

/**
 * Columnas en paralelo · la propuesta 1b del canvas de animación, llevada a la
 * web.
 *
 * Cada agente es una columna, como un feed. Las columnas bajan a la vez y se
 * DETIENEN tres veces: cada parada es una coincidencia —la misma fuente ha
 * salido en varias columnas—, y en ese momento las tarjetas quedan a la misma
 * altura y una línea dorada las cruza. Eso es todo el argumento: caminos
 * distintos, mismas paradas.
 *
 * La regla de color viene del canvas y es la que sostiene la pieza: las fuentes
 * empiezan neutras y el oro aparece SOLO en las que visitan varios agentes. Una
 * fuente que ve uno solo se queda gris. Si todo lo que pasa se dora, el acento
 * deja de decir nada y la coincidencia no se ve.
 *
 * La excepción es el símbolo del agente, que es la esfera de la marca y por eso
 * va dorado (en el canvas era un punto grafito). No compite con la regla porque
 * vive fuera del área de las cintas: arriba, junto al nombre, donde el oro dice
 * "esto es Vera" y no "aquí hay una coincidencia".
 *
 * Portado del original de 16:9 a la caja de contenido de la web (1120px), así
 * que lo que allí eran coordenadas absolutas aquí es una rejilla de cuatro
 * columnas: el dibujo se recoloca solo cuando cambia el ancho. El tiempo, en
 * cambio, es el mismo — viaje, parada, viaje —, porque es lo que hace legible
 * la coincidencia.
 *
 * Todo es HTML y CSS con un ciclo de temporizadores: la home ya carga escenas
 * de WebGL de sobra, y esta pieza tiene que leerse en móvil y sin GPU.
 */

const WEB = "web";
const VIDEO = "video";
const CHAT = "chat";

/* El dominio que la respuesta del chat cita y que además coincide entre
   agentes: es el único que va en oro dentro de la burbuja. */
const COMPARTIDO = "motor.es";

/* El relleno de cada columna. Vive aquí y no en la página, al revés que el
   resto del contenido de la web, porque no es texto que se lea: es el material
   por el que pasa el scroll, y está elegido para que las tres coincidencias
   caigan donde caen. Cambiar un dominio de sitio descoloca la alineación, que
   es justo lo que la pieza tiene que enseñar. */
const RELLENO = [
  [
    [WEB, "motor.es"],
    [VIDEO, "Consumo real · SUV híbridos"],
    [WEB, "coches.net"],
    [CHAT, ["motor.es", "coches.net"]],
    [WEB, "autopista.es"],
    [WEB, "forocoches.com"],
    [VIDEO, "Prueba a fondo · SUV"],
    [WEB, "comparador.es"],
  ],
  [
    [WEB, "autopista.es"],
    [WEB, "km77.com"],
    [VIDEO, "Prueba a fondo · SUV"],
    [WEB, "marca.com"],
    [WEB, "coches.net"],
    [VIDEO, "Consumo real · SUV híbridos"],
    [WEB, "forocoches.com"],
    [WEB, "motor.es"],
  ],
  [
    [CHAT, ["autopista.es", "motor.es"]],
    [WEB, "motor.es"],
    [WEB, "comparador.es"],
    [VIDEO, "Prueba a fondo · SUV"],
    [WEB, "forocoches.com"],
    [WEB, "autopista.es"],
    [WEB, "coches.net"],
    [WEB, "marca.com"],
  ],
  [
    [WEB, "coches.net"],
    [VIDEO, "Consumo real · SUV híbridos"],
    [WEB, "forocoches.com"],
    [WEB, "motor.es"],
    [WEB, "autopista.es"],
    [VIDEO, "Prueba a fondo · SUV"],
    [WEB, "comparador.es"],
    [WEB, "marca.com"],
  ],
];

/**
 * Las tres paradas. `columnas` dice quién comparte la fuente y `indice` en qué
 * tarjeta de CADA columna se para el scroll — son distintos a propósito: las
 * cuatro columnas van por sitios distintos de su feed y aun así acaban
 * enseñando lo mismo a la misma altura. Esa desigualdad ES la coincidencia.
 */
const PARADAS = [
  { columnas: [0, 2, 3], indice: [3, 4, 3, 3], tarjeta: [WEB, "km77.com"] },
  {
    columnas: [1, 2],
    indice: [7, 7, 8, 7],
    tarjeta: [VIDEO, "Review · los 5 SUV híbridos que compensan"],
  },
  {
    columnas: [0, 1, 2, 3],
    indice: [11, 12, 11, 11],
    tarjeta: [CHAT, ["motor.es", "coches.net"]],
  },
];

const TARJETAS = 16;
/* Cuántas tarjetas más siguen bajando al cerrar, antes de volver al principio:
   la cinta no termina, se va. */
const SALIDA = 7;
/* Dónde arranca el feed, en tarjetas por encima de la fila alineada. */
const ENTRADA = -6;

/* Tiempos. Más lentos que los del original de 16:9, y a propósito: allí la
   animación es LA pieza y se mira entera, aquí vive en medio de una página que
   se está leyendo, y quien llega a la sección se incorpora a mitad de ciclo.
   A ese ritmo hay que darle tiempo a entender qué está mirando antes de que la
   cinta se mueva otra vez.
   VIAJE manda también sobre la transición del CSS: se pasa como custom property
   desde el render, así que no hay dos números que puedan desincronizarse. */
const VIAJE = 1900;
const PARADA_QUIETA = 2800;
const POR_CARACTER = 55;
const ENTRE_AGENTES = 400;
const ANTES_DE_BAJAR = 1100;
const PAUSA_FINAL = 2400;

/** Las columnas de cada agente, ya con su coincidencia incrustada. */
const COLUMNAS = RELLENO.map((relleno, i) => {
  const tarjetas = Array.from({ length: TARJETAS }, (_, j) => relleno[j % relleno.length]);
  PARADAS.forEach((parada, p) => {
    if (parada.columnas.includes(i)) tarjetas[parada.indice[i]] = [...parada.tarjeta, p];
  });
  return tarjetas;
});

/* ── Las tarjetas ───────────────────────────────────────────────────────── */
/* Ni una palabra legible en el cuerpo: lo que tiene que reconocerse es la forma
   —un resultado de búsqueda, un vídeo, una respuesta de un modelo—, y en cuanto
   hay texto de verdad el ojo se va a leerlo en vez de a comparar columnas. Lo
   único que se lee es el dominio, porque el dominio es el dato. */

function CuerpoWeb({ etiqueta }) {
  return (
    <>
      <span className="v4-col-tarjeta__url">{etiqueta}</span>
      <div className="v4-col-tarjeta__resultado" aria-hidden="true">
        <div className="v4-col-tarjeta__lineas">
          <span className="v4-col-tarjeta__bloque" />
          <span className="v4-col-tarjeta__linea" />
          <span className="v4-col-tarjeta__linea" style={{ width: "70%" }} />
        </div>
        <span className="v4-col-tarjeta__miniatura" />
      </div>
    </>
  );
}

function CuerpoVideo({ etiqueta }) {
  return (
    <>
      <div className="v4-col-tarjeta__media" aria-hidden="true">
        <span className="v4-col-tarjeta__play" />
        <span className="v4-col-tarjeta__duracion">12:48</span>
        <span className="v4-col-tarjeta__barra">
          <span />
        </span>
      </div>
      <div className="v4-col-tarjeta__autor">
        <span className="v4-col-tarjeta__avatar" aria-hidden="true" />
        <span className="v4-col-tarjeta__titulo">{etiqueta}</span>
      </div>
    </>
  );
}

function CuerpoChat({ etiqueta }) {
  const { t } = useTranslation("common");
  const [uno, dos] = etiqueta;
  const dominio = (txt) => (
    <span className="v4-col-tarjeta__dominio" data-fuente={txt === COMPARTIDO ? "true" : undefined}>
      {txt}
    </span>
  );
  return (
    <>
      <span className="v4-col-tarjeta__rotulo">◌ ChatGPT</span>
      <p className="v4-col-tarjeta__burbuja">
        <Trans t={t} i18nKey="columnas.chat" components={{ uno: dominio(uno), dos: dominio(dos) }} />
      </p>
    </>
  );
}

function Tarjeta({ tipo, etiqueta, brilla, sitio }) {
  return (
    <li
      className="v4-col-tarjeta"
      data-tipo={tipo}
      data-brilla={brilla ? "true" : undefined}
      /* Su sitio en la cinta: el CSS la coloca a partir de aquí, así que la
         lista no tiene que ser un flujo y la cinta puede moverse entera. */
      style={{ "--v4-j": sitio }}
    >
      {tipo === VIDEO ? <CuerpoVideo etiqueta={etiqueta} /> : null}
      {tipo === CHAT ? <CuerpoChat etiqueta={etiqueta} /> : null}
      {tipo === WEB ? <CuerpoWeb etiqueta={etiqueta} /> : null}
    </li>
  );
}

/* ── La pieza ───────────────────────────────────────────────────────────── */

export default function Columnas({ agentes }) {
  const { t } = useTranslation("common");
  /* Cuatro estados y con eso se cuenta el ciclo entero: en qué parada va el
     scroll, cuántos agentes han despertado, qué lleva escrito cada pregunta y
     si la coincidencia está encendida ahora mismo. */
  const [parada, setParada] = useState(null);
  const [despiertos, setDespiertos] = useState(0);
  const [escrito, setEscrito] = useState(() => agentes.map(() => 0));
  const [coincide, setCoincide] = useState(null);
  /* Un frame sin transición al reiniciar el bucle: ver el CSS de
     [data-rebobina]. Si las cintas volvieran animadas al principio, el final se
     desharía a la vista y el bucle tendría costura. */
  const [rebobina, setRebobina] = useState(false);
  const caja = useRef(null);

  useEffect(() => {
    const nodo = caja.current;
    if (!nodo) return undefined;

    /* Sin movimiento se enseña la tercera coincidencia, que es la que cierra el
       argumento: las cuatro columnas enseñando la misma respuesta. El ciclo es
       el gesto; la alineación es el mensaje. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDespiertos(agentes.length);
      setEscrito(agentes.map((a) => a.pregunta.length));
      setParada(PARADAS.length - 1);
      setCoincide(PARADAS.length - 1);
      return undefined;
    }

    let vivo = true;
    let cuadro = 0;
    const temporizadores = [];
    const dormir = (ms) => new Promise((listo) => temporizadores.push(setTimeout(listo, ms)));

    /* Por tiempo y no por ticks, como las otras piezas que teclean: un
       setInterval por carácter se arrastra en cuanto el navegador decide que la
       pestaña no es prioritaria. */
    const teclear = (i, hasta) =>
      new Promise((listo) => {
        const inicio = performance.now();
        const paso = () => {
          const n = Math.min(hasta, Math.round((performance.now() - inicio) / POR_CARACTER));
          setEscrito((previo) => previo.map((v, k) => (k === i ? n : v)));
          if (n < hasta) {
            cuadro = requestAnimationFrame(paso);
            return;
          }
          listo();
        };
        cuadro = requestAnimationFrame(paso);
      });

    const ciclo = async () => {
      while (vivo) {
        setRebobina(true);
        setParada(null);
        setCoincide(null);
        setDespiertos(0);
        setEscrito(agentes.map(() => 0));
        /* Dos frames: uno para que el navegador pinte las cintas ya colocadas
           al principio sin transición, otro para devolvérsela antes de que
           empiece el primer viaje. */
        await new Promise((listo) => {
          cuadro = requestAnimationFrame(() => {
            cuadro = requestAnimationFrame(listo);
          });
        });
        if (!vivo) return;
        setRebobina(false);

        /* Los agentes despiertan escalonados y escriben a la vez: uno detrás de
           otro tardaría veinte segundos en arrancar la pieza. */
        for (let i = 0; i < agentes.length; i += 1) {
          if (!vivo) return;
          setDespiertos(i + 1);
          teclear(i, agentes[i].pregunta.length);
          await dormir(ENTRE_AGENTES);
        }
        await dormir(
          Math.max(...agentes.map((a) => a.pregunta.length)) * POR_CARACTER + ANTES_DE_BAJAR
        );

        for (let p = 0; p < PARADAS.length; p += 1) {
          if (!vivo) return;
          setParada(p);
          /* El oro entra al FINAL del viaje, no durante: encendido mientras las
             tarjetas todavía se mueven, parece que la línea las arrastra, y lo
             que pasa es al revés. */
          await dormir(VIAJE);
          if (!vivo) return;
          setCoincide(p);
          await dormir(PARADA_QUIETA);
          setCoincide(null);
        }

        if (!vivo) return;
        setParada("salida");
        await dormir(VIAJE + PAUSA_FINAL);
      }
    };

    /* No arranca hasta que se ve: si el ciclo corre fuera de pantalla, cuando
       llegas ya ha pasado lo único que había que ver. */
    const io = new IntersectionObserver(
      (entradas) => {
        if (!entradas.some((e) => e.isIntersecting)) return;
        io.disconnect();
        ciclo();
      },
      { threshold: 0.3 }
    );
    io.observe(nodo);

    return () => {
      vivo = false;
      io.disconnect();
      cancelAnimationFrame(cuadro);
      temporizadores.forEach(clearTimeout);
    };
  }, [agentes]);

  /** Cuántas tarjetas ha subido ya la columna i. */
  const avance = (i) => {
    if (parada === null) return ENTRADA;
    if (parada === "salida") return PARADAS[PARADAS.length - 1].indice[i] + SALIDA;
    return PARADAS[parada].indice[i];
  };

  const activa = coincide === null ? null : PARADAS[coincide];

  return (
    <figure
      className="v4-columnas"
      ref={caja}
      data-coincide={activa ? "true" : undefined}
      data-rebobina={rebobina ? "true" : undefined}
      /* Único sitio donde vive la duración del viaje: la usa el ciclo de arriba
         y la transición de las cintas en el CSS. */
      style={{ "--v4-col-viaje": `${VIAJE}ms` }}
    >
      <ol className="v4-columnas__agentes">
        {agentes.map((agente, i) => (
          <li className="v4-columna-agente" key={agente.nombre} data-despierto={i < despiertos ? "true" : undefined}>
            <span className="v4-columna-agente__punto" aria-hidden="true" />
            <p className="v4-columna-agente__quien">
              <span className="v4-columna-agente__nombre">{agente.nombre}</span>
              {/* Cifra, así que mono (DS §2.4). */}
              <span className="v4-columna-agente__edad">{agente.edad} años</span>
            </p>
            <p className="v4-columna-agente__pregunta" data-fuera={parada === "salida" ? "true" : undefined}>
              {agente.pregunta.slice(0, escrito[i])}
              <span
                className="v4-columna-agente__cursor"
                data-activo={escrito[i] > 0 && escrito[i] < agente.pregunta.length ? "true" : undefined}
              />
            </p>
          </li>
        ))}
      </ol>

      <div className="v4-columnas__lienzo" aria-hidden="true">
        {/* La línea que cruza las columnas que coinciden. Se coloca por rejilla
            y no por píxeles, así que sigue a las columnas al cambiar el ancho. */}
        <span
          className="v4-columnas__linea"
          data-visible={activa ? "true" : undefined}
          /* SIEMPRE con columna explícita, aunque no se vea. Sin ella la línea
             se auto-colocaba, y como las cuatro cintas sí llevan la suya, se iba
             a una QUINTA columna implícita: la rejilla repartía el ancho entre
             cinco pistas y las cintas se estrechaban y se desplazaban respecto a
             las preguntas de arriba, cada vez más hacia la derecha. Al encender
             una coincidencia recuperaba su sitio y todo volvía a cuadrar, que es
             justo lo que hacía el fallo tan raro de ver. */
          style={{
            gridColumnStart: activa ? activa.columnas[0] + 1 : 1,
            gridColumnEnd: activa ? activa.columnas[activa.columnas.length - 1] + 2 : -1,
          }}
        />
        {COLUMNAS.map((tarjetas, i) => (
          <ol
            className="v4-columnas__col"
            key={agentes[i].nombre}
            /* En SU columna, explícita. Con auto-colocación, la línea dorada
               ocupaba celdas y las cintas se repartían por donde quedaba
               hueco —la cuarta acababa fuera del cuadro—. */
            style={{ gridColumn: i + 1, "--v4-i": i, "--v4-avance": avance(i) }}
          >
            {tarjetas.map((tarjeta, j) => (
              <Tarjeta
                key={j}
                tipo={tarjeta[0]}
                etiqueta={tarjeta[1]}
                brilla={coincide !== null && tarjeta[2] === coincide}
                sitio={j}
              />
            ))}
          </ol>
        ))}
        {/* Las tarjetas no se cortan en seco arriba y abajo: se funden con la
            card, que es lo que hace que la cinta parezca seguir fuera. */}
        <span className="v4-columnas__velo" />
      </div>

      {/* En estrecho las cintas no caben (ver la media query): queda la
          conclusión, que es en qué coinciden. Sin esto, en móvil se leerían
          cuatro preguntas y ninguna respuesta. */}
      <ul className="v4-columnas__resumen">
        {PARADAS.map((p, i) => (
          <li className="v4-columnas__coincidencia" key={String(p.tarjeta[1])}>
            {/* La misma tarjeta que se enciende en las cintas, ya encendida:
                lo que encuentran los agentes es un resultado, no un nombre. */}
            <ol className="v4-columnas__muestra">
              <Tarjeta tipo={p.tarjeta[0]} etiqueta={p.tarjeta[1]} brilla sitio={i} />
            </ol>
            <span className="v4-columnas__cuantos">
              {t("columnas.cuantos", { n: p.columnas.length, total: agentes.length })}
            </span>
          </li>
        ))}
      </ul>

      {/* Lo que leen los crawlers y quien no ve la animación. */}
      <figcaption className="v4-oculto">
        {t("columnas.oculto", {
          agentes: agentes.map((a) => t("columnas.agente", a)).join("; "),
        })}
      </figcaption>
    </figure>
  );
}
