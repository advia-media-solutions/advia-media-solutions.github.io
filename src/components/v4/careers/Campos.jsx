import React, { useState } from "react";
import { useTranslation } from "next-i18next/pages";

/**
 * Campos del formulario de candidatura. El error llega como código
 * (`requerido`, `formato`, `tamano`) y se traduce aquí, junto al campo, con
 * `aria-invalid` y `aria-describedby` para los lectores de pantalla.
 */

function Error({ id, codigo, campo }) {
  const { t } = useTranslation("careers");
  if (!codigo) return null;
  return (
    <p id={id} className="v4-campo__error">
      {t(`form.errores.${campo}.${codigo}`, {
        defaultValue: t(`form.errores.campo.${codigo}`),
      })}
    </p>
  );
}

export function CampoTexto({
  nombre,
  etiqueta,
  tipo = "text",
  requerido,
  multilinea,
  error,
  ...resto
}) {
  const { t } = useTranslation("careers");
  const id = `campo-${nombre}`;
  const Control = multilinea ? "textarea" : "input";
  return (
    <div className="v4-campo" data-error={error ? "true" : undefined}>
      <label htmlFor={id} className="v4-campo__etiqueta">
        {etiqueta}
        {requerido ? null : <span className="v4-campo__opcional"> {t("form.opcional")}</span>}
      </label>
      <Control
        id={id}
        name={nombre}
        type={multilinea ? undefined : tipo}
        rows={multilinea ? 5 : undefined}
        required={requerido}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="v4-campo__control"
        {...resto}
      />
      <Error id={`${id}-error`} codigo={error} campo={nombre} />
    </div>
  );
}

/** El CV: zona para arrastrar o elegir el PDF, con el nombre ya elegido. */
export function CampoCv({ error }) {
  const { t } = useTranslation("careers");
  const [archivo, setArchivo] = useState(null);
  return (
    <div className="v4-campo" data-error={error ? "true" : undefined}>
      <span className="v4-campo__etiqueta">{t("form.cv")}</span>
      <label className="v4-campo__archivo" data-lleno={archivo ? "true" : undefined}>
        <input
          type="file"
          name="cv"
          accept="application/pdf,.pdf"
          required
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? "campo-cv-error" : undefined}
          onChange={(e) => setArchivo(e.target.files[0]?.name || null)}
        />
        <span>{archivo || t("form.cvAyuda")}</span>
      </label>
      <Error id="campo-cv-error" codigo={error} campo="cv" />
    </div>
  );
}
