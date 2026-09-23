import { useEffect, useRef } from "react";

/**
 * Progreso 0..1 de una escena pegada, medido con el scroll.
 *
 * El patrón es el de las páginas de producto de Apple y el de la propia
 * escena de escritorio de Tecnología: un contenedor más alto que la ventana
 * (`--v4-tramo`, en pantallas) y dentro un bloque `sticky` de una pantalla
 * que se queda quieto mientras el contenedor pasa. Lo que avanza es el scroll;
 * la escena lo lee y se dibuja hasta donde toca. Sin tirones: el progreso se
 * entrega en un `requestAnimationFrame` y quien lo recibe solo toca
 * `transform`, `opacity` y `stroke-dashoffset`.
 *
 * No hay estado de React por frame: `alAvanzar` recibe el número y pinta con
 * refs. Con movimiento reducido se entrega 1 una sola vez.
 */
export default function useProgresoPegado(
  contenedor,
  alAvanzar,
  { solo } = {},
) {
  const ultimo = useRef(-1);
  useEffect(() => {
    const el = contenedor.current;
    if (!el) return undefined;
    if (solo && !window.matchMedia(solo).matches) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      alAvanzar(1);
      return undefined;
    }
    let pedido = 0;
    const medir = () => {
      pedido = 0;
      const r = el.getBoundingClientRect();
      const recorrido = r.height - window.innerHeight;
      const p =
        recorrido <= 0 ? 1 : Math.min(1, Math.max(0, -r.top / recorrido));
      if (Math.abs(p - ultimo.current) < 0.0015) return;
      ultimo.current = p;
      alAvanzar(p);
    };
    const pedir = () => {
      if (!pedido) pedido = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    return () => {
      cancelAnimationFrame(pedido);
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
    };
  }, [contenedor, alAvanzar, solo]);
}

/** Tramo de un progreso: 0 antes de `a`, 1 después de `b`, lineal entre. */
export const tramo = (p, a, b) => Math.min(1, Math.max(0, (p - a) / (b - a)));
/** Entra y sale suave. */
export const suave = (t) => t * t * (3 - 2 * t);
/** Frena al llegar, como una bola que se posa. */
export const posa = (t) => 1 - (1 - t) * (1 - t) * (1 - t);
