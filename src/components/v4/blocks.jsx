import React from "react";
import { Hueco, Label } from "./primitives";

/**
 * Organismos de composición de la web v4.
 *
 * Son los siete dispositivos que rotan por las páginas para que ningún scroll
 * se lea igual que el anterior: filas editoriales, secuencia con hilo, columna
 * de pasos, panel de datos, par contrastado, columnas y funnel.
 */

/** Filas editoriales: índice · concepto · eco · etiqueta. */
export function Filas({ items }) {
  return (
    <div className="v4-filas">
      {items.map((item) => (
        <article key={item.num} className="v4-fila">
          <span className="v4-fila__num">{item.num}</span>
          <div className="v4-fila__cuerpo">
            <h3 className="v4-subheading">{item.titulo}</h3>
            <p className="v4-body">{item.desc}</p>
          </div>
          <div className="v4-fila__eco">
            <Label tono="faint">{item.rotulo}</Label>
            <p>{item.eco}</p>
          </div>
          {item.tag ? <span className="v4-chip v4-fila__tag">{item.tag}</span> : null}
        </article>
      ))}
    </div>
  );
}

/** Secuencia horizontal de paradas con hilo y bolitas doradas. */
export function Secuencia({ nodos }) {
  const cols = { gridTemplateColumns: `repeat(${nodos.length}, minmax(0, 1fr))` };
  return (
    <div>
      <div className="v4-secuencia">
        <div className="v4-secuencia__hilo" aria-hidden="true" />
        <div className="v4-secuencia__dots" style={cols} aria-hidden="true">
          {nodos.map((n) => (
            <span key={n.chip} className="v4-secuencia__dot" />
          ))}
        </div>
      </div>
      <div className="v4-secuencia__labels" style={cols}>
        {nodos.map((n) => (
          <div key={n.chip} className="v4-secuencia__label">
            <span className="v4-chip">{n.chip}</span>
            <p>{n.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Columna de pasos con hilo vertical. */
export function Pasos({ items }) {
  return (
    <div>
      {items.map((item, i) => (
        <div key={item.titulo} className="v4-paso">
          <div className="v4-paso__riel" aria-hidden="true">
            <span className="v4-paso__bola" />
            {i < items.length - 1 ? <span className="v4-paso__hilo" /> : null}
          </div>
          <div>
            <div className="v4-body v4-strong">{item.titulo}</div>
            <p className="v4-body">{item.texto}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Panel de barras. El ancho da la forma; el valor va en hueco hasta que haya
 * dato real, porque una cifra inventada rompe Preciso (Tono y Voz §0.1).
 */
export function PanelDatos({ caption, meta, items, nota, neutraSalvo }) {
  return (
    <div className="v4-panel">
      <div className="v4-panel__head">
        <Label tono="gold">{caption}</Label>
        <Label tono="faint">{meta}</Label>
      </div>
      {items.map((item) => {
        const neutra = neutraSalvo && item.nombre !== neutraSalvo;
        return (
          <div key={item.nombre} className="v4-dato">
            <div className="v4-dato__head">
              <span className="v4-body v4-strong" style={{ fontWeight: "inherit" }}>
                {item.nombre}
              </span>
              <span className="v4-mono">
                <Hueco sufijo="%" />
              </span>
            </div>
            <div className="v4-barra">
              <div className="v4-barra__pista">
                <div
                  className="v4-barra__valor"
                  data-neutra={neutra ? "true" : undefined}
                  style={{ "--v4-ancho": `${item.ancho}%` }}
                />
              </div>
              <Label tono="faint">{item.etiqueta}</Label>
            </div>
          </div>
        );
      })}
      {nota ? <p className="v4-label v4-label--faint v4-panel__nota">{nota}</p> : null}
    </div>
  );
}

/** Lista numerada dentro de panel. */
export function ListaPanel({ items }) {
  return (
    <div className="v4-panel">
      {items.map((item, i) => (
        <div key={item} className="v4-linea">
          <span className="v4-body v4-strong" style={{ fontWeight: "inherit" }}>
            {item}
          </span>
          <span className="v4-fila__num">{String(i + 1).padStart(2, "0")}</span>
        </div>
      ))}
    </div>
  );
}

/** Par contrastado: una tarjeta marfil, una grafito. */
export function Bloques({ children }) {
  return (
    <div className="v4-grid v4-mt-12" data-cols="2">
      {children}
    </div>
  );
}

export function Bloque({ label, titulo, texto, invertida, children }) {
  return (
    <article
      className="v4-card"
      data-size="lg"
      data-invertida={invertida ? "true" : undefined}
      data-theme={invertida ? "dark" : undefined}
    >
      {label ? <Label tono={invertida ? "gold" : undefined}>{label}</Label> : null}
      <h3 className="v4-subheading" style={texto ? undefined : { flexGrow: 1 }}>
        {titulo}
      </h3>
      {texto ? (
        <p className="v4-body" style={{ flexGrow: 1 }}>
          {texto}
        </p>
      ) : null}
      {children}
    </article>
  );
}

/** Columnas proporcionales (las cinco estanterías de GEO). */
export function Columnas({ items, destacada }) {
  return (
    <div className="v4-grid v4-mt-12" data-cols="5">
      {items.map((item) => {
        const esDestacada = item.nombre === destacada;
        return (
          <div key={item.nombre} className="v4-columna">
            <div
              className="v4-columna__barra"
              data-destacada={esDestacada ? "true" : undefined}
              style={{ "--v4-alto": `${item.alto}%` }}
            />
            <span className="v4-body v4-strong" style={{ fontWeight: "inherit" }}>
              {item.nombre}
            </span>
            <span className="v4-mono v4-label--faint">
              <Hueco sufijo="%" />
            </span>
          </div>
        );
      })}
    </div>
  );
}

/** Tarjeta KPI: cifra en mono, sin delta inventado (DS §10.3). */
export function TarjetaKpi({ label, valor, desc }) {
  return (
    <article className="v4-card" data-kpi="true">
      <Label>{label}</Label>
      <div className="v4-kpi">{valor}</div>
      <span className="v4-body-s">{desc}</span>
    </article>
  );
}

/** Funnel: tres tramos, el nuestro en grafito. */