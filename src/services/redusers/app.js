import { createSlice } from '@reduxjs/toolkit';

import data from '../../utils/data';

const initialState = {
  allIngredients: data,
  currentIngredient: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      state.currentIngredient = action.payload;
    },
    resetCurrent: (state) => {
      state.currentIngredient = null;
    },
  },
});

export const { resetCurrent, setCurrent } = appSlice.actions;

export default appSlice.reducer;
