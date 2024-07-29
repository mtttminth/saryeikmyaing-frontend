import { createAsyncThunk } from "@reduxjs/toolkit";
import bookService from "@/services/bookService";
import { BookParam } from "@/types/books";

export const fetchBooksBySubCategory = createAsyncThunk(
  "book/fetchBooksBySubCategory",
  async ({ id, params }: { id: number; params: BookParam }, thunkAPI) => {
    try {
      const res = await bookService.getBooksBySubCategory(id, params);
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

export const fetchBooksByAuthor = createAsyncThunk(
  "book/fetchBooksByAuthor",
  async ({ id, params }: { id: number; params: BookParam }, thunkAPI) => {
    try {
      const res = await bookService.getBooksByAuthor(id, params);
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

export const fetchBookDetail = createAsyncThunk(
  "book/fetchBookDetail",
  async (id: number, thunkAPI) => {
    try {
      const res = await bookService.getBookDetail(id);
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

export const fetchRelatedBook = createAsyncThunk(
  "book/fetchRelatedBook",
  async (id: number, thunkAPI) => {
    try {
      const res = await bookService.getRelatedBook(id);
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
