import json
import pandas as pd
import numpy as np
import xarray as xr
import requests
import datetime
import threading


# CONSTANT
dataset = ['003', '005', '009', '011', '015', '017', '021', '023', '027', '029', '031', '035', '039', '041', '045', '047', '051', '053', '057', '059', '063', '065', '069', '071', '076', '078', '082', '084']
FETCH_CWB_RATE = 6 # 6hr: 00, 06,12,18L, update after 1 hr. -> 01, 07, 13, 19

# fetch_cwb() is the same as original to_netcdf_attractoins.py
def fetch_cwb(isLoop=False):
    start = datetime.datetime.now()
    print("   Start fetch cwb at:", start)
    for i in range(len(dataset)):
        url = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-B0053-'+str(dataset[i])+'?Authorization=rdec-key-123-45678-011121314&format=JSON'
        response = requests.get(url)
        data = response.json()
        locations = data["cwbopendata"]["dataset"]["locations"]["location"]

        data_list = []
        for locationname in locations:
            location_name = locationname["locationName"]
            lon = locationname["lon"]
            lat = locationname["lat"]
            weatherelement = locationname["weatherElement"]
            for element in weatherelement:
                elementName = element["elementName"]
                description = element["description"]
                time = element["time"]
                #for time_info in time:
                if elementName=="T" or elementName=="AT" or elementName=="Td" or elementName=="RH" or elementName=="MaxT" or elementName=="MinT" or elementName=="MaxAT" or elementName=="MinAT" or elementName=="PoP6h" or elementName=="PoP12h" or elementName=="PoP24h" or elementName=="WD" or elementName=="WeatherDescription":
                    for time_info in time:
                        start_time = time_info.get('startTime')
                        end_time = time_info.get('endTime')
                        data_time = time_info.get('dataTime')
                        elementValue = time_info["elementValue"]
                        values = elementValue['value']
                        measures = elementValue['measures']
                        # print(elementName, description, values, measures, start_time, end_time)
                        data_list.append({
                            "LocationName": location_name,
                            "lon": lon,
                            "lat": lat,
                            "ElementName": elementName,
                            "description": description,
                            "StartTime": start_time,
                            "EndTime": end_time,
                            "DataTime": data_time,
                            "Value": values,
                            "Measures": measures
                        })

                else:
                    for time_info in time:
                        start_time = time_info.get('startTime')
                        end_time = time_info.get('endTime')
                        data_time = time_info.get('dataTime')
                        elementValue = time_info["elementValue"]
                        # print(elementValue)
                        for item in elementValue:
                            values = item['value']
                            measures = item['measures']
                            # print(elementName, description, values, measures, start_time, end_time)
                            data_list.append({
                                "LocationName": location_name,
                                "lon": lon,
                                "lat": lat,
                                "ElementName": elementName,
                                "description": description,
                                "StartTime": start_time,
                                "EndTime": end_time,
                                "DataTime": data_time,
                                "Value": values,
                                "Measures": measures
                            })
        ds = xr.Dataset.from_dataframe(pd.DataFrame(data_list))
        ds.to_netcdf("weather_data_attractions_"+str(dataset[i])+".nc")
        print("   | weather_data_attractions_"+str(dataset[i])+".nc")

    # print total fetch time
    end = datetime.datetime.now()
    print('   Total Cost time:', format(end-start))

    # Fetch Loop
    if isLoop:
        now_time, next_time, timedelta_next_fetch = get_next_time()
        print('== Next fetch Time :', next_time)
        loop_fetch_cwb(timedelta_next_fetch)


def loop_fetch_cwb(time_delta):
    timer = threading.Timer(time_delta, fetch_cwb, (True,))
    timer.start()


def get_next_time():
    now_time = datetime.datetime.now()

    # Find the next [01, 07, 13, 19] hr
    delta_hour = (FETCH_CWB_RATE - (now_time.hour - 1) % FETCH_CWB_RATE)
    next_time = datetime.datetime.strptime(
        str(now_time.year) + "-" + str(now_time.month) + "-" + str(now_time.day) + ' '
        + str(now_time.hour) + ':00:00', "%Y-%m-%d %H:%M:%S") + datetime.timedelta(hours=delta_hour)

    # Count the interval
    timedelta_next_fetch = (next_time - now_time).total_seconds()

    return now_time, next_time, timedelta_next_fetch


if __name__ == '__main__':
    # Find the next [01, 07, 13, 19] hr
    now_time, next_time, timedelta_second_fetch = get_next_time()

    # No matter when, fetch at first.
    fetch_cwb()

    # Fetch Loop
    print('== First fetch Time :', now_time)
    print('== Next fetch Time :', next_time)
    loop_fetch_cwb(timedelta_second_fetch)
