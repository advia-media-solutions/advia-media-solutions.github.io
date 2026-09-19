import React from "react";
import { useTranslation } from "next-i18next/pages";
import DocumentoLegal from "../../../components/v4/DocumentoLegal";
import T from "../../../components/v4/T";
import avisoLegal from "../../../content/legal/avisoLegal";
import avisoLegalEn from "../../../content/legal/avisoLegalEn";

/** Aviso Legal (LSSI-CE). Cada idioma lleva su cuerpo; el español es el que rige. */
export default function AvisoLegal() {
  const { t, i18n } = useTranslation("legal");
  return (
    <DocumentoLegal
      path="/legal-notice"
      title={t("avisoLegal.title")}
      description={t("avisoLegal.description")}
      titular={<T t={t} k="avisoLegal.titular" />}
      lede={t("avisoLegal.lede")}
      bloques={[{ id: "aviso", md: i18n.language === "en" ? avisoLegalEn : avisoLegal }]}
    />
  );
}
