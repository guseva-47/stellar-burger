import { createSelector } from 'reselect';

export const getAllIngredients = (store) => store.app.allIngredients;

export const getIngredientsByType = createSelector(
  (store) => store.app.allIngredients,
  (_, type) => type,
  (ingredients, type) => ingredients.filter((item) => item.type === type)
);

export const getIngredientById = createSelector(
  (store) => store.app.allIngredients,
  (_, id) => id,
  (ingredients, id) => ingredients.find((prod) => prod._id === id)
);

export const getCurrentIngredient = (store) => store.app.currentIngredient;

export const isAllIngredientsLoading = createSelector(
  (store) => store.app.allIngredientsLoading,
  (isLoading) => isLoading
);

export const isAllIngredientsFailed = createSelector(
  (store) => store.app.allIngredientsFailed,
  (isFailed) => isFailed
);
