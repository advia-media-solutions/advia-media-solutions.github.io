const BASE_URL = "https://cms.advia.tech/api";
const TIEMPO_MAXIMO_MS = 5000;
/* Cada cuánto se regeneran las páginas del blog servidas desde caché (ISR):
   un artículo publicado o editado en el CMS tarda como mucho esto en verse. */
export const REFRESCO_BLOG_S = 300;

class BlogApiService {
  async getArticles(pageSize = 7, page = 1) {
    return this.fetchData(
      `/articles?sort[0]=publishedAt:desc&pagination[pageSize]=${pageSize}&pagination[page]=${page}&populate[author]=true&populate[category]=true&populate[cover]=true`
    );
  }

  async getArticlesForHomepage() {
    return this.fetchData(
      "/articles?sort[0]=publishedAt:desc&pagination[pageSize]=7&populate[author]=true&populate[category]=true&populate[cover]=true"
    );
  }

  /** Todos los slugs publicados, recorriendo todas las páginas del CMS. */
  async getAllSlugs() {
    const POR_PAGINA = 100;
    const slugs = [];
    let pagina = 1;
    let totalPaginas = 1;
    do {
      const respuesta = await this.fetchData(
        `/articles?fields[0]=slug&pagination[pageSize]=${POR_PAGINA}&pagination[page]=${pagina}`
      );
      slugs.push(...respuesta.data.map((articulo) => articulo.slug));
      totalPaginas = respuesta.meta?.pagination?.pageCount || 1;
      pagina += 1;
    } while (pagina <= totalPaginas);
    return slugs;
  }

  /* El autor con sus perfiles: van al JSON-LD del artículo como `sameAs`. */
  async getArticleBySlug(slug) {
    const response = await this.fetchData(
      `/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[author][populate][profiles]=true&populate[category]=true&populate[cover]=true&populate[blocks]=true`
    );
    return response.data.length > 0 ? response.data[0] : null;
  }

  /** Los slugs de los autores que tienen página: los que no tienen slug, no. */
  async getAllAuthorSlugs() {
    const response = await this.fetchData(
      "/authors?fields[0]=slug&filters[slug][$notNull]=true&pagination[pageSize]=100"
    );
    return response.data.map((autor) => autor.slug);
  }

  async getAuthorBySlug(slug) {
    const response = await this.fetchData(
      `/authors?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[profiles]=true`
    );
    return response.data.length > 0 ? response.data[0] : null;
  }

  async getArticlesByAuthor(slug) {
    return this.fetchData(
      `/articles?filters[author][slug][$eq]=${encodeURIComponent(slug)}&sort[0]=publishedAt:desc&pagination[pageSize]=100&populate[author]=true&populate[category]=true&populate[cover]=true`
    );
  }

  /** Solo la portada de un artículo, con sus enlaces recién firmados. */
  async getCoverBySlug(slug) {
    const response = await this.fetchData(
      `/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&fields[0]=slug&populate[cover]=true`
    );
    return response.data[0]?.cover || null;
  }

  async getArticleById(documentId) {
    const response = await this.fetchData(
      `/articles/${documentId}?populate[author]=true&populate[category]=true&populate[cover]=true&populate[blocks]=true`
    );

    return response.data || null;
  }

  async getCategories() {
    return this.fetchData("/categories");
  }

  async getAuthors() {
    return this.fetchData("/authors");
  }

  async getArticlesByCategory(categoryId) {
    return this.fetchData(
      `/articles?filters[categories][id][$eq]=${categoryId}`
    );
  }

  async fetchData(endpoint) {
    /* Sin límite, un CMS colgado deja colgada la página que lo espera. */
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      signal: AbortSignal.timeout(TIEMPO_MAXIMO_MS),
    });

    if (!response.ok) {
      throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
    }

    return response.json();
  }
}

export const blogApiService = new BlogApiService();
