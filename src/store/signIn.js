import { createSlice } from "@reduxjs/toolkit";

const signIn = createSlice({
  name: "찜 상품 목록",
  initialState: {
    name: "",
    ID: "",
  },
  reducers: {
    signInAction(state, action) {
      state.name = action.payload.NAME;
      state.ID = action.payload.ID;
      localStorage.setItem("hongo_sign_in", JSON.stringify(action.payload));
    },
  },
});

export default signIn.reducer;
export const { signInAction } = signIn.actions;
