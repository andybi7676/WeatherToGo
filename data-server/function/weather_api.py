#%%
import numpy as np
import xarray as xr
import pandas as pd
import time
import datetime as dt

acticity_list = {
    '日常': {'3hr': ['Wx','PoP12h','AT','WS','CI'],
            '12hr': ['Wx','PoP12h','MaxAT','WS','MaxCI','UVI']},
    '登山': {'3hr': ['Wx','PoP12h','AT','WS','CI'],
            '12hr': ['Wx','PoP12h','MaxAT','WS','MaxCI','UVI']},
    '跳傘': {'3hr': ['Wx','PoP12h','AT','WS','CI'],
            '12hr': ['Wx','PoP12h','MaxAT','WS','MaxCI','UVI']},
    '潛水': {'3hr': ['Wx','PoP12h','AT'],
            '12hr': ['Wx','PoP12h','MaxAT','UVI']},
    '衝浪': {'3hr': ['Wx','PoP12h','AT'],
            '12hr': ['Wx','PoP12h','MaxAT','UVI']},
    '觀星': {'3hr': ['Wx','PoP12h','AT','WS','CI'],
        '12hr': ['Wx','PoP12h','MaxAT','WS','MaxCI']}
}

activity_ref_list=  {
    '日常': { '降雨機率': 0, '體感溫度': 25, '風速': 3, '舒適度指數': 23, '紫外線指數': 3},
    '登山': { '降雨機率': 0, '體感溫度': 25, '風速': 5, '舒適度指數': 23, '紫外線指數': 5},
    '跳傘': { '降雨機率': 0, '體感溫度': 30, '風速': 5, '舒適度指數': 23, '紫外線指數': 5},
    '潛水': { '降雨機率': 0, '體感溫度': 30, '紫外線指數': 5, '流速': 0, '浪高': 0},
    '衝浪': { '降雨機率': 0, '體感溫度': 30, '紫外線指數': 5, '流速': 0, '浪高': 1.5},
    '觀星': { '降雨機率': 0, '體感溫度': 25, '風速': 3, '舒適度指數': 23},
    'range': {'降雨機率': 100, '體感溫度': 20, '風速': 10, '舒適度指數': 12, '紫外線指數': 11, '流速': 1, '浪高': 1.5}
}

# time_start = '2023-08-14T20:00:00+08:00'
# time_end = '2023-08-20T12:00:00+08:00'

# time_setting = {
#     'start': int(time.mktime(time.strptime(time_start, "%Y-%m-%dT%H:%M:%S+08:00"))),
#     'end': int(time.mktime(time.strptime(time_end, "%Y-%m-%dT%H:%M:%S+08:00")))
# }

# activity = {
#         'type': '觀星'
# }

# test_loc = {
#     'lon': 121.630132,
#     'lat': 24.024398
# }

# data = { 'time_setting': time_setting, 'activity': activity, 'location': test_loc}


def find_neareat_location(loc_dict, ocean=False):

    # get the location information
    lat = loc_dict['lat']
    lon = loc_dict['lon']
    
    if ocean == True:
        # loc_ref = xr.open_dataset('ocean_index.nc')
        loc_ref = xr.open_dataset('function/ocean_index.nc')
    else:
        # loc_ref = xr.open_dataset('attractions_index.nc')
        loc_ref = xr.open_dataset('function/attractions_index.nc')

    # calculate the distance between the location and all the locations in the dataset
    distances = np.sqrt((loc_ref['lat'].values - lat)**2 + (loc_ref['lon'].values - lon)**2)

    # find the index of the minimum distance
    loc_index = np.argmin(distances)
    loc_lat = loc_ref['lat'].values[loc_index]
    loc_lon = loc_ref['lon'].values[loc_index]
    if ocean == False:
        loc_idx = loc_ref['idx'].values[loc_index]

    # print('Nearest location:', loc_ref['LocationName'].values[loc_index])

    # return the location information in json
    if ocean == False:
        loc_result = {
            'name': loc_ref['LocationName'].values[loc_index], 'lat': loc_lat,
            'lon': loc_lon, 'idx': loc_idx }
    else:
        loc_result = {
            'name': loc_ref['LocationName'].values[loc_index], 'lat': loc_lat,
            'lon': loc_lon }


    return(loc_result)


def weather_rating(weather_info, activity_type, adjusted_ratio):

    # get the weather information
    var_name = weather_info['var_name']
    # var_value = [weather_info[var] for var in var_name[1:]]
    activity_type = activity_type['type']
    
    # average var in each element in dict
    ave = {var: np.average(np.array(weather_info[var]).astype(float)) for var in var_name[1:]}
    # var_value = np.array(var_value).astype(float)

    diff = [abs((ave[var] - activity_ref_list[activity_type][var])/activity_ref_list['range'][var]) for var in var_name[1:]]

    # rating
    rating  = 5 - np.sum(diff)*(1-adjusted_ratio)
    
    return(rating)


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

    # get the weather data and time (12 hr.)
    df = xr.open_dataset(nc_file12).to_dataframe()
    data = df[df['LocationName']==loc_name]
    data_list12 = data.groupby(["ElementName", "description", "Measures"]).agg({'Value': lambda r: [i for i in r]}).loc[activity['12hr']]
    time_list12 = np.array(data.groupby(["ElementName", "description", "Measures"]).agg({'StartTime': lambda r: [i for i in r]}).iloc[0]['StartTime'])

    # get the weather data and time (3 hr.)
    df = xr.open_dataset(nc_file3).to_dataframe()
    data = df[df['LocationName']==loc_name]
    data_list3 = data.groupby(["ElementName", "description", "Measures"]).agg({'Value': lambda r: [i for i in r]}).loc[activity['3hr']]
    time_list3 = np.array(data.groupby(["ElementName", "description", "Measures"]).agg({'DataTime': lambda r: [i for i in r]}).iloc[0]['DataTime'])

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

    # solve UVI
    if 'UVI' in activity['12hr']:
        # add new row for UVI
        data_list3.loc[('UVI', '紫外線指數', '紫外線指數')] = data_list12.loc[('UVI', '紫外線指數', '紫外線指數')]
        pop12 = data_list3.loc['UVI']['Value'][0]
        pop12 = [x for x in pop12 for i in range(4) if x != '']
        dlength = len(data_list3.iloc[0]['Value']) - len(pop12)
        pop12.extend([pop12[-1]]*(dlength))
        data_list3.iloc[-1]['Value'] = pop12

    # merge time
    time_list3 = np.append(time_list3, time_list12[~np.in1d(time_list12, time_list3)])
    time_list31 = time_list3.copy().tolist()

    # fill the missing data
    time_all = [d.strftime('%Y-%m-%dT%H:%M:%S+08:00') for d in pd.date_range(time_list31[0],time_list31[-1], freq='3H')]
    time_list31 = [dt.datetime.strptime(date, '%Y-%m-%dT%H:%M:%S+08:00') for date in time_list31]

    index = [time_all[i] in time_list3 for i in range(len(time_all))]

    for i in range(len(index)):
        if index[i] == False:
            time_list31.insert(i, time_list31[i-1]+dt.timedelta(hours=3))
            for j in range(len(data_list3.index)):
                data_list3.iloc[j]['Value'].insert(i, data_list3.iloc[j]['Value'][i-1])
        else:
            continue

    time_list3 = time_list31.copy()
    time_list3 = np.array([d.strftime('%Y-%m-%dT%H:%M:%S+08:00') for d in time_list31])
    tstr = time_list3[(time_list3 >= time_interval[0]) & (time_list3 <= time_interval[1])]

    # drop duplicates
    var_list = data_list3.index.get_level_values(0).tolist()
    var_list_name = data_list3.index.get_level_values(1).drop_duplicates(keep = 'first').tolist()
    du =[idx for idx, item in enumerate(var_list) if item in var_list[:idx]]
    # Wx
    du = [0 if x==1 else x for x in du]

    data_list3.drop(data_list3.index[du], inplace=True)
    var_list = list(set(var_list))

    # rename 降雨機率
    var_list_name[var_list_name.index('12小時降雨機率')] = '降雨機率'

    # and return it in json
    weather_info = {
        'attraction': loc_name,
        'lon'       : lon,
        'lat'       : lat,
        'var_name'  : var_list_name
    }

    # add weather data
    weather_info.update({var_list_name[v]: np.array(data_list3.iloc[v]['Value'])[(time_list3 >= time_interval[0]) & (time_list3 <= time_interval[1])].tolist() for v in range(len(var_list))})


    # add ocean data if needed
    if activity_type['type'] == '潛水' or activity_type['type'] == '衝浪':
        # input ocean data
        ocean_url = '../data_from_cwb/ocean_data_attractions.nc'
        df = xr.open_dataset(ocean_url).to_dataframe()

        # find the nearest location (ocean)
        loc_ocean = find_neareat_location(loc_dict, ocean=True)

        # get the weather data and time (ocean)
        data = df[df['LocationName']==loc_ocean['name']]
        data_listo = data.groupby(["ElementName"]).agg({'Value': lambda r: [i for i in r]})
        time_listo =  list(data.groupby(["ElementName"]).agg({'DataTime': lambda r: [i for i in r]}).iloc[0][0])

        # merge data
        time_listo = np.array([dt.datetime.strptime(date, '%Y-%m-%dT%H:%M:%S+08:00') for date in time_listo])
        time_listo = np.array([d.strftime('%Y-%m-%dT%H:%M:%S+08:00') for d in time_listo])
        fw = np.array(((data_listo.loc['流速']['Value'])*3)[:len(time_list3)])[(time_list3 >= time_interval[0]) & (time_list3 <= time_interval[1])]
        wv = np.array(((data_listo.loc['浪高']['Value'])*3)[:len(time_list3)])[(time_list3 >= time_interval[0]) & (time_list3 <= time_interval[1])]
        
        weather_info.update({
            '流速': fw.tolist(),
            '浪高': wv.tolist()
            })

        weather_info['var_name'].extend(['流速', '浪高'])

    # add time
    weather_info['time'] = [int(time.mktime(time.strptime(tsp, "%Y-%m-%dT%H:%M:%S+08:00"))) for tsp in tstr]
    # weather_info['time'] = tstr

    # add rating with the randome float number btn. 0~5
    
    if 'adjusted_ratio' in loc_dict:
        adjusted_ratio = loc_dict['adjusted_ratio']
    else:
        adjusted_ratio = 0
    weather_info['rating'] = weather_rating(weather_info, activity_type, adjusted_ratio)

    return weather_info


# weather_info = get_weather_data(data)



