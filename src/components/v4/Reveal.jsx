import React, { useEffect, useRef, useState } from "react";

/**
 * Marca un bloque como visible cuando entra en pantalla, una sola vez.
 *
 * El CSS de v4-motion escalona los hijos directos del bloque. Dos decisiones
 * deliberadas:
 * - No se re-oculta al salir: releer una página no debería re-animarla.
 * - Si no hay IntersectionObserver, marca visible de inmediato. Degradar nunca
 *   significa esconder contenido.
 */
export default function Reveal({ as: Tag = "div", className = "", children, ...resto }) {
  const nodo = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }
    const elemento = nodo.current;
    if (!elemento) return undefined;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true);
          observador.disconnect();
        }
      },
      // El margen es NEGATIVO a propósito: el bloque tiene que haber entrado de
      // verdad en pantalla para dispararse. Con un margen positivo se adelanta
      // al viewport y la animación termina antes de que llegues a mirarla —
      // que es lo que pasaba. El 14% es el punto en el que aún queda recorrido
      // por ver sin que un scroll rápido te deje delante de un hueco.
      { threshold: 0, rootMargin: "0px 0px -14% 0px" }
    );
    observador.observe(elemento);
    return () => observador.disconnect();
  }, [visible]);

  const clases = ["v4-reveal", className].filter(Boolean).join(" ");

  return (
    <Tag ref={nodo} className={clases} data-visible={visible ? "true" : undefined} {...resto}>
      {children}
    </Tag>
  );
}
