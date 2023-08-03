import { View, SafeAreaView } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
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
  // {
  //   id: 0,
  //   name: "Taipei 101",
  //   coordinate: {"latitude": 25.034121609153654, "longitude": 121.56402111053467},
  // },
  // {
  //   id: 1,
  //   name: "台灣大學",
  //   coordinate: {"latitude": 25.017340929015734, "longitude": 121.53975114226341},
  // },
  // {
  //   id: 2,
  //   name: "台灣師範大學",
  //   coordinate: {"latitude": 25.026088216219193, "longitude": 121.52754843235014},
  // },
  // {
  //   id: 3,
  //   name: "台科大",
  //   coordinate: {"latitude": 25.013258729371774, "longitude": 121.54056116938591},
  // }
];

export default function MapScreen() {
  const [ places, setPlaces ] = useState(tmpPlaces);
  const [ coordinate, setCoordinate ] = useState(defaultCoordinate);
  const [ delta, setDelta ] = useState(defaultDelta);
  const [ index, setIndex ] = useState(defaultIndex);
  const moving = useRef(false);
  const mapRef = useRef();
  const carouselRef = useRef();

  useEffect(() => {
    setIndex(defaultIndex);
    if (places.length > 0) {
      changeCurIdx(defaultIndex);
    }
  }, [places]);

  const changeCurIdx = (index) => {
    setIndex(index);
    console.log(index)
    moving.current = true;
    const newRegion = getRegion(places[index].coordinate, delta)
    mapRef.current.animateToRegion(newRegion);
    carouselRef.current.scrollTo({"index": index, "animated": false});
    setTimeout(() => {
      moving.current = false;
      setRegion({...coordinate, ...delta});
    }, 1000);
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
    if (moving.current) return;
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
      <SafeAreaView style={[tw`w-7/8 h-12 self-center m-4 mt-12 border-gray-400 border-2 rounded-full bg-white`, styles.input]} >
        <GooglePlaceInput coordinate={coordinate} delta={delta} changePlaces={changePlaces} />
      </SafeAreaView>
      <View style={styles.carousel} >
        {
          places.length > 0 
          ?
          <Carousel
            loop={false}
            ref={carouselRef}
            width={width}
            height={width*0.6}
            data={places}
            // onSnapToItem={(index) => {console.log('current index:', index)}}
            onScrollEnd={(index) => changeCurIdx(index)}
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
  map: {
    ...StyleSheet.absoluteFillObject
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0, 
  },
  carousel: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    marginBottom: 4,
  },
});
