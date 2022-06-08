import { createSlice } from '@reduxjs/toolkit';

import data from '../../utils/data';

const initialState = {
  allIngredients: data,
  currentIngredient: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

// export const { } = appSlice.actions;

export default appSlice.reducer;
