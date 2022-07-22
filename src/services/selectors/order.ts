import { createSelector } from 'reselect';
import { TIngredient, TypesOfIngredients } from '../../types/ingredient';
import { TRootState } from '../store';

export const getStuffing = createSelector(
  (store: TRootState) => store.order.ingredients,
  (ingredients) => ingredients.stuffing
);

export const getBun = createSelector(
  (store: TRootState) => store.order.ingredients,
  (ingredients) => ingredients.bun
);

export const getCost = (store: TRootState) => {
  const { bun, stuffing } = store.order.ingredients;
  let cost = stuffing.reduce((accum, ingredient) => ingredient.price + accum, 0);
  cost += 2 * (bun?.price ?? 0);
  return cost;
};

export const getCountStuffing = createSelector(
  (store: TRootState) => store.order.ingredients,
  (_: any, ingredient: TIngredient) => ingredient,
  (ingredients, { _id, type }) => {
    if (type === TypesOfIngredients.bun) {
      return ingredients.bun?._id === _id ? 2 : 0;
    }
    return ingredients.stuffing.filter((item) => item._id === _id).length;
  }
);

export const getOrderNumber = createSelector(
  (store: TRootState) => store.order,
  (order) => order.number
);

export const isOrderLoading = createSelector(
  (store: TRootState) => store.order.isLoading,
  (isLoading) => isLoading
);

export const isOrderFailed = createSelector(
  (store: TRootState) => store.order.isFailed,
  (isFailed) => isFailed
);
