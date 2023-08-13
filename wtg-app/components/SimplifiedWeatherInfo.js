import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Skeleton, SocialIcon } from '@rneui/base'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { getTime } from '../utils/time'
import WeatherIcon from './WeatherIcon'

const VALID_SIMPLIFIED_ELEMENTNAMES = ["天氣預報綜合描述", "體感溫度", "降雨機率", "時間"]

export default function SimplifiedWeatherInfo({weatherInfo, loading=true}) {

  const [simpleWeatherInfo, setSimpleWeatherInfo] = useState({})
  
  useEffect(() => {
    let newSimpleWeatherInfo = {};
    weatherInfo.Elements.filter((element) => VALID_SIMPLIFIED_ELEMENTNAMES.includes(element.description)).map((element) => {
      if (element.description === "天氣預報綜合描述") {
        newSimpleWeatherInfo["天氣現象"] = element.Value.slice(0, 8).map((desc) => desc.split('。')[0])
      }
      else {
        newSimpleWeatherInfo[element.description] = element.Value.slice(0, 8);
      }
    });
    newSimpleWeatherInfo.length = newSimpleWeatherInfo['時間'].length;
    console.log("newSimpleWeatherInfo", newSimpleWeatherInfo)
    if (newSimpleWeatherInfo.length !== 0) {
      let prevDate = 0;
      newSimpleWeatherInfo["shownDates"] = newSimpleWeatherInfo['時間'].map((secondTimeStamp, idx) => {
        const prevDate = idx === 0 ? {'date': 0} : getTime(newSimpleWeatherInfo['時間'][idx-1]*1000);
        const curDate = getTime(secondTimeStamp*1000);
        if (curDate.date === prevDate.date) return "";
        else return `${curDate.month}/${curDate.date}`;
      })
    }
    console.log("newSimpleWeatherInfo", newSimpleWeatherInfo)
    setSimpleWeatherInfo(newSimpleWeatherInfo);
  }, [weatherInfo])

  return <View style={tw`h-40 rounded-lg bg-slate-100 mt-1 pt-1`}>
    <View style={tw`h-6 border-gray-500 flex flex-row justify-center `}>
      {
        simpleWeatherInfo["shownDates"]
        ?
        simpleWeatherInfo["shownDates"].map((dateRepr, idx) => {
          return <View key={idx} style={tw`basis-1/8 h-5 justify-center`}>
            <Text style={tw`self-center text-slate-600 text-sm`}>{dateRepr}</Text>
          </View>
        })
        :
        null
      }
    </View>
    <View style={tw`h-6 border-black flex flex-row justify-center`}>
      {
        simpleWeatherInfo["時間"]
        ?
        simpleWeatherInfo["時間"].map((timeStamp, idx) => {
          return <View key={idx} style={tw`basis-1/8 h-5 justify-center`}>
            <Text style={tw`self-center text-slate-600 text-sm`}>{getTime(timeStamp*1000).timeString.substring(0, 2)}</Text>
          </View>
        })
        :
        null
      }
    </View>
    <View style={tw`h-10 border-black flex flex-row justify-center`}>
      {
        simpleWeatherInfo["天氣現象"]
        ?
        simpleWeatherInfo["天氣現象"].map((weather, idx) => {
          const hours = getTime(simpleWeatherInfo["時間"][idx]*1000).hours
          //* <Text style={tw`self-center text-base`}>{weather}</Text> */}
          return <View key={idx} style={tw`basis-1/8 h-10 justify-center`}>
            <WeatherIcon 
              isDay={hours >= 6 && hours <= 18} 
              isClear={weather.includes("晴")} 
              isCloudy={weather.includes("雲")} 
              isFog={weather.includes("霧")} 
              isRainy={weather.includes("雨")}
              isThunder={weather.includes("雷")}
              isSnowing={weather.includes("雪")}
            />
          </View>
        })
        :
        null
      }
      {/* <View style={tw`basis-1/8 h-5 border border-black`}></View>
      <View style={tw`basis-1/8 h-5 border border-black`}></View>
      <View style={tw`basis-1/8 h-5 border border-black`}></View>
      <View style={tw`basis-1/8 h-5 border border-black`}></View>
      <View style={tw`basis-1/8 h-5 border border-black`}></View>
      <View style={tw`basis-1/8 h-5 border border-black`}></View>
      <View style={tw`basis-1/8 h-5 border border-black`}></View>
    <View style={tw`basis-1/8 h-5 border border-black`}></View> */}
    </View>
  </View>
}

const styles = StyleSheet.create({})