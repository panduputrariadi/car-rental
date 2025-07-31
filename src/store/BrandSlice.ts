// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const initialState = {
//   selectedBrands: [] as string[],
// };

// const filterBrand = createSlice({
//   name: "filterBrand",
//   initialState,
//   reducers: {
//     setBrand: (state, action: PayloadAction<string>) => {
//       const brandID = action.payload;
//       const brandIndex = state.selectedBrands.indexOf(brandID);

//       if (brandIndex > -1) {
//         // Remove if already selected
//         state.selectedBrands.splice(brandIndex, 1);
//         console.log(
//           "Brand removed:",
//           brandID,
//           "Current brands:",
//           state.selectedBrands
//         );
//       } else {
//         // Add if not selected
//         state.selectedBrands.push(brandID);
//         console.log(
//           "Brand added:",
//           brandID,
//           "Current brands:",
//           state.selectedBrands
//         );
//       }
//     },
//   },
// });

// export const { setBrand } = filterBrand.actions;
// export default filterBrand.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BrandState {
  selectedBrands: string[];
}

const initialState: BrandState = {
  selectedBrands: [],
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setBrand: (state, action: PayloadAction<{ brandId: string; checked: boolean }>) => {
      const { brandId, checked } = action.payload;
      if (checked) {
        if (!state.selectedBrands.includes(brandId)) {
          state.selectedBrands.push(brandId);          
        }
      } else {
        const brandIndex = state.selectedBrands.indexOf(brandId);
        if (brandIndex > -1) {
          state.selectedBrands.splice(brandIndex, 1);
        }
      }
    },
  },
});

export const { setBrand } = brandSlice.actions;
export default brandSlice.reducer;