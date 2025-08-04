import { createSlice } from "@reduxjs/toolkit";
const viewProduct = createSlice({
  name: "latest",
  initialState: {
    latest: [],
    isOn: false,
  },
  reducers: {
    productAddAction(state, action) {
      state.latest = action.payload;
      localStorage.setItem("latest", JSON.stringify(state.latest));
    },
    productDelAction(state, action) {
      state.latest = [];
    },
    isOnAction(state, action) {
      state.isOn = action.payload;
    },
  },
});
export default viewProduct.reducer;
export const { productAddAction, productDelAction, isOnAction } =
  viewProduct.actions;
