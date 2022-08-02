import { TIngredient } from '../types/ingredient';
import { TOrdersResponse } from '../types/order';
import { TData, TDataIngredients, TDataOrder } from './responce.types';

class BackendApi {
  url = 'https://norma.nomoreparties.space/api';

  async checkResponce(responce: Response): Promise<Response> {
    if (!responce.ok) {
      const data = await responce.json();
      return Promise.reject(
        new Error(`Request error: status ${responce.status}, message "${data.message}"`)
      );
    }
    return responce;
  }

  async checkSuccess<T extends TData>(data: T): Promise<T> {
    if (data.success !== true) {
      return Promise.reject(
        new Error(`Request error: success status ${data.success} message ${data.message}`)
      );
    }
    return data;
  }

  async getAllIngredients() {
    let res = await fetch(`${this.url}/ingredients`);

    res = await this.checkResponce(res);

    const data: TDataIngredients = await res.json();

    await this.checkSuccess(data);

    return data.data;
  }

  async getOrder(num: string) {
    let res = await fetch(`${this.url}/orders/${num}`);

    res = await this.checkResponce(res);

    const data: TOrdersResponse = await res.json();

    await this.checkSuccess(data);

    return (data.orders?.length > 0) ? data.orders[0] : null;
  }

  async postOrder(ingredients: TIngredient[]) {
    let res = await fetch(`${this.url}/orders`, {
      method: 'POST',
      body: JSON.stringify({ ingredients }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res = await this.checkResponce(res);

    const data: TDataOrder = await res.json();

    await this.checkSuccess(data);

    return { name: data.name, order: data.order };
  }

  async resetPasword(email: string) {
    let res = await fetch(`${this.url}/password-reset`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res = await this.checkResponce(res);

    const data: TData = await res.json();

    await this.checkSuccess(data);
  }

  async newPasword({ password, token }: { password: string; token: string }) {
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

    const data: TData = await res.json();

    await this.checkSuccess(data);
  }
}

export default new BackendApi();
