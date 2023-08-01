# app/routes.py
from flask import Blueprint, render_template, request, jsonify
from app.models import WeatherData
from app.weather_api import get_fake_weather_data
from app import db

# create a Blueprint object that we can use to register routes
main_bp = Blueprint('main_bp', __name__)

# define the routes
@main_bp.route('/')
def index():
    return render_template('index.html')

@main_bp.route('/get_weather', methods=['POST'])
def get_weather():
    if request.method == 'POST':
        # get the latitude and longitude from the form
        latitude = float(request.form.get('latitude'))
        longitude = float(request.form.get('longitude'))

        # use the latitude and longitude to get the weather data
        weather_data = get_fake_weather_data(latitude, longitude)

        # save the weather information to the database
        new_weather_data = WeatherData(
            latitude=latitude,
            longitude=longitude,
            temperature=weather_data['temperature'],
            description=weather_data['description']
        )
        db.session.add(new_weather_data)
        db.session.commit()

        return jsonify(weather_data)



