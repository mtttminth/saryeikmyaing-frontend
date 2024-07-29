import { createSlice } from "@reduxjs/toolkit";
import { AuthorDetail, AuthorList, AuthorState } from "@/types/authors";
import { fetchAuthors, fetchAuthorDetail } from "../thunks/authorThunk";

const initialState: AuthorState = {
  authorLoading: false,
  authorErrors: undefined,
  success: false,
  authorMessage: "",
  authorList: {} as AuthorList,
  authors: [],
  authorDetail: {} as AuthorDetail,
};
const authorSlice = createSlice({
  name: "preorder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchAuthors
      .addCase(fetchAuthors.pending, (state) => {
        state.authorLoading = true;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.authorLoading = false;
        state.authorList = action.payload;
        state.authors = action.payload.data;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.authorLoading = false;
        state.authorErrors = action.payload;
      })
      // fetchAuthorDetail
      .addCase(fetchAuthorDetail.pending, (state, action) => {
        state.authorLoading = true;
      })
      .addCase(fetchAuthorDetail.fulfilled, (state, action) => {
        state.authorLoading = false;
        state.authorDetail = action.payload;
      })
      .addCase(fetchAuthorDetail.rejected, (state, action) => {
        state.authorLoading = false;
        state.authorErrors = action.payload;
      });
  },
});
export default authorSlice.reducer;
