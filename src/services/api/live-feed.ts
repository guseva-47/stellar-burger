import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TOrdersResponse } from '../../types/order';
import { setData } from '../redusers/live-feed';

export const api = createApi({
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
          ws.addEventListener('message', listener);
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

export const { useGetOrdersQuery } = api;
