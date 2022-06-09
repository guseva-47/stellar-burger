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

export const getCountStuffing = createSelector(
  (store) => store.order.ingredients,
  (_, data) => data,
  (ingredients, { id, type }) => {
    if (type === 'bun') {
      return ingredients.bun?._id === id ? 2 : 0;
    }
    return ingredients.stuffing.filter((item) => item._id === id).length;
  }
);
