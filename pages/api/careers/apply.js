import { randomUUID } from "node:crypto";
import { leerFormulario } from "../../../src/careers/multipart";
import { validarCandidatura } from "../../../src/careers/validacion";
import { respuestasMd } from "../../../src/careers/respuestasMd";
import { permitirEnvio } from "../../../src/careers/limiteEnvios";
import { VERSION_AVISO_PRIVACIDAD } from "../../../src/careers/config";
import { captchaValido } from "../../../src/services/recaptcha";
import { posicionPorSlug, registrarCandidatura } from "../../../src/services/careersApi";
import {
  aLaPapelera,
  carpetaHija,
  carpetaRaiz,
  crearCarpeta,
  subirArchivo,
  urlCarpeta,
} from "../../../src/services/drive";

/**
 * Recibe una candidatura desde el formulario de /careers/[slug].
 *
 * Orden (contrato de Careers con Advia OS):
 * 1. Límite por IP, campo trampa y reCAPTCHA (si está configurado).
 * 2. La posición sigue abierta en Advia OS y el formulario es válido.
 * 3. Carpeta en Drive con cv.pdf y respuestas.md.
 * 4. Registro en Advia OS con el enlace a la carpeta; ante 5xx o red se
 *    reintenta con la MISMA carpeta. Si Advia OS la rechaza (400/404/409), la
 *    carpeta va a la papelera.
 *
 * Respuestas al navegador: 201 { ok } o { error, fieldErrors? }.
 */

export const config = { api: { bodyParser: false } };

const ORIGENES = new Set(["https://advia.tech", "https://www.advia.tech"]);
const RECHAZOS_OS = { 400: "validacion", 404: "cerrada", 409: "duplicada" };
const ESPERAS_REINTENTO_MS = [500, 1500];

function origenPermitido(origen) {
  if (ORIGENES.has(origen)) return true;
  return process.env.NODE_ENV !== "production" && origen.startsWith("http://localhost:");
}

function ipDe(req) {
  const reenviada = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  return reenviada || req.socket.remoteAddress || "desconocida";
}

function responder(res, estado, error, fieldErrors) {
  return res.status(estado).json(fieldErrors ? { error, fieldErrors } : { error });
}

function nombreCarpeta(fullName, fecha) {
  const limpio = fullName.replace(/[\\/]/g, "-");
  return `${limpio} - ${fecha.toISOString().slice(0, 10)} - ${randomUUID().slice(0, 8)}`;
}

/** Crea la carpeta del candidato con sus dos archivos y devuelve su id. */
async function guardarEnDrive({ datos, cv, posicion, locale }) {
  const fecha = new Date();
  const carpetaPuesto = await carpetaHija(posicion.slug, carpetaRaiz());
  const carpeta = await crearCarpeta(nombreCarpeta(datos.fullName, fecha), carpetaPuesto);
  try {
    await subirArchivo({
      nombre: "cv.pdf",
      mimeType: "application/pdf",
      contenido: cv.contenido,
      padre: carpeta,
    });
    await subirArchivo({
      nombre: "respuestas.md",
      mimeType: "text/markdown",
      contenido: respuestasMd({
        datos,
        posicion,
        locale,
        versionAviso: VERSION_AVISO_PRIVACIDAD,
        fecha,
      }),
      padre: carpeta,
    });
  } catch (error) {
    await aLaPapelera(carpeta).catch(() => {});
    throw error;
  }
  return carpeta;
}

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

/** POST a Advia OS; reintenta ante 5xx o fallo de red con el mismo cuerpo. */
async function registrarConReintentos(cuerpo) {
  let ultimo;
  for (let intento = 0; intento <= ESPERAS_REINTENTO_MS.length; intento += 1) {
    if (intento > 0) await esperar(ESPERAS_REINTENTO_MS[intento - 1]);
    try {
      const estado = await registrarCandidatura(cuerpo);
      if (estado < 500) return estado;
      ultimo = new Error(`Advia OS respondió ${estado}`);
    } catch (error) {
      ultimo = error;
    }
  }
  throw ultimo;
}

async function procesar(req, res, ip) {
  const { campos, cv } = await leerFormulario(req);
  /* El campo trampa solo lo rellena un bot: se le contesta como si hubiera
     ido bien para que no aprenda nada. */
  if (campos.website) return res.status(201).json({ ok: true });
  if (!(await captchaValido(campos["g-recaptcha-response"], ip))) {
    return responder(res, 400, "captcha");
  }

  const locale = campos.locale === "en" ? "en" : "es";
  const posicion = await posicionPorSlug(String(campos.positionSlug || ""));
  if (!posicion) return responder(res, 404, "cerrada");
  const { datos, errores } = validarCandidatura({ campos, cv, posicion, locale });
  if (Object.keys(errores).length) return responder(res, 400, "validacion", errores);

  const carpeta = await guardarEnDrive({ datos, cv, posicion, locale });
  let estado;
  try {
    estado = await registrarConReintentos({
      positionSlug: posicion.slug,
      fullName: datos.fullName,
      email: datos.email,
      driveFolderUrl: urlCarpeta(carpeta),
    });
  } catch (error) {
    /* La carpeta se conserva: si el registro llegó a guardarse y solo se
       perdió la respuesta, borrarla dejaría la candidatura sin archivos. */
    throw new Error(`${error.message}; carpeta ${carpeta} conservada`);
  }
  if (estado === 201) return res.status(201).json({ ok: true });
  await aLaPapelera(carpeta).catch((e) => console.error("[careers] papelera:", e.message));
  return responder(res, estado in RECHAZOS_OS ? estado : 502, RECHAZOS_OS[estado] || "fallo");
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  }
  const origen = req.headers.origin;
  if (origen && !origenPermitido(origen)) return responder(res, 403, "origen");
  const ip = ipDe(req);
  if (!permitirEnvio(ip)) return responder(res, 429, "limite");

  try {
    return await procesar(req, res, ip);
  } catch (error) {
    /* Sin datos personales en el log: solo el mensaje del fallo. */
    console.error("[careers] candidatura fallida:", error.message);
    return responder(res, 502, "fallo");
  }
}
