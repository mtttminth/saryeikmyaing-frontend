import { createAsyncThunk } from "@reduxjs/toolkit";
import adminReviewService from "@/services/adminReviewService";
import { ReviewParam } from "@/types/admin-review";

export const fetchAdminReview = createAsyncThunk(
  "adminReview/fetchAdminReview",
  async (params: ReviewParam, thunkAPI) => {
    try {
      const res = await adminReviewService.getAdminReviews(params);
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

export const fetchAdminReviewCategories = createAsyncThunk(
  "adminReview/fetchAdminReviewCategories",
  async (_, thunkAPI) => {
    try {
      const res = await adminReviewService.getAdminReviewCategories();
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

export const fetchAdminReviewDetail = createAsyncThunk(
  "adminReview/fetchAdminReviewDetail",
  async (id: number, thunkAPI) => {
    try {
      const res = await adminReviewService.getAdminReviewsDetail(id);
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

export const fetchRelatedAdminReview = createAsyncThunk(
  "adminReview/fetchRelatedAdminReview",
  async (id: number, thunkAPI) => {
    try {
      const res = await adminReviewService.getRelatedAdminReview(id);
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