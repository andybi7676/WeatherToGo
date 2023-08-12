import { Text, View, SafeAreaView } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import tw from 'twrnc'

import { CustomMarker, MapCard, GooglePlaceInput } from '../components';

const defaultDelta = { "longitudeDelta": 0.007499, "latitudeDelta": 0.014845242592592591};
const defaultCoordinate = {"latitude": 25.034121609153654, "longitude": 121.56402111053467};
const initialRegion = { ...defaultCoordinate, ...defaultDelta };
const width = Dimensions.get('window').width;

const defaultIndex = 0;

const tmpPlaces = [
];

export default function ExploreScreen({ navigation }) {
  const [ places, setPlaces ] = useState(tmpPlaces);
  const [ coordinate, setCoordinate ] = useState(defaultCoordinate);
  const [ delta, setDelta ] = useState(defaultDelta);
  const [ index, setIndex ] = useState(defaultIndex);
  // const moving = useRef(false);
  const mapRef = useRef();
  const carouselRef = useRef();

  useEffect(() => {
    setIndex(defaultIndex);
    if (places.length > 0) {
      changeCurIdx(defaultIndex);
    }
  }, [places]);

  const changeCurIdx = (index, source="carousel") => {
    setIndex(index);
    console.log(index)
    const newRegion = getRegion(places[index].coordinate, delta)
    mapRef.current.animateToRegion(newRegion);
    if (source !== "carousel") {
      carouselRef.current.scrollTo({"index": index, "animated": false});
    }
  };

  const mapOnPress = ({coordinate, position, name=null}) => {
    console.log({coordinate, position, name});
  };

  const getRegion = (coordinate, delta) => {
    const newRegion = {
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: delta.latitudeDelta,
      longitudeDelta: delta.longitudeDelta,
    };
    return newRegion;
  };

  const setRegion = (reg) => {
    setCoordinate({ latitude: reg.latitude, longitude: reg.longitude });
    setDelta({latitudeDelta: reg.latitudeDelta, longitudeDelta: reg.longitudeDelta});
  };

  const changePlaces = (newPlaces) => {
    // console.log(newPlaces);
    setPlaces(newPlaces);
  };

  return <>
    <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        ref={mapRef}
        onPress={e => mapOnPress(e.nativeEvent)}
        onPoiClick={e => mapOnPress(e.nativeEvent)}
        onRegionChangeComplete={(reg) => setRegion(reg)}
      >
        {places.map((place, idx) => (
          <CustomMarker 
            key={idx}
            place={place}
            idx={idx}
            curIdx={index}
            changeCurIdx={changeCurIdx}
          />
        ))}
      </MapView>
      <View style={[tw`pt-8 bg-gray-100 w-full shadow-xl`]}>
        <Text style={[tw`text-center text-xl tracking-wide font-bold py-2 text-slate-600`]}>WeatherToGo</Text>
      </View>
      <SafeAreaView style={[tw`w-7/8 h-12 self-center m-4 mt-12 border-gray-400 border-2 rounded-full bg-white`, styles.input]} >
        <GooglePlaceInput coordinate={coordinate} delta={delta} changePlaces={changePlaces} />
      </SafeAreaView>
      <View style={[styles.carousel, tw`flex-row`]} >
        {
          places.length > 0 
          ?
          <Carousel
            layout={"default"}
            loop={false}
            ref={carouselRef}
            width={width}
            height={width*0.6}
            data={places}
            mode="parallax"
            pagingEnabled={true}
            scrollAnimationDuration={500}
            onSnapToItem={(index) => changeCurIdx(index)}
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
    </View>
  </>
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  title: {
    flex: 1,
    position: 'absolute',
    alignContent: 'stretch',
    top: 0, 
  },
  header: {
    alignContent: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 50, 
  },
  carousel: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    marginBottom: 4,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
