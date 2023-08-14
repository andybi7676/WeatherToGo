import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changePlaces, deleteAllPlaces, selectPlaces, selectPlacesOrder } from '../redux/explore/placesMetaDataSlice';
import { Icon } from '@rneui/themed';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP_API_KEY } from "@env"
import { useAPI } from '../hooks';
import tw from 'twrnc'

const MAX_PLACES = 10
const LONGTITUDE_DELTA_METERS_RATIO = 111139

export default function GooglePlaceInput({ coordinate, delta }) {
  const dispatch = useDispatch();
  const placesOrder = useSelector(selectPlacesOrder);
  const places = useSelector(selectPlaces)
  // console.log(coordinateToLocationRepr(coordinate));
  const [ prompt, setPrompt ] = useState("");
  const [ searchPlacesConn, searchPlaces, searchPlacesConnInit ] = useAPI('json');

  const radius = delta.longitudeDelta * LONGTITUDE_DELTA_METERS_RATIO

  useEffect(() => {
    if(searchPlacesConn.success) {
      // console.log(`Get response: ${JSON.stringify(searchPlacesConn.response)}`);
      const results = searchPlacesConn.response.results || [];
      const favoriteIds = placesOrder.filter((id) => {
        console.log(`${id}, ${places[id]}`)
        return places[id].isFavorite === true
      })
      // setEvents(connection.response || []);
      let newPlaces = {}
      const newIds = results.slice(0, MAX_PLACES-favoriteIds.length).map((res, idx) => {
        const id = `${res.geometry.location.lat}-${res.geometry.location.lng}-${res.name}`
        const newPlace = {
          "id": id,
          "index": idx + favoriteIds.length,
          "name": res.name,
          "coordinate": { "latitude": res.geometry.location.lat, "longitude": res.geometry.location.lng },
          "google_rating": res.rating,
          "google_map_link": `https://www.google.com/maps/place/?q=place_id:${res.place_id}`,
          "rating": rating = Math.round(Math.random() * 4 + 1),
          "weatherInfoLoaded": false,
          "isFavorite": false
        };
        newPlaces[id] = newPlace;
        return id
      });
      dispatch(changePlaces({favoriteIds, newIds, newPlaces}));
      searchPlacesConnInit();
    }
  }, [searchPlacesConn]);

  const search = () => {
    // dispatch(deleteAllPlaces());
    const config = {
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinate.latitude}%2C${coordinate.longitude}&radius=${radius}&keyword=${prompt}&key=${GOOGLE_MAP_API_KEY}&language=zh-TW`,
      method: "GET",
      body: null,
      headers: {},
    };
    // console.log(config);
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
      inlineImageLeft='search_icon'
      placeholder="輸入目的地查看天氣資訊"
      enterKeyHint='search'
      onChangeText={newText => setPrompt(newText)}
      onEndEditing={search}
    />
    {/* <Icon style={tw`w-1/8 bg-green-100 h-full`} color={"black"} name="search"/> */}
    <Icon color={"black"} name="tune" onPress={() => console.log("Settings")}/>
  </>;
};

const styles = StyleSheet.create({})