import { createSlice } from "@reduxjs/toolkit";

const mainModal = createSlice({
  name: "메인 모달",
  initialState: {
    imgSrc: "",
    isOn: false,
  },
  reducers: {
    mainModalAction(state, action) {
      state.imgSrc = action.payload.imgSrc;
      state.isOn = action.payload.isOn;
    },
  },
});

export default mainModal.reducer;
export const { mainModalAction } = mainModal.actions;
