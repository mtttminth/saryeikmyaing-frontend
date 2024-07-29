import { createAsyncThunk } from "@reduxjs/toolkit";
import preorderService from "@/services/preorderService";

export const fetchPreorders = createAsyncThunk(
  "preorder/fetchPreorders",
  async (_, thunkAPI) => {
    try {
      const res = await preorderService.getPreorders();
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
