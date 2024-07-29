import { createSlice } from "@reduxjs/toolkit";
import { CategoryState } from "@/types/categories";
import { fetchCategoriesWithSubcategories } from "../thunks/categoryThunk";

const initialState: CategoryState = {
  loading: false,
  categoryErrors: undefined,
  success: false,
  categoryMessage: "",
  categories: [],
};
const categorySlice = createSlice({
  name: "collection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesWithSubcategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesWithSubcategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesWithSubcategories.rejected, (state, action) => {
        state.loading = false;
        state.categoryErrors = action.payload;
      });
  },
});
export default categorySlice.reducer;
