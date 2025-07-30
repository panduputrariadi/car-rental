import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  selectedBrands: [] as string[],
};

const filterBrand = createSlice({
  name: "filterBrand",
  initialState,
  reducers: {
    setBrand: (state, action: PayloadAction<string>) => {
      const brandID = action.payload;
      const brandIndex = state.selectedBrands.indexOf(brandID);

      if (brandIndex > -1) {
        // Remove if already selected
        state.selectedBrands.splice(brandIndex, 1);
        console.log(
          "Brand removed:",
          brandID,
          "Current brands:",
          state.selectedBrands
        );
      } else {
        // Add if not selected
        state.selectedBrands.push(brandID);
        console.log(
          "Brand added:",
          brandID,
          "Current brands:",
          state.selectedBrands
        );
      }
    },
  },
});

export const { setBrand } = filterBrand.actions;
export default filterBrand.reducer;