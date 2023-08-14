import { StyleSheet, View, Text, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { WeatherInfoSetting, WeatherPreferenceSetting, BasicSetting } from '../components'

const TopTab = createMaterialTopTabNavigator();

const AdvancedSetting = () => {
  return (
    <ScrollView style={[tw`border-black p-2`]}>
      <WeatherInfoSetting />
      <WeatherPreferenceSetting />
    </ScrollView>
  );
}

export default function SettingsScreen() {

  return <>
    <View style={[tw`pt-6`, styles.container]}>
      {/* <Text style={[tw`text-center text-xl tracking-wide font-bold py-2 text-slate-600`, styles.header]}>WeatherToGo</Text> */}
      <ImageBackground style={tw`w-36 h-14 self-center`} imageStyle={[tw`rounded-lg`]} source={require("../assets/wtg/weathertogo_k.png")} resizeMode="contain" />
    </View>
    <TopTab.Navigator 
      initialRouteName="Basic" 
      screenOptions={{
        swipeEnabled: false,
      }}>
      <TopTab.Screen name="Basic" component={BasicSetting} />
      <TopTab.Screen name="Advanced" component={AdvancedSetting} />
    </TopTab.Navigator>
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