import { blogApiService } from "./blogApi";

/**
 * Carga de listados para `getServerSideProps`.
 *
 * Devuelven siempre props serializables: si el CMS falla, la página se sirve
 * con el error y sin lista, en vez de caerse a un 500. Un fallo del CMS no
 * debe tumbar una página que, para un crawler, sigue existiendo.
 */

/** La página pedida en la query, saneada: entero y ≥ 1. */
export function paginaDe(query) {
  const n = parseInt(query?.page, 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

async function carga(promesa, forma) {
  try {
    const respuesta = await promesa;
    return { ...forma(respuesta), error: null };
  } catch (e) {
    return { ...forma({ data: [], meta: {} }), error: e.message || "error" };
  }
}

export function articulosPortada() {
  return carga(blogApiService.getArticlesForHomepage(), (r) => ({ articulos: r.data || [] }));
}

export function articulosPagina(pagina, porPagina = 9) {
  return carga(blogApiService.getArticles(porPagina, pagina), (r) => ({
    articulos: r.data || [],
    pagina,
    totalPaginas: r.meta?.pagination?.pageCount || 1,
  }));
}
