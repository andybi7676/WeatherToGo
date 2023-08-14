import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { Divider, Icon } from '@rneui/base'
import { FavoriteCard } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectPlacesOrder } from '../redux/explore/placesMetaDataSlice';
import { selectWeatherToGoSetting } from '../redux/settings/weatherToGoSettingSlice';
import React, { useState } from 'react'
import tw from 'twrnc'
import { chosenTypeToWeatherNames, weatherNameToLogo } from '../utils/config';

const MAX_SEG_PER_PAGE = 8

export default function FavoriteScreen() {
  const placesOrder = useSelector(selectPlacesOrder);
  const wtgSetting = useSelector(selectWeatherToGoSetting);
  const [startTime, setTimeSegment] = useState(wtgSetting.startTime);
  const weatherNames = chosenTypeToWeatherNames[wtgSetting.chosenType];
  console.log(weatherNames);

  return <>
    <View style={[tw`pt-8 shadow-lg`, styles.container]}>
      <Text style={[tw`text-center text-xl tracking-wide font-bold py-2 text-slate-600`, styles.header]}>WeatherToGo</Text>
    </View>
    <Text style={tw`bg-white text-lg p-2 font-semibold text-slate-500 text-center`}>收藏</Text>
    <View style={tw`bg-white text-lg mt-2 font-semibold text-slate-500 text-center flex flex-row justify-center` }>
      <TouchableOpacity>
        <Icon size={50} name='arrow-left' color="grey"/>
      </TouchableOpacity>
      <Text style={tw`bg-white basis-1/3 text-lg font-semibold text-slate-500 border-black self-center text-center mx-2`}>
        時間軸
      </Text>
      <TouchableOpacity>
        <Icon  size={50} name='arrow-right' color="grey"/>
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