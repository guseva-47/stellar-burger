import { createSelector } from 'reselect';

import { TRootState } from '../store';

export const getAllIngredients = (store: TRootState) => store.app.allIngredients;

export const getIngredientsByType = createSelector(
  (store: TRootState) => store.app.allIngredients,
  (_: any, type: string) => type,
  (ingredients, type) => ingredients.filter((item) => item.type === type)
);

export const getIngredientById = createSelector(
  (store: TRootState) => store.app.allIngredients,
  (_: any, id: string) => id,
  (ingredients, id) => ingredients.find((prod) => prod._id === id)
);

export const isAllIngredientsLoading = createSelector(
  (store: TRootState) => store.app.allIngredientsLoading,
  (isLoading: boolean) => isLoading
);

export const isAllIngredientsFailed = createSelector(
  (store: TRootState) => store.app.allIngredientsFailed,
  (isFailed: boolean) => isFailed
);

export const getOrder = (store: TRootState) => store.app.order;
