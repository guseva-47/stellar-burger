import { TIngredient } from '../types/ingredient';
import { TUser } from '../types/user';

export type TData = {
  success: boolean | string;
  message?: string;
};

export type TDataTokens = {
  accessToken: string;
  refreshToken: string;
} & TData;

export type TDataLogin = {
  user: TUser;
} & TDataTokens;

export type TDataUser = {
  user: TUser;
} & TData;

export type TDataIngredients = { data: Array<TIngredient> } & TData;

export type TDataOrder = {
  name: string;
  order: {
    number: number;
  };
} & TData;
