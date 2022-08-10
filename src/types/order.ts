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

export enum TOrederStatusALias {
  done = 'Выполнен',
  pending = 'Готовится',
  created = 'Создан',
}

export type TOrders = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TOrdersResponse = TOrders & TData;
