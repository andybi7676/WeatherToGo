/* static/js/app.js */

// use fetch to get weather data
const form = document.getElementById('weather-form');
const resultDiv = document.getElementById('weather-result');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    fetch('/get_weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `latitude=${latitude}&longitude=${longitude}`
    })
    .then(response => response.json())
    .then(data => {
        resultDiv.innerHTML = `latitude: ${data.latitude}<br>longitude: ${data.longitude}<br>temp.: ${data.temperature}°C<br>Weather Status: ${data.description}`;
    })
    .catch(error => {
        resultDiv.innerHTML = 'error';
    });
});
