import { createReducer } from '@reduxjs/toolkit';
import { TOrders } from '../../types/order';
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from '../actions/live-feed';
import { WebsocketStatus } from './utils';

export interface ILiveFeed extends TOrders {
  status: WebsocketStatus;
}

const initialState: ILiveFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: WebsocketStatus.offline,
};

export const liveFeedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.connecting;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.online;
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.offline;
    })
    .addCase(wsMessage, (state, action) => {
      console.log(action.payload, action.type);
    });
});
