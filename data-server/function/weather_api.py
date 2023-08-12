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
        # open the corresponding netCDF file using index
        loc_idx = loc_result['idx']
        nc_file = "weather_data_attractions_"+loc_idx+".nc"

        # and get the weather data
        loc_name = loc_result['name']
        df = xr.open_dataset(nc_file).to_dataframe()
        data = df[df['LocationName']==loc_name]
        data_list = data.groupby(["ElementName", "description", "Measures"]).agg({'Value': lambda r: [i for i in r]})
        time_list = data.groupby(["ElementName", "description", "Measures"]).agg({'StartTime': lambda r: [i for i in r]}).iloc[0]

        # and return it in json
        weather_info = {
            'attraction': name,
            'lon'       : lon,
            'lat'       : lat,
            'Elements'  : [
                {
                    'ElementName'   : row[0],
                    'description'   : row[1],
                    'Measures'      : row[2],
                    'Value'         : data_list.loc[row]['Value']
                }
                for row in data_list.index
            ]
        }
        weather_info['Elements'].append({'ElementName':'Time' ,'description': '時間', 'Measures': 's', 'Value':time_list['StartTime']})

        print('Demand: ', loc_dict)
        print('Result: ', loc_result)
        return weather_info, data


if __name__ == "__main__":
    # TEST DATA for get_weather_data() , T is true data, F is faked data.
    test1_T = {
        'name': '宜蘭河濱公園',
        'lon': 121.759243,
        'lat': 24.76544
    }

    test2_T = {
        'name': '七星潭',
        'lon': 121.630132,
        'lat': 24.024398
    }

    test3_T = {
        'name': '員山公園',
        'lon': 121.7224954,
        'lat': 24.74597021
    }

    test3_F = {
        'name': '應該要是 員山公園',
        'lon': 121.72249,
        'lat': 24.74597021
    } #idx = 045

    weather_info, data = get_weather_data(test3_F)