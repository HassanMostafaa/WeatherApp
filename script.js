let appId = `3f1efe338d643f44c2408fddfe409774`;
let units = `imperial`;
let searchMethod;

function getSearchMethod(searchTerm) {
  if (
    searchTerm.length === 5 &&
    Number.parseInt(searchTerm) + "" === searchTerm
  ) {
    searchMethod = "zip";
  } else {
    searchMethod = "q";
  }
}

function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${appId}&units=${units}`
  )
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      init(result);
    });
}

function init(resultFromServer) {
  console.log(resultFromServer);
  console.log(
    "https://openweathermap.org/img/w/" +
      resultFromServer.weather[0].icon +
      ".png"
  );
  switch (resultFromServer.weather[0].main) {
    case "Clear":
      document.body.style.backgroundImage = 'url("img/clear.jpg")';
      break;

    case "Clouds":
      document.body.style.backgroundImage = 'url("img/cloudy.jpg")';
      break;

    case "Rain":
    case "Drizzle":
    case "Mist":
      document.body.style.backgroundImage = 'url("img/rainy.jpg")';
      break;

    case "Thunderstorm":
      document.body.style.backgroundImage = 'url("img/Storm.jpg")';
      break;

    case "Snow":
      document.body.style.backgroundImage = 'url("img/snowy.jpg")';
      break;

    default:
      break;
  }
  let weatherDisHeader = document.getElementById("weatherDisHeader");
  let tempElement = document.getElementById("temp");
  let humidityElement = document.getElementById("humidity");
  let windSpeedElement = document.getElementById("windSpeed");
  let cityHeader = document.getElementById("cityHeader");
  let weatherIcon = document.getElementById("docIconImg");

  weatherIcon.src =
    "https://openweathermap.org/img/w/" +
    resultFromServer.weather[0].icon +
    ".png";
  let resultDescription = resultFromServer.weather[0].description;
  weatherDisHeader.innerText =
    resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
  // .charAt(0).toUpperCase() + resultDescription.slice(5) ----------------------- if u wanna make the first letter capital OVERKILL
  tempElement.innerHTML = Math.floor(resultFromServer.main.temp) + "&#176";
  windSpeedElement.innerHTML =
    "Winds at " + Math.floor(resultFromServer.wind.speed) + "m/s";
  cityHeader.innerHTML = resultFromServer.name;
  humidityElement.innerHTML =
    "Humidity levels At " + resultFromServer.main.humidity + "%";
  setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
  let weatherContainer = document.getElementById("weatherContainer");
  let weatherContainerHight = weatherContainer.clientHeight;
  let weatherContainerwidth = weatherContainer.clientWidth;

  //   weatherContainer.style.left = `calc(50% - ${weatherContainerwidth / 2}px)`;
  //   weatherContainer.style.top = `calc(50% - ${weatherContainerHight / 1.3}px)`;
  weatherContainer.style.visibility = "visible";
}

var input = document.querySelector("input");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    clickedBtn();
  }
});

function clickedBtn() {
  var input = document.querySelector("input");
  if (input.value === "") {
    alert("pls insert city or zip code");
    document.querySelector(".alert").style.display = "block";
  } else {
    document.querySelector(".alert").style.display = "none";
    let searchTerm = document.getElementById("searchInput").value;
    if (searchTerm);
    searchWeather(searchTerm);
  }
}
document.getElementById("searchBtn").addEventListener("click", clickedBtn);

// http://api.openweathermap.org/data/2.5/weather?zip=90210&APPID=3f1efe338d643f44c2408fddfe409774
