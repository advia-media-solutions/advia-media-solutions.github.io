import React from "react";
import { useTranslation } from "next-i18next/pages";

/**
 * Los cinco valores de Advia en fila: ordinal en mono, nombre y texto. Los
 * nombres son fijos y no se traducen (Advia OS · Our values); los textos
 * viven en public/locales/{es,en}/nosotros.json, así que la página que los
 * pinte tiene que cargar el namespace `nosotros`. Los usan Nosotros y Careers.
 */
const NOMBRES = ["#WorkHardPlayHard", "#Superhuman", "#RightOverEasy", "#Imagine", "#WinAsOne"];

export default function Valores() {
  const { t } = useTranslation("nosotros");
  const textos = t("valores.items", { returnObjects: true });
  return (
    <div className="v4-valores">
      {NOMBRES.map((nombre, i) => (
        <div key={nombre} className="v4-valor">
          <span className="v4-fila__num">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="v4-subheading">{nombre}</h3>
          <p className="v4-body">{textos[i]}</p>
        </div>
      ))}
    </div>
  );
}
