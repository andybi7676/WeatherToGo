import { configureStore } from '@reduxjs/toolkit';
import weatherInfoSettingReducer from './settings/weatherInfoSettingSlice';
import placesInfoReducer from './explore/placesInfoSlice';
import weatherToGoSettingReducer from './settings/weatherToGoSettingSlice';

export default configureStore({
  reducer: {
    weatherInfoSetting: weatherInfoSettingReducer,
    placesInfo: placesInfoReducer,
    weatherToGoSetting: weatherToGoSettingReducer,
  },
})