import { blogApiService } from "../src/services/blogApi";

/**
 * Sitemap generado en cada petición.
 *
 * Las rutas fijas van en los dos idiomas, cada una con sus alternates
 * (hreflang), igual que el <head> de cada página. Los artículos del blog se
 * piden al CMS; si falla, el sitemap sale con las rutas fijas y sin ellos,
 * nunca vacío ni con error.
 *
 * Los legales no van: existen y se sirven, pero no son páginas que queramos
 * posicionar.
 */

const BASE = "https://advia.tech";
const IDIOMAS = ["es", "en"];

const FIJAS = [
  { path: "/", prioridad: "1.0" },
  { path: "/navegacion-activa", prioridad: "0.9" },
  { path: "/technology", prioridad: "0.9" },
  { path: "/products", prioridad: "0.9" },
  { path: "/products/paid-media", prioridad: "0.8" },
  { path: "/products/geo", prioridad: "0.8" },
  { path: "/about", prioridad: "0.7" },
  { path: "/contact", prioridad: "0.6" },
  { path: "/blog", prioridad: "0.7" },
  { path: "/blog/articles", prioridad: "0.5" },
];

function urlDe(path, idioma) {
  const limpio = path === "/" ? "" : path;
  return idioma === "es" ? `${BASE}${limpio || "/"}` : `${BASE}/${idioma}${limpio}`;
}

function escapar(texto) {
  return String(texto).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function entradaBilingue({ path, prioridad }) {
  const alternates = [
    ...IDIOMAS.map((i) => `<xhtml:link rel="alternate" hreflang="${i}" href="${urlDe(path, i)}"/>`),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${urlDe(path, "es")}"/>`,
  ].join("");
  return IDIOMAS.map(
    (i) =>
      `<url><loc>${urlDe(path, i)}</loc>${alternates}<changefreq>weekly</changefreq><priority>${prioridad}</priority></url>`
  ).join("");
}

/* Los artículos están en castellano: una sola URL, sin alternates. */
function entradaArticulo(base, item) {
  const fecha = item.updatedAt || item.publishedAt;
  return `<url><loc>${BASE}${base}/${escapar(item.slug)}</loc>${
    fecha ? `<lastmod>${new Date(fecha).toISOString()}</lastmod>` : ""
  }<priority>0.6</priority></url>`;
}

/** Todas las páginas de un listado del CMS, sin que un fallo tumbe el sitemap. */
async function todos(pedir) {
  try {
    const items = [];
    let pagina = 1;
    let total = 1;
    do {
      const r = await pedir(100, pagina);
      items.push(...(r.data || []));
      total = r.meta?.pagination?.pageCount || 1;
      pagina += 1;
    } while (pagina <= total);
    return items;
  } catch (e) {
    return [];
  }
}

export async function getServerSideProps({ res }) {
  const articulos = await todos((n, p) => blogApiService.getArticles(n, p));

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">` +
    FIJAS.map(entradaBilingue).join("") +
    articulos.filter((a) => a.slug).map((a) => entradaArticulo("/blog/article", a)).join("") +
    `</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(xml);
  res.end();
  return { props: {} };
}

/* La respuesta ya se ha escrito en getServerSideProps; no hay nada que pintar. */
export default function Sitemap() {
  return null;
}
