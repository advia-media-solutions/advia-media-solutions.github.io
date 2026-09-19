import React, { useEffect, useRef } from "react";

/**
 * Los dos momentos del hero del concepto, con metraje real.
 *
 * La home enfrenta pasiva y activa con un dibujo —un feed que no para contra
 * una pregunta que aterriza—. Aquí no hace falta el esquema: hay dos planos de
 * lo mismo ocurriendo. Arriba, blanco y negro, un dedo pasando contenido que
 * nadie ha pedido. Abajo, a color, el mismo gesto con una decisión detrás: la
 * pregunta sale del teléfono y cambia de sitio —Google, YouTube, ChatGPT— sin
 * cambiar de dueño.
 *
 * El color es el argumento, no un tratamiento: el gris es lo que pasa cuando
 * nadie ha preguntado nada. Por eso el metraje pasivo va en blanco y negro de
 * origen y no se toca con un filtro.
 *
 * Los planos ocupan en el hero el sitio de la esfera de la portada: dos objetos
 * pequeños apoyados sobre el marfil a la derecha del titular, con su sombra de
 * contacto y sin marco. Pequeños porque el titular es quien manda —a media
 * ventana la portada se leía como un banner de vídeo— y sin marco porque una
 * tarjeta se lee como algo pegado encima del hero, no como parte de él.
 *
 * Debajo, el nombre del momento en voz baja y un punto dorado en la activa. Lo
 * que significa cada uno lo dice el lede, así que aquí no se repite.
 */

const REDUCIDO = "(prefers-reduced-motion: reduce)";

/**
 * Un plano. Se reproduce solo mientras está a la vista: en cuanto sale, se
 * para. Son dos vídeos en bucle en la primera pantalla de la página, y dejarlos
 * corriendo en segundo plano es batería que nadie está mirando.
 *
 * Con `prefers-reduced-motion` no arranca nunca y se queda el póster: la
 * composición —dos planos, uno gris y uno a color— ya cuenta el contraste sin
 * que se mueva nada.
 */
export function Plano({ src, poster, descripcion, className = "v4-momento__video" }) {
  const video = useRef(null);

  useEffect(() => {
    const nodo = video.current;
    if (!nodo) return undefined;
    if (window.matchMedia(REDUCIDO).matches) return undefined;

    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            /* Safari rechaza la promesa si el vídeo todavía no cuenta como
               silenciado y nadie ha interactuado con la página; sin el catch, la
               excepción sube sin que haya nada que arreglar. */
            nodo.play().catch(() => {});
            return;
          }
          nodo.pause();
        });
      },
      { threshold: 0.25 }
    );
    io.observe(nodo);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={video}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={descripcion}
    >
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}

export default function Momentos({ pasiva, activa }) {
  const momentos = [
    { tono: "pasiva", ...pasiva },
    { tono: "activa", ...activa },
  ];

  return (
    <figure className="v4-momentos">
      {momentos.map((momento) => (
        <div className="v4-momento" data-tono={momento.tono} key={momento.tono}>
          <Plano
            src={momento.src}
            poster={momento.poster}
            descripcion={momento.descripcion}
          />
          <div className="v4-momento__rotulo">
            {/* El punto lleva el color; el texto va en el gris de metadato. El
                oro a 11px no se lee sobre marfil (DS), así que no se pone. */}
            <span className="v4-momento__punto" aria-hidden="true" />
            <span className="v4-label v4-label--faint">{momento.label}</span>
          </div>
        </div>
      ))}

      {/* Lo que leen los crawlers y quien no ve los planos. */}
      <figcaption className="v4-oculto">
        {momentos.map((m) => `${m.label}: ${m.descripcion}`).join(" ")}
      </figcaption>
    </figure>
  );
}
