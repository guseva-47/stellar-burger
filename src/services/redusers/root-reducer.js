import { combineReducers } from 'redux';

import appReducer from './app';
import authReducer from './auth';
import orderReducer from './order';

const rootReducer = combineReducers({
  app: appReducer,
  order: orderReducer,
  auth: authReducer,
});

export default rootReducer;
