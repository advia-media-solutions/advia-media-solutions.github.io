import React from "react";

/**
 * Salto entre las dos versiones de un documento bilingüe. Son anclas dentro de
 * la misma página, no un cambio de idioma del sitio: el documento se publica
 * entero en los dos idiomas y ambos han de poder citarse por URL.
 */
export default function Idiomas() {
  return (
    <div className="v4-chips v4-mt-5">
      <a className="v4-chip" href="#es">
        Español
      </a>
      <a className="v4-chip" href="#en">
        English
      </a>
    </div>
  );
}
