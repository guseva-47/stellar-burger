import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redusers/root-reducer';
import {
  wsConnecting as LiveTableWsConnecting,
  wsOpen as LiveTableWsOpen,
  wsClose as LiveTableWsClose,
  wsMessage as LiveTableWsNessage,
  wsError as LiveTableWsError,
} from './actions/live-feed';

// todo
// eslint-disable-next-line import/no-cycle
import socketMiddleware from './middleware/socket-middlware';

const wsActions = {
  wsConnecting: LiveTableWsConnecting,
  onOpen: LiveTableWsOpen,
  onClose: LiveTableWsClose,
  onError: LiveTableWsError,
  onMessage: LiveTableWsNessage,
};

const feedTableMiddleware = socketMiddleware(wsActions);
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(feedTableMiddleware),
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export default store;
