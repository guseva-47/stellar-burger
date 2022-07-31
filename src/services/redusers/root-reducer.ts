import { combineReducers } from 'redux';

import appReducer from './app';
import authReducer from './auth';
import orderReducer from './order';
import feedReducer from './live-feed';
import { api as liveFeedAPI } from '../api/live-feed';

const rootReducer = combineReducers({
  app: appReducer,
  order: orderReducer,
  auth: authReducer,
  feed: feedReducer,
  [liveFeedAPI.reducerPath]: liveFeedAPI.reducer,
});

export default rootReducer;
