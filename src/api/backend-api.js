class BackendApi {
  url = 'https://norma.nomoreparties.space/api';

  async getAllIngredients() {
    const res = await fetch(`${this.url}/ingredients`);
    if (!res.ok) {
      return Promise.reject(new Error(`Request error: status ${res.status}`));
    }

    const data = await res.json();
    if (data.success !== true) {
      return Promise.reject(new Error(`Request error: success status ${data.success}`));
    }

    return data.data;
  }

  async postOrder(ingredients) {
    const res = await fetch(`${this.url}/orders`, {
      method: 'POST',
      body: JSON.stringify({ ingredients }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      return Promise.reject(new Error(`Request error: status ${res.status}`));
    }

    const data = await res.json();
    if (data.success !== true) {
      return Promise.reject(new Error(`Request error: success status ${res.status}`));
    }

    return { name: data.name, order: data.order };
  }
}

export default new BackendApi();
