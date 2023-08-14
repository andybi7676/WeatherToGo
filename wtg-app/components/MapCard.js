import { StyleSheet, Text, View, TouchableOpacity, Pressable, Dimensions } from 'react-native'
import { Skeleton, Icon, Button } from '@rneui/themed';
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { useDispatch, useSelector } from 'react-redux';
import { updateOnePlace, toggleOneFavorite } from '../redux/explore/placesInfoSlice';
import { useAPI } from '../hooks';
import { DATA_SERVER_URL } from "@env"
import SimplifiedWeatherInfo from './SimplifiedWeatherInfo';
import { wrapString } from '../utils';

const window = Dimensions.get('window')

export default function MapCard({ index }) {
  const [ weatherInfoConn, getWeatherInfo ] = useAPI('json');
  // const [ weatherInfo, setWeatherInfo ] = useState(null);
  const dispatch = useDispatch();
  const item = useSelector((state) => state.placesInfo.places[index]);

  useEffect(() => {
    if (weatherInfoConn.isInit() || (item.weatherInfoLoaded === false && weatherInfoConn.loading === false)) {
      console.log(`index ${item.index} loading, item.weatherInfoLoaded=${item.weatherInfoLoaded}`)
      getWeatherInfo(
        `${DATA_SERVER_URL}/get_weather`,
        "POST",
        JSON.stringify({
          'location': {
            'lat': item.coordinate.latitude,
            'lon': item.coordinate.longitude,
          }
        }),
        {"Content-Type": "application/json"},
      );
    }
    if(weatherInfoConn.success && item.weatherInfoLoaded === false) {
      const result = weatherInfoConn.response.weather || null;
      if (result !== null) {
        console.log(result.Elements.filter((e) => e.description=="時間")[0].Value.length)
      }
      
      dispatch(updateOnePlace({index, newPlace: {...item, weatherInfo: result, weatherInfoLoaded: true}}));
      // console.log(result);
      // setWeatherInfo(result);
      // console.log(weatherInfoConn);
    }
  }, [weatherInfoConn, item.weatherInfoLoaded]);

  return (
    <View style={[styles.card, tw`p-2 m-2 bg-white rounded-2xl border-gray-400 h-60 shadow-lg`]}>
      <TouchableOpacity >
        <View style={tw`flex flex-row`}>
          <Text style={tw`text-base font-semibold basis-3/4`}>{wrapString(item.name, 15)}</Text>
          <View style={tw`basis-1/4 -mb-10 flex-row justify-end p-2 pt-1`}>
            <Button radius={"sm"} type="clear" onPress={() => dispatch(toggleOneFavorite(item.index))}>
              {
                item.isFavorite === true
                ?
                <Icon name="close" type="font-awesome" size={30}/>
                
                :
                <Icon name="plus" type="font-awesome" size={30}/>
              }
            </Button>
          </View>
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