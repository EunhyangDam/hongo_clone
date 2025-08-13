import { createSlice } from "@reduxjs/toolkit";

const signIn = createSlice({
  name: "찜 상품 목록",
  initialState: {
    name: "",
    ID: "",
    userRemeber: false,
  },
  reducers: {
    signInAction(state, action) {
      state.name = action.payload.NAME;
      state.ID = action.payload.ID;
      state.userRemeber = action.payload.userRemeber;
      if (state.userRemeber)
        localStorage.setItem("hongo_sign_in", JSON.stringify(action.payload));
      else
        sessionStorage.setItem("hongo_sign_in", JSON.stringify(action.payload));
    },
    logOutAction(state, action) {
      localStorage.removeItem("hongo_sign_in");
      sessionStorage.removeItem("hongo_sign_in");
      state.name = "";
      state.ID = "";
      state.userRemeber = false;
    },
  },
});

export default signIn.reducer;
export const { signInAction, logOutAction } = signIn.actions;
