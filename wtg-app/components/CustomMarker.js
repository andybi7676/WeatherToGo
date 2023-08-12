import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Marker, Callout } from 'react-native-maps'
import Rating from './Rating';
import tw from 'twrnc';
import { wrapString } from '../utils';

export default function CustomMarker({place, idx, curIdx, changeCurIdx}) {
  // const [ idx, setIdx ] = useState(idx);
  const [ reload, setReload ] = useState(false);
  const markerRef = useRef();
  
  useEffect(() => {
    if (curIdx == idx) {
      markerRef.current.showCallout();
      setReload(!reload);
    }
    else {
      markerRef.current.hideCallout();
    }
  }, [curIdx]);

  const onPressMarker = () => {
    changeCurIdx(idx, source="marker");
  }

  return (
    <Marker 
      ref={markerRef}
      key={idx}
      coordinate={place.coordinate}
      title={place.name}
      description={place.name}
      opacity={idx === curIdx ? 1.0 : 0.5}
      onPress={onPressMarker}
    >
      <Callout style={[styles.callout]}>
        <Text style={tw`font-semibold`}>{wrapString(place.name)}</Text>
        <Rating rating={place.rating}/>
      </Callout>
    </Marker>
  )
}

const styles = StyleSheet.create({
  callout: {
    alignItems: "center"
  }
})