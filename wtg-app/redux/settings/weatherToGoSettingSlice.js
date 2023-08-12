import { createSlice } from "@reduxjs/toolkit";

export const weatherToGoSettingSlice = createSlice({
  name: 'weatherToGoSetting',
  initialState: {
    'startTime': 0,
    'endTime': 0,
    'chosenType': '日常',
  },
  reducers: {
    setTime: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.startTime = action.payload.startTime;
      state.endTime = action.payload.endTime;
    },

    chooseType: (state, action) => {
      state.chosenType = action.payload;
    }
  },
})

export const selectWeatherToGoSetting = state => state.weatherToGoSetting;
// Action creators are generated for each case reducer function
export const { setTime, chooseType } = weatherToGoSettingSlice.actions;

export default weatherToGoSettingSlice.reducer;