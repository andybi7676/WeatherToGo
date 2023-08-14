import { createSlice } from "@reduxjs/toolkit";

export const placesInfoSlice = createSlice({
  name: 'placesMetaData',
  initialState: {
    order: [],
    curIdx: {
      value: -1,
      source: null,
      coordinate: null,
    },
    places: {}
  },
  reducers: {
    changePlaces: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      const { favoriteIds, newIds, newPlaces } = action.payload
      const newOrder = [...favoriteIds, ...newIds];
      let favoritePlaces = {}
      favoriteIds.forEach(id => {
        favoritePlaces[id] = state.places[id]
      });
      // const favoritePlaces = state.places.filter((place) => place.isFavorite === true)
      const combinedNewPlaces = {...favoritePlaces, ...newPlaces}
      state.places = combinedNewPlaces ;
      state.order = newOrder;
      state.curIdx = {
        value: newOrder.length > 0 ? 0 : -1,
        source: 'searchInput',
        coordinate: newOrder.length > 0 ? combinedNewPlaces[newOrder[0]].coordinate : null,
      }
      // console.log(state.places)
      // console.log(state);
    },
    
    changeCurIdx: (state, action) => {
      const newCurIdx = Math.min(action.payload.value, state.order.length-1);
      state.curIdx = {
        value: newCurIdx,
        source: action.payload.source,
        coordinate: newCurIdx < state.order.length ? state.places[state.order[newCurIdx]].coordinate : null,
      };
    },

    updateOnePlace: (state, action) => {
      const updateId = action.payload.id;
      state.places[updateId] = action.payload.newPlace;
    },

    toggleOneFavorite: (state, action) => {
      const updateId = action.payload;
      state.places[updateId].isFavorite = !state.places[updateId].isFavorite;
    },

    deleteAllPlaces: (state) => {
      state.order = [],
      state.places = {}
      state.curIdx = {
        value: -1,
        source: 'searchInput',
      }
    },

    reloadAllPlaces: (state) => {
      state.order.forEach(id => {
        state.places[id] = {
          ...state.places[id],
          weatherInfoLoaded: false,
          isFavorite: false,
        }
      })
    }
  },
})

export const selectPlacesMetaData = state => state.placesMetaData;
export const selectPlaces = state => state.placesMetaData.places;
export const selectPlacesCurIdx = state => state.placesMetaData.curIdx;
export const selectPlacesOrder = state => state.placesMetaData.order;
// export const selectFavoritePlaces = state => state.placesInfo.places.filter((place) => place.isFavorite === true)
// Action creators are generated for each case reducer function
export const { changePlaces, changeCurIdx, updateOnePlace, toggleOneFavorite, deleteAllPlaces, reloadAllPlaces } = placesInfoSlice.actions;

export default placesInfoSlice.reducer;