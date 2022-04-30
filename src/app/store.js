import { configureStore } from '@reduxjs/toolkit';
import quotesReducer from "../redux/reducer/reducerQuotes";

export const store = configureStore({
  reducer: {
    quotes: quotesReducer,
  },
});
