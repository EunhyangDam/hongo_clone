import { createSlice } from "@reduxjs/toolkit";

const wishlist = createSlice({
  name: "찜 상품 목록",
  initialState: {
    wishlist: [],
  },
  reducers: {
    heartAddAction(state, action) {
      state.wishlist = action.payload;
      localStorage.setItem("wishlist", JSON.stringify(action.payload));
    },
    heartDelAction(state, action) {
      state.wishlist = action.payload;
      localStorage.setItem("wishlist", JSON.stringify(action.payload));
    },
  },
});

export default wishlist.reducer;
export const { heartAddAction, heartDelAction } = wishlist.actions;
