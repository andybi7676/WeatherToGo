import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Marker, Callout } from 'react-native-maps'
import Rating from './Rating';
import tw from 'twrnc';
import { wrapString } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurIdx, selectPlacesCurIdx } from '../redux/explore/placesInfoSlice';

export default function CustomMarker({place, idx}) {
  // const [ idx, setIdx ] = useState(idx);
  const dispatch = useDispatch();
  const curIdx = useSelector(selectPlacesCurIdx);
  // const [ reload, setReload ] = useState(false);
  const markerRef = useRef();
  
  useEffect(() => {
    if (curIdx.value == idx) {
      markerRef.current.showCallout();
      // setReload(!reload);
    }
    else {
      markerRef.current.hideCallout();
    }
  }, [curIdx.value]);

  const onPressMarker = () => {
    dispatch(changeCurIdx({value: idx, source: "marker"}));
  }

  return (
    <Marker 
      ref={markerRef}
      key={idx}
      coordinate={place.coordinate}
      title={place.name}
      description={place.name}
      opacity={idx === curIdx.value ? 1.0 : 0.5}
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