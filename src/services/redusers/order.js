import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ingredients: {
    stuffing: [],
    bun: null,
  },
  number: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setStuffing: (state, action) => {
      const item = action.payload;
      state.ingredients.stuffing.splice(0, 0, item);
    },
    removeStuffing: (state, action) => {
      const item = action.payload;

      const i = state.ingredients.stuffing.findIndex((elem) => elem._id === item._id);
      state.ingredients.stuffing.splice(i, 1);
    },
    setBun: (state, action) => {
      const item = action.payload;
      state.ingredients.bun = item;
    },
    removeBun: (state) => {
      state.ingredients.bun = null;
    },
  },
});

// eslint-disable-next-line object-curly-newline
export const { setStuffing, removeStuffing, setBun, removeBun } = orderSlice.actions;

export default orderSlice.reducer;
