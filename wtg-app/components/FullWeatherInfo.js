import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Skeleton, SocialIcon } from '@rneui/base'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { useSelector } from 'react-redux'
import { selectWeatherInfos } from '../redux/explore/placesWeatherInfoSlice'
import { getTime } from '../utils/time';
import WeatherIcon from './WeatherIcon';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
import { LineChart, BarChart } from 'react-native-chart-kit';

const MAX_FRAMES_IN_CARD = 8
const VALID_SIMPLIFIED_ELEMENTNAMES = ["天氣現象", "體感溫度", "時間", "12小時降雨機率"]
const chartConfig = {
  backgroundGradientFrom: "#d8e0ed",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#d8e0ed",
  backgroundGradientToOpacity: 0,
  propsForLabels: {
    fontSize: "11"
  },
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

  // propsForDots: {
  //   r: "6",
  //   strokeWidth: "2",
  //   stroke: "#ffa726"
  // }
};

export default function FullWeatherInfo({id}) {

  const [simpleWeatherInfo, setSimpleWeatherInfo] = useState({})
  const weatherInfo = useSelector(selectWeatherInfos)[id]
  
  useEffect(() => {
    if (weatherInfo.time.length <= 0) return;
    const elementLength = weatherInfo.time.length;
    const downsample_rate = Math.ceil(elementLength / 8);
    let newSimpleWeatherInfo = {
      elementLength: elementLength,
      ...weatherInfo,
      "降採時間": weatherInfo.time.filter((_, idx) => idx % downsample_rate === 0),
      "天氣現象": weatherInfo['天氣現象'].filter((_, idx) => idx % downsample_rate === 0),
    };
    newSimpleWeatherInfo.downsampledLength = newSimpleWeatherInfo["降採時間"].length;
    newSimpleWeatherInfo["shownDates"] = newSimpleWeatherInfo['降採時間'].map((secondTimeStamp, idx) => {
      const prevDate = idx === 0 ? {'date': 0} : getTime(newSimpleWeatherInfo['降採時間'][idx-1]*1000);
      const curDate = getTime(secondTimeStamp*1000);
      // console.log(`${curDate.month}/${curDate.date} ${curDate.timeString}`);
      if (curDate.date === prevDate.date) return "";
      else return `${curDate.month}/${curDate.date}`;
    })
    setSimpleWeatherInfo(newSimpleWeatherInfo);
  }, [weatherInfo])

  return <View style={tw`h-auto rounded-lg bg-slate-100 mt-1 pt-1 `}>
    <View style={tw`h-5 border-gray-500 flex flex-row justify-center `}>
      {
        simpleWeatherInfo["shownDates"]
        ?
        simpleWeatherInfo["shownDates"].map((dateRepr, idx) => {
          return <View key={idx} style={tw`basis-1/${simpleWeatherInfo.downsampledLength} h-5 justify-center`}>
            <Text style={tw`self-center text-slate-600 text-sm`}>{dateRepr}</Text>
          </View>
        })
        :
        null
      }
    </View>
    <View style={tw`h-5 border-black flex flex-row justify-center`}>
      {
        simpleWeatherInfo["降採時間"]
        ?
        simpleWeatherInfo["降採時間"].map((timeStamp, idx) => {
          return <View key={idx} style={tw`basis-1/${simpleWeatherInfo.downsampledLength} h-5 justify-center`}>
            <Text style={tw`self-center text-slate-600 text-sm`}>{getTime(timeStamp*1000).timeString.substring(0, 2)}</Text>
          </View>
        })
        :
        null
      }
    </View>
    <View style={tw`h-10 z-10 border-black flex flex-row justify-center`}>
      {
        simpleWeatherInfo["天氣現象"]
        ?
        simpleWeatherInfo["天氣現象"].map((weather, idx) => {
          const hours = getTime(simpleWeatherInfo["降採時間"][idx]*1000).hours
          //* <Text style={tw`self-center text-base`}>{weather}</Text> */}
          return <View key={idx} style={tw`basis-1/${simpleWeatherInfo.downsampledLength} h-10 justify-center`}>
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
    </View>
    <View style={tw`h-15 -mt-5 border-black flex flex-row justify-center pl-${8-simpleWeatherInfo.downsampledLength+3}`}>
      {
        simpleWeatherInfo["體感溫度"]
        ?
        <LineChart
          data={{
            labels: simpleWeatherInfo['時間'],
            datasets: [
              {
                data: simpleWeatherInfo['體感溫度'],
                color: (opacity = 1) => `rgba(20, 20, 20, ${opacity})`, // optional
                strokeWidth: 3, // optional
              }
            ], 
            // legend: ["體感溫度"] // optional
          }}
          width={screenWidth*0.85}
          height={50}
          chartConfig={{
            ...chartConfig, 
            fillShadowGradientFrom: "#ff1a1a", 
            fillShadowGradientFromOpacity: 1,
            fillShadowGradientTo: "#00cc00",
            fillShadowGradientToOpacity: 0.3,
          }}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          withDots={false}
          withInnerLines={false}
          style={{
            paddingRight:0
          }}
          bezier
        />
        // null
        :
        null
      }
    </View>
    <View style={tw`h-15 -mt-5 border-black flex flex-row justify-center pl-${8-simpleWeatherInfo.downsampledLength+3}`}>
      {
        simpleWeatherInfo["12小時降雨機率"]
        ?
        <LineChart
          data={{
            labels: simpleWeatherInfo['時間'],
            datasets: [
              {
                data: simpleWeatherInfo['12小時降雨機率'],
                // color: (opacity = 0) => `rgba(20, 20, 20, ${opacity})`, // optional
                strokeWidth: 0, // optional
              }
            ], 
            // legend: ["體感溫度"] // optional
          }}
          width={screenWidth*0.85}
          height={50}
          chartConfig={{
            ...chartConfig, 
            fillShadowGradientFrom: "#b3e6ff", 
            fillShadowGradientFromOpacity: 0.3,
            fillShadowGradientTo: "#b3e6ff",
            fillShadowGradientToOpacity: 1,
          }}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          withDots={false}
          withInnerLines={false}
          style={{
            paddingRight:0
          }}
        />
        // null
        :
        null
      }
    </View>
    {/* <View style={tw`h-15 -mt-4 border-black border-2 flex flex-row justify-center `}>
      {
        simpleWeatherInfo["12小時降雨機率"]
        ?
        <BarChart
          data={{
            labels: simpleWeatherInfo['time'],
            datasets: [
              {
                data: simpleWeatherInfo['12小時降雨機率'],
                // color: (opacity = 1) => `rgba(20, 20, 20, ${opacity})`, // optional
                // strokeWidth: 3, // optional
              }
            ], 
            // legend: ["體感溫度"] // optional
          }}
          width={screenWidth*0.9}
          height={50}
          chartConfig={{
            ...chartConfig, 
            color: (opacity = 1) => `rgba(20, 20, 20, ${opacity})`,
            fillShadowGradientFrom: "#3ec4ed", 
            fillShadowGradientFromOpacity: 1,
            fillShadowGradientTo: "#3ec4ed",
            fillShadowGradientToOpacity: 0.3,
          }}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          withDots={false}
          withInnerLines={false}
          style={{
            paddingRight:0
          }}
          bezier
        />
        // null
        :
        null
      }
    </View> */}
  </View>
}

const styles = StyleSheet.create({})