import { StyleSheet, Text, View, TouchableOpacity, Pressable, Dimensions } from 'react-native'
import { Divider } from '@rneui/themed';
import React from 'react'
import tw from 'twrnc'
import Rating from './Rating';

// 溫度 濕度 體感溫度 降雨機率 舒適度指數(0~31) 紫外線指數 (0~11) 空氣品質(0~400)
const window = Dimensions.get('window')
const comfortReprs = [
  "極差", "差", "普通", "好", "良好"
]
const uvReprs = [
  "弱", "中", "強", "極強"
]
const airReprs = [
  "極差", "差", "普通", "好", "良好"
]

export default function MapCard({ item }) {
  const bodyTemp = item.temp + item.temp * item.humidity * 0.002
  const comfortText = comfortReprs[item.comfortIdx];
  const uvText = uvReprs[item.uvIdx];
  const airText = airReprs[item.airIdx];
  return (
    <View style={[styles.card, tw`p-2 m-2 bg-white rounded-2xl border-gray-400 border-2 h-50`]}>
      <TouchableOpacity >
        <View>
          <Text style={tw`text-base font-semibold`}>{item.name}</Text>
        </View>
        <View style={tw`flex flex-row`}>
          <View style={tw`basis-1/3 flex-row pt-1`}>
            <Text >WeatherToGo: </Text>
          </View>
          <View style={tw`basis-1/3 flex-row`}>
            <Rating rating={item.rating}/>
          </View>
        </View>
        <Divider style={tw`mt-1 mb-1`}/>
        <Text style={tw`text-base font-medium mb-2`}>舒適度指數: {comfortText}</Text>
        <View style={tw`flex flex-row mb-1`}>
          <Text style={tw`basis-1/3`}>溫度: {item.temp.toFixed(2)}</Text>
          <Text style={tw`basis-1/3`}>濕度: {item.humidity.toFixed(2)}%</Text>
          <Text style={tw`basis-1/3`}>體感溫度: {bodyTemp.toFixed(2)}</Text>
        </View>
        <View style={tw`flex flex-row`}>
          <Text style={tw`basis-1/2`}>紫外線強度: {uvText}</Text>
          <Text style={tw`basis-1/2`}>空氣品質: {airText}</Text>
          {/* <Text style={tw`basis-1/3`}>體感溫度: {bodyTemp.toFixed(2)}</Text> */}
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    // width: window.width*0.75,
    height: window.height*0.25,
  }
})