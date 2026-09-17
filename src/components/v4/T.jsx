import React from "react";
import { Trans } from "next-i18next/pages";
import { Key } from "./primitives";

/**
 * Texto traducido con marcas dentro. Las cadenas de los JSON llevan etiquetas
 * cortas —<key>, <strong>, <br/>— y aquí se convierten en las piezas del
 * design system, para que el copy no tenga que saber cómo se pinta una
 * palabra clave. Se usa donde un `t()` a secas no llega: titulares con la
 * palabra dorada, entradillas con un tramo en negrita.
 */
const COMPONENTES = {
  key: <Key />,
  strong: <span className="v4-strong" />,
  br: <br />,
};

export default function T({ t, k, values, components }) {
  return (
    <Trans
      t={t}
      i18nKey={k}
      values={values}
      components={components ? { ...COMPONENTES, ...components } : COMPONENTES}
    />
  );
}
