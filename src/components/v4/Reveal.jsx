import React, { useEffect, useRef, useState } from "react";

/**
 * Marca un bloque como visible cuando entra en pantalla, una sola vez.
 *
 * El CSS de v4-motion hace el resto. Dos decisiones deliberadas:
 * - No se re-oculta al salir: releer una página no debería re-animarla.
 * - Si no hay IntersectionObserver, marca visible de inmediato. Degradar nunca
 *   significa esconder contenido.
 */
export default function Reveal({ as: Tag = "div", className = "", stagger, children, ...resto }) {
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
      // Se adelanta un poco al viewport: el bloque empieza a entrar antes de
      // que llegues a él. Con un umbral tardío, un scroll rápido deja la
      // pantalla en blanco durante la transición.
      { threshold: 0.02, rootMargin: "0px 0px 12% 0px" }
    );
    observador.observe(elemento);
    return () => observador.disconnect();
  }, [visible]);

  const clases = [stagger ? "v4-stagger" : "v4-reveal", className].filter(Boolean).join(" ");

  return (
    <Tag ref={nodo} className={clases} data-visible={visible ? "true" : undefined} {...resto}>
      {children}
    </Tag>
  );
}
