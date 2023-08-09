#
# -*- coding: utf-8 -*-
import sqlite3
import xarray as xr
import pandas as pd
from flask import jsonify
import json


# Constant
WEATHER_DB_FILENAME = 'weather.db'
lon = 121.4098925
lat = 24.3112466

TEST_INPUT_ATTRACTIONS = [('中央尖山', 'Mountain', 120, 20), ('大霸尖山','Mountain', 130, 30), ('頭城', 'Beach', 110, 10)]
TEST_ATTRACTION_LIST = {'Mountain':['中央尖山', '大霸尖山'], 'Beach':['頭城']}  #TODO: get_attraction_list
TEST_PRODUCT_LIST = {'Mountain':['week'], 'Beach':['week']}                 #TODO: get_product_list


def listAll(r):
    a = [i for i in r]
    return a


def get_filepath_from_wxdb(attraction_type='Mountain', product_type='week'):
    con = sqlite3.connect(WEATHER_DB_FILENAME)
    cursorObj = con.cursor()
    cursorObj.execute('SELECT filePath FROM WeatherFile WHERE name LIKE "%%%s%%%s%%"' %(attraction_type, product_type))
    filepaths = [i[0] for i in cursorObj.fetchall()]
    #print('GET files:', filepaths)
    return filepaths


def read_wx_from_nc(filepath, name="中央尖山"):
    ds = xr.open_dataset(filepath)
    df = ds.to_dataframe()
    unique_element_names = df["ElementName"].unique()
    # TODO: 時間
    df_list = df.groupby(["LocationName", "lon", "lat", "ElementName", "description", "Measures"]).agg({'Value': listAll}).dropna()
    return df, df_list


def save_wx_as_json(df_list):
    df_dict = {'attractions':[{'attraction': i, 'lon': df_list.xs(i, level=0).index[0][0], 'lat': df_list.xs(i, level=0).index[0][1],
                'Value': [
                    {'ElementName': j[2], 'discription': j[3], 'Measures': j[4],'Value': df_list.xs((i, j[2]), level=(0, 3))['Value'][0]}
                    for j in df_list.xs(i, level=0).index]}
               for i in df_list.index.get_level_values(0).unique()]}
    with open('test.json', 'w') as jsonfile:
        json.dump(df_dict, jsonfile)
    return df_dict

def read_wx_from_json(file):
    with open('test.json', 'r') as jsonfile:
        data = json.load(jsonfile)
        #print(data)
    return data



def get_attraction_weather(attraction_list={"Mountain":["中央尖山", "巴巴山"]}, product_list={"Mountain":["week"]}):
    data = pd.DataFrame()
    print("Location Name  ==  Attraction Type  ==  Product Type   ==  .nc Filepath")
    for attraction_type in attraction_list.keys():
        for product_type in product_list[attraction_type]:
            filename = get_filepath_from_wxdb(attraction_type, product_type)[0]
            df, df_list = read_wx_from_nc(filename)
            for attraction_name in attraction_list[attraction_type]:
                print('|   ', attraction_name, ' == ', attraction_type, ' == ', product_type ,' == ', filename )
                data = pd.concat([data, df_list.xs(attraction_name, drop_level=False, level=0)]) # TODO: 找到該景點天氣資料
                #print(data)
    print('------------------ Get Attraction Weather DONE -----------------')
    return data




#df, df_list =  read_wx_from_nc(get_filepath_from_wxdb(product_type='week')[0])
#df_list.head()
data = get_attraction_weather(TEST_ATTRACTION_LIST, TEST_PRODUCT_LIST)
data_w = save_wx_as_json(data)
data_r = read_wx_from_json('test.json')
print('')
print("------------------------ Data Information ---------------------")
print(data.info())
print('')
print("--------------------- Test json save & read -------------------")
print("DATA WRITE: " , data_w)
print("DATA READ : " , data_r)
print("DATA save & read as json is correct: ", data_w == data_r)


'''
if __name__ == "__main__":
    ### GET 要求位置串列：[('中央尖山', 景點類型, lon1, lat1), ('大霸尖山', 景點類型, lon2, lat2) ... ] pair from User Input
    output = []
    景點列表 = dict()
    
    # TODO: 檢查景點名稱有沒有在"景點位置蒐集"中，並加入"景點列表"的dict中
    for point in [要求位置串列]:
        # TODO: 找所有景點資料類型，存成dict 景點列表={"Mountain":["中央尖山", "巴巴山"]}
        if point 在 景點位置蒐集:
            得到景點類型
            加入dict.update({})
        else: 
            [景點名字, 景點類型, lon, lat] = 找最短距離(point)  # 找離該點最近的景點
            加入dict.update({})
        
    
    # TODO: 景點類型 = 分類地點的景點類型(景點名字)

    # TODO: 更新 景點列表.key 有關的資料
    data = get_attraction_weather(景點列表)
    
    # TODO: Merge 要求位置串列中的lon, lat和抓到的天氣資料
    return output

def 找最短距離(lon, lat):
    計算所有山與該點最短距離
    return  山名


# X，改由存成static DB/array
def 分類地點的景點類型(景點):
    #TODO
    return 類型

# X，由前端做
def 請求排序([山的名字串列], [權重串列]):
    for 山 in list:
        抓該山的資料
        根據中計算分數
        加入df
    return json


def read_WRF(景點, 解析度):
    return 0


def 抓景點array():
    return 0



def read_wx_pd_from_json(df, file):
    #df =
    df_test = pd.DataFrame(df.to_dict())
    df_test.xs(('七星山', 'MaxAT'), level=(0, 3))['Value'][0]
    return df_test


'''