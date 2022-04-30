import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  quotes: {},
};

export const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    reducerGetQuotes: (state, {payload}) => {
      state.quotes = payload;
    },
    reducerChangeAmount: (state, {payload}) => {
      state.quotes = {...state.quotes, ...payload};
    },
  },
});

export const { reducerGetQuotes, reducerChangeAmount } = quotesSlice.actions;

export const selectQuotes = (state) => state.quotes;

export default quotesSlice.reducer;
