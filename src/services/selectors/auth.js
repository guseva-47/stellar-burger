import { createSelector } from 'reselect';

export const getProfile = (store) => store.auth.user;

const createIsLoadingCreateSelector = (key) => (
  createSelector(
    (store) => store.auth[key],
    ({ isLoading }) => isLoading
  )
);

const createIsFailedCreateSelector = (key) => (
  createSelector(
    (store) => store.auth[key],
    ({ isFailed }) => isFailed
  )
);

export const isProfileLoading = createIsLoadingCreateSelector('isUser');

export const isProfileFailed = createIsFailedCreateSelector('isUser');

export const getUserName = (store) => store.auth.user.name ?? '';

export const isRegLoading = createIsLoadingCreateSelector('isReg');

export const isRegFailed = createIsFailedCreateSelector('isReg');

export const regErrorMessage = createSelector(
  (store) => store.auth.isReg,
  ({ errMessage }) => errMessage
);

export const isLoginFailed = createIsFailedCreateSelector('isLogin');

export const loginErrorMessage = createSelector(
  (store) => store.auth.isLogin,
  ({ errMessage }) => errMessage
);

export const isEditLoading = createIsLoadingCreateSelector('isEdit');

export const isEditFailed = createIsFailedCreateSelector('isEdit');
