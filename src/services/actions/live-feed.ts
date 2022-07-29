import { createAction } from '@reduxjs/toolkit';
import { TOrdersResponce } from '../../types/order';

export const wsConnecting = createAction('LIVE_FEED_WS_CONNECTING');
export const wsOpen = createAction('LIVE_FEED_WS_OPEN');
export const wsClose = createAction('LIVE_FEED_WS_CLOSE');
export const wsMessage = createAction<TOrdersResponce, 'LIVE_FEED_WS_MESSAGE'>(
  'LIVE_FEED_WS_MESSAGE'
);
export const wsError = createAction<string, 'LIVE_FEED_WS_ERROR'>('LIVE_FEED_WS_ERROR');

export type TLiveTableActions =
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>;
