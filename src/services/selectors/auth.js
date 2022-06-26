import { createSelector } from 'reselect';

export const getProfile = (store) => store.auth.user;

export const isProfileLoading = createSelector(
  (store) => store.auth.isUser,
  (o) => o.isLoading
);

export const isProfileFailed = createSelector(
  (store) => store.auth.isUser,
  ({ isFailed }) => isFailed
);

export const getUserName = (store) => store.auth.user.name ?? '';
