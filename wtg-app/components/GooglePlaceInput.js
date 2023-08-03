import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Icon } from '@rneui/themed';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP_API_KEY } from "@env"
import { useAPI } from '../hooks';
import tw from 'twrnc'

const LONGTITUDE_DELTA_METERS_RATIO = 111139

// console.log(GOOGLE_MAP_API_KEY);
const coordinateToLocationRepr = (coordinate) => {
  return `${coordinate.latitude},${coordinate.longitude}`
}

export default function GooglePlaceInput({ coordinate, delta, changePlaces }) {
  // console.log(coordinateToLocationRepr(coordinate));
  const [ prompt, setPrompt ] = useState("");
  const [ searchPlacesConn, searchPlaces ] = useAPI('json');

  const radius = delta.longitudeDelta * LONGTITUDE_DELTA_METERS_RATIO

  useEffect(() => {
    console.log(searchPlacesConn);
    if(searchPlacesConn.success) {
      console.log(`Get response: ${JSON.stringify(searchPlacesConn.response)}`);
      const results = searchPlacesConn.response.results
      // setEvents(connection.response || []);
      const newPlaces = results.map((res, idx) => {
        const newPlace = {
          "id": idx,
          "name": res.name,
          "coordinate": { "latitude": res.geometry.location.lat, "longitude": res.geometry.location.lng },
        };
        return newPlace;
      });
      changePlaces(newPlaces);
    }
  }, [searchPlacesConn]);

  const search = () => {
    const config = {
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinate.latitude}%2C${coordinate.longitude}&radius=${radius}&keyword=${prompt}&key=${GOOGLE_MAP_API_KEY}&language=zh-TW`,
      method: "GET",
      body: null,
      headers: {},
    };
    console.log(config);
    searchPlaces(
      config.url,
      config.method,
      config.body,
      config.headers,
    );
  };

  return <>
    <TextInput 
      style={[tw`w-7/8 h-full p-2`]}
      placeholder="Search"
      enterKeyHint='search'
      onChangeText={newText => setPrompt(newText)}
      onEndEditing={search}
    />
    {/* <Icon style={tw`w-1/8 bg-green-100 h-full`} color={"black"} name="search"/> */}
    <Icon color={"black"} name="search" onPress={() => console.log(prompt)}/>
  </>;
};

const styles = StyleSheet.create({})