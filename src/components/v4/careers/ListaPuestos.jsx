import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import { ArrowOutward, Label } from "../primitives";
import { porEquipo, rangoSalarial } from "../../../careers/formato";

/**
 * Las posiciones abiertas, agrupadas por equipo: una fila por puesto con
 * título, dónde y cómo se trabaja, y el rango salarial (en mono, como toda
 * cifra). Sin filtros: con pocas ofertas estorban más de lo que ayudan.
 *
 * `posiciones` es null cuando Advia OS no ha respondido, y [] cuando responde
 * que no hay ninguna abierta; son dos mensajes distintos.
 */
function Puesto({ puesto }) {
  const { t } = useTranslation("careers");
  const { locale = "es" } = useRouter();
  const meta = [
    puesto.location,
    puesto.workMode && t(`modalidad.${puesto.workMode}`),
    puesto.employmentType && t(`jornada.${puesto.employmentType}`),
  ].filter(Boolean);

  return (
    <Link href={`/careers/${puesto.slug}`} className="v4-puesto">
      <div className="v4-puesto__cuerpo">
        <h3 className="v4-subheading">{puesto.title}</h3>
        {meta.length ? <p className="v4-puesto__meta">{meta.join(" · ")}</p> : null}
      </div>
      <p className="v4-puesto__salario">
        {rangoSalarial(puesto, locale)}
        <span className="v4-puesto__periodo">{t("posiciones.periodo")}</span>
      </p>
      <span className="v4-puesto__flecha" aria-hidden="true">
        <ArrowOutward />
      </span>
    </Link>
  );
}

export default function ListaPuestos({ posiciones }) {
  const { t } = useTranslation("careers");

  if (!posiciones) {
    return <p className="v4-lede v4-puestos__aviso">{t("posiciones.error")}</p>;
  }
  if (!posiciones.length) {
    return <p className="v4-lede v4-puestos__aviso">{t("posiciones.vacio")}</p>;
  }

  return (
    <div className="v4-puestos">
      {porEquipo(posiciones).map(({ equipo, items }) => (
        <div key={equipo} className="v4-puestos__equipo">
          {equipo ? <Label tono="faint">{equipo}</Label> : null}
          <div className="v4-puestos__lista">
            {items.map((puesto) => (
              <Puesto key={puesto.slug} puesto={puesto} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
