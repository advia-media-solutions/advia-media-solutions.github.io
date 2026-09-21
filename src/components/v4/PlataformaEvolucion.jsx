import React from "react";
import { MARCA, Widget, pct } from "./PlataformaComun";
import Marca from "./PlataformaMarca";

/**
 * Pantalla 05 · Evolución en el tiempo: lo que se ha movido.
 *
 * Como la real: una medida por bloque —la cifra de hoy con su variación, la
 * gráfica por motor a lo largo de las mediciones, y al lado quién gana y quién
 * pierde en esa misma medida—. El segundo bloque se corta por abajo: hay más
 * medidas de las que caben. Es la pantalla que cierra el argumento: la
 * diferencia entre dos mediciones es el resultado.
 *
 * Las cifras son de ejemplo. La primera serie es el agregado de todos los
 * motores, en oro; las otras tres, cada motor por separado.
 */
const MOTOR_SERIE = [1, 2, 9, 5];

const MEDIDAS = [
  {
    clave: "soa",
    suelo: 10,
    techo: 50,
    series: [[24, 29, 36, 39], [26, 31, 34, 35], [25, 30, 31, 42], [19, 26, 44, 40]],
    ganan: [[MARCA, 24, 39], ["Dacia", 15, 22], ["Kia", 57, 60]],
    pierden: [["Volvo", 23, 16], ["Skoda", 16, 13], ["Seat", 5, 3]],
  },
  {
    clave: "som",
    suelo: 0,
    techo: 10,
    series: [[4, 4, 6, 7], [5, 4, 6, 6], [6, 6, 6, 9], [3, 3, 8, 7]],
    ganan: [[MARCA, 4, 7], ["Kia", 10, 11], ["Citroën", 2, 3]],
    pierden: [["Volvo", 5, 3], ["Nissan", 3, 2], ["Peugeot", 3, 2]],
  },
];

/* La gráfica va en un lienzo de 300×100. */
const ANCHO = 300;
const ALTO = 100;
const puntos = (valores, suelo, techo) =>
  valores
    .map((v, i) => {
      const x = (i * ANCHO) / (valores.length - 1);
      const y = ALTO - ((v - suelo) / (techo - suelo)) * ALTO;
      return `${x},${y}`;
    })
    .join(" ");

function Movimientos({ titulo, filas, signo, pp }) {
  return (
    <div>
      <p className="v4-plat__rotulo">{titulo}</p>
      <ul className="v4-plat-movs">
        {filas.map(([nombre, antes, ahora]) => (
          <li key={nombre} data-marca={nombre === MARCA ? "true" : undefined}>
            <Marca nombre={nombre} />
            <span className="v4-plat__num">
              {pct(antes)} → {pct(ahora)}
            </span>
            <span className="v4-plat-pill" data-signo={signo}>
              {ahora > antes ? "+" : "−"}
              {Math.abs(ahora - antes)} {pp}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Medida({ t, medida, fechas }) {
  const pp = t("plataforma.pp");
  const k = (clave) => t(`plataforma.evolucion.${clave}`);
  const rotulo = medida.clave === "soa" ? t("plataforma.respuestas.soa") : k("som");
  const [antes, ahora] = [medida.series[0][0], medida.series[0].at(-1)];
  return (
    <div className="v4-plat-evo">
      <div>
        <p className="v4-plat__rotulo">{rotulo}</p>
        <p className="v4-plat-kpi__valor" data-ancla={medida.clave === "soa" ? "evo" : undefined}>
          {pct(ahora)}
          <span className="v4-plat-pill" data-signo="sube">
            +{ahora - antes} {pp}
          </span>
        </p>
        <svg viewBox={`0 -6 ${ANCHO} ${ALTO + 12}`} className="v4-plat-lineas" aria-hidden="true">
          {[0, 0.5, 1].map((y) => (
            <line key={y} x1="0" x2={ANCHO} y1={y * ALTO} y2={y * ALTO} />
          ))}
          {/* El agregado se pinta el último: va encima de los motores. */}
          {[1, 2, 3, 0].map((i) => (
            <polyline
              key={i}
              points={puntos(medida.series[i], medida.suelo, medida.techo)}
              style={{ stroke: `var(--chart-${MOTOR_SERIE[i]})` }}
              data-marca={i === 0 ? "true" : undefined}
            />
          ))}
        </svg>
        <p className="v4-plat-evo__fechas">
          {fechas.map((f) => (
            <span key={f}>{f}</span>
          ))}
        </p>
      </div>
      <div className="v4-plat-evo__lado">
        <Movimientos titulo={k("ganan")} filas={medida.ganan} signo="sube" pp={pp} />
        <Movimientos titulo={k("pierden")} filas={medida.pierden} signo="baja" pp={pp} />
      </div>
    </div>
  );
}

export default function Evolucion({ t }) {
  const fechas = t("plataforma.evolucion.fechas", { returnObjects: true });
  const motores = t("plataforma.evolucion.motores", { returnObjects: true });
  return (
    <Widget>
      <p className="v4-plat__meta">{t("plataforma.evolucion.intro")}</p>
      <p className="v4-plat-motores-leyenda" aria-hidden="true">
        {motores.map((m, i) => (
          <span key={m} data-marca={i === 0 ? "true" : undefined}>
            <i style={{ background: `var(--chart-${MOTOR_SERIE[i]})` }} />
            {m}
          </span>
        ))}
      </p>
      {MEDIDAS.map((m) => (
        <Medida key={m.clave} t={t} medida={m} fechas={fechas} />
      ))}
    </Widget>
  );
}
