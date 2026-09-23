import React, { useEffect, useRef, useState } from "react";

/**
 * Una palabra del titular que va cambiando: coche, cafetera, teléfono…
 *
 * Es el argumento dicho sin decirlo. La pregunta —"¿eres la respuesta que la IA
 * menciona?"— vale para cualquier categoría, y verla cambiar sola ahorra el
 * párrafo que lo explicaría. Va en dorado porque es la palabra que carga el
 * significado de la frase, igual que las claves del resto del sitio.
 *
 * Con prefers-reduced-motion se queda en la primera: la frase funciona igual.
 * Sin él, da dos vueltas y se para también en la primera: el argumento ya está
 * dicho, y un titular que no deja de moverse no deja leer lo de al lado.
 */

const POR_PALABRA = 2200;
const VUELTAS = 2;

export default function PalabraRotativa({ palabras }) {
  const [i, setI] = useState(0);
  const caja = useRef(null);
  const cambios = useRef(0);

  useEffect(() => {
    const nodo = caja.current;
    if (!nodo) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const total = palabras.length * VUELTAS;
    let reloj;
    const avanzar = () => {
      cambios.current += 1;
      setI(cambios.current % palabras.length);
      if (cambios.current >= total) clearInterval(reloj);
    };
    /* Solo gira mientras se ve: fuera de pantalla no hay nadie a quien contárselo. */
    const io = new IntersectionObserver(
      (entradas) => {
        clearInterval(reloj);
        if (cambios.current < total && entradas.some((e) => e.isIntersecting)) {
          reloj = setInterval(avanzar, POR_PALABRA);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(nodo);

    return () => {
      io.disconnect();
      clearInterval(reloj);
    };
  }, [palabras.length]);

  /* Solo la palabra activa va al DOM: apilarlas todas y ocultarlas con CSS
     dejaba "cochecafeterateléfono…" en el texto del titular, que es lo que leen
     los buscadores.

     No se reserva anchura. Se probó con un mínimo en `ch` sobre la palabra más
     larga y dejaba un hueco vacío detrás de las cortas, que se veía más que el
     movimiento que evitaba. La regla es de composición, no de código: la
     palabra va SIEMPRE al final de su renglón, con un salto detrás, así el
     único texto que cambia de sitio es ella misma. */
  return (
    <span className="v4-rota" ref={caja}>
      <span className="v4-key v4-rota__palabra" key={palabras[i]}>
        {palabras[i]}
      </span>
    </span>
  );
}
