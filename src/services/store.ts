import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './redusers/root-reducer';
import { feedWsApi as liveFeedAPI } from './api/live-feed';
import { privateFeedWsApi as privateFeedAPI } from './api/private-live-feed';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat([liveFeedAPI.middleware, privateFeedAPI.middleware])
  )
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export default store;
