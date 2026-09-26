import React from "react";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import { CampoCv, CampoTexto } from "./Campos";
import useEnvio from "./useEnvio";
import T from "../T";

/* Google permite ocultar la insignia de reCAPTCHA si el formulario enlaza su
   política de privacidad y sus condiciones. */
const externo = (href) => <a href={href} target="_blank" rel="noopener noreferrer" />;
const ENLACES_GOOGLE = {
  privacidad: externo("https://policies.google.com/privacy"),
  terminos: externo("https://policies.google.com/terms"),
};

/**
 * Formulario de candidatura. Envía multipart a /api/careers/apply, que valida
 * de nuevo todo en servidor: lo de aquí es solo para avisar antes.
 *
 * El captcha es Google reCAPTCHA v3: invisible, pide el token al enviar. Es
 * opcional; sin clave de sitio el formulario funciona sin él. Su insignia
 * flotante se oculta y en su lugar va el aviso que Google exige en el texto
 * legal del formulario.
 */

const RECAPTCHA = "https://www.google.com/recaptcha/api.js";

function Confirmacion({ email }) {
  const { t } = useTranslation("careers");
  return (
    <div className="v4-form__ok" role="status">
      <h3 className="v4-subheading">{t("form.ok.titulo")}</h3>
      <p className="v4-body">{t("form.ok.texto", { email })}</p>
    </div>
  );
}

/** Datos de contacto, CV y preguntas propias del puesto. */
function Campos({ preguntas, errores }) {
  const { t } = useTranslation("careers");
  return (
    <>
      <div className="v4-form__fila">
        <CampoTexto nombre="fullName" etiqueta={t("form.nombre")} requerido
          autoComplete="name" error={errores.fullName} />
        <CampoTexto nombre="email" tipo="email" etiqueta={t("form.email")} requerido
          autoComplete="email" error={errores.email} />
      </div>
      <div className="v4-form__fila">
        <CampoTexto nombre="phone" tipo="tel" etiqueta={t("form.telefono")}
          autoComplete="tel" error={errores.phone} />
        <CampoTexto nombre="linkedin" tipo="url" etiqueta={t("form.linkedin")}
          placeholder="https://www.linkedin.com/in/…" error={errores.linkedin} />
      </div>
      <CampoCv error={errores.cv} />
      {preguntas.map((p) => (
        <CampoTexto key={p.id} nombre={`respuesta.${p.id}`} etiqueta={p.label}
          requerido={p.required} multilinea error={errores[`respuesta.${p.id}`]} />
      ))}
    </>
  );
}

export default function Formulario({ slug, preguntas, recaptchaSiteKey }) {
  const { t } = useTranslation("careers");
  const { locale = "es" } = useRouter();
  const { enviando, errores, aviso, enviadoA, enviar } = useEnvio(recaptchaSiteKey);

  if (enviadoA) return <Confirmacion email={enviadoA} />;

  return (
    <form className="v4-form" onSubmit={enviar}>
      {recaptchaSiteKey ? (
        <Script src={`${RECAPTCHA}?render=${recaptchaSiteKey}`} strategy="afterInteractive" />
      ) : null}
      <input type="hidden" name="positionSlug" value={slug} />
      <input type="hidden" name="locale" value={locale} />
      {/* Campo trampa: invisible para las personas, los bots lo rellenan. */}
      <div className="v4-form__trampa" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <Campos preguntas={preguntas} errores={errores} />

      <label className="v4-form__check">
        <input type="checkbox" name="talentPool" value="si" />
        <span>{t("form.talentPool")}</span>
      </label>
      <p className="v4-form__legal">
        {t("form.privacidad")} <Link href="/privacy-policy">{t("form.privacidadEnlace")}</Link>.
        {recaptchaSiteKey ? <> <T t={t} k="form.recaptcha" components={ENLACES_GOOGLE} /></> : null}
      </p>
      {aviso && aviso !== "validacion" ? (
        <p className="v4-form__aviso" role="alert">
          {t(`form.errores.${aviso}`, { defaultValue: t("form.errores.fallo") })}
        </p>
      ) : null}
      <div>
        <button type="submit" className="v4-btn v4-btn--primary" disabled={enviando}>
          {enviando ? t("form.enviando") : t("form.enviar")}
        </button>
      </div>
    </form>
  );
}
