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

  async refreshToken() {
    const token = this.getRefreshToken();

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
  }

  async logout() {
    const token = this.getRefreshToken();

    this.removeAccessToken();
    this.removeRefreshToken();

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

  async getUser() {
    const token = await this.getAccessTokenWithRefresh();

    let res = await fetch(`${this.urlAuth}/user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    res = await backendApi.checkResponce(res);

    const data = await res.json();
    await backendApi.checkSuccess(data);

    return { user: data.user };
  }

  async updateUser({ email, password, name }) {
    const token = await this.getAccessTokenWithRefresh();

    let res = await fetch(`${this.urlAuth}/user`, {
      method: 'PATCH',
      body: JSON.stringify({ email, password, name }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    res = await backendApi.checkResponce(res);

    const data = await res.json();
    await backendApi.checkSuccess(data);
    return { user: data.user };
  }

  async getAccessTokenWithRefresh() {
    const parseJwt = (token) => {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
          .join('')
      );
      return JSON.parse(jsonPayload);
    };

    const isExpired = (token) => {
      const payload = parseJwt(token);
      return Date.now() >= payload.exp * 1000;
    };

    const accessToken = this.getAccessToken();
    if (!accessToken || isExpired(accessToken)) {
      await this.refreshToken();
    }

    return this.getAccessToken();
  }
}

export default new AuthApi();
