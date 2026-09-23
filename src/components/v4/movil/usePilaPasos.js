import { useEffect } from "react";
import { CORTE_ESCENA } from "../escena";

/**
 * Los pasos de Tecnología en móvil, apilados bajo la esfera.
 *
 * El escenario (esfera + cabecera + tres pasos) es UNA pantalla pegada dentro
 * de la construcción. Lo que se mueve dentro es el texto: cada pieza sube al
 * ritmo exacto del dedo —se le resta lo que lleva el scroll, píxel a píxel— y
 * se para en su tope bajo la esfera. La cabecera se queda como título de la
 * pila; cada paso se para un escalón más abajo que el anterior y lo tapa, como
 * un mazo de cartas. Así nada pasa por debajo de la esfera ni se lee a medio
 * borrar: el texto o está entero o está tapado por la tarjeta siguiente.
 *
 * Cuando la construcción termina, el pegado se suelta y esfera y pila se van
 * JUNTAS, porque son el mismo bloque. Por eso la altura de la construcción la
 * pone este hook: es exactamente lo que tarda el último paso en llegar a su
 * tope, más un poso para leerlo con la pila completa.
 *
 * Avisa del paso que está puesto (el último que ha llegado a su tope, -1 si
 * todavía ninguno): es el que alimenta a la esfera. Solo transform por frame,
 * sin estado de React salvo ese número, que cambia tres veces.
 */
const HUECO = 16; // entre la cabecera y la primera tarjeta
const ESCALON = 14; // lo que asoma cada tarjeta por encima de la siguiente
const POSO = 0.45; // pantallas de scroll con la pila completa antes de irse
const ENCOGE = 0.04; // lo que encoge una tarjeta por cada una que la tapa

export default function usePilaPasos(esfera, alCambiar) {
  useEffect(() => {
    /* El escenario es el padre de la esfera; la construcción, el suyo. */
    const panel = esfera.current;
    const esc = panel?.parentElement;
    const caja = esc?.parentElement;
    if (!esc || !caja || !window.matchMedia(CORTE_ESCENA).matches) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      /* Sin movimiento no hay pila: los pasos se leen en flujo y la esfera se
         queda hecha. */
      alCambiar(2);
      return undefined;
    }
    const piezas = [
      esc.querySelector(".v4-recorridos__cabecera"),
      ...esc.querySelectorAll(".v4-recorridos__caja"),
    ].filter(Boolean);
    if (piezas.length < 2) return undefined;

    const raiz = caja.closest(".v4-recorridos");
    let medidas = null;
    let pedido = 0;
    /* Dónde empieza el escenario dentro de la construcción. No vale su
       `offsetTop`: en un elemento pegado incluye lo que lleva pegado. Es el
       primer hijo, así que su sitio en el flujo es el relleno de arriba. */
    const arranque = () => parseFloat(getComputedStyle(caja).paddingTop) || 0;

    const medir = () => {
      piezas.forEach((p) => {
        p.style.transform = "";
      });
      const arriba = esc.getBoundingClientRect().top;
      const ys = piezas.map((p) => p.getBoundingClientRect().top - arriba);
      const base = panel.offsetHeight;
      const cabecera = piezas[0].offsetHeight;
      const topes = piezas.map((_, k) =>
        k === 0 ? base : base + cabecera + HUECO + (k - 1) * ESCALON,
      );
      const viaje = Math.max(0, ys[ys.length - 1] - topes[topes.length - 1]);
      caja.style.height = `${arranque() + window.innerHeight * (1 + POSO) + viaje}px`;
      /* Lo que sobra de pantalla bajo la pila completa. Es aire vacío que se
         va con el escenario; el mapa que viene detrás lo usa para subir y no
         dejar un hueco entre las tarjetas y su titular (v4.css). */
      const ultima = piezas[piezas.length - 1];
      const sobra = esc.offsetHeight - (topes[topes.length - 1] + ultima.offsetHeight);
      raiz?.style.setProperty("--v4-pila-sobra", `${Math.max(0, sobra)}px`);
      medidas = { ys, topes, desde: arranque() };
    };

    const pintar = () => {
      pedido = 0;
      if (!medidas) return;
      const hecho = Math.max(0, -caja.getBoundingClientRect().top - medidas.desde);
      const puestas = medidas.ys.map((y, k) => y - hecho <= medidas.topes[k] + 1);
      let activo = -1;
      piezas.forEach((p, k) => {
        const dy = Math.max(-hecho, medidas.topes[k] - medidas.ys[k]);
        const encima = k === 0 ? 0 : puestas.slice(k + 1).filter(Boolean).length;
        p.style.transform = `translateY(${dy}px) scale(${1 - ENCOGE * encima})`;
        if (k > 0 && puestas[k]) activo = k - 1;
      });
      alCambiar(activo);
    };
    const pedir = () => {
      if (!pedido) pedido = requestAnimationFrame(pintar);
    };
    const remedir = () => {
      medir();
      pintar();
    };

    remedir();
    const ojo = new ResizeObserver(remedir);
    ojo.observe(panel);
    piezas.forEach((p) => ojo.observe(p));
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", remedir);
    return () => {
      cancelAnimationFrame(pedido);
      ojo.disconnect();
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", remedir);
      caja.style.height = "";
      raiz?.style.removeProperty("--v4-pila-sobra");
      piezas.forEach((p) => {
        p.style.transform = "";
      });
    };
  }, [esfera, alCambiar]);
}
