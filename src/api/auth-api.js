import Cookies from 'js-cookie';

import backendApi from './backend-api';

class AuthApi {
  urlAuth = `${backendApi.url}/auth`;

  calcAuthExpires = () => new Date(new Date().getTime() + 20 * 60 * 1000);

  setAccessToken = (token) => Cookies.set('access', token.split('Bearer ')[1], {
    path: '/',
    expires: this.calcAuthExpires(),
  });

  getAccessToken = () => Cookies.get('access');

  removeAccessToken = () => Cookies.remove('access', { path: '/' });

  setRefreshToken = (token) => Cookies.set('refresh', token, { path: '/' });

  getRefreshToken = () => Cookies.get('refresh');

  removeRefreshToken = () => Cookies.remove('refresh', { path: '/' });

  checkAccess = () => false; // TODO

  async registerUser({ email, password, name }) {
    let res = await fetch(`${this.urlAuth}/register`, {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res = await backendApi.checkResponce(res);

    const data = await res.json();
    await backendApi.checkSuccess(data);

    this.setAccessToken(data.accessToken);
    this.setRefreshToken(data.refreshToken);

    return { user: data.user };
  }

  async login({ email, password }) {
    let res = await fetch(`${this.urlAuth}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res = await backendApi.checkResponce(res);

    const data = await res.json();
    await backendApi.checkSuccess(data);

    this.setAccessToken(data.accessToken);
    this.setRefreshToken(data.refreshToken);

    return { user: data.user };
  }

  // POST https://norma.nomoreparties.space/api/auth/token - эндпоинт обновления токена.
  async refreshToken() {
    const token = this.getRefreshToken();
    console.log('cookie refresh', token);

    let res = await fetch(`${this.urlAuth}/token`, {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res = await backendApi.checkResponce(res);

    const data = await res.json();
    await backendApi.checkSuccess(data);

    this.setAccessToken(data.accessToken);
    this.setRefreshToken(data.refreshToken);

    console.log('refresh OK', data);
  }

  // POST https://norma.nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.
  async logout() {
    const token = this.getRefreshToken();
    console.log(token);

    let res = await fetch(`${this.urlAuth}/logout`, {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res = await backendApi.checkResponce(res);

    const data = await res.json();
    await backendApi.checkSuccess(data);

    this.removeAccessToken();
    this.removeRefreshToken();
  }
}

export default new AuthApi();
