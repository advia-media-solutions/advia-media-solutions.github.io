import { randomUUID } from "node:crypto";
import { GoogleAuth } from "google-auth-library";

/**
 * Google Drive para las candidaturas, solo en servidor.
 *
 * Todo vive en la unidad compartida «Hiring» (HIRING_DRIVE_FOLDER_ID). La
 * identidad es la cuenta de servicio del Cloud Run de la web, miembro de esa
 * unidad como Gestor de contenido. Las cuentas de servicio no tienen cuota en
 * «Mi unidad»: por eso tiene que ser una unidad compartida, y por eso todas las
 * llamadas llevan `supportsAllDrives`.
 */

const auth = new GoogleAuth({ scopes: ["https://www.googleapis.com/auth/drive"] });
const API = "https://www.googleapis.com/drive/v3/files";
const SUBIDA = "https://www.googleapis.com/upload/drive/v3/files";
const CARPETA = "application/vnd.google-apps.folder";

async function drive(opciones) {
  const cliente = await auth.getClient();
  const { data } = await cliente.request({
    ...opciones,
    params: { supportsAllDrives: true, ...opciones.params },
  });
  return data;
}

/** La carpeta raíz de las candidaturas (la unidad compartida «Hiring»). */
export function carpetaRaiz() {
  const id = process.env.HIRING_DRIVE_FOLDER_ID;
  if (!id) throw new Error("Falta configurar HIRING_DRIVE_FOLDER_ID");
  return id;
}

export function urlCarpeta(id) {
  return `https://drive.google.com/drive/folders/${id}`;
}

export async function crearCarpeta(nombre, padre) {
  const { id } = await drive({
    url: API,
    method: "POST",
    params: { fields: "id" },
    data: { name: nombre, mimeType: CARPETA, parents: [padre] },
  });
  return id;
}

/** La subcarpeta `nombre` dentro de `padre`, creándola si no existe. */
export async function carpetaHija(nombre, padre) {
  const q = [
    `'${padre}' in parents`,
    `name = '${nombre.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`,
    `mimeType = '${CARPETA}'`,
    "trashed = false",
  ].join(" and ");
  const { files } = await drive({
    url: API,
    params: { q, fields: "files(id)", includeItemsFromAllDrives: true, corpora: "allDrives" },
  });
  return files.length ? files[0].id : crearCarpeta(nombre, padre);
}

/** Sube un archivo en una sola petición (multipart/related). */
export async function subirArchivo({ nombre, mimeType, contenido, padre }) {
  const frontera = `advia-${randomUUID()}`;
  const metadatos = JSON.stringify({ name: nombre, parents: [padre] });
  const cuerpo = Buffer.concat([
    Buffer.from(
      `--${frontera}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadatos}\r\n` +
        `--${frontera}\r\nContent-Type: ${mimeType}\r\n\r\n`
    ),
    Buffer.isBuffer(contenido) ? contenido : Buffer.from(contenido, "utf8"),
    Buffer.from(`\r\n--${frontera}--`),
  ]);
  await drive({
    url: SUBIDA,
    method: "POST",
    params: { uploadType: "multipart", fields: "id" },
    headers: { "Content-Type": `multipart/related; boundary=${frontera}` },
    data: cuerpo,
  });
}

/** A la papelera, no borrado definitivo: un Gestor de contenido puede hacerlo. */
export async function aLaPapelera(id) {
  await drive({ url: `${API}/${id}`, method: "PATCH", data: { trashed: true } });
}
