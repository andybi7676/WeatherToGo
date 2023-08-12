import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRandom } from '../hooks'
import { Icon } from '@rneui/themed';
import tw from 'twrnc'

const starName = "star"
const starHalfName = "star_half"
const starColor = "yellow"
const nullColor = "rgba(0, 0, 0, 0)"

export default function Rating({ rating=null }) {
  // const [ randVal, nextRandomVal ] = useRandom(0, 5, true);
  if (rating === null) {
    rating = Math.round(Math.random() * 4 + 1)
  }
  // console.log(starArr);

  return <>
    <View style={tw`flex flex-row `}>
      <View style={tw`basis-1/5`}>
        <Icon name={starName} color={rating >= 1 ? starColor : nullColor} style={tw``}></Icon>
      </View>
      <View style={tw`basis-1/5`}>
        <Icon name={starName} color={rating >= 2 ? starColor : nullColor} style={tw``}></Icon>
      </View>
      <View style={tw`basis-1/5`}>
        <Icon name={starName} color={rating >= 3 ? starColor : nullColor} style={tw``}></Icon>
      </View>
      <View style={tw`basis-1/5`}>
        <Icon name={starName} color={rating >= 4 ? starColor : nullColor} style={tw``}></Icon>
      </View>
      <View style={tw`basis-1/5`}>
        <Icon name={starName} color={rating >= 5 ? starColor : nullColor} style={tw``}></Icon>
      </View>
    </View>
  </>
}

const styles = StyleSheet.create({
  starView: {
    alignItems: "center",
    flexDirection: "row"
  }
})