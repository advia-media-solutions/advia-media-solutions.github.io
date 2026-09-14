import React, { useEffect, useRef } from "react";

/**
 * Así buscan todas: decenas de recorridos distintos que entran por donde sea,
 * pasan por las MISMAS paradas y siguen. Es el argumento de la sección dibujado
 * —los caminos son infinitos, las paradas no— y el momento en que una anécdota
 * se convierte en un volumen planificable.
 *
 * La escena va aparte y solo en cliente: three.js no debe entrar en el bundle
 * inicial. Si no llega —o el equipo no da para WebGL— la sección se lee igual,
 * porque lo que sostiene el argumento es el texto de arriba; aquí queda la
 * descripción para quien no ve el dibujo, lectores de pantalla incluidos.
 */
const DESCRIPCION =
  "Decenas de recorridos de decisión distintos que entran, se cruzan sobre las " +
  "mismas seis paradas y siguen. Cada recorrido es único; las paradas se repiten.";

export default function Constelacion() {
  const nodo = useRef(null);
  const lienzo = useRef(null);
  const motor = useRef(null);

  useEffect(() => {
    let vivo = true;
    const canvas = lienzo.current;
    if (!canvas) return undefined;

    import("./ConstelacionEscena")
      .then(({ default: crearConstelacion }) => {
        if (!vivo) return;
        motor.current = crearConstelacion(canvas);
        canvas.parentElement.dataset.listo = "true";
      })
      .catch(() => {
        /* Sin WebGL queda la descripción, que es el contenido de verdad. */
      });

    return () => {
      vivo = false;
      if (motor.current) motor.current.destruir();
      motor.current = null;
    };
  }, []);

  useEffect(() => {
    const bloque = nodo.current;
    if (!bloque) return undefined;

    let pedido = 0;
    const medir = () => {
      pedido = 0;
      if (!motor.current) return;
      /* Las rutas se apilan mientras el bloque cruza la pantalla. La ventana se
         cierra pronto para que la última caiga con el dibujo aún centrado, no
         cuando ya se ha ido por arriba. */
      const caja = bloque.getBoundingClientRect();
      const total = caja.height + window.innerHeight;
      const bruto = (window.innerHeight - caja.top) / total;
      motor.current.avance((bruto - 0.16) / 0.42);
    };
    const alScroll = () => {
      if (!pedido) pedido = requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener("scroll", alScroll, { passive: true });
    window.addEventListener("resize", alScroll);
    return () => {
      cancelAnimationFrame(pedido);
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alScroll);
    };
  }, []);

  return (
    <div className="v4-constelacion" ref={nodo} role="img" aria-label={DESCRIPCION}>
      <div className="v4-constelacion__pieza">
        <canvas ref={lienzo} />
      </div>
    </div>
  );
}
