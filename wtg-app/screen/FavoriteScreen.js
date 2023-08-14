import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import { Divider, Icon } from '@rneui/base'
import { FavoriteCard } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectPlacesOrder } from '../redux/explore/placesMetaDataSlice';
import { selectWeatherInfos } from '../redux/explore/placesWeatherInfoSlice';
import { selectWeatherToGoSetting } from '../redux/settings/weatherToGoSettingSlice';
import React, { useState, useEffect } from 'react'
import tw from 'twrnc'
import { chosenTypeToWeatherNames } from '../utils/config';

const MAX_SEG_PER_PAGE = 8

export default function FavoriteScreen() {
  const placesOrder = useSelector(selectPlacesOrder);
  const weatherInfos = useSelector(selectWeatherInfos);
  
  useEffect(() => {
    for (const [key, value] of Object.entries(weatherInfos)) {
      if (value.time !== undefined) {
        setCurDataLength(value.time.length);
        if (startIdx >= value.time.length) {
          setStartIdx(0);
        }
        console.log(value.time.length);
      }
      break
    }
  }, [weatherInfos])
  
  const wtgSetting = useSelector(selectWeatherToGoSetting);
  const [startIdx, setStartIdx] = useState(0);
  const [curDataLength, setCurDataLength] = useState(0);
  const weatherNames = chosenTypeToWeatherNames[wtgSetting.chosenType];

  const changePage = (delta) => {
    const nxtVal = startIdx + delta;
    if (nxtVal >= 0 && nxtVal < curDataLength) {
      setStartIdx(nxtVal);
      console.log(nxtVal);
    }
  }

  return <>
    <View style={[tw`pt-6 shadow-lg`, styles.container]}>
      {/* <Text style={[tw`text-center text-xl tracking-wide font-bold py-2 text-slate-600`, styles.header]}>WeatherToGo</Text> */}
      <ImageBackground style={tw`w-36 h-14 self-center`} imageStyle={[tw`rounded-lg`]} source={require("../assets/wtg/weathertogo_k.png")} resizeMode="contain" />
    </View>
    {/* <Text style={tw`bg-white text-lg p-2 font-semibold text-slate-500 text-center`}>收藏</Text> */}
    <View style={tw`bg-white text-lg font-semibold text-slate-500 text-center flex flex-row justify-center` }>
      <TouchableOpacity onPress={() => changePage(-MAX_SEG_PER_PAGE)}>
        <Icon size={50} name='arrow-left' color="grey"/>
      </TouchableOpacity>
      <Text style={tw`bg-white basis-1/3 text-lg font-semibold text-slate-500 border-black self-center text-center mx-2`}>
        時間軸
      </Text>
      <TouchableOpacity onPress={() => changePage(MAX_SEG_PER_PAGE)}>
        <Icon size={50} name='arrow-right' color="grey"/>
      </TouchableOpacity>
    </View>
    <ScrollView style={[tw`pt-1`]}>
      {
        placesOrder.length > 0
        ?
        placesOrder.map((id, idx) => {
          return (
            <FavoriteCard
              key={`favoriteCard-${id}-${idx}`}
              id={id}
              weatherNames={weatherNames}
              startIdx={startIdx}
            />
          )
        })
        :
        null
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