import { Text, View, SafeAreaView } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Dimensions } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { changeCurIdx, selectPlacesCurIdx, selectPlacesOrder } from '../redux/explore/placesMetaDataSlice';
import tw from 'twrnc'
import Carousel from 'react-native-reanimated-carousel';
import { CustomMarker, MapCard, GooglePlaceInput } from '../components';

const defaultDelta = { "longitudeDelta": 0.007499, "latitudeDelta": 0.014845242592592591};
const defaultCoordinate = {"latitude": 25.034121609153654, "longitude": 121.56402111053467};
const initialRegion = { ...defaultCoordinate, ...defaultDelta };
const width = Dimensions.get('window').width;

export default function ExploreScreen({ navigation }) {
  const dispatch = useDispatch();
  const placesOrder = useSelector(selectPlacesOrder);
  const placesCurIdx = useSelector(selectPlacesCurIdx);
  const [ coordinate, setCoordinate ] = useState(defaultCoordinate);
  const [ delta, setDelta ] = useState(defaultDelta);
  const mapRef = useRef();
  const carouselRef = useRef();

  useEffect(() => {
    if (placesCurIdx.value >= 0) {
      if (placesCurIdx.source !== 'marker') {
        changeMapCurIdx(placesCurIdx.value);
      }
      if (placesCurIdx.source !== 'carousel') {
        carouselRef.current.scrollTo({"index": placesCurIdx.value, "animated": false});
      }
    }
  }, [placesCurIdx]);

  const changeMapCurIdx = (index) => {
    const newRegion = getRegion(placesCurIdx.coordinate, delta)
    mapRef.current.animateToRegion(newRegion);
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
        {placesOrder.map((placeId, idx) => (
          <CustomMarker 
            key={`marker-${placeId}`}
            placeId={placeId}
            idx={idx}
          />
        ))}
      </MapView>
      <View style={[tw`pt-8 bg-gray-100 w-full shadow-xl`]}>
        <Text style={[tw`text-center text-xl tracking-wide font-bold py-2 text-slate-600`]}>WeatherToGo</Text>
      </View>
      <SafeAreaView style={[tw`w-7/8 h-12 self-center m-4 mt-12 border-gray-400 border-2 rounded-full bg-white`, styles.input]} >
        <GooglePlaceInput coordinate={coordinate} delta={delta} />
      </SafeAreaView>
      <View style={[styles.carousel, tw`flex-row`]} >
        {
          placesOrder.length > 0
          ?
          <Carousel
            layout={"default"}
            loop={false}
            ref={carouselRef}
            width={width}
            height={width*0.7}
            data={placesOrder}
            mode="parallax"
            pagingEnabled={true}
            scrollAnimationDuration={500}
            onSnapToItem={(index) => dispatch(changeCurIdx({value: index, source: 'carousel'}))}
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
            renderItem={({ item }) => <MapCard key={`${item}`} id={item} />}
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
    marginBottom: 2,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
