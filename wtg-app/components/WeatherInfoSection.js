import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { Divider, Icon } from '@rneui/base'
import { useDispatch, useSelector } from 'react-redux';
import { focusSection, toggleItemSelection, selectWeatherInfoSetting } from '../redux/settings/weatherInfoSettingSlice';

export default function WeatherInfoSection({ sectionName }) {
  const [ twRepr, setTwRepr ] = useState(tw`pb-4 p-3 pl-4`);
  const dispatch = useDispatch();
  const weatherInfoSetting = useSelector(selectWeatherInfoSetting);

  return (
    <View>
      <TouchableOpacity 
        style={twRepr} 
        onPressIn={() => setTwRepr(tw`pb-4 p-3 pl-4 bg-gray-200 mx-1`)} 
        onPressOut={() => setTwRepr(tw`pb-4 p-3 pl-4`)}
        onPress={() => dispatch(focusSection(sectionName || ""))}
      >
        {/* <Icon */}
        <Text style={tw`text-xl text-center text-slate-500`}>{sectionName}</Text>
      </TouchableOpacity>
      <View style={tw`px-1`}>
        {
          weatherInfoSetting.curFocusName === sectionName 
          ?
          weatherInfoSetting[sectionName].map((val, idx) => {
            return <TouchableOpacity key={idx} style={tw`flex-row bg-gray-200 py-3`} onPress={() => dispatch(toggleItemSelection(val))}>
              {
                <Icon name="check" style={tw`pl-4`} color={weatherInfoSetting.items[val] ? "#1e90ff" : "rgba(255, 255, 255, 0)"}/> 
              }
              <Text style={tw`text-lg pl-3 text-slate-600`} >
                {val}
              </Text>
            </TouchableOpacity>
          })
          :
          null
        }
        <Divider />
      </View>

      {/* <Text>天氣現象</Text>
      <Text>天氣預報綜合描述</Text>
      <Text>降雨機率</Text>
      <Text>溫度</Text>
      <Text>相對溼度</Text>
      <Text>最大風速</Text>
      <Text>紫外線指數</Text> */}
    </View>
  )
}

const styles = StyleSheet.create({})