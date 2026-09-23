import React, { useEffect, useState } from "react";
import Logo from "./LogoHerramienta";

/* De dónde sale cada grano antes de entrar en la esfera, en píxeles desde su
   centro. Salen del lado del texto —el arco de la izquierda— y caen hacia
   dentro. El radio es mayor que la propia esfera para que el chip se lea entero
   antes de empezar a disolverse en ella, pero no tanto como para plantarse
   encima de la columna.

   Se reparten a saltos iguales en VERTICAL, no en ángulo: así dos granos nunca
   se pisan por muchos que sean. Con pocos, el arco es el de siempre; con
   muchos, se estira hacia arriba y hacia abajo (una elipse) para que cada uno
   conserve su renglón. */
const RADIO = 250;
const ALTO_MIN = 205;
const RENGLON = 72;
const SENO_EXTREMO = 0.819;

/* El compás de la tanda. Tienen que casar con `v4-grano` en v4.css: lo que dura
   el viaje de un grano y lo que espera cada uno al anterior. */
const VIAJE_MS = 3200;
const TURNO_MS = 620;

function origenDeGrano(k, total) {
  if (total < 2) return { dx: -RADIO, dy: 0 };
  const alto = Math.max(ALTO_MIN, ((total - 1) * RENGLON) / 2);
  const dy = -alto + (2 * alto * k) / (total - 1);
  const seno = (dy / alto) * SENO_EXTREMO;
  return { dx: -RADIO * Math.sqrt(1 - seno * seno), dy };
}

/**
 * Los granos de un paso. Caen en TANDAS: cada grano viaja una sola vez, y la
 * tanda siguiente no empieza hasta que el último ha entrado en la esfera. Con
 * la animación en bucle, en cuanto había más de cinco granos el primero volvía
 * a salir con la tanda a medias, y se veían dos a la vez.
 *
 * La vuelta va en la `key` de la lista: remontarla es lo que reinicia las
 * animaciones.
 */
export default function CargaGranos({ chips, activo }) {
  const [vuelta, setVuelta] = useState(0);
  const tanda = (chips.length - 1) * TURNO_MS + VIAJE_MS;

  useEffect(() => {
    if (!activo) return undefined;
    setVuelta((v) => v + 1);
    const id = setInterval(() => setVuelta((v) => v + 1), tanda);
    return () => clearInterval(id);
  }, [activo, tanda]);

  return (
    <ul
      key={vuelta}
      className="v4-recorridos__carga"
      data-activo={activo ? "true" : undefined}
      aria-hidden="true"
    >
      {chips.map((chip, k) => {
        const { dx, dy } = origenDeGrano(k, chips.length);
        /* Un grano es un texto, o un texto con logotipo. */
        const texto = typeof chip === "string" ? chip : chip.texto;
        const logo = typeof chip === "string" ? null : chip.logo;
        return (
          <li
            key={texto}
            className="v4-recorridos__grano"
            style={{ "--v4-turno": k, "--v4-dx": `${dx}px`, "--v4-dy": `${dy}px` }}
          >
            <span className="v4-chip">
              {logo ? <Logo id={logo} /> : null}
              {texto}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
