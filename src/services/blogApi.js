const BASE_URL = "https://cms.advia.tech/api";
const TIEMPO_MAXIMO_MS = 5000;

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

  async getArticleBySlug(slug) {
    const response = await this.fetchData(
      `/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[author]=true&populate[category]=true&populate[cover]=true&populate[blocks]=true`
    );
    return response.data.length > 0 ? response.data[0] : null;
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
