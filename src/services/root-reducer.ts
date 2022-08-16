import { combineReducers } from 'redux';

import appReducer from './app/app.reducer';
import authReducer from './auth/auth.reducer';
import orderReducer from './order/order.reducer';
import feedReducer from './live-feed/live-feed.reducer';
import { feedWsApi as liveFeedAPI } from './api/live-feed';
import { privateFeedWsApi } from './api/private-live-feed';
import orderHistoryReducer from './order-history/order-history.reducer';

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
