import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrders, TOrdersResponse } from '../../types/order';

const initialState: TOrders = {
  orders: [],
  total: 0,
  totalToday: 0,
};

const orderHistorySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<TOrdersResponse>) => {
      state.orders = action.payload.success ? action.payload.orders : [];
      state.total = action.payload.success ? action.payload.total : 0;
      state.totalToday = action.payload.success ? action.payload.totalToday : 0;
    },
  },
});

export const { setData } = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
