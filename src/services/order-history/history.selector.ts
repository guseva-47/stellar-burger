import { TRootState } from '../store';

export const ordersSelector = (state: TRootState) => state.history.orders;
export const totalOrderSelector = (state: TRootState) => state.history.total;
export const totalTodayOrderSelector = (state: TRootState) => state.history.totalToday;
