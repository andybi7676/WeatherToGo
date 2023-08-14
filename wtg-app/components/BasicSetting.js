import { StyleSheet, Text, ScrollView, View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { Divider, Icon, SocialIcon } from '@rneui/base';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { chooseType, setTime, selectWeatherToGoSetting } from '../redux/settings/weatherToGoSettingSlice';
import { deleteAllPlaces, reloadAllPlaces } from '../redux/explore/placesMetaDataSlice';
import { SEGMENT_MILLISECONDS, getRoundedTimeStamp, getSegTime } from '../utils/time';
import { eventTypes, weatherTypes } from '../utils/config';
import { useAPI } from '../hooks';
import { DATA_SERVER_URL } from '@env'

import BasicSettingCard from './BasicSettingCard';
const window = Dimensions.get('window');

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

MIN_SEG_VAL = 0
MAX_SEG_VAL = 55

export default function BasicSetting() {
  const [currentRoundedTimeStamp, _] = useState(getRoundedTimeStamp());
  const dispatch = useDispatch();
  const weatherToGoSetting = useSelector(selectWeatherToGoSetting);
  const [postBasicSettingConn, postBasicSetting] = useAPI('json');
  const [ needReloaded, setNeedReloaded ] = useState(false);
  
  useEffect(() => {
    if (postBasicSettingConn.isInit()) {
      dispatch(setTime({startTime: currentRoundedTimeStamp, endTime: currentRoundedTimeStamp+SEGMENT_MILLISECONDS*55}));
    }
    if (postBasicSettingConn.success && needReloaded) {
      console.log("reload all places")
      dispatch(reloadAllPlaces());
      setNeedReloaded(false);
    }
  }, [postBasicSettingConn]);
  
  useEffect(() => {
    setNeedReloaded(true);
    postBasicSetting(
      `${DATA_SERVER_URL}/get_weather`,     //url
      "POST",                               //method
      JSON.stringify(                       //body
        {
          'time_setting': {
            'start': weatherToGoSetting.startTime / 1000,
            'end': weatherToGoSetting.endTime / 1000,
          },
          'activity': {
            'type': '日常',
          }
        }
      ),
      {"Content-Type": "application/json"}, //headers
    )
  }, [weatherToGoSetting])

  const setSegTimes = (values) => {
    const newSegTimes = {
      'startTime': currentRoundedTimeStamp + values[0]*SEGMENT_MILLISECONDS,
      'endTime': currentRoundedTimeStamp + values[1]*SEGMENT_MILLISECONDS,
    }
    dispatch(setTime(newSegTimes));
  }

  return <>
    <ScrollView style={[tw`p-2`]}>
      <View style={tw`flex rounded-3xl bg-white py-3 my-2 justify-center`}>
        <Text style={tw`text-xl text-slate-500 p-2 pl-3 pt-1 pb-0 font-semibold`}>選擇活動從事的時間</Text>
        <Text style={tw`text-sm text-slate-400 pl-3 w-70`}>將根據選擇的時段進行天氣資訊的呈現與推薦</Text>
        <Divider/>
        <View style={tw`self-center justify-end h-26 p-2 pb-4`}>
          <MultiSlider
            values={[MIN_SEG_VAL, MAX_SEG_VAL]}
            min={MIN_SEG_VAL}
            max={MAX_SEG_VAL}
            snapped={true}
            isMarkersSeparated={true}
            onValuesChangeFinish={(values) => setSegTimes(values)}
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
            eventTypes.order.map((name, idx) => (
              <BasicSettingCard key={idx} selected={name===weatherToGoSetting.chosenType} name={name} src={eventTypes[name].src}/>
            ))
          }        
        </View>
      </View>
      <View style={tw`rounded-3xl bg-white py-3 my-2`}>
        <Text style={tw`text-xl text-slate-500 p-2 pl-3 pt-1 pb-0 font-semibold`}>找不到活動?直接選擇想要的天氣</Text>
        <Text style={tw`text-sm text-slate-400 pl-3 w-80`}>將根據天氣型態調整推薦排序設定以及所需天氣資訊</Text>
        <Divider/>
        <View style={[tw`flex-row justify-center flex-wrap pt-4`]}>
          {
            weatherTypes.order.map((name, idx) => (
              <BasicSettingCard key={idx} selected={name===weatherToGoSetting.chosenType} name={name} src={weatherTypes[name].src}/>
            ))
          }        
        </View>
      </View>
      <Divider style={tw`p-2 opacity-0`} width={1}/>
      {/* <Dialog overlayStyle={tw`bg-transparent border-0`} isVisible={true}>
        <Dialog.Loading style={tw`bg-white`} />
      </Dialog> */}
    </ScrollView>
    {
      postBasicSettingConn.loading
      ?
      <View style={[tw`w-full h-full bg-slate-100 opacity-50`, styles.loadingContainer, ]}>
        <SocialIcon style={tw`shadow-none bg-transparent`} type='github' light loading/>
      </View>
      :
      null
    }
  </>
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    // top: window.height*0.25, 
  }
})