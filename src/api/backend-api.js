class BackendApi {
  url = 'https://norma.nomoreparties.space/api';

  async checkResponce(responce) {
    if (!responce.ok) {
      const data = await responce.json();
      return Promise.reject(new Error(`Request error: status ${responce.status}, message "${data.message}"`));
    }
    return responce;
  }

  async checkSuccess(data) {
    if (data.success !== true) {
      console.log(data);
      return Promise.reject(new Error(`Request error: success status ${data.success} message ${data.message}`));
    }
    return data;
  }

  async getAllIngredients() {
    let res = await fetch(`${this.url}/ingredients`);

    res = await this.checkResponce(res);

    let data = await res.json();
    data = await this.checkSuccess(data);

    return data.data;
  }

  async postOrder(ingredients) {
    let res = await fetch(`${this.url}/orders`, {
      method: 'POST',
      body: JSON.stringify({ ingredients }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res = await this.checkResponce(res);

    let data = await res.json();
    data = await this.checkSuccess(data);

    return { name: data.name, order: data.order };
  }

  async resetPasword(email) {
    let res = await fetch(`${this.url}/password-reset`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res = await this.checkResponce(res);

    const data = await res.json();
    await this.checkSuccess(data);
  }

  async newPasword({ password, token }) {
    let res = await fetch(`${this.url}/password-reset/reset`, {
      method: 'POST',
      body: JSON.stringify({ password, token }),
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });

    res = await this.checkResponce(res);

    const data = await res.json();
    await this.checkSuccess(data);
  }
}

export default new BackendApi();
