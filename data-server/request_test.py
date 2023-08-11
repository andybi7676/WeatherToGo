import requests
import json

# define the coordinates (mock data)
coordinates_list = [
    ['a', 25.0, 121.5],
    ['b', 37.8, -122.4],
    ['c', 51.5, -0.1]
]

# create a dictionary to store the coordinates
data = {'coordinates': coordinates_list}

# define the API endpoint
api_url = 'http://localhost:5000/get_weather'  # adjusted

# make a POST request to the API
response = requests.post(api_url, json=data)

# check the status code
if response.status_code == 200:
    weather_data = response.json()
    print(weather_data)
else:
    print('Error:', response.status_code)
