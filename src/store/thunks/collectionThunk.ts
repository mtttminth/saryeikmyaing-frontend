import { createAsyncThunk } from "@reduxjs/toolkit";
import collectionService from "@/services/collectionService";

export const fetchCollections = createAsyncThunk(
  "collection/fetchCollections",
  async (_, thunkAPI) => {
    try {
      const res = await collectionService.getCollections();
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
