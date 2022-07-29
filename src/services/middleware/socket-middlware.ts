import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
// todo
// eslint-disable-next-line import/no-cycle
import { TRootState } from '../store';

type TwsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsSendMessage?: ActionCreatorWithPayload<any>;
  wsConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onMessage: ActionCreatorWithPayload<any>;
};

// eslint-disable-next-line arrow-body-style
const liveFeedMiddleware = (wsActions: TwsActionTypes): Middleware<{}, TRootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let url = '';

    return (next) => (action) => {
      const { dispatch } = store;
      const { wsConnect: wsInitConnection, onOpen, onClose, onMessage, wsConnecting } = wsActions;

      if (wsInitConnection.match(action)) {
        console.log('connect');
        url = action.payload;
        socket = new WebSocket(url);
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => dispatch(onOpen());

        socket.onerror = () => console.log('error');

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onMessage(parsedData));
        };

        socket.onclose = (event) => {
          console.log('close');
          dispatch(onClose());
        };
      }

      next(action);
    };
  };
};

export default liveFeedMiddleware;
