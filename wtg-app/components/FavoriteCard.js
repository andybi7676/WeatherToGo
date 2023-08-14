import { StyleSheet, Text, View, TouchableOpacity, Pressable, Dimensions } from 'react-native'
import { Skeleton } from '@rneui/themed';
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { useDispatch, useSelector } from 'react-redux';
import { updateOnePlace } from '../redux/explore/placesInfoSlice';
import { useAPI } from '../hooks';
import { DATA_SERVER_URL } from "@env"
import SimplifiedWeatherInfo from './SimplifiedWeatherInfo';
import { wrapString } from '../utils';

const window = Dimensions.get('window')

export default function FavoriteCard({ index, item }) {
  // const [ weatherInfo, setWeatherInfo ] = useState(null);
  // const item = useSelector((state) => state.placesInfo.places[index])

  return (
    <View style={[styles.card, tw`p-2 m-2 bg-white rounded-2xl border-gray-400 h-60 shadow-lg`]}>
      <TouchableOpacity >
        <View>
          <Text style={tw`text-base font-semibold`}>{wrapString(item.name, 20)}</Text>
        </View>
        <View style={tw`flex flex-row`}>
          <View style={tw`basis-1/3 flex-row p-1 h-8 `}>
            <Text >WTG: </Text>
            {
              item.weatherInfo
              ?
              <Text>Rating</Text>
              :
              <Skeleton animation="wave" style={tw`rounded-lg opacity-15 h-full w-15`} />
            }
          </View>
        </View>
        {
          item.weatherInfo
          ?
          <SimplifiedWeatherInfo weatherInfo={item.weatherInfo}/>
          :
          <Skeleton animation="wave" style={tw`h-40 rounded-lg opacity-15 mt-1`} />
        }
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