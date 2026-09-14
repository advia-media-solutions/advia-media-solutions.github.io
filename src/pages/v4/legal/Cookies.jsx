import React from "react";
import DocumentoLegal from "../../../components/v4/DocumentoLegal";
import { Key } from "../../../components/v4/primitives";
import cookies from "../../../content/legal/cookies";

/** Política de Cookies. */
export default function Cookies() {
  return (
    <DocumentoLegal
      path="/cookies-policy"
      title="Política de Cookies | Advia"
      description="Qué cookies utiliza advia.tech, para qué sirve cada una, cuánto duran y cómo excluirse."
      titular={
        <>
          Política de <Key>Cookies</Key>
        </>
      }
      lede="Esta Política es de aplicación a los usuarios de la página web de Advia Media Solutions, incluida su versión móvil."
      bloques={[{ id: "cookies", md: cookies }]}
    />
  );
}
