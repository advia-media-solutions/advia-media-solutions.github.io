import React from "react";
import { useTranslation } from "next-i18next/pages";
import DocumentoLegal from "../../../components/v4/DocumentoLegal";
import T from "../../../components/v4/T";
import { ES, EN } from "../../../content/legal/privacidad";
import Idiomas from "../../../components/v4/Idiomas";

/**
 * Política de Privacidad, en los dos idiomas en que está publicada. Los dos
 * cuerpos van siempre en la página, con su ancla; el del idioma de la ruta va
 * primero y el otro, rotulado, debajo.
 */
export default function Privacidad() {
  const { t, i18n } = useTranslation("legal");
  const en = i18n.language === "en";
  const bloques = [
    { id: "es", md: ES, titulo: en ? t("version.es") : undefined },
    { id: "en", md: EN, titulo: en ? undefined : t("version.en") },
  ];
  return (
    <DocumentoLegal
      path="/privacy-policy"
      title={t("privacidad.title")}
      description={t("privacidad.description")}
      titular={<T t={t} k="privacidad.titular" />}
      lede={t("privacidad.lede")}
      pie={<Idiomas />}
      bloques={en ? bloques.reverse() : bloques}
    />
  );
}
