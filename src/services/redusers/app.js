import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backendApi from '../../api/backend-api';

import data from '../../utils/data';

const initialState = {
  allIngredients: data,
  currentIngredient: null,
};

export const fetchItems = createAsyncThunk(
  'app/fetchAll',
  () => backendApi.getAllIngredients()
);

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
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.allIngredients = [];
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.allIngredients = action.payload;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.allIngredients = [];
      console.error(action.error.message);
    });
  },
});

export const { resetCurrent, setCurrent } = appSlice.actions;

export default appSlice.reducer;
