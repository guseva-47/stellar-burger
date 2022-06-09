import { createSelector } from 'reselect';

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
