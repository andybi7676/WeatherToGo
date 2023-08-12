import { StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/base';
import { chooseType } from '../redux/settings/weatherToGoSettingSlice';
import { useDispatch } from 'react-redux';
import tw from 'twrnc'

export default function BasicSettingCard({selected, name, src}) {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity style={[tw`w-40 m-1 rounded-xl shadow-md`, selected ? tw`border border-slate-500 shadow-none` : null]} onPress={() => dispatch(chooseType(name))}>
      <ImageBackground style={tw`h-40 flex-col-reverse`} imageStyle={[tw`border-gray-200 rounded-lg`, selected ? styles.imageSelected : null]} source={src} resizeMode="cover">
        <Text style={[tw`m-2 text-lg text-white`, selected ? tw`text-slate-800 font-semibold` : styles.textOnImage]}>{name}</Text>
        {
          selected 
          ?
          <Icon name='check' size={50} color='rgb(30 41 59)'/>
          :
          null
        }
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  textOnImage: {
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 12
  },
  imageSelected: {
    opacity: 0.45
  }
})