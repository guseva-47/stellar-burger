import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TOrdersResponse } from '../../types/order';
import { setData } from '../redusers/order-history';
import authApi from '../../api/auth-api';

export const privateFeedWsApi = createApi({
  reducerPath: 'privateLiveFeedAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  endpoints: (build) => ({
    getPrivateOrders: build.query<TOrdersResponse, void>({
      queryFn: () => ({ data: {} as TOrdersResponse }),
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        const accessToken: string | undefined = await authApi.getAccessTokenWithRefresh();
        if (!accessToken) return;

        const ws = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${accessToken}`);

        try {
          await cacheDataLoaded;
          const listener = (event: MessageEvent) => {
            const data: TOrdersResponse = JSON.parse(event.data);
            console.log(data);

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

export const { useGetPrivateOrdersQuery } = privateFeedWsApi;
