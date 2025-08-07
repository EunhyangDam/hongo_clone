import { createSlice } from "@reduxjs/toolkit";

const reactDaumPostcode = createSlice({
  name: "회원 주소",
  initialState: {
    adr: "",
    adr2: "",
    buildingName: "",
    zoneCode: "",
    isOpen: false,
    isOn: false,
  },
  reducers: {
    postAction(state, action) {
      state.adr = action.payload.adr;
      state.adr2 = action.payload.adr2;
      state.buildingName = action.payload.buildingName;
      state.zoneCode = action.payload.zoneCode;
      state.isOn = action.payload.isOn;
      localStorage.setItem("postcode", JSON.stringify(state));
    },
    postOpenAction(state, action) {
      state.isOpen = action.payload;
      localStorage.setItem("postcode", JSON.stringify(state));
    },
  },
});

export default reactDaumPostcode.reducer;
export const { postAction, adrBtnAction, postOpenAction } =
  reactDaumPostcode.actions;
