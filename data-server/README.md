# Weather Information App

This application is a simple weather information lookup tool, where users can input latitude and longitude to retrieve weather details for specific locations.

## Installation

1. Download this project to your local environment.

2. Install the required dependencies:

```bash
pip install -r requirements.txt

3. Run the application:

```bash
python app.py
```

## Project Structure
project
├── app.py
├── db_show.py
├── README.md
├── requirements.txt
├── app
│   ├── __init__.py
│   ├── models.py
│   ├── routes.py
│   ├── weather_api.py
│   ├── static
│       ├── css
│           └── styles.css
│       └── js
│           └── app.js
│   └── templates
│       └── index.html
└── instance
    └── data.db


## File Disscription
app.py: This is the main application file that sets up the Flask app, defines routes, and runs the server.

app/__init__.py: This is a file that is used to make the app directory a Python package.

app/models.py: This file contains the database model for weather data. It defines the WeatherData class that represents the weather information to be stored in the database.

app/routes.py: This file contains the route definitions for the application. It defines the index route, which is the main page of the application, and the weather route, which is used to retrieve weather data for a given latitude and longitude.

app/weather_api.py: This is a fake weather API that returns weather data for a given latitude and longitude. It is used to demonstrate how to interact with an external API.

app/static/css/styles.css: This is the CSS file that contains the styles for the HTML templates.

app/static/js/app.js: This is the JavaScript file responsible for handling client-side interactions, such as sending latitude and longitude to the server and displaying weather data.

app/templates/index.html: This HTML file is the main page template that the server renders when the user visits the application in their browser.

instance/data.db: This is the SQLite database file that stores the weather data.

README.md: The file you are currently reading. It contains information about the project and how to use it.

requirements.txt: This file lists all the Python dependencies required to run the application.


## Project Flow Chart (reivsedby ChatGPT)
1. 首先，你需要確保在專案的根目錄下有一個名為 app.py 的檔案。這是 Flask App 的主要入口點。

2. 在 app.py 中，你需要導入 Flask 相關的模組並初始化 Flask App，同時註冊路由和其他功能模塊。

3. 在 app/routes.py 中，你定義了 Flask App 的路由處理函式。這裡可能包含了獲取天氣數據的路由處理，根據前端提供的經緯度，連接到天氣 API 或使用虛擬的假數據，然後將天氣數據返回到前端。

4. 在 app/weather_api.py 中，透過 get_fake_weather_data()，用於返回假的天氣數據。這個函式可以被 app/routes.py 中的路由處理函式調用。

5. 在前端部分，透過 HTML、CSS 和 JavaScript ，來實現網頁的設計和互動。前端的程式碼中，你需要使用 AJAX 來向後端發送請求並獲取天氣數據。

6. 當你執行 app.py 時，Flask App 將會啟動並監聽指定的端口（預設為 5000 端口）。這樣，你的後端就可以接收來自前端的請求。

7. 當你在瀏覽器中輸入 localhost:5000，前端頁面將會顯示在瀏覽器中。在頁面上，你可以輸入經度和緯度，然後點擊按鈕。前端部分的 JavaScript 代碼將會使用 AJAX 向後端 Flask App 發送請求，並將經緯度作為參數傳遞。

8. Flask App 的路由處理函式（在 app/routes.py 中定義）將會處理這個請求，可能使用 app/weather_api.py 中的 get_fake_weather_data() 函式來獲取假的天氣數據。 後端將處理好的天氣數據返回給前端，JavaScript 將接收到的天氣數據顯示在網頁上，讓用戶可以看到相應的天氣信息。


## Undo
1. 尚未利用固定ip
2. 尚未確定資料儲存形式
3. 尚未與真正的天氣api（data server）連接
4. 尚未與真正的前端連接