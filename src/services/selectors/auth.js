import { createSelector } from 'reselect';

export const getProfile = (store) => store.auth.user;

export const isProfileLoading = createSelector(
  (store) => store.auth.isUser,
  ({ isLoading }) => isLoading
);

export const isProfileFailed = createSelector(
  (store) => store.auth.isUser,
  ({ isFailed }) => isFailed
);

export const getUserName = (store) => store.auth.user.name ?? '';

export const isRegLoading = createSelector(
  (store) => store.auth.isReg,
  ({ isLoading }) => isLoading
);

export const isRegFailed = createSelector(
  (store) => store.auth.isReg,
  ({ isFailed }) => isFailed
);

export const regErrorMessage = createSelector(
  (store) => store.auth.isReg,
  ({ errMessage }) => errMessage
);

export const isLoginFailed = createSelector(
  (store) => store.auth.isLogin,
  ({ isFailed }) => isFailed
);

export const loginErrorMessage = createSelector(
  (store) => store.auth.isLogin,
  ({ errMessage }) => errMessage
);

export const isEditLoading = createSelector(
  (store) => store.auth.isEdit,
  ({ isLoading }) => isLoading
);

export const isEditFailed = createSelector(
  (store) => store.auth.isEdit,
  ({ isFailed }) => isFailed
);
