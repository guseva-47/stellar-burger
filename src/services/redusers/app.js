import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backendApi from '../../api/backend-api';

import data from '../../utils/data';

const initialState = {
  allIngredients: data,
  currentIngredient: null,
};

export const fetchGetItems = createAsyncThunk('app/getAll', async () => backendApi.getAllIngredients());

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
    builder.addCase(fetchGetItems.pending, (state) => {
      state.allIngredients = [];
    });
    builder.addCase(fetchGetItems.fulfilled, (state, action) => {
      state.allIngredients = action.payload;
    });
    builder.addCase(fetchGetItems.rejected, (state, action) => {
      state.allIngredients = [];
      console.error(action.error.message);
    });
  },
});

export const { resetCurrent, setCurrent } = appSlice.actions;

export default appSlice.reducer;
