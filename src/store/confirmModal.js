import { createSlice } from "@reduxjs/toolkit";

const confirmModal = createSlice({
  name: "컨펌 모달",
  initialState: {
    messege: "",
    isOn: false,
    isConfirm: false,
    returnYes: false,
    returnOK: false,
  },
  reducers: {
    modalAction(state, action) {
      state.messege = action.payload.messege;
      state.isOn = action.payload.isOn;
      state.isConfirm = action.payload.isConfirm;
    },
    returnAction(state, action) {
      state.returnYes = action.payload;
    },
  },
});

export default confirmModal.reducer;
export const { modalAction, returnAction } = confirmModal.actions;
