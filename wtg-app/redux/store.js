import { configureStore } from '@reduxjs/toolkit';
import weatherInfoSettingReducer from './settings/weatherInfoSettingSlice';
import placesMetaDataReducer from './explore/placesMetaDataSlice';
import weatherToGoSettingReducer from './settings/weatherToGoSettingSlice';
import placesWeatherInfoReducer from './explore/placesWeatherInfoSlice';

export default configureStore({
  reducer: {
    weatherInfoSetting: weatherInfoSettingReducer,
    weatherToGoSetting: weatherToGoSettingReducer,
    placesMetaData: placesMetaDataReducer,
    placesWeatherInfo: placesWeatherInfoReducer,
  },
})