import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import authApi from '../../api/auth-api';

const initialState = {
  user: {
    email: '',
    name: '',
  },
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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // setCurrent: (state, action) => {
    //   state.currentIngredient = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(registratiion.pending, (state) => {
      console.log('отправлен запрос на регистрацию');
    });
    builder.addCase(registratiion.fulfilled, (state, action) => {
      console.log('GOOD запрос на регистрацию');
      const { user } = action.payload;
      state.user.email = user.email;
      state.user.name = user.name;
    });
    builder.addCase(registratiion.rejected, (state, action) => {
      console.log('FAIL запрос на регистрацию');
      console.error(action.error.message);
    });

    builder.addCase(login.pending, (state) => {
      console.log('отправлен запрос login');
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log('GOOD login');
      const { user } = action.payload;
      state.user.email = user.email;
      state.user.name = user.name;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log('FAIL login');
      console.error(action.error.message);
    });

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
  },
});

// eslint-disable-next-line max-len
// accessToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZC…zE0fQ.j2MXAlD1Iu0AxK5KRTP4jL6DCq6ef47T1ERui33nDAY',
// refreshToken: 'a91743bc8e778de3719896b44d2b43c1ac9d7abda38f10de95458d95d41987c2e5b7632d7c5c9b9b'
// export const { setCurrent } = authSlice.actions;

export default authSlice.reducer;
