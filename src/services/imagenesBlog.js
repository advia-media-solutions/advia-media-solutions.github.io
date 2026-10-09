import { blogApiService } from "./blogApi";

/**
 * Las imágenes del CMS viven en un bucket privado y el CMS las entrega con un
 * enlace firmado que caduca a los 15 min. Las páginas del blog se guardan
 * mucho más tiempo que eso, así que no pueden llevar el enlace firmado: llevan
 * /blog/imagen/<slug>/<formato>, que pide un enlace recién firmado y redirige.
 */

/** "original" es la imagen subida; el resto, los formatos que genera el CMS. */
export const FORMATOS = new Set(["original", "large", "medium", "small", "thumbnail"]);

/* El enlace firmado dura 900 s. Se reutiliza en el servidor hasta 300 s y el
   navegador guarda la redirección otros 300 s: nunca se usa uno caducado. */
const REUTILIZAR_FIRMA_MS = 300 * 1000;
export const CACHE_REDIRECCION_S = 300;

const firmas = new Map();

export function rutaImagen(slug, formato) {
  return `/blog/imagen/${encodeURIComponent(slug)}/${formato}`;
}

/** La portada del artículo con sus URL cambiadas por la ruta estable. */
export function conImagenEstable(articulo) {
  const cover = articulo?.cover;
  if (!cover) return articulo;
  const formats = Object.fromEntries(
    Object.entries(cover.formats || {}).map(([formato, datos]) => [
      formato,
      { ...datos, url: rutaImagen(articulo.slug, formato) },
    ])
  );
  return { ...articulo, cover: { ...cover, url: rutaImagen(articulo.slug, "original"), formats } };
}

/** Enlace firmado vigente de la portada, o null si el artículo o el formato no existen. */
export async function urlFirmada(slug, formato) {
  const clave = `${slug}/${formato}`;
  const guardada = firmas.get(clave);
  if (guardada && guardada.caduca > Date.now()) return guardada.url;

  const cover = await blogApiService.getCoverBySlug(slug);
  const url = formato === "original" ? cover?.url : cover?.formats?.[formato]?.url;
  if (!url) return null;
  firmas.set(clave, { url, caduca: Date.now() + REUTILIZAR_FIRMA_MS });
  return url;
}
