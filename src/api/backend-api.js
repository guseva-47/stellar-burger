class BackendApi {
  url = 'https://norma.nomoreparties.space/api';

  async getAllIngredients() {
    const res = await fetch(`${this.url}/ingredients`);
    if (!res.ok) {
      return Promise.reject(new Error(`Request error: status ${res.status}`));
    }

    const ingredients = (await res.json()).data;
    return ingredients;
  }
}

export default new BackendApi();
