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
      state.places = action.payload;
      state.curIdx = {
        value: Math.min(action.payload.length-1, 0),
        source: 'searchInput',
      }
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
  },
})

export const selectPlacesInfo = state => state.placesInfo;
export const selectPlaces = state => state.placesInfo.places;
export const selectPlacesCurIdx = state => state.placesInfo.curIdx;
// Action creators are generated for each case reducer function
export const { changePlaces, changeCurIdx, updateOnePlace } = placesInfoSlice.actions;

export default placesInfoSlice.reducer;