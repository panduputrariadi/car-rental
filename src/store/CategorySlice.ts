import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  selectedCategories: string[];
}

const initialState: CategoryState = {
  selectedCategories: [],
};

const filterCategoryReducer = createSlice({
  name: "filterCategory",
  initialState,
  reducers: {
    setSelectedCategories: (
      state,
      action: PayloadAction<{ categoryId: string; checked: boolean }>
    ) => {      
      const { categoryId, checked } = action.payload;      
      if (checked) {
        if (!state.selectedCategories.includes(categoryId)) {
          state.selectedCategories.push(categoryId);
          console.log("list category:", state.selectedCategories);
        }
      } else {
        const categoryIndex = state.selectedCategories.indexOf(categoryId);
        if (categoryIndex > -1) {
          state.selectedCategories.splice(categoryIndex, 1);
          console.log("Category removed:", categoryId, "Current categories:", state.selectedCategories);
        }
      }
    },
  },
});

export const { setSelectedCategories } = filterCategoryReducer.actions;
export default filterCategoryReducer;