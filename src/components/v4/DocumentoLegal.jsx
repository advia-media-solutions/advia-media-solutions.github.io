import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Seo from "./Seo";
import { Hero, Pagina, Section } from "./layout";

/**
 * Los apartados de un documento se citan por su ancla ("véase el apartado 15"),
 * así que cada epígrafe necesita un id estable. Se deriva del propio texto —sin
 * acentos y en minúsculas— para no tener que mantener una tabla aparte.
 */
function anclaDe(hijos) {
  const texto = React.Children.toArray(hijos)
    .map((h) => (typeof h === "string" ? h : h?.props?.children || ""))
    .join(" ");
  return texto
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const EPIGRAFES = {
  h2: ({ children }) => <h2 id={anclaDe(children)}>{children}</h2>,
  h3: ({ children }) => <h3 id={anclaDe(children)}>{children}</h3>,
};

/**
 * Los documentos del sitio: aviso legal, cookies, privacidad y exclusión.
 *
 * Todos tienen la misma forma —un hero que los nombra y un cuerpo largo— así
 * que comparten componente en vez de repetir cinco veces la misma página. El
 * cuerpo llega en markdown y lo viste .v4-prosa, el mismo tratamiento de
 * lectura larga que el blog: aquí también se lee de arriba abajo, y el texto
 * de un documento legal es lo único que hay que ver.
 *
 * `bloques` permite más de un cuerpo con su ancla, que es lo que necesitan las
 * páginas bilingües (#es / #en) sin duplicar el componente.
 */
export default function DocumentoLegal({
  path,
  title,
  description,
  titular,
  lede,
  pie,
  antes,
  bloques,
}) {
  return (
    <Pagina seccion="documento">
      <Seo path={path} title={title} description={description} />
      <Hero titular={titular} lede={lede} pie={pie} />
      <Section>
        {antes}
        {bloques.map((bloque) => (
          <div className="v4-doc" id={bloque.id} key={bloque.id}>
            {bloque.titulo ? <h2 className="v4-subheading">{bloque.titulo}</h2> : null}
            <div className="v4-prosa">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={EPIGRAFES}>
                {bloque.md}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </Section>
    </Pagina>
  );
}
