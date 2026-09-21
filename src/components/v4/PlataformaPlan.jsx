import React from "react";
import { Widget } from "./PlataformaComun";

/**
 * Pantalla 03 · Plan de medios, como la ve el equipo de Advia.
 *
 * Es la pantalla que responde a «dónde se publica», así que va entera: la
 * cabecera del plan con sus acciones, la tira de datos, el botón que genera
 * los briefs y la tabla, agrupada por ola. Cada fila dice en qué medio, sobre
 * qué tema, para qué intenciones de búsqueda y —lo importante— por qué.
 *
 * Falta a propósito la casilla de presupuesto de la pantalla real: en la web
 * pública no se habla de dinero. Todo el texto está en el diccionario.
 */
/* Pulsar una fila abre su brief, como en el producto. `alAbrir` lo pone
   Plataforma; sin él la fila es solo una fila. */
export default function Plan({ t, alAbrir }) {
  const k = (clave, opciones) => t(`plataforma.plan.${clave}`, opciones);
  const lista = (clave) => k(clave, { returnObjects: true });
  const columnas = lista("columnas");

  return (
    <>
      <p className="v4-plat__meta v4-plat-plan__miga">← {k("miga")}</p>
      <div className="v4-plat-plan__cabecera">
        <div>
          <h4 className="v4-plat-plan__nombre">{k("nombre")}</h4>
          <p className="v4-plat__meta">
            {k("ambito")}
            <small>{k("nota")}</small>
          </p>
        </div>
        {/* Botones de atrezo: enseñan lo que se puede hacer, no lo hacen. */}
        <div className="v4-plat-plan__acciones" aria-hidden="true">
          {lista("acciones").map((a) => (
            <span key={a} className="v4-plat-boton">{a}</span>
          ))}
          <span className="v4-plat-boton" data-primario="true">+ {k("anadir")}</span>
        </div>
      </div>

      <Widget>
      <dl className="v4-plat-plan__datos">
        {lista("datos").map((d) => (
          <div key={d.rotulo}>
            <dt className="v4-plat__rotulo">{d.rotulo}</dt>
            <dd>
              <span className="v4-plat__num">{d.valor}</span>
              <small>{d.pie}</small>
            </dd>
          </div>
        ))}
      </dl>
      </Widget>

      <p aria-hidden="true" className="v4-plat-plan__accion">
        <span className="v4-plat-boton v4-plat-plan__generar">{k("generar")}</span>
      </p>

      <Widget>
      <div className="v4-plat-tabla">
        <table className="v4-plat-tablita v4-plat-plan">
          <thead>
            <tr>
              {columnas.map((c, i) => (
                <th key={c} scope="col" data-ancla={i === 2 ? "porque" : undefined}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="v4-plat-plan__ola">
              <th colSpan={columnas.length} scope="colgroup">{k("ola")}</th>
            </tr>
            {lista("filas").map((f) => (
              <tr
                key={f.medio}
                data-diana={`fila:${f.medio}`}
                data-pulsable={alAbrir ? "true" : undefined}
                tabIndex={alAbrir ? 0 : undefined}
                title={alAbrir ? t("plataforma.abrirBrief") : undefined}
                onClick={alAbrir ? () => alAbrir(f.medio) : undefined}
                onKeyDown={alAbrir ? (e) => e.key === "Enter" && alAbrir(f.medio) : undefined}
              >
                <td>
                  <strong>{f.medio}</strong>
                  <small>{k("ambito")}</small>
                  <small className="v4-plat-plan__estado">{k("estado")}</small>
                </td>
                <td>
                  {f.tema}
                  <span className="v4-plat__rotulo v4-plat-plan__cuenta">
                    {f.intenciones.length}{" "}
                    {k(f.intenciones.length === 1 ? "intencion" : "intenciones")}
                  </span>
                  <ul className="v4-plat-plan__intenciones">
                    {f.intenciones.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </td>
                <td className="v4-plat-plan__porque">{f.porque}</td>
                <td>{f.pieza}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </Widget>
    </>
  );
}

/* Plataforma.jsx no pinta su título encima: esta pantalla ya lleva el suyo. */
Plan.conCabecera = true;
