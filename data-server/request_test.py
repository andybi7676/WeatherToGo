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
time_start = '2023-08-14T00:00:00+08:00'
time_end = '2023-08-20T12:00:00+08:00'

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
        'type': '日常'
}
input_data2 = {'activity': activity}
response = requests.post(data_url, json=input_data2)
check_response(response)


# Step 3: location setting
test_loc = {
    'lon': 121.630132,
    'lat': 24.024398
}
input_data3 = {'location': test_loc}
response = requests.post(data_url, json=input_data3)
weather_data = check_response(response)


# Step 4: reset
reset = {
    'reset': True
}
input_data4 = {'reset': reset}
response = requests.post(data_url, json=input_data4)
check_response(response)
