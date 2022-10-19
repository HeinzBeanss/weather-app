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
// api key: aa73dae379feac51e8ebefcfd9b41a45

const p = document.querySelector("p");
const searchbar = document.querySelector(".searchbar");
const searchbutton = document.querySelector(".searchbutton");
const error = document.querySelector(".error");

async function getWeatherFromSearch() {
  function displayMainWeather(weatherInfo) {
    console.log(`${weatherInfo.main.humidity}%`);
    console.log(weatherInfo);
  }

  try {
    if (searchbar.value === "") {
      error.textContent = "Please enter a valid city name!";
    } else {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${searchbar.value}&limit=1&appid=aa73dae379feac51e8ebefcfd9b41a45`,
        { mode: "cors" }
      );
      const data = await response.json();

      const refinedSearch = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=aa73dae379feac51e8ebefcfd9b41a45`,
        { mode: "cors" }
      );
      const refinedData = await refinedSearch.json();
      displayMainWeather(refinedData);
    }
  } catch {
    console.log("something fucked up");
    p.textContent = "something fucked up";
    // say that it's not a valid city or whatever.
  }
}

searchbutton.addEventListener("click", getWeatherFromSearch);
// validate search bar
