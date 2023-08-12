import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { Divider } from '@rneui/base'

export default function WeatherPreferenceSetting() {
  return (
    <View style={tw`rounded-3xl bg-white py-3 my-2`}>
      <Text style={tw`text-xl text-slate-500 p-2 pl-3 pt-1 font-semibold`}>天氣偏好設定</Text>
      <Divider width={1}/>
    </View>
  )
}

const styles = StyleSheet.create({})