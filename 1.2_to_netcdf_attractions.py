import json
import pandas as pd
import numpy as np
import xarray as xr
import requests

dataset = ['003', '005', '009', '011', '015', '017', '021', '023', '027', '029', '031', '035', '039', '041', '045', '047', '051', '053', '057', '059', '063', '065', '069', '071', '076', '078', '082', '084']
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
            for time_info in time:
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
                        if elementName=='RH':
                            print('RH')
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
    print("weather_data_attractions_"+str(dataset[i])+".nc")
