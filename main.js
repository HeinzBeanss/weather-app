function setTheme() {
  const root = document.documentElement;
  const newTheme = root.className === "dark" ? "light" : "dark";
  root.className = newTheme;

  const svg = document.querySelector(".themesvg");
  const svgsrc =
    svg.getAttribute("src") === "assets/sun.svg"
      ? "assets/moon.svg"
      : "assets/sun.svg";
  svg.setAttribute("src", svgsrc);
}

document.querySelector(".theme-toggle").addEventListener("click", setTheme);

// -------------------

const searchbar = document.querySelector(".searchbar");

const searchbutton = document.querySelector(".searchbutton");
const error = document.querySelector(".error");
const image = document.querySelector(".image");
const celcius = document.querySelector(".C");
const fahrenheit = document.querySelector(".F");

const nametitle = document.querySelector(".nametitle");
const country = document.getElementById("country");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const main = document.getElementById("main");
const desc = document.getElementById("desc");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const visibility = document.getElementById("visibility");
let answer = "";
let temperatureCel;
let temperatureFah;

let refinedData;
let refinedForecast;

const todays = document.querySelector(".todays");

const threehours = document.querySelector(".threehours");
const plusoneday = document.querySelector(".plusoneday");
const plustwoday = document.querySelector(".plustwoday");
const plusfiveday = document.querySelector(".plusfiveday");

const todaysinfo = document.querySelector(".todaysinfo");

const threehoursinfo = document.querySelector(".threehoursinfo");
const plusonedayinfo = document.querySelector(".plusonedayinfo");
const plustwodayinfo = document.querySelector(".plustwodayinfo");
const plusfivedayinfo = document.querySelector(".plusfivedayinfo");



function convertTime(unixTime) {
  const offset = new Date().getTimezoneOffset();
  const userTimezoneDifference = offset * 60;
  const newTime = new Date((unixTime + userTimezoneDifference) * 1000);
  const minutes = newTime
    .getMinutes()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
  const hours = newTime
    .getHours()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
  answer = `${hours}:${minutes}`;
  return answer;
}

function convertTimeWithDate(unixTime) {
  const offset = new Date().getTimezoneOffset();
  const userTimezoneDifference = offset * 60;
  const newTime = new Date((unixTime + userTimezoneDifference) * 1000);
  // const newTime = new Date(unixTime * 1000);
  // get the actual time set in stone. then we change it to that area's timezone difference, then we take the users time difference from UTC as well, otherwise for me for instance, it would be in UTC and my clock's aren't in UTC.
  // const offset = newTime.getTimezoneOffset();

  // const offsethours = offset / 60;
  // console.log(offsethours); // UTC is (-)1 hour behind me.
  const minutes = newTime
    .getMinutes()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
  const hours = newTime
    .getHours()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
  const date = newTime
    .getDate()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
    const options = { month: "long"};
    const month = (new Intl.DateTimeFormat("en-US", options).format(newTime));
  answer = `${month} ${date} - ${hours}:${minutes}`;
  return answer;
}

function displayForecast(forecastInfo) {

  function convertToCec(tempKelvin) {
    temperatureCel = tempKelvin - 273.15;
    temperatureCel = Math.round(temperatureCel);
    return temperatureCel;
  }

  function convertToFah(tempKelvin) {
    temperatureFah = (tempKelvin - 273.15) * 1.8 + 32;
    temperatureFah = Math.round(temperatureFah);
    return temperatureFah;
  }

  convertTimeWithDate(forecastInfo.list[0].dt + forecastInfo.city.timezone);
  threehours.textContent = answer;
  convertTimeWithDate(forecastInfo.list[7].dt + forecastInfo.city.timezone);
  plusoneday.textContent = answer;
  convertTimeWithDate(forecastInfo.list[15].dt + forecastInfo.city.timezone);
  plustwoday.textContent = answer;
  convertTimeWithDate(forecastInfo.list[39].dt + forecastInfo.city.timezone);
  plusfiveday.textContent = answer;
  convertToCec(forecastInfo.list[0].main.temp);
  convertToFah(forecastInfo.list[0].main.temp);
  if (celcius.className === "C selected") {
    threehoursinfo.textContent = `${temperatureCel}°C`;
  } else if (fahrenheit.className === "F selected") {
    threehoursinfo.textContent = `${temperatureFah}°F`;
  }

  convertToCec(forecastInfo.list[7].main.temp);
  convertToFah(forecastInfo.list[7].main.temp);
  if (celcius.className === "C selected") {
    plusonedayinfo.textContent = `${temperatureCel}°C`;
  } else if (fahrenheit.className === "F selected") {
    plusonedayinfo.textContent = `${temperatureFah}°F`;
  }

  convertToCec(forecastInfo.list[15].main.temp);
  convertToFah(forecastInfo.list[15].main.temp);
  if (celcius.className === "C selected") {
    plustwodayinfo.textContent = `${temperatureCel}°C`;
  } else if (fahrenheit.className === "F selected") {
    plustwodayinfo.textContent = `${temperatureFah}°F`;
  }
  
  convertToCec(forecastInfo.list[39].main.temp);
  convertToFah(forecastInfo.list[39].main.temp);
  if (celcius.className === "C selected") {
    plusfivedayinfo.textContent = `${temperatureCel}°C`;
  } else if (fahrenheit.className === "F selected") {
    plusfivedayinfo.textContent = `${temperatureFah}°F`;
  }

}

function displayMainWeather(weatherInfo) {
  function convertToCec(tempKelvin) {
    temperatureCel = tempKelvin - 273.15;
    temperatureCel = Math.round(temperatureCel);
    return temperatureCel;
  }

  function convertToFah(tempKelvin) {
    temperatureFah = (tempKelvin - 273.15) * 1.8 + 32;
    temperatureFah = Math.round(temperatureFah);
    return temperatureFah;
  }

  nametitle.textContent = weatherInfo.name;
  country.textContent = weatherInfo.sys.country;
  convertTime(weatherInfo.sys.sunrise + weatherInfo.timezone);
  sunrise.textContent = answer;
  convertTime(weatherInfo.sys.sunset + weatherInfo.timezone);
  sunset.textContent = answer;
  main.textContent = weatherInfo.weather[0].main;
  image.style.backgroundImage = `url("assets/${weatherInfo.weather[0].main}.jpg")`;

  desc.textContent = weatherInfo.weather[0].description;
  convertToCec(weatherInfo.main.temp);
  convertToFah(weatherInfo.main.temp);

  if (celcius.className === "C selected") {
    temp.textContent = `${temperatureCel}°C`;
    todaysinfo.textContent = `${temperatureCel}°C`;
  } else if (fahrenheit.className === "F selected") {
    temp.textContent = `${temperatureFah}°F`;
    todaysinfo.textContent = `${temperatureFah}°F`;
  }

  humidity.textContent = `${weatherInfo.main.humidity}%`;
  visibility.textContent = weatherInfo.visibility;
  convertTimeWithDate(weatherInfo.dt + weatherInfo.timezone);
  todays.textContent = answer;
}

function displayCel() {
  celcius.classList.add("selected");
  fahrenheit.classList.remove("selected");
  displayMainWeather(refinedData);
  displayForecast(refinedForecast);
}

function displayFah() {
  celcius.classList.remove("selected");
  fahrenheit.classList.add("selected");
  displayMainWeather(refinedData);
  displayForecast(refinedForecast);
}

async function getWeatherFromSearch() {
  try {
    if (searchbar.value === "") {
      error.textContent = "Please enter a valid city name!";
    } else {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchbar.value}&limit=1&appid=aa73dae379feac51e8ebefcfd9b41a45`,
        { mode: "cors" }
      );
      const data = await response.json();

      const refinedSearch = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=aa73dae379feac51e8ebefcfd9b41a45`,
        { mode: "cors" }
      );
      refinedData = await refinedSearch.json();

      const forecastData = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&cnt=40&appid=aa73dae379feac51e8ebefcfd9b41a45`,
         { mode: "cors" }
      );
      refinedForecast = await forecastData.json();
      error.style.visibility = "hidden";

      displayMainWeather(refinedData);
      displayForecast(refinedForecast);
    }
  } catch {
    error.textContent = "Please enter a valid city name!";
    error.style.visibility = "visible";
    return error;
    // error.style.removeAttribute("visibility");
    // say that it's not a valid city or whatever.
  }
  return { refinedData, refinedForecast};
}

getWeatherFromSearch();

searchbutton.addEventListener("click", getWeatherFromSearch);
// validate search bar
celcius.addEventListener("click", displayCel);
fahrenheit.addEventListener("click", displayFah);
