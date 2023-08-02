import { View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useRef, useState } from 'react'
import { StyleSheet } from 'react-native';
import tw from 'twrnc'

import { MapCardList } from '../components';

const defaultDelta = { "longitudeDelta": 0.007499, "latitudeDelta": 0.014845242592592591};
const defaultCoordinate = {"latitude": 25.034121609153654, "longitude": 121.56402111053467};
const initialRegion = { ...defaultCoordinate, ...defaultDelta };

const defaultIndex = 0;

const tmpData = [
  {
    id: 0,
    name: "Taipei 101",
    region: {"latitude": 25.034121609153654, "longitude": 121.56402111053467},
  },
  {
    id: 1,
    name: "台灣大學",
    region: {"latitude": 25.017340929015734, "longitude": 121.53975114226341},
  },
  {
    id: 2,
    name: "台灣師範大學",
    region: {"latitude": 25.026088216219193, "longitude": 121.52754843235014},
  },
  {
    id: 3,
    name: "台科大",
    region: {"latitude": 25.013258729371774, "longitude": 121.54056116938591},
  }
];

export default function MapScreen() {
  const [ coordinate, setCoordinate ] = useState(defaultCoordinate);
  const [ delta, setDelta ] = useState(defaultDelta);
  const [ index, setIndex ] = useState(defaultIndex);
  const moving = useRef(false);
  const mapRef = useRef();

  const changeCurIdx = (index) => {
    setIndex(index);
    moving.current = true;
    const newRegion = getRegion(tmpData[index].region, delta)
    mapRef.current.animateToRegion(newRegion);
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
      />
      <View style={styles.carousel} >
        {
          tmpData.length > 0 
          ?
          <MapCardList data={tmpData} curIdx={index} changeCurIdx={changeCurIdx}></MapCardList>
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
  carousel: {
    position: 'absolute',
    bottom: 0,
    // marginBottom: 48
  },
});
