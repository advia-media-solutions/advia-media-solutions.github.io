import { olvidarSecreto, valorSecreto } from "./secretos";

/**
 * Cliente de la API pública de Careers de Advia OS (/api/public/careers).
 *
 * Solo servidor: la llave `x-careers-key` no puede llegar al navegador, así
 * que este módulo se usa desde getServerSideProps y las rutas de /api.
 *
 * Configuración por entorno:
 * - CAREERS_API_URL: base de la API, sin barra final.
 * - CAREERS_API_KEY_SECRET: ruta del secreto en Secret Manager.
 * - CAREERS_API_KEY: solo en local; si está, manda sobre el secreto.
 */

const TIEMPO_MAXIMO_MS = 8000;

async function peticion(ruta, opciones = {}) {
  const base = process.env.CAREERS_API_URL;
  if (!base) throw new Error("Falta configurar CAREERS_API_URL");
  const { valor: llave, recurso } = await valorSecreto("CAREERS_API_KEY");
  const respuesta = await fetch(`${base.replace(/\/+$/, "")}${ruta}`, {
    ...opciones,
    headers: { ...opciones.headers, "x-careers-key": llave },
    signal: AbortSignal.timeout(TIEMPO_MAXIMO_MS),
  });
  /* Un 401 con la llave de Secret Manager suele ser una rotación: se descarta
     la copia en memoria para que la siguiente petición lea la versión nueva. */
  if (respuesta.status === 401 && recurso) olvidarSecreto(recurso);
  return respuesta;
}

/** Las posiciones abiertas, con los textos en los dos idiomas. */
export async function posicionesAbiertas() {
  const respuesta = await peticion("/positions");
  if (!respuesta.ok) {
    throw new Error(`Careers API respondió ${respuesta.status} en GET /positions`);
  }
  return respuesta.json();
}

/** Una posición abierta, o null si no existe o ya no está abierta. */
export async function posicionPorSlug(slug) {
  const respuesta = await peticion(`/positions/${encodeURIComponent(slug)}`);
  if (respuesta.status === 404) return null;
  if (!respuesta.ok) {
    throw new Error(`Careers API respondió ${respuesta.status} en GET /positions/:slug`);
  }
  return respuesta.json();
}

/**
 * Registra una candidatura y devuelve el código HTTP de Advia OS: 201, 400,
 * 404 (posición cerrada) o 409 (ya existe). Un fallo de red lanza.
 */
export async function registrarCandidatura(cuerpo) {
  const respuesta = await peticion("/applications", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(cuerpo),
  });
  return respuesta.status;
}
