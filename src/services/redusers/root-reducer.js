import { combineReducers } from 'redux';

import appReducer from './app';
import orderReducer from './order';

const rootReducer = combineReducers({
  app: appReducer,
  order: orderReducer,
});

export default rootReducer;
