import { createSlice } from "@reduxjs/toolkit";

export const placesWeatherInfoSlice = createSlice({
  name: 'placesWeatherInfo',
  initialState: {
    weatherInfos: {},
  },
  reducers: {
    updateOneWeatherInfo: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.weatherInfos[action.payload.id] = action.payload.weatherInfo
      // console.log(state.places)
    },

    deleteAllWeatherInfos: (state) => {
      state.weatherInfos = {}
    },
  },
})

export const selectPlacesWeatherInfo = state => state.placesWeatherInfo;
export const selectWeatherInfos = state => state.placesWeatherInfo.weatherInfos;
// export const selectFavoritePlaces = state => state.placesInfo.places.filter((place) => place.isFavorite === true)
// Action creators are generated for each case reducer function
export const { updateOneWeatherInfo, deleteAllWeatherInfos } = placesWeatherInfoSlice.actions;

export default placesWeatherInfoSlice.reducer;