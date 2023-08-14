import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Divider } from '@rneui/base'
import { FavoriteCard } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectPlaces } from '../redux/explore/placesInfoSlice';
import React from 'react'
import tw from 'twrnc'

export default function FavoriteScreen() {
  const favoritePlaces = useSelector(selectPlaces);
  console.log(favoritePlaces);

  return <>
    <View style={[tw`pt-8 shadow-lg`, styles.container]}>
      <Text style={[tw`text-center text-xl tracking-wide font-bold py-2 text-slate-600`, styles.header]}>WeatherToGo</Text>
    </View>
    <Text style={tw`bg-white text-lg p-2 font-semibold text-slate-500 text-center` }>我的最愛</Text>
    <ScrollView style={[tw`p-2`]}>
      {
        favoritePlaces.filter((place) => place.isFavorite === true).length > 0
        ?
        favoritePlaces.filter((place) => place.isFavorite === true).map((placeInfo, idx) => {
          return (
            <FavoriteCard
              index={idx}
              item={placeInfo}
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