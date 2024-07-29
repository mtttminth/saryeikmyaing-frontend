"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import collectionReducer from "./slices/collectionSlice";
import preorderReducer from "./slices/preorderSlice";
import categoryReducer from "./slices/categorySlice";
import adminReviewReducer from "./slices/adminReviewSlice";
import authorReducer from "./slices/authorSlice";
import bookReducer from "./slices/bookSlice";

const rootReducer = combineReducers({
  collection: collectionReducer,
  preorder: preorderReducer,
  category: categoryReducer,
  adminReview: adminReviewReducer,
  author: authorReducer,
  book: bookReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
