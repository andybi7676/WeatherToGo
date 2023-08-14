#%%
import requests
import json
import time

def check_response(response):
    # check the status code
    if response.status_code == 200:
        weather_data = response.json()
        print(weather_data)
        return(weather_data)
    else:
        print('Error:', response.status_code)
        return(None)


# define the data-server endpoint
data_url = 'http://127.0.0.1:5000/' + 'get_weather'  # adjusted for your IP address


'''
input data
below is following the steps that the user will do in the app
'''
time_start = '2023-08-14T18:00:00+08:00'
time_end = '2023-08-20T11:00:00+08:00'

# Step 1: time setting
time_setting = {
    'start': int(time.mktime(time.strptime(time_start, "%Y-%m-%dT%H:%M:%S+08:00"))),
    'end': int(time.mktime(time.strptime(time_end, "%Y-%m-%dT%H:%M:%S+08:00")))
}
input_data1 = {'time_setting': time_setting}
response = requests.post(data_url, json=input_data1)
check_response(response)


# Step 2: activity setting
activity = {
        'type': '觀星'  
        # specific activity '日常' / '登山' / '跳傘' / '潛水' / '衝浪' / '觀星'
        # non-chosen activity '豔陽高照' / '風和日麗' / '涼爽乾燥' / '溼冷有風' 
}
input_data2 = {'activity': activity}
response = requests.post(data_url, json=input_data2)
check_response(response)


# Step 3: location setting
test_loc = {
    'lon': 120.630132,
    'lat': 23.024398,
    'adjusted_ratio': 0 # optional, range from 0 to 1, the higher ratio the higher and denser ratings
}
input_data3 = {'location': test_loc}
response = requests.post(data_url, json=input_data3)
weather_data = check_response(response)
# print(weather_data['weather']['var_name'])


# Step 4: reset
reset = {
    'reset': True
}
input_data4 = {'reset': reset}
response = requests.post(data_url, json=input_data4)
check_response(response)
