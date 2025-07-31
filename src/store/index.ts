import { configureStore } from "@reduxjs/toolkit";
import brandReducer from "./BrandSlice";
import filterCategoryReducer from "./CategorySlice";

export const store = configureStore({
  reducer: {
    brand: brandReducer,
    category: filterCategoryReducer.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;