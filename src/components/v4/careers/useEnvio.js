import { useState } from "react";
import { MAX_CV_BYTES } from "../../../careers/limites";

/**
 * Estado y envío del formulario de candidatura: valida lo que se puede
 * valer en el navegador, envía y traduce la respuesta del servidor a errores
 * por campo (`errores`) o a un aviso general (`aviso`, un código de
 * form.errores.*). `enviadoA` guarda el email cuando todo ha ido bien.
 */

function erroresLocales(form) {
  const errores = {};
  const cv = form.elements.cv.files[0];
  if (!cv) errores.cv = "requerido";
  else if (cv.size > MAX_CV_BYTES) errores.cv = "tamano";
  else if (cv.type && cv.type !== "application/pdf") errores.cv = "formato";
  return errores;
}

/* El token de reCAPTCHA se pide justo al enviar: caduca a los 2 minutos. */
async function tokenCaptcha(siteKey) {
  if (!siteKey || !window.grecaptcha) return null;
  await new Promise((listo) => window.grecaptcha.ready(listo));
  return window.grecaptcha.execute(siteKey, { action: "apply" });
}

export default function useEnvio(siteKey) {
  const [estado, setEstado] = useState({ enviando: false, errores: {}, aviso: null });
  const [enviadoA, setEnviadoA] = useState(null);

  async function enviar(evento) {
    evento.preventDefault();
    const form = evento.currentTarget;
    const locales = erroresLocales(form);
    if (Object.keys(locales).length) {
      setEstado({ enviando: false, errores: locales, aviso: null });
      return;
    }
    setEstado({ enviando: true, errores: {}, aviso: null });
    const datos = new FormData(form);
    try {
      const token = await tokenCaptcha(siteKey);
      if (token) datos.set("g-recaptcha-response", token);
      const respuesta = await fetch("/api/careers/apply", { method: "POST", body: datos });
      if (respuesta.status === 201) {
        setEnviadoA(datos.get("email"));
        return;
      }
      const cuerpo = await respuesta.json().catch(() => ({}));
      const errores = cuerpo.fieldErrors || {};
      setEstado({ enviando: false, errores, aviso: cuerpo.error || "fallo" });
    } catch {
      setEstado({ enviando: false, errores: {}, aviso: "fallo" });
    }
  }

  return { ...estado, enviadoA, enviar };
}
