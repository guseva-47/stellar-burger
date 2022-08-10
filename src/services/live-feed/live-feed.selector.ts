import { TRootState } from '../store';

export const ordersSelector = (state: TRootState) => state.feed.orders;
export const totalOrderSelector = (state: TRootState) => state.feed.total;
export const totalTodayOrderSelector = (state: TRootState) => state.feed.totalToday;
