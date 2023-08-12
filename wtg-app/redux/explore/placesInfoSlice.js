import { createSlice } from "@reduxjs/toolkit";

export const placesInfoSlice = createSlice({
  name: 'placesInfo',
  initialState: {
  },
  reducers: {
    focusSection: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      if (state.curFocusName === action.payload) {
        state.curFocusName = "";
      }
      else {
        state.curFocusName = action.payload;
      }
    },
  },
})

export const selectPlacesInfo = state => state.placesInfo;
// Action creators are generated for each case reducer function
export const {  } = placesInfoSlice.actions;

export default placesInfoSlice.reducer;