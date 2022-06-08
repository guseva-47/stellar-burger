import { createSelector } from 'reselect';

export const getAllIngredients = (store) => store.app.allIngredients;

export const getIngredientsByType = createSelector(
  (store) => store.app.allIngredients,
  (_, type) => type,
  (ingredients, type) => ingredients.filter((item) => item.type === type)
);

export const getCurrentIngredient = (store) => store.app.currentIngredient;
