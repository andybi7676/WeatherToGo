#%%
import numpy as np
import xarray as xr
import time

# input red data
loc_ref = xr.open_dataset('attractions_index.nc')
# loc_ref = xr.open_dataset('function/attractions_index.nc')

acticity_list = {
    '日常': {'3hr': ['WeatherDescription','PoP12h','AT','WS','CI'],
            '12hr': ['WeatherDescription','PoP12h','MaxAT','WS','MaxCI']}
}

# time_start = '2023-08-14T00:00:00+08:00'
# time_end = '2023-08-20T12:00:00+08:00'

# time_setting = {
#     'start': int(time.mktime(time.strptime(time_start, "%Y-%m-%dT%H:%M:%S+08:00"))),
#     'end': int(time.mktime(time.strptime(time_end, "%Y-%m-%dT%H:%M:%S+08:00")))
# }

# activity = {
#         'type': '日常'
# }

# test_loc = {
#     'lon': 121.630132,
#     'lat': 24.024398
# }

# data = { 'time_setting': time_setting, 'activity': activity, 'location': test_loc}


def find_neareat_location(loc_dict):

    # get the location information
    lat = loc_dict['lat']
    lon = loc_dict['lon']
    
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
        'name': loc_ref['LocationName'].values[loc_index], 'lat': loc_lat,
        'lon': loc_lon, 'idx': loc_idx }


    return(loc_result)

def get_weather_data(data):

    time_setting = data['time_setting']
    activity_type = data['activity']
    loc_dict = data['location']

    # get the basic information
    lat = loc_dict['lat']
    lon = loc_dict['lon']
    time_interval = [time.strftime("%Y-%m-%dT%H:%M:%S+08:00", time.localtime(time_setting['start'])), time.strftime("%Y-%m-%dT%H:%M:%S+08:00", time.localtime(time_setting['end']))]
    activity = acticity_list[activity_type['type']]

    # find the nearest location
    loc_result = find_neareat_location(loc_dict)

    # get the weather data (open the corresponding netCDF file using index)
    loc_name = loc_result['name']
    loc_idx3 = loc_result['idx']
    loc_idx12 = '%03d'%(int(loc_idx3)-2)
    nc_file3 = "../data_from_cwb/weather_data_attractions_"+loc_idx3+".nc"
    nc_file12 = "../data_from_cwb/weather_data_attractions_"+loc_idx12+".nc"

    # get the weather data and time (3 hr.)
    df = xr.open_dataset(nc_file3).to_dataframe()
    data = df[df['LocationName']==loc_name]
    data_list3 = data.groupby(["ElementName", "description", "Measures"]).agg({'Value': lambda r: [i for i in r]}).loc[activity['3hr']]
    time_list3 = np.array(data.groupby(["ElementName", "description", "Measures"]).agg({'DataTime': lambda r: [i for i in r]}).iloc[0]['DataTime'])

    # get the weather data and time (12 hr.)
    df = xr.open_dataset(nc_file12).to_dataframe()
    data = df[df['LocationName']==loc_name]
    data_list12 = data.groupby(["ElementName", "description", "Measures"]).agg({'Value': lambda r: [i for i in r]}).loc[activity['12hr']]
    time_list12 = np.array(data.groupby(["ElementName", "description", "Measures"]).agg({'StartTime': lambda r: [i for i in r]}).iloc[0]['StartTime'])

    # merge data
    for i in range(len(data_list3)):
        data_list3.iloc[i]['Value'].extend(np.array(data_list12.iloc[i]['Value'])[~np.in1d(time_list12, time_list3)])

        # solve PoP12h  
        if data_list3.index[i][0] == 'PoP12h':
            pop12 = data_list3.iloc[i]['Value']
            dlength = len(pop12) - (pop12.index(''))
            pop12 = [x for x in pop12 for i in range(4) if x != '']
            pop12.extend([pop12[-1]]*(dlength))
            data_list3.iloc[i]['Value'] = pop12


    # merge time
    time_list3 = np.append(time_list3, time_list12[~np.in1d(time_list12, time_list3)])
    tstr = time_list3[(time_list3 >= time_interval[0]) & (time_list3 <= time_interval[1])]

    # and return it in json
    weather_info = {
        'attraction': loc_name,
        'lon'       : lon,
        'lat'       : lat,
        'Elements'  : [
            {
                'ElementName'   : row[0],
                'description'   : row[1],
                'Measures'      : row[2],
                'Value'         : np.array(data_list3.loc[row]['Value'])[(time_list3 >= time_interval[0]) & (time_list3 <= time_interval[1])].tolist()
            }
            for row in data_list3.index
        ]
    }
    weather_info['Elements'].append({
        'ElementName':'Time',
        'description': '時間',
        'Measures': 's',
        # 'Value': [int(time.mktime(time.strptime(tsp, "%Y-%m-%dT%H:%M:%S+08:00"))) for tsp in tstr]
        'Value': tstr
        })


    return weather_info