import { CACHE_REDIRECCION_S, FORMATOS, urlFirmada } from "../../../../../src/services/imagenesBlog";

/**
 * Servida en /blog/imagen/<slug>/<formato> (rewrite en next.config.js).
 * Redirige al enlace firmado vigente de la portada del artículo: 404 si el
 * artículo, su portada o el formato no existen; 502 si el CMS falla.
 */
export default async function handler(req, res) {
  const { slug, formato } = req.query;
  if (!FORMATOS.has(formato)) return res.status(404).end();

  try {
    const url = await urlFirmada(slug, formato);
    if (!url) return res.status(404).end();
    res.setHeader("Cache-Control", `public, max-age=${CACHE_REDIRECCION_S}`);
    return res.redirect(302, url);
  } catch (error) {
    console.error("Error firmando la imagen del blog:", error);
    return res.status(502).end();
  }
}
