from flask import Flask, request, jsonify
import requests
from function.weather_api import get_fake_weather_data

# create the Flask app
app = Flask(__name__)

# import the routes get_weather
@app.route('/get_weather', methods=['POST'])
def get_weather():
    data = request.get_json()

    # check if the request has the coordinates
    if 'coordinates' not in data:
        return jsonify({'error': 'Missing coordinates'}), 400

    # get the coordinates
    coordinates_list = data['coordinates']
    weather_results = []

    # get the weather data for each coordinate
    for coords in coordinates_list:
        weather_info = get_fake_weather_data(coords) # adjusted
        weather_results.append(weather_info)

    return jsonify({'weather': weather_results})



if __name__ == '__main__':
    app.run()
