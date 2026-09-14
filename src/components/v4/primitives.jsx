import React from "react";
import Link from "next/link";

/**
 * Átomos y moléculas de la web v4.
 *
 * Todo el estilo vive en src/styles/v4.css sobre tokens.css. Aquí no hay ni un
 * color ni un tamaño: si necesitas uno nuevo, entra por el tokens, no por aquí.
 */

/* Material Symbols Outlined · arrow_outward (24px, wght 400) */
export function ArrowOutward() {
  return (
    <svg className="v4-icon" viewBox="0 -960 960 960" aria-hidden="true">
      <path d="m242-246-42-42 412-412H234v-60h480v480h-60v-378L242-246Z" />
    </svg>
  );
}

/**
 * Palabra clave dorada. Solo sobre dato o mecanismo (Tono y Voz §8).
 *
 * Se parte en letras para que se escriba sola al entrar la sección: es la
 * palabra que carga el significado de la frase, y el movimiento la señala.
 * Las letras van `aria-hidden` y la palabra entera viaja en `aria-label`, para
 * que un lector de pantalla lea "answers" y no "a-n-s-w-e-r-s".
 */
export function Key({ children, animado = true }) {
  /* Sin animar cuando la clave no es el gesto de la sección: en el recorrido,
     el titular compite con la esfera y las cinco paradas escribiéndose a la
     vez, y son demasiadas cosas moviéndose para una sola pantalla. */
  if (!animado || typeof children !== "string") {
    return <span className="v4-key">{children}</span>;
  }
  // El paso se comprime en las claves largas: a paso fijo, una de 37 caracteres
  // tarda kilómetro y medio de segundo en escribirse y el lector se adelanta.
  // Con el tope, la cascada nunca pasa de ~700ms sea cual sea la longitud.
  const letras = [...children];
  const paso = Math.min(34, Math.round(700 / letras.length));

  // Tramo del recorrido de scroll que ocupa cada letra, para los navegadores con
  // timeline de scroll. Se reparten el 18%–42% de la travesía del titular por la
  // pantalla: empieza cuando ya ha asomado y termina antes de llegar al centro,
  // que es donde te paras a leerlo. Cada letra dura casi el doble de su hueco,
  // para que se solapen y la palabra se escriba en continuo, no a saltos.
  const DESDE = 18;
  const REPARTO = 24;
  const hueco = REPARTO / letras.length;

  return (
    <span className="v4-key" aria-label={children} style={{ "--v4-letra-paso": `${paso}ms` }}>
      {letras.map((letra, i) => {
        const desde = DESDE + i * hueco;
        return (
          <span
            key={`${letra}-${i}`}
            className="v4-key__letra"
            aria-hidden="true"
            style={{
              "--v4-letra": i,
              "--v4-desde": `${desde.toFixed(2)}%`,
              "--v4-hasta": `${Math.min(48, desde + hueco * 1.8).toFixed(2)}%`,
            }}
          >
            {letra === " " ? "\u00A0" : letra}
          </span>
        );
      })}
    </span>
  );
}

/** Hueco de dato que no tenemos. Nunca lo rellenes con un número de ejemplo. */
export function Hueco({ sufijo = "" }) {
  return (
    <span className="v4-hueco">
      [ --- ]
      {sufijo}
    </span>
  );
}

export function Label({ tono, tamano, children }) {
  const clase = ["v4-label", tono && `v4-label--${tono}`, tamano && `v4-label--${tamano}`]
    .filter(Boolean)
    .join(" ");
  return <div className={clase}>{children}</div>;
}

export function Door({ href, children }) {
  return (
    <Link href={href} className="v4-door">
      {children}
      <ArrowOutward />
    </Link>
  );
}

export function Boton({ href, variant = "primary", className = "", children }) {
  const clase = `v4-btn v4-btn--${variant} ${className}`.trim();
  return (
    <Link href={href} className={clase}>
      {children}
    </Link>
  );
}

export function Chips({ items }) {
  return (
    <div className="v4-chips">
      {items.map((item) => (
        <span key={item} className="v4-chip">
          {item}
        </span>
      ))}
    </div>
  );
}

/**
 * Nota analítica: prosa a la izquierda con acento lateral (DS §10.7b).
 *
 * `meta` añade una segunda línea en mono, para lo que es dato sobre el dato: la
 * lectura de lo que acabas de leer, no una continuación de la frase.
 */
export function Nota({ meta, children }) {
  return (
    <div className="v4-nota">
      <p className="v4-body">{children}</p>
      {meta ? <p className="v4-nota__meta">{meta}</p> : null}
    </div>
  );
}

/** Callout: una idea con peso y su atribución (DS §10.7). */
export function Cita({ fuente, children }) {
  return (
    <div className="v4-callout">
      <p className="v4-lede v4-strong" style={{ fontWeight: "inherit" }}>
        {children}
      </p>
      <div className="v4-label">{fuente}</div>
    </div>
  );
}

/**
 * Hueco de ilustración. Mejor un placeholder honesto y marcado que un intento
 * malo del asset real.
 */
export function Placeholder({ children }) {
  return (
    <div className="v4-placeholder">
      <span className="v4-label v4-label--faint">{children}</span>
    </div>
  );
}
