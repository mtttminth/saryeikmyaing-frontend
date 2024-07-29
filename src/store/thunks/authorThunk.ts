import { createAsyncThunk } from "@reduxjs/toolkit";
import authorService from "@/services/authorService";

export const fetchAuthors = createAsyncThunk(
  "author/fetchAuthors",
  async (_, thunkAPI) => {
    try {
      const res = await authorService.getAuthors();
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

export const fetchAuthorDetail = createAsyncThunk(
  "author/fetchAuthorDetail",
  async (id: number, thunkAPI) => {
    try {
      const res = await authorService.getAuthorDetail(id);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      });
    }
  }
);