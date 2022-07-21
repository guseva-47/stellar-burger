import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backendApi from '../../api/backend-api';
import { TIngredient } from '../../types/ingredient';

interface IAppState {
  allIngredients: Array<TIngredient>,
  allIngredientsLoading: boolean,
  allIngredientsFailed: boolean
}

const initialState: IAppState = {
  allIngredients: [],
  allIngredientsLoading: false,
  allIngredientsFailed: false
};

export const fetchGetItems = createAsyncThunk(
  'app/getAll',
  async () => backendApi.getAllIngredients()
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
  },
});

export default appSlice.reducer;
