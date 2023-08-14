import { createSlice } from "@reduxjs/toolkit";

export const placesInfoSlice = createSlice({
  name: 'placesInfo',
  initialState: {
    curIdx: {
      value: -1,
      source: null,
    },
    places: [

    ],
  },
  reducers: {
    changePlaces: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      const favoritePlaces = state.places.filter((place) => place.isFavorite === true)
      state.places = [...favoritePlaces.map((place, idx) => ({...place, index: idx})), ...action.payload] ;
      state.curIdx = {
        value: Math.min((favoritePlaces.length + action.payload.length)-1, 0),
        source: 'searchInput',
      }
      // console.log(state.places)
    },
    
    changeCurIdx: (state, action) => {
      state.curIdx = {
        value: Math.min(action.payload.value, state.places.length-1),
        source: action.payload.source,
      };
    },

    updateOnePlace: (state, action) => {
      const updateIdx = action.payload.index;
      if (updateIdx < state.places.length) {
        state.places[updateIdx] = action.payload.newPlace;
      }
    },

    toggleOneFavorite: (state, action) => {
      const updateIdx = action.payload;
      if (updateIdx < state.places.length) {
        state.places[updateIdx].isFavorite = !state.places[updateIdx].isFavorite;
      }
    },

    deleteAllPlaces: (state) => {
      state.places = [],
      state.curIdx = {
        value: -1,
        source: 'searchInput',
      }
    },

    reloadAllPlaces: (state) => {
      state.places = state.places.map((place, _) => {
        return {
          ...place,
          weatherInfo: null,
          weatherInfoLoaded: false,
          isFavorite: false,
        }
      })
    }
  },
})

export const selectPlacesInfo = state => state.placesInfo;
export const selectPlaces = state => state.placesInfo.places;
export const selectPlacesCurIdx = state => state.placesInfo.curIdx;
// export const selectFavoritePlaces = state => state.placesInfo.places.filter((place) => place.isFavorite === true)
// Action creators are generated for each case reducer function
export const { changePlaces, changeCurIdx, updateOnePlace, toggleOneFavorite, deleteAllPlaces, reloadAllPlaces } = placesInfoSlice.actions;

export default placesInfoSlice.reducer;