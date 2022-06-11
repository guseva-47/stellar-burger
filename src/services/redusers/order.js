import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import backendApi from '../../api/backend-api';

const initialState = {
  ingredients: {
    stuffing: [],
    bun: null,
  },
  number: null,
  isLoading: false,
  isFailed: false,
};

export const fetchPostOrder = createAsyncThunk('order/postOrder', async (ingredients) => (
  backendApi.postOrder(ingredients)
));

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setStuffing: (state, action) => {
      const item = action.payload;
      const uniqItem = { ...item, uuid: uuidv4() };
      state.ingredients.stuffing.splice(0, 0, uniqItem);
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
  extraReducers: (builder) => {
    builder.addCase(fetchPostOrder.pending, (state) => {
      state.number = null;
      state.isLoading = true;
      state.isFailed = false;
    });
    builder.addCase(fetchPostOrder.fulfilled, (state, action) => {
      state.number = action.payload.order.number;
      state.isLoading = false;
      state.isFailed = false;
    });
    builder.addCase(fetchPostOrder.rejected, (state, action) => {
      state.allIngredients = null;
      state.isLoading = false;
      state.isFailed = true;
      console.error(action.error.message);
    });
  },
});

// eslint-disable-next-line object-curly-newline
export const { setStuffing, removeStuffing, setBun, removeBun, updateOrder } = orderSlice.actions;

export default orderSlice.reducer;
