import { TIngredient } from '../types/ingredient';
import { TOrdersResponse } from '../types/order';
import api from './api';
import authApi from './auth-api';
import { TData, TDataIngredients, TDataOrder } from './responce.types';

class AppApi {
  async getAllIngredients() {
    let res = await fetch(`${api.url}/ingredients`);

    res = await api.checkResponce(res);

    const data: TDataIngredients = await res.json();

    await api.checkSuccess(data);

    return data.data;
  }

  async getOrder(num: string) {
    let res = await fetch(`${api.url}/orders/${num}`);

    res = await api.checkResponce(res);

    const data: TOrdersResponse = await res.json();

    await api.checkSuccess(data);

    return (data.orders?.length > 0) ? data.orders[0] : null;
  }

  async postOrder(ingredients: TIngredient[]) {
    const accessToken = await authApi.getAccessTokenWithRefresh();

    let res = await fetch(`${api.url}/orders`, {
      method: 'POST',
      body: JSON.stringify({ ingredients }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer: ${accessToken}`
      },
    });

    res = await api.checkResponce(res);

    const data: TDataOrder = await res.json();

    await api.checkSuccess(data);

    return { name: data.name, order: data.order };
  }

  async resetPasword(email: string) {
    let res = await fetch(`${api.url}/password-reset`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res = await api.checkResponce(res);

    const data: TData = await res.json();

    await api.checkSuccess(data);
  }

  async newPasword({ password, token }: { password: string; token: string }) {
    let res = await fetch(`${api.url}/password-reset/reset`, {
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

    res = await api.checkResponce(res);

    const data: TData = await res.json();

    await api.checkSuccess(data);
  }
}

export default new AppApi();
