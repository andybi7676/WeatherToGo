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
import { getCIBG } from '../utils/config'

const MAX_FRAMES_IN_CARD = 8
const VALID_SIMPLIFIED_ELEMENTNAMES = ["天氣現象", "體感溫度", "時間", "降雨機率"]
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

export default function FullWeatherInfo({id, startIdx=0}) {

  const [simpleWeatherInfo, setSimpleWeatherInfo] = useState({})
  const weatherInfo = useSelector(selectWeatherInfos)[id]
  console.log(startIdx)

  useEffect(() => {
    if (weatherInfo.time.length <= 0) return;
    const elementLength = weatherInfo.time.length;
    let slicedWeatherInfo = {}
    if (startIdx < elementLength) {
      for (const [key, value] of Object.entries(weatherInfo)) {
        if (value.length !== undefined) {
          slicedWeatherInfo[key] = value.slice(startIdx, startIdx+MAX_FRAMES_IN_CARD);
        }
      }
    }
    console.log(slicedWeatherInfo)
    const downsample_rate = Math.ceil(slicedWeatherInfo.time.length / MAX_FRAMES_IN_CARD);
    let newSimpleWeatherInfo = {
      elementLength: slicedWeatherInfo.time.length,
      ...slicedWeatherInfo,
      "降採時間": slicedWeatherInfo.time.filter((_, idx) => idx % downsample_rate === 0),
      "天氣現象": slicedWeatherInfo['天氣現象'].filter((_, idx) => idx % downsample_rate === 0),
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
  }, [weatherInfo, startIdx])

  return <View style={tw`h-auto rounded-lg bg-slate-100 mt-1 p-1`}>
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
    <View style={tw`h-10 z-10 flex flex-row justify-center`}>
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
    <View style={tw`h-15 -mt-5 border-slate-300 flex flex-row justify-center pl-${8-simpleWeatherInfo.downsampledLength+3}`}>
      {
        simpleWeatherInfo["體感溫度"]
        ?
        <LineChart
          data={{
            labels: simpleWeatherInfo['time'],
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
    {
      simpleWeatherInfo["降雨機率"]
      ?
      <View style={tw`h-15 -mt-6 -mb-2 border-slate-200 flex flex-row justify-center pl-${8-simpleWeatherInfo.downsampledLength+3}`}>
        <LineChart
          data={{
            labels: simpleWeatherInfo['time'],
            datasets: [
              {
                data: simpleWeatherInfo['降雨機率'],
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
      </View>
      :
      null
    }
    {
      simpleWeatherInfo["風速"]
      ?
      <View style={tw`h-15 -mt-3 -mb-2 border-slate-300 flex flex-row justify-center pl-${8-simpleWeatherInfo.downsampledLength+3}`}>
        <LineChart
          data={{
            labels: simpleWeatherInfo['time'],
            datasets: [
              {
                data: simpleWeatherInfo['風速'],
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
            fillShadowGradientFrom: "#94b8b8", 
            fillShadowGradientFromOpacity: 1,
            fillShadowGradientTo: "#94b8b8",
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
      </View>
      :
      null
    }
    {
      simpleWeatherInfo["流速"]
      ?
      <View style={tw`h-15 -mt-5 border-black flex flex-row justify-center pl-${8-simpleWeatherInfo.downsampledLength+3}`}>
        <LineChart
          data={{
            labels: simpleWeatherInfo['time'],
            datasets: [
              {
                data: simpleWeatherInfo['流速'],
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
            fillShadowGradientFrom: "#94b8b8", 
            fillShadowGradientFromOpacity: 1,
            fillShadowGradientTo: "#94b8b8",
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
      </View>
      :
      null
    }
    {
      simpleWeatherInfo["浪高"]
      ?
      <View style={tw`h-15 -mt-5 border-black flex flex-row justify-center pl-${8-simpleWeatherInfo.downsampledLength+3}`}>
        <LineChart
          data={{
            labels: simpleWeatherInfo['time'],
            datasets: [
              {
                data: simpleWeatherInfo['浪高'],
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
            fillShadowGradientFrom: "#94b8b8", 
            fillShadowGradientFromOpacity: 1,
            fillShadowGradientTo: "#94b8b8",
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
      </View>
      :
      null
    }
    {
      simpleWeatherInfo["舒適度指數"]
      ?
      <View style={tw`h-10 z-10 py-1 border-black flex flex-row justify-center opacity-70`}>
        {
          simpleWeatherInfo["舒適度指數"].map((ci, idx) => {
            //* <Text style={tw`self-center text-base`}>{weather}</Text> */}
            return <View key={idx} style={[tw`basis-1/${simpleWeatherInfo.downsampledLength} h-9 justify-center`, {backgroundColor: getCIBG(ci)}]}>
              
            </View>
          })
        }
      </View>
      :
      null
    }
    <View style={tw`h-15 -mt-2 -mb-1 border-black flex flex-row justify-center pl-${8-simpleWeatherInfo.downsampledLength+3}`}>
      {
        simpleWeatherInfo["紫外線指數"]
        ?
        <LineChart
          data={{
            labels: simpleWeatherInfo['time'],
            datasets: [
              {
                data: simpleWeatherInfo['紫外線指數'],
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
            fillShadowGradientFrom: "#bf80ff", 
            fillShadowGradientFromOpacity: 1,
            fillShadowGradientTo: "#bf80ff",
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
  </View>
}

const styles = StyleSheet.create({})