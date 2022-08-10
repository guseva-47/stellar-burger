import { createSelector } from 'reselect';
import { TRootState } from '../store';

export const getProfile = (store: TRootState) => store.auth.user;

const createIsLoadingCreateSelector = (key: string) => (
  createSelector(
    (store: TRootState) => (key in store.auth ? (store as any).auth[key] : { isLoading: false }),
    ({ isLoading }) => !!isLoading
  )
);

const createIsFailedCreateSelector = (key: string) => (
  createSelector(
    (store: TRootState) => (key in store.auth ? (store as any).auth[key] : { isFailed: false }),
    ({ isFailed }) => !!isFailed
  )
);

const createErrMsgCreateSelector = (key: string) => (
  createSelector(
    (store: TRootState) => (key in store.auth ? (store as any).auth[key] : { errMessage: '' }),
    ({ errMessage }) => errMessage as string
  )
);

export const isProfileLoading = createIsLoadingCreateSelector('isUser');

export const isProfileFailed = createIsFailedCreateSelector('isUser');

export const getUserName = (store: TRootState) => store.auth.user.name ?? '';

export const isRegLoading = createIsLoadingCreateSelector('isReg');

export const isRegFailed = createIsFailedCreateSelector('isReg');

export const regErrorMessage = createErrMsgCreateSelector('isReg');

export const isLoginFailed = createIsFailedCreateSelector('isLogin');

export const loginErrorMessage = createErrMsgCreateSelector('isLogin');

export const isEditLoading = createIsLoadingCreateSelector('isEdit');

export const isEditFailed = createIsFailedCreateSelector('isEdit');
