import React from "react";

/** Lo que comparten las pantallas de la plataforma (ver Plataforma.jsx). */

export const MARCA = "BYD";
export const pct = (n) => `${n}%`;

/**
 * Una tarjeta de la aplicación. La página de la plataforma es gris y cada
 * bloque va en su tarjeta blanca, como en el producto.
 */
export function Widget({ className = "", children }) {
  return <section className={`v4-plat-widget ${className}`.trim()}>{children}</section>;
}

/**
 * Las pestañas interiores de una pantalla. Están para que se vea que cada
 * pantalla tiene más fondo del que cabe aquí: solo son botones las que la
 * pieza enseña de verdad (`vivas`); el resto se pinta y no se pulsa.
 */
export function Subpestanas({ items, activa, vivas = [], alCambiar }) {
  return (
    <div className="v4-plat-sub">
      {items.map((item, i) =>
        vivas.includes(i) ? (
          <button
            key={item}
            type="button"
            className="v4-plat-sub__item"
            data-diana={`sub:${i}`}
            aria-pressed={i === activa}
            onClick={() => alCambiar(i)}
          >
            {item}
          </button>
        ) : (
          <span key={item} className="v4-plat-sub__item" data-activa={i === activa || undefined}>
            {item}
          </span>
        )
      )}
    </div>
  );
}
