import React from "react";
import { useTranslation } from "next-i18next/pages";
import DocumentoLegal from "../../../components/v4/DocumentoLegal";
import T from "../../../components/v4/T";
import cookies from "../../../content/legal/cookies";
import cookiesEn from "../../../content/legal/cookiesEn";

/** Política de Cookies. Cada idioma lleva su cuerpo; el español es el que rige. */
export default function Cookies() {
  const { t, i18n } = useTranslation("legal");
  return (
    <DocumentoLegal
      path="/cookies-policy"
      title={t("cookies.title")}
      description={t("cookies.description")}
      titular={<T t={t} k="cookies.titular" />}
      lede={t("cookies.lede")}
      bloques={[{ id: "cookies", md: i18n.language === "en" ? cookiesEn : cookies }]}
    />
  );
}
