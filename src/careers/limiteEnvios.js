/**
 * Límite de candidaturas por IP, en memoria.
 *
 * Es aproximado a propósito: cada instancia de Cloud Run lleva su propia
 * cuenta. Lo que frena el spam de verdad es el captcha; esto solo corta
 * ráfagas de una misma IP.
 */

const VENTANA_MS = 15 * 60 * 1000;
const MAXIMO = 5;
const envios = new Map();

/** true si la IP puede enviar otra candidatura; si puede, la cuenta. */
export function permitirEnvio(ip, ahora = Date.now()) {
  const recientes = (envios.get(ip) || []).filter((t) => ahora - t < VENTANA_MS);
  if (recientes.length >= MAXIMO) {
    envios.set(ip, recientes);
    return false;
  }
  recientes.push(ahora);
  envios.set(ip, recientes);
  if (envios.size > 10000) envios.clear();
  return true;
}
