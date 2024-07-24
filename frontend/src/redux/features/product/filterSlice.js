import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { products, search } = action.payload;

      // Ensure products is an array and search is a string
      if (Array.isArray(products) && typeof search === 'string') {
        const tempProducts = products.filter(
          (product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.category.toLowerCase().includes(search.toLowerCase())
        );

        state.filteredProducts = tempProducts;
      } else {
        console.error('Invalid products or search parameter');
        state.filteredProducts = [];
      }
    },
  },
});

export const { FILTER_PRODUCTS } = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
