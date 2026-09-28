import React from "react";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import { CampoCv, CampoTexto } from "./Campos";
import useEnvio from "./useEnvio";
import T from "../T";
import { CAMPO_TRAMPA } from "../../../careers/limites";

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

function Confirmacion({ email, espontanea }) {
  const { t } = useTranslation("careers");
  const clave = espontanea ? "form.okEspontanea" : "form.ok";
  return (
    <div className="v4-form__ok" role="status">
      <h3 className="v4-subheading">{t(`${clave}.titulo`)}</h3>
      <p className="v4-body">{t(`${clave}.texto`, { email })}</p>
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
        <CampoTexto nombre="linkedin" etiqueta={t("form.linkedin")} requerido
          inputMode="url" placeholder="linkedin.com/in/…" error={errores.linkedin} />
      </div>
      <CampoCv error={errores.cv} />
      {preguntas.map((p) => (
        <CampoTexto key={p.id} nombre={`respuesta.${p.id}`} etiqueta={p.label}
          requerido={p.required} multilinea error={errores[`respuesta.${p.id}`]} />
      ))}
    </>
  );
}

/** Lo que viaja sin verse: adónde va la candidatura, el idioma y la trampa. */
function CamposOcultos({ slug, locale, espontanea }) {
  return (
    <>
      {espontanea ? (
        <input type="hidden" name="tipo" value="espontanea" />
      ) : (
        <input type="hidden" name="positionSlug" value={slug} />
      )}
      <input type="hidden" name="locale" value={locale} />
      {/* Campo trampa: los bots que rellenan todo el HTML lo rellenan; las
          personas no lo ven. Va con display:none y un nombre sin significado
          porque el autorrelleno del navegador y los gestores de contraseñas
          rellenan cualquier campo de texto visible, aunque esté fuera de la
          pantalla, y entonces una persona de verdad salta como bot. */}
      <input
        type="text"
        name={CAMPO_TRAMPA}
        hidden
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
    </>
  );
}

/* «Ya la tenemos» no dice lo mismo en una oferta que en la espontánea. */
function claveAviso(aviso, espontanea) {
  return espontanea && aviso === "duplicada" ? "duplicadaEspontanea" : aviso;
}

/**
 * La casilla del talent pool. En una candidatura espontánea es obligatoria:
 * sin ella no hay nada que conservar, y ese consentimiento es su base legal.
 */
function Consentimiento({ espontanea, error }) {
  const { t } = useTranslation("careers");
  return (
    <div className="v4-campo" data-error={error ? "true" : undefined}>
      <label className="v4-form__check">
        <input
          type="checkbox"
          name="talentPool"
          value="si"
          required={espontanea}
          aria-invalid={error ? "true" : undefined}
        />
        <span>{t(espontanea ? "form.talentPoolEspontanea" : "form.talentPool")}</span>
      </label>
      {error ? <p className="v4-campo__error">{t("form.errores.talentPool.requerido")}</p> : null}
    </div>
  );
}

export default function Formulario({ slug, preguntas, recaptchaSiteKey, espontanea = false }) {
  const { t } = useTranslation("careers");
  const { locale = "es" } = useRouter();
  const { enviando, errores, aviso, enviadoA, enviar } = useEnvio(recaptchaSiteKey);

  if (enviadoA) return <Confirmacion email={enviadoA} espontanea={espontanea} />;

  return (
    <form className="v4-form" onSubmit={enviar}>
      {recaptchaSiteKey ? (
        <Script src={`${RECAPTCHA}?render=${recaptchaSiteKey}`} strategy="afterInteractive" />
      ) : null}
      <CamposOcultos slug={slug} locale={locale} espontanea={espontanea} />

      <Campos preguntas={preguntas} errores={errores} />

      <Consentimiento espontanea={espontanea} error={errores.talentPool} />
      <p className="v4-form__legal">
        {t(espontanea ? "form.privacidadEspontanea" : "form.privacidad")} <Link href="/privacy-policy">{t("form.privacidadEnlace")}</Link>.
        {recaptchaSiteKey ? <> <T t={t} k="form.recaptcha" components={ENLACES_GOOGLE} /></> : null}
      </p>
      {aviso && aviso !== "validacion" ? (
        <p className="v4-form__aviso" role="alert">
          {t(`form.errores.${claveAviso(aviso, espontanea)}`, {
            defaultValue: t("form.errores.fallo"),
          })}
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
