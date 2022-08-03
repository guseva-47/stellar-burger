import { TData } from './responce.types';

class Api {
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
}

export default new Api();
