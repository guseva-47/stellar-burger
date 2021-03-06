import { createSelector } from 'reselect';
import { TypesOfIngredients } from '../../types/ingredient';

export const getStuffing = createSelector(
  (store) => store.order.ingredients,
  (ingredients) => ingredients.stuffing
);

export const getBun = createSelector(
  (store) => store.order.ingredients,
  (ingredients) => ingredients.bun
);

export const getCost = (store) => {
  const { bun, stuffing } = store.order.ingredients;
  let cost = stuffing.reduce((accum, ingredient) => ingredient.price + accum, 0);
  cost += 2 * (bun?.price ?? 0);
  return cost;
};

export const getCountStuffing = createSelector(
  (store) => store.order.ingredients,
  (_, ingredient) => ingredient,
  (ingredients, { _id, type }) => {
    if (type === TypesOfIngredients.bun) {
      return ingredients.bun?._id === _id ? 2 : 0;
    }
    return ingredients.stuffing.filter((item) => item._id === _id).length;
  }
);

export const getOrderNumber = createSelector(
  (store) => store.order,
  (order) => order.number
);

export const isOrderLoading = createSelector(
  (store) => store.order.isLoading,
  (isLoading) => isLoading
);

export const isOrderFailed = createSelector(
  (store) => store.order.isFailed,
  (isFailed) => isFailed
);
