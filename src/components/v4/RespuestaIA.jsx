import React, { useEffect, useRef, useState } from "react";

/**
 * La respuesta generativa, escribiéndose.
 *
 * No es un adorno: es el producto. Lo que se vende en esta página es aparecer
 * dentro de ese párrafo, así que el párrafo tiene que comportarse como lo que
 * imita —un modelo respondiendo— y no como un bloque de texto ya escrito.
 *
 * Primero teclea la respuesta, con la marca del cliente entre marcas reales de
 * la categoría; después aparecen las fuentes, una a una, como hace un motor
 * generativo cuando termina de redactar y cita de dónde ha sacado aquello.
 *
 * Con prefers-reduced-motion se muestra todo escrito de entrada: la animación
 * es el gesto, pero el contenido es el mensaje.
 */

/* Velocidad de tecleo, en ms por carácter. Ni máquina de escribir de los 80 ni
   volcado instantáneo: es el ritmo al que un modelo escupe tokens. */
const POR_CARACTER = 22;
/* Lo que espera antes de citar. Un modelo redacta y luego adjunta las fuentes. */
const ANTES_DE_CITAR = 380;
const ENTRE_FUENTES = 180;

export default function RespuestaIA({ antes, marca, despues, fuentes }) {
  const completo = `${antes}${marca}${despues}`;
  const cuantasFuentes = fuentes.length;
  const [escrito, setEscrito] = useState(0);
  const [citadas, setCitadas] = useState(0);
  const caja = useRef(null);

  useEffect(() => {
    const nodo = caja.current;
    if (!nodo) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEscrito(completo.length);
      setCitadas(cuantasFuentes);
      return undefined;
    }

    let temporizadores = [];
    let cuadro = 0;
    let arrancado = false;

    /* El avance va por TIEMPO, no por ticks: con un setInterval por carácter, un
       intervalo de 22 ms depende de que el navegador lo respete —y en pestaña de
       fondo, o con un render por tick, no lo respeta—, así que el párrafo se
       escribía a paso de caracol. Con rAF se calcula cuántos caracteres tocan
       según lo transcurrido y se pinta una vez por frame. */
    const teclear = () => {
      if (arrancado) return;
      arrancado = true;
      const inicio = performance.now();
      const paso = () => {
        const cuantos = Math.min(
          completo.length,
          Math.round((performance.now() - inicio) / POR_CARACTER)
        );
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

    /* Si ya está en pantalla al montar, se teclea sin más. El observador es solo
       para cuando la banda queda por debajo del fold —el hero ocupa la ventana
       entera— y el lector llega luego. */
    const enPantalla = () => {
      const r = nodo.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight * 0.92;
    };

    let io;
    if (enPantalla()) {
      teclear();
    } else {
      io = new IntersectionObserver(
        (entradas) => {
          if (!entradas.some((e) => e.isIntersecting)) return;
          io.disconnect();
          teclear();
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
    /* Ojo con las dependencias: `fuentes` es un literal en la página, así que su
       referencia cambia en CADA render. Ponerlo aquí reiniciaba el tecleo con
       cada carácter escrito —el efecto se limpiaba y volvía a empezar—, y el
       párrafo avanzaba a trompicones. Se depende del contenido, no del array. */
  }, [completo, fuentes.length]); // eslint-disable-line react-hooks/exhaustive-deps

  /* El texto se reparte en tres tramos para que la marca del cliente conserve su
     realce mientras se teclea, en vez de aparecer como texto plano y colorearse
     al final. */
  const finAntes = Math.min(escrito, antes.length);
  const finMarca = Math.min(Math.max(escrito - antes.length, 0), marca.length);
  const finDespues = Math.max(escrito - antes.length - marca.length, 0);
  const escribiendo = escrito < completo.length;

  return (
    <div className="v4-respuesta" ref={caja}>
      <p className="v4-respuesta__texto">
        {antes.slice(0, finAntes)}
        <span className="v4-respuesta__marca">{marca.slice(0, finMarca)}</span>
        {despues.slice(0, finDespues)}
        <span className="v4-respuesta__cursor" data-activo={escribiendo ? "true" : undefined} />
      </p>
      <div className="v4-chips v4-mt-5">
        {fuentes.map((fuente, i) => (
          <span
            key={fuente}
            className="v4-chip v4-respuesta__fuente"
            data-visible={i < citadas ? "true" : undefined}
          >
            {fuente}
          </span>
        ))}
      </div>
      {/* Lo que leen los crawlers y quien no ve la animación. */}
      <span className="v4-oculto">
        {completo} Fuentes: {fuentes.join(", ")}.
      </span>
    </div>
  );
}
