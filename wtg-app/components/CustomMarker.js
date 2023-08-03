import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Marker } from 'react-native-maps'

export default function CustomMarker({place, idx, curIdx, changeCurIdx}) {
  // const [ idx, setIdx ] = useState(idx);
  const markerRef = useRef();
  
  useEffect(() => {
    if (curIdx == idx) {
      markerRef.current.showCallout();
    }
    else {
      markerRef.current.hideCallout();
    }
  }, [curIdx]);

  const onPressMarker = () => {
    changeCurIdx(idx);
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
    />
  )
}

const styles = StyleSheet.create({})