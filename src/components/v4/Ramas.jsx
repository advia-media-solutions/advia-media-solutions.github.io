import React, { useEffect, useRef } from "react";

/**
 * Esquema de canales (wireframe §02 de Productos): un tronco del que salen los
 * canales, cada uno con lo que pasa con la presencia y el producto que lo
 * activa. Es un diagrama, no una lista: lo que cuenta es que dos ramas van a un
 * lado y dos al otro.
 *
 * El dibujo va aparte y solo en cliente: three.js no debe entrar en el bundle
 * inicial. Si no llega —o el equipo no da para WebGL— la lista se lee igual,
 * que es lo que sostiene el contenido; el lienzo solo lo ilustra.
 *
 * Las alturas las manda el HTML: el componente mide el centro de cada fila y se
 * lo pasa a la escena, así cada rama termina exactamente en su canal por ancha
 * o estrecha que sea la ventana.
 */
/**
 * El cristal funde su borde CONTRA el fondo de la sección, así que el motor
 * necesita ese color. `.v4-ramas__pieza` no tiene fondo propio —es transparente,
 * y `getComputedStyle` devuelve rgba(0,0,0,0)—, que el motor leía como NEGRO: de
 * ahí el tinte oscuro de la bola pequeña frente a la del hero, que recibe el
 * marfil explícito. Se sube por los ancestros hasta el primer color opaco.
 */
function fondoDe(nodo) {
  for (let el = nodo; el; el = el.parentElement) {
    const c = getComputedStyle(el).backgroundColor;
    const m = c && c.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
    if (m && (m[4] === undefined || Number(m[4]) > 0.9)) {
      return `rgb(${m[1]}, ${m[2]}, ${m[3]})`;
    }
  }
  return "#FCFDFD";
}

export default function Ramas({ raiz, items }) {
  const lienzo = useRef(null);
  const lienzoCuerpo = useRef(null);
  const pieza = useRef(null);
  const lista = useRef(null);
  const motor = useRef(null);
  const cuerpo = useRef(null);

  useEffect(() => {
    let vivo = true;
    const canvas = lienzo.current;
    const caja = pieza.current;
    const ol = lista.current;
    if (!canvas || !caja || !ol) return undefined;

    const medir = () => {
      const m = motor.current;
      if (!m) return;
      const base = ol.getBoundingClientRect();
      const centros = [...ol.children].map((li) => {
        const r = li.getBoundingClientRect();
        return r.top - base.top + r.height / 2;
      });
      m.disponer(caja.clientWidth, ol.clientHeight, centros);
    };

    const ro = new ResizeObserver(medir);
    let io;

    import("./RamasEscena")
      .then(({ default: crearRamas }) => {
        if (!vivo) return;
        motor.current = crearRamas(canvas, { hojas: items.length });
        caja.dataset.listo = "true";
        medir();
        ro.observe(ol);
        ro.observe(caja);

        const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (quieto) {
          motor.current.completar();
          return;
        }
        /* Se dibuja cuando la sección entra, una sola vez. */
        io = new IntersectionObserver(
          (entradas) => {
            if (entradas.some((e) => e.isIntersecting)) {
              motor.current.dibujar();
              io.disconnect();
            }
          },
          { threshold: 0.25 }
        );
        io.observe(caja);
      })
      .catch(() => {
        /* Sin WebGL o sin three, queda la lista, que es el contenido. */
      });

    /* El cuerpo es LA bola: el mismo motor del hero, no una imitación. Los
       únicos parámetros que se tocan son los que dicta el sitio —sin bolas
       sueltas, porque aquí no hay recorrido del que desprenderse—; el aspecto
       (núcleo, refracción, brillos) se deja EXACTAMENTE como viene, que es lo
       que hace que sea la misma bola y no una prima apagada. */
    import("./EsferaFacetada")
      .then(({ default: crearEsfera }) => {
        if (!vivo || !lienzoCuerpo.current) return;
        const m = crearEsfera(lienzoCuerpo.current, {
          fondo: fondoDe(caja),
          sueltas: 0,
          escalaCuerpo: 0.92,
        });
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            if (!vivo) return;
            m.prepararFinal();
            cuerpo.current = m;
            lienzoCuerpo.current.parentElement.dataset.listo = "true";
          })
        );
      })
      .catch(() => {
        /* Igual que el lienzo de las ramas: si no llega, no pasa nada. */
      });

    return () => {
      vivo = false;
      ro.disconnect();
      if (io) io.disconnect();
      if (motor.current) motor.current.destruir();
      motor.current = null;
      if (cuerpo.current) cuerpo.current.destruir();
      cuerpo.current = null;
    };
  }, [items.length]);

  return (
    <div className="v4-ramas">
      <div className="v4-ramas__pieza" ref={pieza} aria-hidden="true">
        <canvas ref={lienzo} />
        <div className="v4-ramas__cuerpo">
          <canvas ref={lienzoCuerpo} />
        </div>
        <span className="v4-ramas__nodo">{raiz}</span>
      </div>
      <ul className="v4-ramas__lista" ref={lista}>
        {items.map((item) => (
          <li className="v4-rama" key={item.titulo}>
            <div className="v4-rama__cuerpo">
              <h3 className="v4-subheading">{item.titulo}</h3>
              <p className="v4-body">{item.desc}</p>
              {/* Los canales de la familia entran escalonados cuando la rama
                  llega: primero se entiende que hay dos grandes bloques, y
                  luego con qué se puebla cada uno. */}
              {item.canales ? (
                <div className="v4-rama__canales">
                  {item.canales.map((canal, i) => (
                    <span
                      className="v4-chip v4-rama__canal"
                      key={canal}
                      style={{ "--v4-orden": i }}
                    >
                      {canal}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            <span className="v4-chip v4-rama__tag" data-via={item.via}>
              {item.tag}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
