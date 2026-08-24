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

/** Palabra clave dorada. Solo sobre dato o mecanismo (Tono y Voz §8). */
export function Key({ children }) {
  return <span className="v4-key">{children}</span>;
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

export function Label({ tono, children }) {
  const clase = tono ? `v4-label v4-label--${tono}` : "v4-label";
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

/** Nota analítica: prosa a la izquierda con acento lateral (DS §10.7b). */
export function Nota({ children }) {
  return (
    <div className="v4-nota">
      <p className="v4-body">{children}</p>
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

/** Retícula fina del hero: textura de instrumento, no adorno. */
export function Trama() {
  const xs = [];
  for (let x = 80; x < 1440; x += 80) xs.push(x);
  return (
    <svg
      className="v4-hero__trama"
      viewBox="0 0 1440 1200"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {xs.map((x) => (
        <line
          key={x}
          x1={x}
          y1="0"
          x2={x}
          y2="1200"
          style={{ stroke: "var(--brand-ivory)", strokeWidth: 1, opacity: 0.05 }}
        />
      ))}
    </svg>
  );
}
