import React from "react";
import LogoHerramienta from "./LogoHerramienta";
import { MARCA, Subpestanas, Widget, pct } from "./PlataformaComun";
import Marca from "./PlataformaMarca";

/**
 * Pantalla 01 · Análisis de respuestas, con dos de sus cinco pestañas vivas.
 *
 * «Visibilidad» es la de la captura real: las barras de Share of Answer, el
 * ranking al lado y, debajo, la comparación de cuotas, que se corta a
 * propósito: lo que importa es que se vea que sigue. «Prompts» enseña de dónde
 * sale la cifra: preguntas reales de la categoría, con cuántas veces nombra
 * cada motor a la marca y en qué puesto.
 *
 * Las cifras son de ejemplo. Los prompts están en el diccionario.
 */

/* Marca, Share of Answer (%), Share of Mention (%) y menciones por respuesta. */
const CUOTAS = [
  ["Tesla", 64, 15.2, 2.8],
  ["Hyundai", 61, 13.1, 2.5],
  ["Kia", 57, 11.4, 2.3],
  ["Renault", 38, 8.0, 2.4],
  ["Volkswagen", 31, 5.3, 1.9],
  [MARCA, 24, 4.1, 2.1],
  ["BMW", 22, 3.9, 2.1],
  ["Dacia", 15, 2.6, 1.7],
];

/* Las barras se miden contra el fondo de escala de la gráfica, no contra 100:
   así la más larga casi llena la pista, como en la pantalla real. */
const ESCALA_BARRAS = 70;
const MARCAS_EJE = [0, 20, 40, 60];
const ancho = (n) => `${(n / ESCALA_BARRAS) * 100}%`;

/* Arriba solo caben las primeras: la tabla de cuotas de debajo tiene que
   asomar, y es la que lleva la lista entera. */
const EN_CABEZA = 6;

/* Por prompt: menciones y puesto en cada motor, y competidores que salen. */
const MOTORES = ["openai", "gemini", "google"];
const PROMPTS = [
  { menciones: [7, 4, 3], puestos: [1, 1, 1], rivales: ["Renault", "Dacia"], mas: 3 },
  { menciones: [7, 4, 3], puestos: [1, 2, 4], rivales: ["Tesla", "Hyundai"], mas: 7 },
  { menciones: [13, 0, 0], puestos: [1, 0, 0], rivales: ["Tesla", "Kia"], mas: 3 },
  { menciones: [6, 4, 3], puestos: [1, 2, 3], rivales: ["Dacia", "Tesla"], mas: 9 },
  { menciones: [5, 4, 4], puestos: [5, 6, 7], rivales: ["Nissan", "Toyota"], mas: 7 },
  { menciones: [8, 4, 0], puestos: [1, 2, 0], rivales: ["Toyota", "Hyundai"], mas: 3 },
  { menciones: [7, 2, 3], puestos: [1, 1, 2], rivales: ["Tesla", "Hyundai"], mas: 2 },
  { menciones: [4, 4, 4], puestos: [3, 3, 5], rivales: ["BMW", "Tesla"], mas: 6 },
];
const TOTAL_PROMPTS = 377;
const TOTAL_RESPUESTAS = 500;

const PESTANA_VISIBILIDAD = 0;
const PESTANA_PROMPTS = 3;

/* Formato europeo o anglosajón según el idioma de la página. */
const decimal = (n, idioma, cifras = 1) =>
  n.toLocaleString(idioma, { minimumFractionDigits: cifras, maximumFractionDigits: cifras });

function Visibilidad({ t, idioma }) {
  const puesto = CUOTAS.findIndex(([nombre]) => nombre === MARCA) + 1;
  const cols = t("plataforma.respuestas.cols", { returnObjects: true });
  const cuotasCols = t("plataforma.respuestas.cuotasCols", { returnObjects: true });
  const marcada = (nombre) => (nombre === MARCA ? "true" : undefined);
  const cabeza = CUOTAS.slice(0, EN_CABEZA);
  return (
    <>
      <Widget>
        <h4 className="v4-plat__subtitulo" data-primero="true">
          {t("plataforma.respuestas.tarjeta")}
        </h4>
        <p className="v4-plat__meta">{t("plataforma.respuestas.meta")}</p>
        <div className="v4-plat-resp">
        <div>
          <p className="v4-plat__rotulo">{t("plataforma.respuestas.soa")}</p>
          {/* Las guías y el eje van detrás, alineados con la pista de las barras. */}
          <div className="v4-plat-barras__lienzo">
          <div className="v4-plat-barras__guias" aria-hidden="true">
            {MARCAS_EJE.map((m) => (
              <span key={m} style={{ left: ancho(m) }}>{m}</span>
            ))}
          </div>
          <ul className="v4-plat-barras">
            {cabeza.map(([nombre, valor]) => (
              <li key={nombre} data-marca={marcada(nombre)}>
                <span>{nombre}</span>
                <span className="v4-plat-barras__pista">
                  <span style={{ width: ancho(valor) }} />
                </span>
                <span className="v4-plat__num">{pct(valor)}</span>
              </li>
            ))}
          </ul>
          </div>
        </div>
        <div>
          <p className="v4-plat__rotulo">{t("plataforma.respuestas.ranking")}</p>
          <p className="v4-plat-kpi__valor" data-ancla="ranking">#{puesto}</p>
          <table className="v4-plat-tablita">
            <thead>
              <tr>
                {cols.map((c, i) => (
                  <th key={c} scope="col" data-num={i === 2 || undefined}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cabeza.map(([nombre, valor], i) => (
                <tr key={nombre} data-marca={marcada(nombre)}>
                  <td className="v4-plat__num">{i + 1}</td>
                  <td><Marca nombre={nombre} /></td>
                  <td className="v4-plat__num">{pct(valor)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      </Widget>

      <Widget>
      <h4 className="v4-plat__subtitulo" data-primero="true">
        {t("plataforma.respuestas.cuotas")}
      </h4>
      <table className="v4-plat-tablita">
        <thead>
          <tr>
            {cuotasCols.map((c, i) => (
              <th key={c} scope="col" data-num={i > 0 || undefined}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CUOTAS.map(([nombre, soa, som, porRespuesta]) => (
            <tr key={nombre} data-marca={marcada(nombre)}>
              <td><Marca nombre={nombre} /></td>
              <td className="v4-plat__num">{pct(soa)}</td>
              <td className="v4-plat__num">{pct(decimal(som, idioma))}</td>
              <td className="v4-plat__num">{decimal(porRespuesta, idioma, 2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </Widget>
    </>
  );
}

/** Una cifra por motor, con su logotipo; sin dato, el motor no sale. */
function PorMotor({ valores, prefijo = "" }) {
  return (
    <span className="v4-plat-motores">
      {valores.map((v, i) =>
        v ? (
          <span key={MOTORES[i]} className="v4-plat-motor">
            <LogoHerramienta id={MOTORES[i]} tinta="actual" />
            {prefijo}
            {v}
          </span>
        ) : null
      )}
    </span>
  );
}

function Prompts({ t }) {
  const cols = t("plataforma.respuestas.promptsCols", { returnObjects: true });
  const textos = t("plataforma.respuestas.prompts", { returnObjects: true });
  return (
    <Widget>
      <h4 className="v4-plat__subtitulo" data-primero="true">
        {t("plataforma.respuestas.promptsTitulo")}
      </h4>
      <p className="v4-plat__meta">
        {t("plataforma.respuestas.promptsMeta", {
          prompts: TOTAL_PROMPTS,
          respuestas: TOTAL_RESPUESTAS,
        })}
      </p>
      <div className="v4-plat-tabla">
        <table className="v4-plat-tablita v4-plat-prompts">
          <thead>
            <tr>
              {cols.map((c, i) => (
                <th key={c} scope="col" data-ancla={i === 1 ? "menciones" : undefined}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROMPTS.map((p, i) => (
              <tr key={textos[i]}>
                <td>
                  <span className="v4-plat-prompts__texto">{textos[i]}</span>
                </td>
                <td><PorMotor valores={p.menciones} /></td>
                <td><PorMotor valores={p.puestos} prefijo="#" /></td>
                <td>
                  {/* La fila de logos va dentro: una celda en flex deja de ser
                      celda y su filete se descuadra del resto de la fila. */}
                  <span className="v4-plat-prompts__rivales">
                    {p.rivales.map((r) => (
                      <Marca key={r} nombre={r} soloLogo />
                    ))}
                    <span className="v4-plat__num">+{p.mas}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Widget>
  );
}

/* La pestaña la lleva Plataforma: es un paso más del guion. */
export default function Respuestas({ t, idioma, sub, alCambiarSub }) {
  const pestana = sub ?? PESTANA_VISIBILIDAD;
  return (
    <>
      <Subpestanas
        items={t("plataforma.respuestas.pestanas", { returnObjects: true })}
        activa={pestana}
        vivas={[PESTANA_VISIBILIDAD, PESTANA_PROMPTS]}
        alCambiar={alCambiarSub}
      />
      {pestana === PESTANA_PROMPTS ? <Prompts t={t} /> : <Visibilidad t={t} idioma={idioma} />}
    </>
  );
}
