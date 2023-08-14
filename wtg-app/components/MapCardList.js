import { StyleSheet, Dimensions } from 'react-native'
import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';
import MapCard from './MapCard'
import tw from 'twrnc'
import { selectPlacesInfo, changeCurIdx } from '../redux/explore/placesMetaDataSlice';

const width = Dimensions.get('window').width;

export default function MapCardList() {
  const placesInfo = useSelector(selectPlacesInfo);
  const dispatch = useDispatch();
  const carouselRef = useRef();
  console.log(placesInfo);

  return (
    <View style={[styles.carousel, tw`flex-row`]} >
      {
        placesInfo.places.length > 0
        ?
        <Carousel
          layout={"default"}
          loop={false}
          ref={carouselRef}
          width={width}
          height={width*0.6}
          data={placesInfo.places}
          mode="parallax"
          pagingEnabled={true}
          scrollAnimationDuration={500}
          onSnapToItem={(index) => dispatch(changeCurIdx({value: index, source: 'carousel'}))}
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          renderItem={({ item }) => <MapCard item={item} />}
        />
        :
        null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    marginBottom: 4,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})