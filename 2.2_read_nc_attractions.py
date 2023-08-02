# import xarray as xr

# dataset = ['003', '005', '009', '011', '015', '017', '021', '023', '027', '029', '031', '035', '039', '041', '045', '047', '051', '053', '057', '059', '063', '065', '069', '071', '076', '078', '082', '084']
# for i in range(len(dataset)):
#     ds = xr.open_dataset("weather_data_attractions_"+str(dataset[i])+".nc") #  更新頻率6小時
#     df = ds.to_dataframe()
#     print(set(df["ElementName"].values))

import xarray as xr
import pandas as pd

dataset = ['003', '005', '009', '011', '015', '017', '021', '023', '027', '029', '031', '035', '039', '041', '045', '047', '051', '053', '057', '059', '063', '065', '069', '071', '076', '078', '082', '084']
for i in range(len(dataset)):
    ds = xr.open_dataset("weather_data_attractions_"+str(dataset[i])+".nc")
    df = ds.to_dataframe()
    unique_element_names = df["ElementName"].unique()
    list = []
    for element_name in unique_element_names:
        position = df.index[df["ElementName"] == element_name][0]
        list.append(df["ElementName"][position])
        print(dataset[i], df["ElementName"][position+1], pd.to_datetime(df["DataTime"][position+2])-pd.to_datetime(df["DataTime"][position+1]), pd.to_datetime(df["EndTime"][position+1])-pd.to_datetime(df["StartTime"][position+1]))


### demo ###
# F-B0053-081   衝浪一週24小時天氣預報(英文)

### dataset ###
## https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/+str(dataset)+?Authorization=rdec-key-123-45678-011121314&format=JSON
# F-B0053-003   海水浴場一週日夜天氣預報(中文)
# F-B0053-005   海水浴場三天3小時天氣預報(中文)
# F-B0053-009   單車一週日夜天氣預報(中文)
# F-B0053-011   單車三天3小時天氣預報(中文)
# F-B0053-015   農場旅遊一週日夜天氣預報(中文)
# F-B0053-017   農場旅遊三天3小時天氣預報(中文)
# F-B0053-021   海釣一週日夜天氣預報(中文)
# F-B0053-023   海釣三天3小時天氣預報(中文)
# F-B0053-027   娛樂漁業一週日夜天氣預報(中文)
# F-B0053-029   娛樂漁業三天3小時天氣預報(中文)
# F-B0053-031   登山一週24小時天氣預報(中文)
# F-B0053-035   登山三天3小時天氣預報(中文)
# F-B0053-039   國家公園一週日夜天氣預報(中文)
# F-B0053-041   國家公園三天3小時天氣預報(中文)
# F-B0053-045   國家風景區一週日夜天氣預報(中文)
# F-B0053-047   國家風景區三天3小時天氣預報(中文)
# F-B0053-051   港口一週日夜天氣預報(中文)
# F-B0053-053   港口三天3小時天氣預報(中文) 
# F-B0053-057   國家森林遊樂區一週日夜天氣預報(中文)
# F-B0053-059   國家森林遊樂區三天3小時天氣預報(中文)
# F-B0053-063   水庫一週日夜天氣預報(中文)
# F-B0053-065   水庫三天3小時天氣預報(中文)
# F-B0053-069   觀星一週日夜天氣預報(中文)
# F-B0053-071   觀星三天3小時天氣預報(中文)
# F-B0053-076   浮潛一週日夜天氣預報(中文)
# F-B0053-078   浮潛三天3小時天氣預報(中文)
# F-B0053-082   衝浪一週日夜天氣預報(中文)
# F-B0053-084   衝浪三天3小時天氣預報(中文)