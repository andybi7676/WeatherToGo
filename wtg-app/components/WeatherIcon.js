import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { weatherToImgSrc } from '../utils/config'

const getImageSource = ({isDay, isClear, isCloudy, isFog, isRainy, isThunder, isSnowing}) => {
  let weatherState = "clear"
  if (isCloudy) weatherState = "cloudy"
  if (isFog) {
    weatherState = "fog"
    if (isCloudy) weatherState = "cloudy-fog"
  }
  if (isRainy) {
    weatherState = "partially-clear-with-rain"
    if (isThunder) weatherState = "thunderstorm"
  }
  if (isSnowing) weatherState = "snowing"
  weatherState = isDay ? `day-${weatherState}` : `night-${weatherState}`
  return weatherState;
}

export default function WeatherIcon({isDay, isClear, isCloudy, isFog, isRainy, isThunder, isSnowing}) {
  const imgSrc = weatherToImgSrc[getImageSource({isDay, isClear, isCloudy, isFog, isRainy, isThunder, isSnowing})];

  return (
    <View style={[tw`w-10 h-10 rounded-xl flex flex-row justify-center p-1`]}>
      <ImageBackground style={tw`h-7 w-7`} imageStyle={[tw`rounded-lg`]} source={imgSrc} resizeMode="contain">
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({})