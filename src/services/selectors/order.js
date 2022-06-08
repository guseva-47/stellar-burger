import { createSelector } from 'reselect';

const isBun = (ingredient) => ingredient.type === 'bun';

export const getStuffing = createSelector(
  (store) => store.order.ingredients,
  (ingredients) => ingredients.filter((item) => !isBun(item))
);

export const getBun = createSelector(
  (store) => store.order.ingredients,
  (ingredients) => ingredients.find(isBun)
);

export const getCost = (store) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  store.order.ingredients.reduce((accum, ingredient) => ingredient.price + accum, 0);
