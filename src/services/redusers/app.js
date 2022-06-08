import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  allIngredients: [],
  currentIngredient: null,
};

export const fetchItems = createAsyncThunk('app/fetchAll', async (_, { rejectWithValue }) => {
  const res = await fetch('https://norma.nomoreparties.space/api/ingredients');
  if (!res.ok) return rejectWithValue(res.statusText);
  return res.json();
});

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
      state.allIngredients = action.payload.data;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.allIngredients = [];
      console.error(action.error);
    });
  },
});

export const { resetCurrent, setCurrent } = appSlice.actions;

export default appSlice.reducer;
