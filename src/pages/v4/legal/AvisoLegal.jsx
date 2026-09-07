import React from "react";
import DocumentoLegal from "../../../components/v4/DocumentoLegal";
import { Key } from "../../../components/v4/primitives";
import avisoLegal from "../../../content/legal/avisoLegal";

/** Aviso Legal (LSSI-CE). */
export default function AvisoLegal() {
  return (
    <DocumentoLegal
      path="/legal-notice"
      title="Aviso Legal | Advia"
      description="Datos identificativos del titular del sitio, condiciones de uso, responsabilidades, propiedad intelectual y jurisdicción aplicable."
      titular={
        <>
          Aviso <Key>Legal</Key>
        </>
      }
      lede="Condiciones que regulan el uso de advia.tech, y los datos de quien lo publica."
      bloques={[{ id: "aviso", md: avisoLegal }]}
    />
  );
}
