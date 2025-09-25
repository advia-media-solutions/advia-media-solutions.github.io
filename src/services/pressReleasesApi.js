const BASE_URL = "https://cms.advia.tech/api";

class PressReleasesApiService {
  async getPressReleases(pageSize = 7, page = 1) {
    return this.fetchData(
      `/press-releases?sort[0]=publishedAt:desc&pagination[pageSize]=${pageSize}&pagination[page]=${page}&populate[author]=true&populate[category]=true&populate[cover]=true`
    );
  }

  async getPressReleasesForHomepage() {
    return this.fetchData(
      "/press-releases?sort[0]=publishedAt:desc&pagination[pageSize]=7&populate[author]=true&populate[category]=true&populate[cover]=true"
    );
  }

  async getPressReleaseBySlug(slug) {
    const response = await this.fetchData(
      `/press-releases?filters[slug][$eq]=${slug}&populate[author]=true&populate[category]=true&populate[cover]=true&populate[blocks]=true`
    );
    return response.data.length > 0 ? response.data[0] : null;
  }

  async getPressReleaseById(documentId) {
    const response = await this.fetchData(
      `/press-releases/${documentId}?populate[author]=true&populate[category]=true&populate[cover]=true&populate[blocks]=true`
    );

    return response.data || null;
  }

  async fetchData(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
    }

    return response.json();
  }
}

export const pressReleasesApiService = new PressReleasesApiService();
