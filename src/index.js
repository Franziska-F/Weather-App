function currentDate(now) {
  let days = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
  let currentDay = days[now.getDay()];

  let currentYear = now.getFullYear();
  let currentMonth = now.getMonth() + 1;
  let currentDate = now.getDate();

  let time = `${currentDay}, ${currentDate}.${currentMonth}.${currentYear}`;
  return time;
}

currentDate(new Date());
let mainDate = document.querySelector("#main-date");
mainDate.innerHTML = currentDate(new Date());

function showCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");

  let display = document.querySelector("#city-input");
  display.innerHTML = `${input.value}`;
}
let displayCity = document.querySelector("#searchForm");
displayCity.addEventListener("submit", showCity);

function forecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return daysShort[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast-row");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` 
                <div class="col">
                  <div class="displayForecast">
                    <div class="forecastDay">${forecastDate(
                      forecastDay.dt
                    )}</div>
                  
                    <span>
                      <img src= "http://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }@2x.png"
                      class="forecastIcon"</span
                    >
                    <div class="forecastTemp">
                      <span id="forecast-max">${Math.round(
                        forecastDay.temp.max
                      )} |</span>

                      <span id="forecast-min">${Math.round(
                        forecastDay.temp.min
                      )}</span>
                    </div>
                  </div>
                </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function searchWeather() {
  let apiKey = "8c4070f08d562986da25915538f23e1a";
  let search = document.querySelector("#search-input");

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(tellWeather);
  axios.get(apiUrl).then(getForecast);
}

function getForecast(response) {
  let apiKey = "8c4070f08d562986da25915538f23e1a";
  let lon = response.data.coord.lon;
  console.log(lon);
  let lat = response.data.coord.lat;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function tellWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let displayTemperature = document.querySelector("#temp");
  let maxTemperature = Math.round(response.data.main.temp_max);
  let minTemperature = Math.round(response.data.main.temp_min);
  let description = response.data.weather[0].description;
  let displayHumidity = document.querySelector("#humidity");
  let displayWind = document.querySelector("#wind");
  let iconElement = document.querySelector(".weather-icon");
  celsius = response.data.main.temp;
  displayTemperature.innerHTML = `${temperature}`;
  let displayMaxMinTemperature = document.querySelector("#more-info");
  displayMaxMinTemperature.innerHTML = `Min.: ${minTemperature}°C, Max.: ${maxTemperature}°C`;
  let displayDescription = document.querySelector("#description");
  displayDescription.innerHTML = `${description}`;
  let location = response.data.name;
  console.log(location);
  let displayLocation = document.querySelector("#city-input");
  displayLocation.innerHTML = `${location}`;

  displayHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  displayWind.innerHTML = `Wind: ${Math.round(
    response.data.wind.speed * 3,
    6
  )} km/h`;

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function landing(city) {
  let apiKey = "8c4070f08d562986da25915538f23e1a";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(tellWeather);
  axios.get(apiUrl).then(getForecast);
}

let showTemperature = document.querySelector("#searchForm");
showTemperature.addEventListener("submit", searchWeather);
landing("Vienna");

function displayFarenheit(event) {
  event.preventDefault();
  let fahrenheit = (celsius * 9) / 5 + 32;
  celsiusUnit.classList.remove("active");
  farenheitUnit.classList.add("active");
  let displayTemperature = document.querySelector("#temp");
  displayTemperature.innerHTML = Math.round(fahrenheit);
}
let celsius = null;

let farenheitUnit = document.querySelector("#unit-farenheit");
farenheitUnit.addEventListener("click", displayFarenheit);

function displayCelsius(event) {
  event.preventDefault();

  celsiusUnit.classList.add("active");
  farenheitUnit.classList.remove("active");
  let displayTemperature = document.querySelector("#temp");
  displayTemperature.innerHTML = Math.round(celsius);
}
let celsiusUnit = document.querySelector("#unit-celsius");
celsiusUnit.addEventListener("click", displayCelsius);
