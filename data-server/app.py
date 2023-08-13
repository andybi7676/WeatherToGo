from flask import Flask, request, jsonify
import requests
from function.weather_api import get_weather_data

# create the Flask app
app = Flask(__name__)
data = {}

# import the routes get_weather
@app.route('/get_weather', methods=['POST'])
def get_weather():
    
    input_data = request.get_json()

    if 'reset' in input_data: data.clear()
    if 'time_setting' in input_data: data['time_setting'] = input_data['time_setting'] 
    if 'activity' in input_data: data['activity'] = input_data['activity'] 
    if 'location' in input_data: data['location'] = input_data['location']

    if ('time_setting' in data) and ('activity' in data) and ('location' in data):
        weather_results = get_weather_data(data)
        print('|    Get weather data')
        return jsonify({'weather': weather_results})
    
    elif ('reset' in input_data):
        print('|    Reset data', data)
        return jsonify({'weather': 'reset'})
    else:
        print('|    Get initial data', data)
        return jsonify({'weather': 'initial setting'})
    


if __name__ == '__main__':

    # adjust the host ('localhost','0.0.0.0', or specific IP) and port to build the Flask
    app.run(host='0.0.0.0', port=5000)
    