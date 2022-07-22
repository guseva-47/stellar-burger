import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import backendApi from '../../api/backend-api';
import { TIngredient, TIngredientInOrder } from '../../types/ingredient';

type TIngredients = {
  stuffing: TIngredientInOrder[];
  bun: TIngredient | null;
};

interface IOrderState {
  ingredients: TIngredients;
  number: number | null;
  isLoading: boolean;
  isFailed: boolean;
}

const initialState: IOrderState = {
  ingredients: {
    stuffing: [],
    bun: null,
  },
  number: null,
  isLoading: false,
  isFailed: false,
};

export const fetchPostOrder = createAsyncThunk('order/postOrder', async (ingredients: TIngredient[]) => (
  backendApi.postOrder(ingredients)
));

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setStuffing: (state, action: PayloadAction<TIngredient>) => {
      const item = action.payload;
      const uniqItem = { ...item, uuid: uuidv4() };
      state.ingredients.stuffing.splice(0, 0, uniqItem);
    },
    removeStuffing: (state, action: PayloadAction<TIngredient>) => {
      const item = action.payload;

      const i = state.ingredients.stuffing.findIndex((elem) => elem._id === item._id);
      state.ingredients.stuffing.splice(i, 1);
    },
    setBun: (state, action: PayloadAction<TIngredient>) => {
      const item = action.payload;
      state.ingredients.bun = item;
    },
    removeBun: (state) => {
      state.ingredients.bun = null;
    },
    updateOrder: (state, action: PayloadAction<{ idFrom: number, idTo: number }>) => {
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
      state.ingredients = {
        stuffing: [],
        bun: null,
      };
    });
    builder.addCase(fetchPostOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.isFailed = true;
      console.error(action.error.message);
    });
  },
});

export const { setStuffing, removeStuffing, setBun, removeBun, updateOrder } = orderSlice.actions;

export default orderSlice.reducer;
