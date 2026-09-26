import { valorSecreto } from "./secretos";

/**
 * Verificación de Google reCAPTCHA v3, solo en servidor.
 *
 * v3 no le pide nada a la persona: devuelve una puntuación de 0 (bot) a 1
 * (persona) para la acción `apply`. La clave secreta viene de
 * RECAPTCHA_SECRET_KEY_SECRET (Secret Manager) o, en local, de
 * RECAPTCHA_SECRET_KEY.
 *
 * Es opcional: sin clave secreta configurada no se verifica nada y el
 * formulario queda protegido solo por el campo trampa y el límite por IP. Se
 * activa al poner las claves en Cloud Run, sin tocar código.
 */

const VERIFICAR = "https://www.google.com/recaptcha/api/siteverify";
export const ACCION = "apply";
const PUNTUACION_MINIMA = 0.5;

export function captchaActivo() {
  return Boolean(process.env.RECAPTCHA_SECRET_KEY || process.env.RECAPTCHA_SECRET_KEY_SECRET);
}

export async function captchaValido(token, ip) {
  if (!captchaActivo()) return true;
  if (!token) return false;
  const { valor: secret } = await valorSecreto("RECAPTCHA_SECRET_KEY");
  const respuesta = await fetch(VERIFICAR, {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
    signal: AbortSignal.timeout(5000),
  });
  const r = await respuesta.json();
  return r.success === true && r.action === ACCION && r.score >= PUNTUACION_MINIMA;
}
