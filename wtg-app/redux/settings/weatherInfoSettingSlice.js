import { createSlice } from "@reduxjs/toolkit";

export const weatherInfoSettingSlice = createSlice({
  name: 'weatherInfoSetting',
  initialState: {
    'sections': ["主要", "溫度", "水", "風", "人"],
    'curFocusName': "",
    '主要': ['天氣現象', '天氣預報綜合描述', '降雨機率', '溫度', '相對溼度', '最大風速', '紫外線指數'], 
    '溫度': ['溫度', '露點溫度', '最低溫度', '最高溫度', '體感溫度', '最低體感溫度', '最高體感溫度'],
    '水': ['相對濕度', '6小時降雨機率', '12小時降雨機率'],
    '風': ['最大風速', '風向'], 
    '人': ['舒適度指數', '最小舒適度指數', '最大舒適度指數', '天氣現象'],
    'items': {
      '天氣現象': true, '天氣預報綜合描述': true, '降雨機率':true, '溫度':true, '相對溼度': true, '最大風速': true, '紫外線指數': true,
      '溫度': true, '露點溫度': true, '最低溫度': true, '最高溫度': true, '體感溫度': true, '最低體感溫度': true, '最高體感溫度': true,
      '相對濕度': true, '6小時降雨機率': true, '12小時降雨機率': true,
      '最大風速': true, '風向': true,
      '舒適度指數': true, '最小舒適度指數': true, '最大舒適度指數': true, '天氣現象': true,
    },
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

    toggleItemSelection: (state, action) => {
      const itemName = action.payload;
      const prevStatus = state.items[itemName];
      state.items[itemName] = !prevStatus;
    }
  },
})

export const selectWeatherInfoSetting = state => state.weatherInfoSetting;
// Action creators are generated for each case reducer function
export const { focusSection, toggleItemSelection } = weatherInfoSettingSlice.actions;

export default weatherInfoSettingSlice.reducer;