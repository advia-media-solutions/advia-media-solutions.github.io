import { GoogleAuth } from "google-auth-library";

/**
 * Lectura de secretos de Secret Manager, solo en servidor.
 *
 * En Cloud Run la identidad es la cuenta de servicio del propio servicio (ADC,
 * sin fichero de clave); en local, la de `gcloud auth application-default
 * login`. Cada secreto se lee una vez por instancia y se guarda en memoria;
 * `olvidarSecreto` lo descarta para que la siguiente lectura traiga la versión
 * nueva tras una rotación.
 */

const auth = new GoogleAuth({ scopes: ["https://www.googleapis.com/auth/cloud-platform"] });
const cache = new Map();

async function leer(recurso) {
  const cliente = await auth.getClient();
  const { data } = await cliente.request({
    url: `https://secretmanager.googleapis.com/v1/${recurso}:access`,
  });
  return Buffer.from(data.payload.data, "base64").toString("utf8").trim();
}

/**
 * El valor de un secreto por su nombre completo:
 * `projects/<proyecto>/secrets/<nombre>/versions/<versión>`.
 */
export function secreto(recurso) {
  if (!cache.has(recurso)) {
    const lectura = leer(recurso).catch((error) => {
      cache.delete(recurso);
      throw error;
    });
    cache.set(recurso, lectura);
  }
  return cache.get(recurso);
}

export function olvidarSecreto(recurso) {
  cache.delete(recurso);
}

/**
 * Un valor secreto configurado por entorno con dos formas:
 * - `<NOMBRE>_SECRET`: ruta del secreto en Secret Manager (producción).
 * - `<NOMBRE>`: el valor en claro, solo para local. Si está, manda.
 * Devuelve también la ruta, para poder olvidarla tras un 401.
 */
export async function valorSecreto(nombre) {
  const local = process.env[nombre];
  if (local) return { valor: local, recurso: null };
  const recurso = process.env[`${nombre}_SECRET`];
  if (!recurso) throw new Error(`Falta configurar ${nombre}_SECRET`);
  return { valor: await secreto(recurso), recurso };
}
