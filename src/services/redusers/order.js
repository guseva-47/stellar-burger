import { createSlice } from '@reduxjs/toolkit';

import data from '../../utils/data';

const initialState = {
  ingredients: data,
  number: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  redusers: {},
});

export default orderSlice.reducer;
