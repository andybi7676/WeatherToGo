
export const eventTypes = {
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

export const weatherTypes = {
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

export const weatherToImgSrc = {
  "day-clear": require('../assets/weatherpng/day-clear.png'),
  "day-cloudy": require('../assets/weatherpng/day-cloudy.png'),
  "day-fog": require('../assets/weatherpng/day-fog.png'),
  "day-cloudy-fog": require('../assets/weatherpng/day-cloudy-fog.png'),
  "day-partially-clear-with-rain": require('../assets/weatherpng/day-partially-clear-with-rain.png'),
  "day-thunderstorm": require('../assets/weatherpng/day-thunderstorm.png'),
  "day-snowing": require('../assets/weatherpng/day-snowing.png'),

  "night-clear": require('../assets/weatherpng/night-clear.png'),
  "night-cloudy": require('../assets/weatherpng/night-cloudy.png'),
  "night-fog": require('../assets/weatherpng/night-fog.png'),
  "night-cloudy-fog": require('../assets/weatherpng/night-cloudy-fog.png'),
  "night-partially-clear-with-rain": require('../assets/weatherpng/night-partially-clear-with-rain.png'),
  "night-thunderstorm": require('../assets/weatherpng/night-thunderstorm.png'),
  "night-snowing": require('../assets/weatherpng/night-snowing.png'),
}

export const chosenTypeToWeatherNames = {
  '日常': ["時間", "天氣現象", "體感溫度", "降雨機率", "風速", "舒適度", "紫外線"],
  '登山': ["時間", "天氣現象", "體感溫度", "降雨機率", "風速", "舒適度", "紫外線"],
  '潛水': ["時間", "天氣現象", "體感溫度", "降雨機率", "流速", "浪高", "紫外線"],
  '觀星': ["時間", "天氣現象", "體感溫度", "降雨機率", "風速", "舒適度"],
  '衝浪': ["時間", "天氣現象", "體感溫度", "降雨機率", "流速", "浪高", "紫外線"],
  '跳傘': ["時間", "天氣現象", "體感溫度", "降雨機率", "風速", "舒適度", "紫外線"],
}

export const weatherNameToLogo = {
  "時間": require("../assets/weatherTypepng/time.png"),
  "天氣現象": require("../assets/weatherTypepng/weather.png"),
  "風速": require("../assets/weatherTypepng/air.png"),
  "浪高": require("../assets/weatherTypepng/wave.png"),
  "降雨機率": require("../assets/weatherTypepng/humid.png"),
  "體感溫度": require("../assets/weatherTypepng/thermometer.png"),
  "紫外線": require("../assets/weatherTypepng/sun.png"),
  "舒適度": require("../assets/weatherTypepng/cool.png"),
}