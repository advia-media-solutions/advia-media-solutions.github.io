import React, { useEffect, useRef, useState } from "react";

/**
 * Los tres canales, presentados uno a uno.
 *
 * Viene de las láminas del pitch —un móvil con el canal a un lado y tres
 * argumentos al otro—, pero una web no es un deck: allí caben tres párrafos por
 * punto porque alguien los está contando en voz alta; aquí cada punto es un
 * titular y una línea. Lo que se conserva es el gesto: ver el canal mientras se
 * lee por qué funciona.
 *
 * La pantalla del móvil va dibujada con divs, no con capturas: son maquetas
 * abstractas de cada entorno —artículo, vídeo, feed— con el espacio del anuncio
 * marcado en dorado. Ni pesan, ni envejecen, ni meten creatividades de marcas
 * ajenas en nuestra web.
 *
 * Rota sola cada seis segundos para que se vean todos sin pedir nada, y se para
 * en cuanto alguien toca una pestaña o pasa el ratón: a partir de ahí manda
 * quien mira.
 *
 * Un canal puede venir marcado como `wip`. Entonces su pestaña se muestra pero
 * no se pulsa ni entra en la rotación: decir "estamos en ello" es información
 * útil para un cliente, y esconderlo sería peor; enseñar una pantalla a medias,
 * también.
 */

const POR_CANAL = 6000;

/* Maquetas de pantalla. Cada una es el entorno reconocible del canal reducido a
   sus tres o cuatro bloques, con el hueco del anuncio en dorado. */
function PantallaWeb() {
  return (
    <div className="v4-movil__pantalla">
      <div className="v4-maqueta__barra" />
      <div className="v4-maqueta__titular" />
      <div className="v4-maqueta__linea" />
      <div className="v4-maqueta__linea" style={{ width: "88%" }} />
      <div className="v4-maqueta__anuncio" data-formato="display">
        <span>Tu marca</span>
      </div>
      <div className="v4-maqueta__linea" />
      <div className="v4-maqueta__linea" style={{ width: "72%" }} />
    </div>
  );
}

function PantallaVideo() {
  return (
    <div className="v4-movil__pantalla">
      <div className="v4-maqueta__barra" />
      <div className="v4-maqueta__video">
        <span className="v4-maqueta__play" aria-hidden="true" />
        <div className="v4-maqueta__anuncio" data-formato="preroll">
          <span>Tu marca</span>
        </div>
      </div>
      <div className="v4-maqueta__titular" />
      <div className="v4-maqueta__linea" style={{ width: "64%" }} />
      <div className="v4-maqueta__sugerencias">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function PantallaFeed() {
  return (
    <div className="v4-movil__pantalla">
      <div className="v4-maqueta__barra" />
      {[0, 1].map((n) => (
        <div className="v4-maqueta__post" key={n}>
          <span className="v4-maqueta__avatar" />
          <div>
            <div className="v4-maqueta__linea" style={{ width: "56%" }} />
            <div className="v4-maqueta__linea" style={{ width: "82%" }} />
          </div>
        </div>
      ))}
      <div className="v4-maqueta__anuncio" data-formato="nativo">
        <span>Tu marca</span>
      </div>
    </div>
  );
}

const PANTALLAS = { web: PantallaWeb, video: PantallaVideo, feed: PantallaFeed };

export default function Canales({ canales }) {
  const [activo, setActivo] = useState(0);
  const [parado, setParado] = useState(false);
  const caja = useRef(null);

  useEffect(() => {
    const nodo = caja.current;
    if (!nodo || parado) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    /* La rotación solo pasa por los canales que se pueden enseñar. */
    const vivos = canales.reduce((ns, c, i) => (c.wip ? ns : [...ns, i]), []);
    if (vivos.length < 2) return undefined;

    let reloj;
    const io = new IntersectionObserver(
      (entradas) => {
        const dentro = entradas.some((e) => e.isIntersecting);
        clearInterval(reloj);
        reloj = dentro
          ? setInterval(
              () => setActivo((i) => vivos[(vivos.indexOf(i) + 1) % vivos.length]),
              POR_CANAL
            )
          : undefined;
      },
      { threshold: 0.3 }
    );
    io.observe(nodo);

    return () => {
      io.disconnect();
      clearInterval(reloj);
    };
  }, [canales, parado]);

  const canal = canales[activo];
  const Pantalla = PANTALLAS[canal.maqueta];

  return (
    <div
      className="v4-canales"
      ref={caja}
      onMouseEnter={() => setParado(true)}
      onMouseLeave={() => setParado(false)}
    >
      <div className="v4-movil" aria-hidden="true">
        <Pantalla key={canal.nombre} />
      </div>

      <div className="v4-canales__cuerpo">
        <div className="v4-canales__tabs" role="tablist" aria-label="Canales">
          {canales.map((c, i) => (
            <button
              type="button"
              role="tab"
              key={c.nombre}
              className="v4-canales__tab"
              aria-selected={i === activo}
              aria-disabled={c.wip ? true : undefined}
              disabled={c.wip}
              data-activo={i === activo ? "true" : undefined}
              data-wip={c.wip ? "true" : undefined}
              onClick={() => {
                if (c.wip) return;
                setActivo(i);
                setParado(true);
              }}
            >
              {c.nombre}
              {c.wip ? <span className="v4-canales__pronto">Próximamente</span> : null}
            </button>
          ))}
        </div>

        <ul className="v4-canales__puntos" key={canal.nombre}>
          {canal.puntos.map((punto) => (
            <li className="v4-punto-canal" key={punto.titulo}>
              <h3 className="v4-body v4-strong">{punto.titulo}</h3>
              <p className="v4-body">{punto.texto}</p>
            </li>
          ))}
        </ul>

        {canales.some((c) => c.wip) ? (
          <p className="v4-canales__nota">
            {canales
              .filter((c) => c.wip)
              .map((c) => c.nombre)
              .join(", ")}
            : estamos trabajando en ello. Escríbenos si te interesa.
          </p>
        ) : null}
      </div>
    </div>
  );
}
