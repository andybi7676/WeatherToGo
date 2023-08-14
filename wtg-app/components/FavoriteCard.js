import { StyleSheet, Text, View, TouchableOpacity, Pressable, Dimensions } from 'react-native'
import { Skeleton, Icon, Button } from '@rneui/themed';
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { useDispatch, useSelector } from 'react-redux';
import { updateOnePlace, toggleOneFavorite } from '../redux/explore/placesMetaDataSlice';
import { updateOneWeatherInfo } from '../redux/explore/placesWeatherInfoSlice';
import { useAPI } from '../hooks';
import { DATA_SERVER_URL } from "@env"
import SimplifiedWeatherInfo from './SimplifiedWeatherInfo';
import { wrapString } from '../utils';

const window = Dimensions.get('window')

export default function FavoriteCard({ id }) {
  // const [ weatherInfo, setWeatherInfo ] = useState(null);
  const dispatch = useDispatch();
  const item = useSelector(state => state.placesMetaData.places[id]);
  // console.log(id, item);

  return <>
    {
      item.isFavorite 
      ?
      <View style={[styles.card, tw`p-2 m-2 bg-white rounded-2xl border-gray-400 h-60 shadow-lg`]}>
        <TouchableOpacity >
          <View style={tw`flex flex-row`}>
            <Text style={tw`text-base font-semibold basis-3/4`}>{wrapString(item.name, 15)}</Text>
            <View style={tw`basis-1/4 -mb-6 flex-row justify-end p-2 pt-1`}>
              <TouchableOpacity style={tw`border-black`} onPress={() => dispatch(toggleOneFavorite(item.id))}>
                {
                  item.isFavorite === true
                  ?
                  <Icon name="favorite" color='#f059ca' size={36}/>
                  :
                  <Icon name="favorite-border" color='#f059ca' size={36}/>
                }
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw`flex flex-row`}>
            <View style={tw`basis-1/3 flex-row p-1 h-8 `}>
              <Text >WTG: </Text>
              {
                item.weatherInfoLoaded
                ?
                <Text>{wrapString(`${item.rating}`, 3, "")}</Text>
                :
                <Skeleton animation="wave" style={tw`rounded-lg opacity-15 h-full w-15`} />
              }
            </View>
          </View>
          {
            item.weatherInfoLoaded
            ?
            <SimplifiedWeatherInfo id={item.id}/>
            // <Skeleton animation="wave" style={tw`h-40 rounded-lg opacity-15 mt-1`} />
            :
            <Skeleton animation="wave" style={tw`h-40 rounded-lg opacity-15 mt-1`} />
          }
        </TouchableOpacity>
      </View>
      :
      null
    }
  </>
}

const styles = StyleSheet.create({
  card: {
    // width: window.width*0.75,
    height: window.height*0.25,
  }
})