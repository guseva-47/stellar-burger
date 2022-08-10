import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrders, TOrdersResponse } from '../../types/order';
import { WebsocketStatus } from '../utils/utils';

export interface ILiveFeed extends TOrders {
  status: WebsocketStatus;
}

const initialState: ILiveFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: WebsocketStatus.offline,
};

const liveFeedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<TOrdersResponse>) => {
      state.orders = action.payload.success ? action.payload.orders : [];
      state.total = action.payload.success ? action.payload.total : 0;
      state.totalToday = action.payload.success ? action.payload.totalToday : 0;
    },
  },
});

export const { setData } = liveFeedSlice.actions;
export default liveFeedSlice.reducer;
