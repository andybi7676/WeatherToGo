from app.models import WeatherData

weather_data_list = WeatherData.query.all()

# print the weather data in detail
for weather_data in weather_data_list:
    print(weather_data.id)
    print(weather_data.latitude)
    print(weather_data.longitude)
    print(weather_data.temperature)
    print(weather_data.description)
    print()