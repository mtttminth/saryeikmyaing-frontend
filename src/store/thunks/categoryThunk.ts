import { createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "@/services/categoryService";

export const fetchCategoriesWithSubcategories = createAsyncThunk(
  "category/fetchCategoriesWithSubcategories",
  async (_, thunkAPI) => {
    try {
      const res = await categoryService.getCategoriesWithSubcategories();
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.erros,
      });
    }
  }
);
