import { combineReducers } from 'redux';

import appReducer from './app';
import authReducer from './auth';
import orderReducer from './order';
import feedReducer from './live-feed';
import { feedWsApi as liveFeedAPI } from '../api/live-feed';
import { privateFeedWsApi } from '../api/private-live-feed';
import orderHistoryReducer from './order-history';

const rootReducer = combineReducers({
  app: appReducer,
  order: orderReducer,
  auth: authReducer,
  feed: feedReducer,
  [liveFeedAPI.reducerPath]: liveFeedAPI.reducer,
  history: orderHistoryReducer,
  [privateFeedWsApi.reducerPath]: privateFeedWsApi.reducer
});

export default rootReducer;
