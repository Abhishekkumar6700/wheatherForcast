 async function getWeather() {
  const apiKey = '5c2696e9ff3749a997d142824250806'; // Replace with your actual WeatherAPI.com key
  const city = document.getElementById('cityInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');

  if (!city) {
    resultDiv.innerHTML = "Please enter a city name.";
    return;
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;

  try {
    resultDiv.innerHTML = "Loading...";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found or API issue");
    }
     console.log("cities",response)
    const data = await response.json();
    console.log('data',data)

    resultDiv.innerHTML = `
      <strong>${data.location.name}, ${data.location.country}</strong><br>
      Temperature: ${data.current.temp_c}°C<br>
      Condition: ${data.current.condition.text}<br>
      <img src="${data.current.condition.icon}" alt="weather icon"><br>
      Humidity: ${data.current.humidity}%<br>
      Wind: ${data.current.wind_kph} kph (${data.current.wind_dir})
    `;
  } catch (error) {
    resultDiv.innerHTML = `Error: ${error.message}`;
  }
}
