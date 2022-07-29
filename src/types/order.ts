import { TData } from '../api/responce.types';

export type TOrder = {
  ingredients: Array<string>;
  _id: string;
  status: TOrederStatus;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export enum TOrederStatus {
  done = 'done',
  pending = 'pending',
  created = 'created',
}

export type TOrders = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TOrdersResponce = TOrders | TData;
