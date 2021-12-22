function currentDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];

  let hour = now.getHours();

  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let time = `${currentDay}, ${hour}:${minute}`;
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

function searchWeather() {
  let apiKey = "8c4070f08d562986da25915538f23e1a";
  let search = document.querySelector("#search-input");

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(tellWeather);
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
