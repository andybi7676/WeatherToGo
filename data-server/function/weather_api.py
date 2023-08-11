import numpy as np
import xarray as xr

# input red data
loc_ref = xr.open_dataset('attractions_index.nc')

def get_fake_weather_data(coords):
    
    # fake weather data
    fake_weather = {
        'latitude': coords['lat'],
        'longitude': coords['lon'],
        'temperature': 25,
        'humidity': 70,
        'description': 'Sunny',
    }

    return fake_weather


def find_neareat_location(loc_dict):

    # get the location information
    name = loc_dict['name']
    lat = loc_dict['lat']
    lon = loc_dict['lon']

    # chekc if the location is in the dataset
    if name in loc_ref['LocationName'].values:
        
        # find the index of the location
        loc_index = np.where(loc_ref['LocationName'].values == name)[0][0]
        
        # and get lat and lon
        loc_lat = loc_ref['lat'].values[loc_index]
        loc_lon = loc_ref['lon'].values[loc_index]
        loc_idx = loc_ref['idx'].values[loc_index]

        # print('Location found:', name, loc_lat, loc_lon)
    
    # if not, use the lat and lon to find the nearest location using the distance formula
    else:
        # calculate the distance between the location and all the locations in the dataset
        distances = np.sqrt((loc_ref['lat'].values - lat)**2 + (loc_ref['lon'].values - lon)**2)

        # find the index of the minimum distance
        loc_index = np.argmin(distances)
        loc_lat = loc_ref['lat'].values[loc_index]
        loc_lon = loc_ref['lon'].values[loc_index]
        loc_idx = loc_ref['idx'].values[loc_index]

        # print('Nearest location:', loc_ref['LocationName'].values[loc_index])

    # return the location information in json
    loc_result = {
        'name': loc_ref['LocationName'].values[loc_index],
        'lat': loc_lat,
        'lon': loc_lon,
        'idx': loc_idx
    }


    return(loc_result)


def get_weather_data(loc_dict):
    
        # get the location information
        name = loc_dict['name']
        lat = loc_dict['lat']
        lon = loc_dict['lon']
    
        # find the nearest location
        loc_result = find_neareat_location(loc_dict)
    
        # get the weather data
        '''
        "below is the pesudo code for getting the weather data"

        # open the corresponding netCDF file using index
        loc_idx = loc_result['idx']
        nc_file = ...

        # and get the weather data
        data = ... 
        
        # and return it in json
        weather_info = ...
        
        '''
        
    
        # return weather_info