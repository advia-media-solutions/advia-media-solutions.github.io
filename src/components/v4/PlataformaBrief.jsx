import React from "react";

/**
 * El brief editorial. No es una pantalla de la plataforma: es el documento
 * que sale de una fila del plan, así que se abre encima de él como ventana
 * emergente (BriefModal), igual que en el producto se abre la pieza al pulsar
 * su fila. La hoja de la izquierda es el brief real, recogido; a la derecha,
 * las reglas medidas de ese mercado.
 */
export function Brief({ t }) {
  const bloques = t("plataforma.brief.bloques", { returnObjects: true });
  const reglas = t("plataforma.brief.reglas", { returnObjects: true });
  return (
    <div className="v4-plat-brief">
      <div className="v4-plat-widget v4-plat-brief__hoja">
        <p className="v4-plat__rotulo">{t("plataforma.brief.meta")}</p>
        {bloques.map((b) => (
          <section key={b.rotulo} className="v4-plat-brief__bloque">
            <p className="v4-plat__rotulo">
              {b.rotulo}
              <span>{b.tag}</span>
            </p>
            {b.texto ? <p className="v4-plat-brief__texto">{b.texto}</p> : null}
            {b.hueco ? <p className="v4-plat-brief__hueco">{b.hueco}</p> : null}
            {b.tabla ? (
              <div className="v4-plat-brief__tabla" aria-hidden="true">
                {b.tabla.map((c) => (
                  <span key={c}>{c}</span>
                ))}
                {b.tabla.map((c) => (
                  <span key={`${c}-hueco`} />
                ))}
              </div>
            ) : null}
            <p className="v4-plat-brief__regla">{b.regla}</p>
          </section>
        ))}
      </div>
      <div className="v4-plat-widget" data-ancla="reglas">
        <p className="v4-plat__rotulo">{t("plataforma.brief.reglasTitulo")}</p>
        <ul className="v4-plat-reglas">
          {reglas.map((r) => (
            <li key={r.texto}>
              {r.texto}
              <span className="v4-plat-pill">{r.efecto}</span>
            </li>
          ))}
        </ul>
        <p className="v4-plat-brief__regla">{t("plataforma.brief.reglasNota")}</p>
      </div>
    </div>
  );
}

export function BriefModal({ t, alCerrar, titulo }) {
  return (
    <div className="v4-plat-modal" role="dialog" aria-modal="true" aria-label={titulo}>
      <div className="v4-plat-modal__caja">
        <div className="v4-plat-modal__cabecera">
          <h4 className="v4-plat__subtitulo" data-primero="true">{titulo}</h4>
          <button
            type="button"
            className="v4-plat-modal__cerrar"
            data-diana="cerrar"
            aria-label={t("plataforma.cerrar")}
            onClick={alCerrar}
          >
            ×
          </button>
        </div>
        <div className="v4-plat-modal__cuerpo">
          <Brief t={t} />
        </div>
      </div>
    </div>
  );
}
