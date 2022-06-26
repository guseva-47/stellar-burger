import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import authApi from '../../api/auth-api';
import { initIsLoadFailed, initIsLoadFailedErrMsg } from './utils';

const initialState = {
  user: {
    email: '',
    name: '',
  },
  isUser: initIsLoadFailed(),
  isReg: initIsLoadFailed(),
  isLogin: initIsLoadFailedErrMsg(),
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => authApi.login({ email, password })
);

export const registratiion = createAsyncThunk(
  'auth/registration',
  async ({ email, password, name }) => authApi.registerUser({ email, password, name })
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => authApi.logout()
);

export const getUser = createAsyncThunk(
  'auth/getuser',
  async () => authApi.getUser()
);

export const editUser = createAsyncThunk(
  'auth/edituser',
  async ({ email, password, name }) => authApi.updateUser({ email, password, name })
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    // Регистрация
    builder.addCase(registratiion.pending, (state) => {
      state.isReg.isLoading = true;
      state.isReg.isFailed = false;
      state.isReg.errMessage = '';
    });
    builder.addCase(registratiion.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.user.email = user.email;
      state.user.name = user.name;

      state.isReg.isLoading = false;
      state.isReg.isFailed = false;
      state.isReg.errMessage = '';
    });
    builder.addCase(registratiion.rejected, (state, action) => {
      state.isReg.errMessage = action.error.message;
      state.isReg.isFailed = true;
      state.isReg.isLoading = false;
    });

    // Автризация
    builder.addCase(login.pending, (state) => {
      state.isLogin.isLoading = true;
      state.isLogin.isFailed = false;
      state.isLogin.errMessage = '';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.user.email = user.email;
      state.user.name = user.name;

      state.isLogin.isFailed = false;
      state.isLogin.isLoading = false;
      state.isLogin.errMessage = '';
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLogin.isFailed = true;
      state.isLogin.isLoading = false;
      state.isLogin.errMessage = action.error.message;
    });

    // Разлогинивание
    builder.addCase(logout.pending, (state) => {
      console.log('отправлен запрос logout');
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      console.log('GOOD logout');
      state.user.email = '';
      state.user.name = '';
    });
    builder.addCase(logout.rejected, (state, action) => {
      console.log('FAIL logout');
      console.error(action.error.message);
    });

    // Получение данных профиля
    builder.addCase(getUser.pending, (state) => {
      state.isUser.isLoading = true;
      state.isUser.isFailed = false;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.user.email = user.email;
      state.user.name = user.name;

      state.isUser.isLoading = false;
      state.isUser.isFailed = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isUser.isLoading = false;
      state.isUser.isFailed = true;
    });

    // Редактирование данных профиля
    builder.addCase(editUser.pending, (state) => {
      console.log('отправлен запрос edit');
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      console.log('GOOD edit');
      const { user } = action.payload;
      state.user.email = user.email;
      state.user.name = user.name;
    });
    builder.addCase(editUser.rejected, (state, action) => {
      console.log('FAIL logout');
      console.error(action.error.message);
    });
  },
});

// eslint-disable-next-line max-len
// accessToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZC…zE0fQ.j2MXAlD1Iu0AxK5KRTP4jL6DCq6ef47T1ERui33nDAY',
// refreshToken: 'a91743bc8e778de3719896b44d2b43c1ac9d7abda38f10de95458d95d41987c2e5b7632d7c5c9b9b'
// export const { setCurrent } = authSlice.actions;

export default authSlice.reducer;
