import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TOrdersResponse } from '../../types/order';
import { setData } from '../live-feed/live-feed.reducer';

export const feedWsApi = createApi({
  reducerPath: 'liveFeedAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (build) => ({
    getOrders: build.query<TOrdersResponse, void>({
      queryFn: () => ({ data: {} as TOrdersResponse }),
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all');
        try {
          await cacheDataLoaded;
          const listener = (event: MessageEvent) => {
            const data: TOrdersResponse = JSON.parse(event.data);
            updateCachedData((draft) => {
              Object.assign(draft, data);
            });
            dispatch(setData(data));
          };

          const onOpenWs = () => {
            console.log('openning connection');
          };

          const onCloseWs = () => {
            console.log('closed connection');
          };

          const onErrorWs = () => {
            console.log('connection error');
          };

          ws.addEventListener('close', onCloseWs);
          ws.addEventListener('error', onErrorWs);
          ws.addEventListener('message', listener);
          ws.addEventListener('open', onOpenWs);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});

export const { useGetOrdersQuery } = feedWsApi;
