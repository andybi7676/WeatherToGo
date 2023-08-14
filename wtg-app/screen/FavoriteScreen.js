import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Divider } from '@rneui/base'
import { FavoriteCard } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react'
import tw from 'twrnc'

export default function FavoriteScreen() {
  return <>
    <View style={[tw`pt-8`, styles.container]}>
      <Text style={[tw`text-center text-xl tracking-wide font-bold py-2 text-slate-600`, styles.header]}>WeatherToGo</Text>
    </View>
    <ScrollView style={[tw`p-2`]}>
      <View style={tw`flex rounded-3xl bg-white py-3 my-2 justify-center`}>
        <Text style={tw`text-xl text-slate-500 p-2 pl-3 pt-1 pb-0 font-semibold`}>選擇活動從事的時間</Text>
        {/* <Text style={tw`text-sm text-slate-400 pl-3 w-70`}>將根據選擇的時段進行天氣資訊的呈現與推薦</Text> */}
        <Divider/>
        <View style={tw`self-center justify-end h-26 p-2 pb-4`}>
          
        </View>
      </View>
      {

      }
    </ScrollView>
    
  </>
  
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'stretch'
  },
  header: {
    alignContent: "center"
  },
})