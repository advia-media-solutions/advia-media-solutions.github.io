import React, { useId } from "react";
import { Subpestanas, Widget, pct } from "./PlataformaComun";

/**
 * Pantalla 02 · Vigilancia de citas: de dónde saca la IA lo que responde.
 *
 * Como la real: los totales, el filtro por categoría, la rosca por tipo de
 * fuente con su total en el centro y la tabla de dominios con la cobertura de
 * la marca en cada uno, con su logotipo y el color de su categoría. La tabla
 * se corta por abajo: son cientos de dominios.
 *
 * Las cifras son de ejemplo.
 */

/* Citas por tipo de fuente, en %, en el orden de `citas.categorias`. El color
   es el de la serie: en una rosca, el color es el dato (DS §10.2). El orden es
   el del donut del design system: ámbar, grafito, azul, esmeralda… */
const TIPOS = [32, 24, 15, 13, 8, 6, 2];
const SERIE = [1, "grafito", 2, 3, 5, 9, 7];

/* Los dos extremos del degradado de una serie. La neutra no tiene token propio
   y se compone con los dos grafitos del sistema. */
const desde = (s) => (s === "grafito" ? "var(--neutral-dark)" : `var(--chart-${s}-from)`);
const hasta = (s) => (s === "grafito" ? "var(--brand-graphite)" : `var(--chart-${s}-to)`);
const TOTALES = { urls: 4200, dominios: 980, citas: 51300 };

/* Dominio, índice de su categoría, URLs citadas, cobertura de la marca (%) y
   si es un hueco: cobertura cero en un medio que no es de un competidor. Es la
   fila de la que sale la primera del plan. El logotipo de cada uno está en
   `public/dominios/<dominio>.png`. */
const DOMINIOS = [
  ["youtube.com", 3, 410, 13],
  ["carwow.es", 2, 58, 27],
  ["autohero.com", 4, 24, 0, true],
  ["coches.com", 2, 31, 17],
  ["quecochemecompro.com", 2, 26, 43],
  ["movilidadelectrica.com", 1, 40, 59],
  ["euroncap.com", 5, 96, 23],
  ["hyundai.com", 0, 64, 0],
  ["motor.es", 1, 37, 21],
];

/**
 * La rosca del design system: anillo grueso, un degradado por sector y un
 * respiro entre sectores. Cada tramo es un círculo con su trazo cortado a su
 * porcentaje.
 */
const RESPIRO = 1.2;

function Rosca({ nombres }) {
  const id = useId();
  let acumulado = 0;
  return (
    <svg viewBox="0 0 42 42" className="v4-plat-rosca" role="img" aria-label={nombres.join(", ")}>
      <defs>
        {SERIE.map((serie, i) => (
          <linearGradient key={serie} id={`${id}-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: desde(serie) }} />
            <stop offset="1" style={{ stopColor: hasta(serie) }} />
          </linearGradient>
        ))}
      </defs>
      {TIPOS.map((valor, i) => {
        const inicio = acumulado;
        acumulado += valor;
        return (
          <circle
            key={nombres[i]}
            cx="21"
            cy="21"
            r="15.915"
            pathLength="100"
            stroke={`url(#${id}-${i})`}
            strokeDasharray={`${valor - RESPIRO} ${100 - valor + RESPIRO}`}
            strokeDashoffset={25 - inicio}
          />
        );
      })}
    </svg>
  );
}

export default function Citas({ t, idioma }) {
  const k = (clave, opciones) => t(`plataforma.citas.${clave}`, opciones);
  const nombres = k("categorias", { returnObjects: true });
  /* Agrupar siempre: en castellano, por defecto, 4200 saldría sin punto. */
  const miles = (n) => n.toLocaleString(idioma, { useGrouping: "always" });
  return (
    <>
      <Subpestanas items={k("pestanas", { returnObjects: true })} activa={0} />
      <Widget>
      <h4 className="v4-plat__subtitulo" data-primero="true">{k("tarjeta")}</h4>
      <p className="v4-plat__meta">
        {k("meta", {
          urls: miles(TOTALES.urls),
          dominios: miles(TOTALES.dominios),
          citas: miles(TOTALES.citas),
        })}
      </p>
      <p className="v4-plat-filtro" aria-hidden="true">
        <span className="v4-plat__rotulo">{k("filtro")}</span>
        <span className="v4-plat-filtro__chip" data-activo="true">{k("todas")}</span>
        {nombres.map((nombre, i) => (
          <span key={nombre} className="v4-plat-filtro__chip">
            <i style={{ background: desde(SERIE[i]) }} />
            {nombre}
          </span>
        ))}
      </p>

      <div className="v4-plat-citas">
        <div>
          <p className="v4-plat__rotulo">{k("tipos")}</p>
          <div className="v4-plat-citas__rosca">
            <div className="v4-plat-citas__centro">
              <Rosca nombres={nombres} />
              <p>
                <span className="v4-plat__num">{miles(TOTALES.citas)}</span>
                <small>{k("total")}</small>
              </p>
            </div>
            <ul className="v4-plat-leyenda">
              {nombres.map((nombre, i) => (
                <li key={nombre}>
                  <i style={{ background: desde(SERIE[i]) }} />
                  {nombre}
                  <span className="v4-plat__num">{pct(TIPOS[i])}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <p className="v4-plat__rotulo">
            {k("dominios")}
            <span>
              {k("urls")} · {k("cobertura")}
            </span>
          </p>
          <ul className="v4-plat-dominios">
            {DOMINIOS.map(([dominio, categoria, urls, cobertura, hueco]) => (
              <li
                key={dominio}
                data-hueco={hueco ? "true" : undefined}
                data-ancla={hueco ? "hueco" : undefined}
              >
                <img src={`/dominios/${dominio}.png`} alt="" width="20" height="20" />
                <span>
                  {dominio}
                  <small>
                    <i style={{ background: desde(SERIE[categoria]) }} />
                    {nombres[categoria]}
                  </small>
                </span>
                <span className="v4-plat__num v4-plat-dominios__urls">{urls}</span>
                <span className="v4-plat__num">{pct(cobertura)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </Widget>
    </>
  );
}
