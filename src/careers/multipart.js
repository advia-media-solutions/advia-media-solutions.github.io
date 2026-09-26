import Busboy from "busboy";
import { MAX_CV_BYTES } from "./limites";

/**
 * Lee el formulario de candidatura (multipart/form-data) con límites duros:
 * un solo archivo de hasta MAX_CV_BYTES y campos cortos. Si el CV pasa del
 * límite no se sigue leyendo: se marca como `demasiadoGrande`.
 */


export function leerFormulario(req) {
  return new Promise((resolve, reject) => {
    let busboy;
    try {
      busboy = Busboy({
        headers: req.headers,
        limits: { fileSize: MAX_CV_BYTES, files: 1, fields: 30, fieldSize: 10000 },
      });
    } catch (error) {
      reject(error);
      return;
    }
    const campos = {};
    let cv = null;

    busboy.on("field", (nombre, valor) => {
      campos[nombre] = valor;
    });
    busboy.on("file", (nombre, flujo, info) => {
      const trozos = [];
      const archivo = { nombre: info.filename, mimeType: info.mimeType, demasiadoGrande: false };
      flujo.on("data", (trozo) => trozos.push(trozo));
      flujo.on("limit", () => {
        archivo.demasiadoGrande = true;
      });
      flujo.on("end", () => {
        archivo.contenido = Buffer.concat(trozos);
        if (nombre === "cv") cv = archivo;
      });
    });
    busboy.on("error", reject);
    busboy.on("close", () => resolve({ campos, cv }));
    req.pipe(busboy);
  });
}
