import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Skeleton, SocialIcon } from '@rneui/base'
import React from 'react'
import tw from 'twrnc'

export default function SimplifiedWeatherInfo({weatherInfo, loading=true}) {
  

  return <>
    <View style={tw`h-32 border-2 border-black flex flex-row`}>
      <Text>WeatherInfo</Text>
      <Text>WeatherInfo</Text>
      <Text>WeatherInfo</Text>
      <Text>WeatherInfo</Text>
      <Text>WeatherInfo</Text>
      <Text>WeatherInfo</Text>
    </View>
  </>
}

const styles = StyleSheet.create({})