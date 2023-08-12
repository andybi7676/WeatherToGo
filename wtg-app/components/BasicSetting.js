import { StyleSheet, Text, ScrollView, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Divider, Icon } from '@rneui/base';
import React from 'react'
import tw from 'twrnc'
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const imageDir = "../assets/"
const eventTypes = {
  'order': ['日常', "登山", "潛水", "觀星", "衝浪", "跳傘"],
  '日常': {
    'src': require('../assets/casual.jpg'),
  },
  '登山': {
    'src': require('../assets/climbing.jpg'),
  },
  '潛水': {
    'src': require('../assets/diving.jpg'),
  },
  '觀星': {
    'src': require('../assets/staring.jpg'),
  },
  '衝浪': {
    'src': require('../assets/surfing.jpg'),
  },
  '跳傘': {
    'src': require('../assets/paragliding.jpg'),
  }
}

const weatherTypes = {
  'order': ['豔陽高照', '風和日麗', '涼爽乾燥', '溼冷有風'],
  '豔陽高照': {
    'src': require('../assets/sunny.jpg'),
  },
  '風和日麗': {
    'src': require('../assets/warm.jpg'),
  },
  '涼爽乾燥': {
    'src': require('../assets/cool.jpg'),
  },
  '溼冷有風': {
    'src': require('../assets/cloudy.jpg'),
  },
}

SEGMENT_MINUTES = 3 * 60
SEGMENT_MILLISECONDS = 3 * 60 * 60 * 1000

const getRoundedTimeStamp = () => {
  const now = new Date();
  const currentTimeStamp = Date.parse(now);
  const baseTimeStamp = Date.parse(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
  const currentRoundedTimeStamp = Math.floor((currentTimeStamp - baseTimeStamp)/ SEGMENT_MILLISECONDS) * SEGMENT_MILLISECONDS + baseTimeStamp;
  return currentRoundedTimeStamp;
}

const getSegTime = (currentValue, currentRoundedTimeStamp) => {
  const segDate = new Date(currentRoundedTimeStamp + SEGMENT_MILLISECONDS * currentValue)
  return {
    timeString: segDate.toTimeString(),
    year: segDate.getFullYear(),
    month: segDate.getMonth()+1,
    date: segDate.getDate(),
    hours: segDate.getHours(),
    minutes: segDate.getMinutes(),
  }
}

const TimeSliderMarkerLeft = ({segTime}) => {
  return <>
    <View style={tw`w-15 h-24 flex flex-col`}>
      <View style={tw`rounded-xl border-2 bg-slate-200 border-gray-500 basis-1/4 px-1`} >
        <Text style={tw`text-gray-500 self-center text-center font-semibold`}>{`${segTime.month}/${segTime.date}`}</Text>
      </View>
      <View style={tw`basis-1/2 justify-center`}>
        <Icon  name={'today'}/>
      </View>
      <Text style={tw`self-center text-sm text-gray-500 basis-1/4 bg-white font-semibold`}>{`${segTime.timeString.substring(0,5)}`}</Text>
    </View>
  </>
}

const TimeSliderMarkerRight = ({segTime}) => {
  return <>
    <View style={tw`w-15 h-24 flex flex-col`}>
      <View style={tw`rounded-xl border-2 bg-slate-200 border-gray-500 basis-1/4 px-1`} >
        <Text style={tw`text-gray-500 self-center text-center font-semibold`}>{`${segTime.month}/${segTime.date}`}</Text>
      </View>
      <View style={tw`basis-1/2 justify-center`}>
        <Icon  name={'today'}/>
      </View>
      <Text style={tw`self-center text-sm text-gray-500 basis-1/4 bg-white font-semibold`}>{`${segTime.timeString.substring(0,5)}`}</Text>
    </View>
  </>
}

export default function BasicSetting() {
  const currentRoundedTimeStamp = getRoundedTimeStamp();
  return (
    <ScrollView style={[tw`p-2`]}>
      <View style={tw`flex rounded-3xl bg-white py-3 my-2 justify-center`}>
        <Text style={tw`text-xl text-slate-500 p-2 pl-3 pt-1 pb-0 font-semibold`}>選擇活動從事的時間</Text>
        <Text style={tw`text-sm text-slate-400 pl-3 w-70`}>將根據選擇的時段進行天氣資訊的呈現與推薦</Text>
        <Divider/>
        <View style={tw`self-center justify-end h-26 p-2 pb-4`}>
          <MultiSlider
            values={[0, 55]}
            min={0}
            max={56}
            step={1}
            snapped={true}
            isMarkersSeparated={true}
            onValuesChangeFinish={(values) => console.log(values.map((val, _) => getSegTime(val, currentRoundedTimeStamp)))}
            customMarkerLeft={(e) => {
                return (<TimeSliderMarkerLeft
                  segTime={getSegTime(e.currentValue, currentRoundedTimeStamp)} />)
            }}
            customMarkerRight={(e) => {
                return (<TimeSliderMarkerRight
                  segTime={getSegTime(e.currentValue, currentRoundedTimeStamp)} />)
            }}
            showSteps={true}
            showStepLabels={true}
            stepsAs={[{index: 15, stepLabel: "hello", prefix: "", suffix: ""}]}
          />
        </View>
      </View>
      <View style={tw`rounded-3xl bg-white py-3 my-2`}>
        <Text style={tw`text-xl text-slate-500 p-2 pl-3 pt-1 pb-0 font-semibold`}>您想做什麼?</Text>
        <Text style={tw`text-sm text-slate-400 pl-3 w-70`}>將根據活動類型調整推薦排序設定以及所需天氣資訊</Text>
        <Divider />
        <View style={[tw`flex-row justify-center flex-wrap pt-4`]}>
          {
            eventTypes.order.map((eventName, idx) => {
              return (
                <TouchableOpacity style={tw`w-40 m-1 rounded-xl shadow-lg`} key={idx}>
                  <ImageBackground style={tw`h-40 flex-col-reverse`} imageStyle={tw` border-gray-200 rounded-xl opacity-100`} source={eventTypes[eventName].src} resizeMode="cover">
                    <Text style={[tw`m-2 text-lg text-white `, styles.textOnImage]}>{eventName}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              )
            })
          }        
        </View>
      </View>
      <View style={tw`rounded-3xl bg-white py-3 my-2`}>
        <Text style={tw`text-xl text-slate-500 p-2 pl-3 pt-1 pb-0 font-semibold`}>找不到活動?直接選擇想要的天氣</Text>
        <Text style={tw`text-sm text-slate-400 pl-3 w-80`}>將根據天氣型態調整推薦排序設定以及所需天氣資訊</Text>
        <Divider/>
        <View style={[tw`flex-row justify-center flex-wrap pt-4`]}>
          {
            weatherTypes.order.map((weatherName, idx) => {
              return (
                <TouchableOpacity style={tw`w-40 m-1 rounded-xl shadow-lg`} key={idx}>
                  <ImageBackground style={tw`h-40 flex-col-reverse`} imageStyle={tw` border-gray-200 rounded-xl opacity-100`} source={weatherTypes[weatherName].src} resizeMode="cover">
                    <Text style={[tw`m-2 text-lg text-white `, styles.textOnImage]}>{weatherName}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              )
            })
          }        
        </View>
      </View>
      <Divider style={tw`p-2 opacity-0`} width={1}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  textOnImage: {
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 12
  }
})