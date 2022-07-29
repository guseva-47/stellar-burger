import { combineReducers } from 'redux';

import appReducer from './app';
import authReducer from './auth';
import orderReducer from './order';
import feedReducer from './live-feed';

const rootReducer = combineReducers({
  app: appReducer,
  order: orderReducer,
  auth: authReducer,
  feed: feedReducer,
});

export default rootReducer;
