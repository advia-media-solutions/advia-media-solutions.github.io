import React from "react";
import DocumentoLegal from "../../../components/v4/DocumentoLegal";
import { Key } from "../../../components/v4/primitives";
import { ES, EN } from "../../../content/legal/privacidad";
import Idiomas from "../../../components/v4/Idiomas";

/** Política de Privacidad, en los dos idiomas en que está publicada. */
export default function Privacidad() {
  return (
    <DocumentoLegal
      path="/privacy-policy"
      title="Política de Privacidad | Advia"
      description="Cómo trata Advia los datos personales en su servicio de ad server: qué se registra, con qué base legal, cuánto se conserva y qué derechos tiene."
      titular={
        <>
          Política de <Key>Privacidad</Key>
        </>
      }
      lede="Cómo trata Advia Media Solutions los datos personales en la entrega y medición de anuncios, y qué ocurre con los visitantes de este sitio."
      pie={<Idiomas />}
      bloques={[
        { id: "es", md: ES },
        { id: "en", titulo: "English version", md: EN },
      ]}
    />
  );
}
