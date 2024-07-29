import { createSlice } from "@reduxjs/toolkit";
import { PreorderState, PreorderList } from "@/types/preorders";
import { fetchPreorders } from "../thunks/preorderThunk";

const initialState: PreorderState = {
  preorderLoading: false,
  preorderErrors: undefined,
  success: false,
  preorderMessage: "",
  preorderList: {} as PreorderList,
  preorders: [],
};
const preorderSlice = createSlice({
  name: "preorder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPreorders.pending, (state) => {
        state.preorderLoading = true;
      })
      .addCase(fetchPreorders.fulfilled, (state, action) => {
        state.preorderLoading = false;
        state.preorderList = action.payload;
        state.preorders = action.payload.data;
      })
      .addCase(fetchPreorders.rejected, (state, action) => {
        state.preorderLoading = false;
        state.preorderErrors = action.payload;
      });
  },
});
export default preorderSlice.reducer;
