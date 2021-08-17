let button = document.querySelector("#special-button");
let locationButton = document.querySelector("#locbutton");

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "889ddb82ac517574ec1ec04289422270";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  console.log(response);
  let myCity = document.querySelector("#current-city");
  myCity.innerHTML = response.data.name;

  let temperature = document.querySelector("#weather-now");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}°C`;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `🚩wind: ${Math.round(response.data.wind.speed)} km/h`;

  let humidity = document.querySelector("#humid");
  humidity.innerHTML = `💧humidity: ${response.data.main.humidity}%`;
}

function findLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "889ddb82ac517574ec1ec04289422270";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

button.addEventListener("click", handleSubmit);
locationButton.addEventListener("click", findLocation);

let timeNow = document.querySelector("#timenow");
let now = new Date();

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekDay = weekDays[now.getDay()];

let hour = now.getHours();
let minute = now.getMinutes();

if (minute < 10) {
  timeNow.innerHTML = `${weekDay}, ${hour}:0${minute}`;
} else {
  timeNow.innerHTML = `${weekDay}, ${hour}:${minute}`;
}
