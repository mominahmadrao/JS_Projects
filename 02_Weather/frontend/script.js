

document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) {
      showError("Please enter a city name");
      return;
    }

    showLoading();

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError(error.message);
    }
  });

  async function fetchWeatherData(city) {
  const response = await fetch(
    `https://js-project2-backend.onrender.com/api/weather?city=${encodeURIComponent(city)}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "City not found");
  }

  return data;
}


  function showLoading() {
    errorMessage.classList.add("hidden");
    weatherInfo.classList.add("hidden");
    cityNameDisplay.textContent = "";
    temperatureDisplay.textContent = "Loading...";
    descriptionDisplay.textContent = "";
  }

  function displayWeatherData(data) {
    const { location, current } = data;
    cityNameDisplay.textContent = `${location.name}, ${location.country}`;
    temperatureDisplay.textContent = `Temperature: ${current.temp_c}°C`;
    descriptionDisplay.textContent = `Weather: ${current.condition.text}`;
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError(message) {
    weatherInfo.classList.add("hidden");
    cityNameDisplay.textContent = "";
    temperatureDisplay.textContent = "";
    descriptionDisplay.textContent = "";
    errorMessage.textContent = message || "Something went wrong";
    errorMessage.classList.remove("hidden");
  }
});
