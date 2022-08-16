import Cookies from 'js-cookie';

import api from './api';
import { TUser, TUserAuth, TUserFull } from '../types/user';
import { TData, TDataLogin, TDataTokens, TDataUser } from './responce.types';

class AuthApi {
  urlAuth = `${api.url}/auth`;

  calcAuthExpires = () => new Date(new Date().getTime() + 20 * 60 * 1000);

  setAccessToken = (token: string) => Cookies.set('access', token.split('Bearer ')[1], {
    path: '/',
    expires: this.calcAuthExpires(),
  });

  getAccessToken = () => Cookies.get('access');

  removeAccessToken = () => Cookies.remove('access', { path: '/' });

  setRefreshToken = (token: string) => localStorage.setItem('refresh', token);

  getRefreshToken = () => localStorage.getItem('refresh');

  removeRefreshToken = () => localStorage.removeItem('refresh');

  async registerUser({ email, password, name }: TUserFull): Promise<{ user: TUser }> {
    let res = await fetch(`${this.urlAuth}/register`, {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res = await api.checkResponce(res);

    const data: TDataLogin = await res.json();
    await api.checkSuccess(data);

    this.setAccessToken(data.accessToken);
    this.setRefreshToken(data.refreshToken);

    return { user: data.user };
  }

  async login({ email, password }: TUserAuth): Promise<{ user: TUser }> {
    let res = await fetch(`${this.urlAuth}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res = await api.checkResponce(res);

    const data: TDataLogin = await res.json();
    await api.checkSuccess(data);

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

    res = await api.checkResponce(res);

    const data: TDataTokens = await res.json();
    await api.checkSuccess(data);

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

    res = await api.checkResponce(res);

    const data: TData = await res.json();
    await api.checkSuccess(data);

    this.removeAccessToken();
    this.removeRefreshToken();
  }

  async getUser(): Promise<{ user: TUser }> {
    const token = await this.getAccessTokenWithRefresh();

    let res = await fetch(`${this.urlAuth}/user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    res = await api.checkResponce(res);

    const data: TDataUser = await res.json();
    await api.checkSuccess(data);

    return { user: data.user };
  }

  async updateUser({ email, password, name }: TUserFull): Promise<{ user: TUser }> {
    const token = await this.getAccessTokenWithRefresh();

    let res = await fetch(`${this.urlAuth}/user`, {
      method: 'PATCH',
      body: JSON.stringify({ email, password, name }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    res = await api.checkResponce(res);

    const data: TDataUser = await res.json();
    await api.checkSuccess(data);
    return { user: data.user };
  }

  async getAccessTokenWithRefresh(): Promise<string | undefined> {
    const parseJwt = (token: string) => {
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

    const isExpired = (token: string) => {
      try {
        const payload = parseJwt(token);
        return Date.now() >= payload.exp * 1000;
      } catch (err) {
        return true;
      }
    };

    const accessToken = this.getAccessToken();
    if (!accessToken || isExpired(accessToken)) {
      await this.refreshToken();
    }

    return this.getAccessToken();
  }
}

export default new AuthApi();
