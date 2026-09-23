import React from "react";
import { siGoogle, siGooglegemini, siLinkedin, siOpenai, siPinterest, siYoutube } from "simple-icons";

/* Los logotipos de las herramientas, del catálogo oficial de simple-icons: se
   pintan tal cual vienen, nunca redibujados. Van en su color de marca. */
const LOGOS = {
  google: siGoogle,
  gemini: siGooglegemini,
  youtube: siYoutube,
  openai: siOpenai,
  pinterest: siPinterest,
  linkedin: siLinkedin,
};

/** Con `tinta="actual"` el logotipo toma el color del texto en vez del suyo. */
export default function LogoHerramienta({ id, tinta }) {
  const icono = LOGOS[id];
  if (!icono) return null;
  const fill = tinta === "actual" ? "currentColor" : `#${icono.hex}`;
  return (
    <svg className="v4-chip__logo" viewBox="0 0 24 24" aria-hidden="true" style={{ fill }}>
      <path d={icono.path} />
    </svg>
  );
}
