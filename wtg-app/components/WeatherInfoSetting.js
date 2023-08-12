import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import WeatherInfoSection from './WeatherInfoSection'
import { Divider } from '@rneui/base';
import { useSelector } from 'react-redux';
import { selectWeatherInfoSetting } from '../redux/settings/weatherInfoSettingSlice';

export default function WeatherInfoSetting() {
  const weatherInfoSetting = useSelector(selectWeatherInfoSetting);

  return (
    <View style={tw`rounded-3xl bg-white py-3 my-2`}>
      <Text style={tw`text-xl text-slate-500 p-2 pl-3 pt-1 font-semibold`}>天氣資訊顯示設定</Text>
      <Divider width={1}/>
      {
        weatherInfoSetting.sections.map((sectionName, idx) => {
          return <WeatherInfoSection key={idx} sectionName={sectionName}/>
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({})