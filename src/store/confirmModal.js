import { createSlice } from "@reduxjs/toolkit";

const confirmModal = createSlice({
  name: "컨펌 모달",
  initialState: {
    messege: "위시리스트에 등록되었습니다.",
    isOn: false,
    isConfirm: false,
    returnYes: false,
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
