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
