import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backendApi from '../../api/backend-api';
import { TIngredient } from '../../types/ingredient';
import { TOrder } from '../../types/order';

interface IAppState {
  allIngredients: Array<TIngredient>,
  allIngredientsLoading: boolean,
  allIngredientsFailed: boolean,
  order: TOrder | null
}

const initialState: IAppState = {
  allIngredients: [],
  allIngredientsLoading: false,
  allIngredientsFailed: false,
  order: null
};

export const fetchGetItems = createAsyncThunk(
  'app/getAll',
  async () => backendApi.getAllIngredients()
);

export const fetchGetOrder = createAsyncThunk(
  'app/getOderById',
  async (num: string) => backendApi.getOrder(num)
);

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetItems.pending, (state) => {
      state.allIngredientsLoading = true;
      state.allIngredientsFailed = false;
      state.allIngredients = [];
    });
    builder.addCase(fetchGetItems.fulfilled, (state, action) => {
      state.allIngredientsLoading = false;
      state.allIngredientsFailed = false;
      state.allIngredients = action.payload;
    });
    builder.addCase(fetchGetItems.rejected, (state, action) => {
      state.allIngredientsLoading = false;
      state.allIngredientsFailed = true;
      state.allIngredients = [];
      console.error(action.error.message);
    });
    builder.addCase(fetchGetOrder.fulfilled, (state, action) => {
      state.order = action.payload;
    });
    builder.addCase(fetchGetOrder.rejected, (state, action) => {
      state.order = null;
      console.error(action.error.message);
    });
  },
});

export default appSlice.reducer;
