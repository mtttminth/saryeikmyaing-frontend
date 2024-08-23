import { createSlice } from "@reduxjs/toolkit";
import {
  BookListBySubCategory,
  BookListByAuthor,
  BookParam,
  BookState,
  BookDetail,
  BookListByCollection,
  BookListByTag,
} from "@/types/books";
import {
  fetchBooksBySubCategory,
  fetchBooksByAuthor,
  fetchBookDetail,
  fetchRelatedBook,
  fetchBooksByCollection,
  fetchBooksByTag,
} from "../thunks/bookThunk";

const initialState: BookState = {
  loading: false,
  bookErrors: undefined,
  success: false,
  bookMessage: "",
  bookListBySubCategory: {} as BookListBySubCategory,
  booksBySubCategory: [],
  bookListByAuthor: {} as BookListByAuthor,
  booksByAuthor: [],
  bookListByCollection: {} as BookListByCollection,
  booksByCollection: [],
  bookListByTag: {} as BookListByTag,
  booksByTag: [],
  bookParam: {} as BookParam,
  bookDetail: {} as BookDetail,
  relatedBook: [],
};
const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.bookErrors = undefined;
    },
    updateParams: (state, action) => {
      state.bookParam = action.payload;
    },
    resetMessage: (state) => {
      state.success = false;
      state.bookMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchBookBySubCategory
      .addCase(fetchBooksBySubCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooksBySubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.bookListBySubCategory = action.payload;
        state.booksBySubCategory = action.payload.data;
      })
      .addCase(fetchBooksBySubCategory.rejected, (state, action) => {
        state.loading = false;
        state.bookErrors = action.payload;
      })
      // fetchBookByAuthor
      .addCase(fetchBooksByAuthor.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchBooksByAuthor.fulfilled, (state, action) => {
        state.loading = false;
        state.bookListByAuthor = action.payload;
        state.booksByAuthor = action.payload.data;
      })
      .addCase(fetchBooksByAuthor.rejected, (state, action) => {
        state.loading = false;
        state.bookErrors = action.payload;
      })
      // fetchBookDetail
      .addCase(fetchBookDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchBookDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.bookDetail = action.payload;
      })
      .addCase(fetchBookDetail.rejected, (state, action) => {
        state.loading = false;
        state.bookErrors = action.payload;
      })
      //fetchRelatedBook
      .addCase(fetchRelatedBook.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchRelatedBook.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedBook = action.payload;
      })
      .addCase(fetchRelatedBook.rejected, (state, action) => {
        state.loading = false;
        state.bookErrors = action.payload;
      })
      // fetchBookByCollection
      .addCase(fetchBooksByCollection.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchBooksByCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.bookListByCollection = action.payload;
        state.booksByCollection = action.payload.data;
      })
      .addCase(fetchBooksByCollection.rejected, (state, action) => {
        state.loading = false;
        state.bookErrors = action.payload;
      })
      // fetchBookByTag
      .addCase(fetchBooksByTag.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchBooksByTag.fulfilled, (state, action) => {
        state.loading = false;
        state.bookListByTag = action.payload;
        state.booksByTag = action.payload.data;
      })
      .addCase(fetchBooksByTag.rejected, (state, action) => {
        state.loading = false;
        state.bookErrors = action.payload;
      });
  },
});
export const { initialise, resetErrors, updateParams, resetMessage } =
  bookSlice.actions;
const { reducer: bookReducer } = bookSlice;
export default bookReducer;
