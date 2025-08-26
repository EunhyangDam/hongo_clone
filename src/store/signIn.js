import { createSlice } from "@reduxjs/toolkit";

const signIn = createSlice({
  name: "로그인",
  initialState: {
    name: "",
    ID: "",
    userRemeber: false,
    isAdmin: false,
  },
  reducers: {
    signInAction(state, action) {
      state.name = action.payload.NAME;
      state.ID = action.payload.ID;
      state.userRemeber = action.payload.userRemeber;
      state.isAdmin = action.payload.isAdmin === "1" ? true : false;
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
      state.isAdmin = false;
    },
  },
});

export default signIn.reducer;
export const { signInAction, logOutAction } = signIn.actions;
