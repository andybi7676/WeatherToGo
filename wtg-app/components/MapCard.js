import { StyleSheet, Text, View, TouchableOpacity, Pressable, Dimensions } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const window = Dimensions.get('window')

export default function MapCard({ item, pressed }) {
  return (
    <TouchableOpacity style={[tw`p-2 m-2 bg-white rounded-2xl border-gray-400 border-2`]} >
      <View style={styles.card} onTouchEnd={() => console.log("Pressed")}>
        <Text style={tw`text-base font-semibold`}>This is {item.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: window.width*0.75,
    height: window.height*0.25,
  }
})