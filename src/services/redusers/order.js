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
    updateOrder: (state, action) => {
      const { idFrom, idTo } = action.payload;
      const item = state.ingredients.stuffing[idFrom];
      state.ingredients.stuffing.splice(idFrom, 1);
      state.ingredients.stuffing.splice(idTo, 0, item);
    },
  },
});

// eslint-disable-next-line object-curly-newline
export const { setStuffing, removeStuffing, setBun, removeBun, updateOrder } = orderSlice.actions;

export default orderSlice.reducer;
