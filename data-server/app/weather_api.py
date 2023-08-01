def get_fake_weather_data(latitude, longitude):
    
    # fake weather data
    fake_weather = {
        'latitude': latitude,
        'longitude': longitude,
        'temperature': 25,
        'humidity': 70,
        'description': 'Sunny',
    }

    return fake_weather
