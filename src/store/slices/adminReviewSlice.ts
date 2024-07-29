import { createSlice } from "@reduxjs/toolkit";
import {
  AdminReviewState,
  AdminReviewList,
  ReviewParam,
  AdminReviewDetail,
  RelatedAdminReview,
} from "@/types/admin-review";
import {
  fetchAdminReview,
  fetchAdminReviewCategories,
  fetchAdminReviewDetail,
  fetchRelatedAdminReview,
} from "../thunks/adminReviewThunk";

const initialState: AdminReviewState = {
  adminReviewLoading: false,
  adminReviewErrors: undefined,
  success: false,
  adminReviewMessage: "",
  adminReviewList: {} as AdminReviewList,
  adminReview: [],
  reviewParam: {} as ReviewParam,
  adminReviewCategories: [],
  adminReviewDetail: {} as AdminReviewDetail,
  relatedAdminReview: [],
};
const adminReviewSlice = createSlice({
  name: "preorder",
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.adminReviewErrors = undefined;
    },
    updateParams: (state, action) => {
      state.reviewParam = action.payload;
    },
    resetMessage: (state) => {
      state.success = false;
      state.adminReviewMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchAdminReview
      .addCase(fetchAdminReview.pending, (state) => {
        state.adminReviewLoading = true;
      })
      .addCase(fetchAdminReview.fulfilled, (state, action) => {
        state.adminReviewLoading = false;
        state.adminReviewList = action.payload;
        state.adminReview = action.payload.data;
      })
      .addCase(fetchAdminReview.rejected, (state, action) => {
        state.adminReviewLoading = false;
        state.adminReviewErrors = action.payload;
      })
      //fetchAdminReviewCategories
      .addCase(fetchAdminReviewCategories.pending, (state) => {
        state.adminReviewLoading = true;
      })
      .addCase(fetchAdminReviewCategories.fulfilled, (state, action) => {
        state.adminReviewLoading = false;
        state.adminReviewCategories = action.payload;
      })
      .addCase(fetchAdminReviewCategories.rejected, (state, action) => {
        state.adminReviewLoading = false;
        state.adminReviewErrors = action.payload;
      })
      // fetchAdminReviewDetail
      .addCase(fetchAdminReviewDetail.pending, (state, action) => {
        state.adminReviewLoading = true;
      })
      .addCase(fetchAdminReviewDetail.fulfilled, (state, action) => {
        state.adminReviewLoading = false;
        state.adminReviewDetail = action.payload;
      })
      .addCase(fetchAdminReviewDetail.rejected, (state, action) => {
        state.adminReviewLoading = false;
        state.adminReviewErrors = action.payload;
      })
      // fetchRelatedAdminReview
      .addCase(fetchRelatedAdminReview.pending, (state) => {
        state.adminReviewLoading = true;
      })
      .addCase(fetchRelatedAdminReview.fulfilled, (state, action) => {
        state.adminReviewLoading = false;
        state.relatedAdminReview = action.payload;
      })
      .addCase(fetchRelatedAdminReview.rejected, (state, action) => {
        state.adminReviewLoading = false;
        state.adminReviewErrors = action.payload;
      });
  },
});
export const { initialise, resetErrors, updateParams, resetMessage } =
  adminReviewSlice.actions;
const { reducer: adminReviewReducer } = adminReviewSlice;
export default adminReviewReducer;
