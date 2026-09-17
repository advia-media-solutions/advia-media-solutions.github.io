import React from "react";
import { useTranslation } from "next-i18next/pages";
import LogoHerramienta from "./LogoHerramienta";

/**
 * Las tres áreas del equipo, en filas, y la foto del equipo al lado.
 *
 * Las áreas van en columna a la izquierda y la foto a la derecha, ocupando
 * la altura de las tres: la sección se lee de un golpe, sin que la foto se
 * coma una pantalla. Cada fila dice qué hace el área y quién la lleva, y el
 * nombre de quien la lleva —con el logotipo de LinkedIn delante— es la puerta
 * a su perfil.
 */
export default function Areas({ items, foto }) {
  const { t } = useTranslation("common");
  return (
    <div className="v4-equipo">
      <div className="v4-equipo__areas">
        {items.map((a) => (
          <article key={a.nombre} className="v4-area">
            <h3 className="v4-subheading">{a.nombre}</h3>
            <p className="v4-body">{a.desc}</p>
            <p className="v4-body v4-area__quien">
              <a
                className="v4-area__lider"
                href={a.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("areas.linkedin", { nombre: a.lider })}
              >
                <LogoHerramienta id="linkedin" tinta="actual" />
                {t("areas.cofundador", { nombre: a.lider })}
              </a>
            </p>
          </article>
        ))}
      </div>
      <figure className="v4-equipo__foto">
        <img src={foto.src} alt={foto.alt} width="1800" height="1345" loading="lazy" />
      </figure>
    </div>
  );
}
