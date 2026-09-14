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
 */

const POR_PALABRA = 2200;

export default function PalabraRotativa({ palabras }) {
  const [i, setI] = useState(0);
  const caja = useRef(null);

  useEffect(() => {
    const nodo = caja.current;
    if (!nodo) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let reloj;
    /* Solo gira mientras se ve: fuera de pantalla no hay nadie a quien contárselo. */
    const io = new IntersectionObserver(
      (entradas) => {
        clearInterval(reloj);
        if (entradas.some((e) => e.isIntersecting)) {
          reloj = setInterval(() => setI((n) => (n + 1) % palabras.length), POR_PALABRA);
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
     los buscadores. El hueco se reserva con un mínimo en `ch` calculado sobre la
     palabra más larga, así el titular no se recompone a cada cambio —un titular
     que baila cada dos segundos no hay quien lo lea— sin repetir texto. */
  const anchura = Math.max(...palabras.map((p) => p.length));

  return (
    <span className="v4-rota" ref={caja} style={{ minWidth: `${anchura}ch` }}>
      <span className="v4-key v4-rota__palabra" key={palabras[i]}>
        {palabras[i]}
      </span>
    </span>
  );
}
