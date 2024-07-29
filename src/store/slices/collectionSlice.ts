import { createSlice } from "@reduxjs/toolkit";
import { CollectionState } from "@/types/collections";
import { fetchCollections } from "../thunks/collectionThunk";

const initialState: CollectionState = {
  collectionLoading: false,
  collectionErrors: undefined,
  success: false,
  collectionMessage: "",
  collections: [],
};
const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.pending, (state) => {
        state.collectionLoading = true;
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.collectionLoading = false;
        state.collections = action.payload;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.collectionLoading = false;
        state.collectionErrors = action.payload;
      });
  },
});
export default collectionSlice.reducer;
