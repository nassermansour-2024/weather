const searchBtn = document.getElementById("searchBtn");
const current_temp = document.querySelector(".current_temp");
const current_icon = document.querySelector(".current_icon");
const current_status = document.querySelector(".current_status");
const location_name = [...document.querySelectorAll(".location_name")];
const dateOfToday = document.querySelector(".dateOfToday");
const forecastDate = document.querySelector(".forecastDate");
const max_temp = document.querySelector(".max_temp");
const min_temp = document.querySelector(".min_temp");
const humidity_ = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");
const tommorowDate = document.querySelector(".tommorowDate");
const tommorowMax = document.querySelector(".tommorowMax");
const tommorowIcon = document.querySelector(".tommorowIcon");
const tommorowText = document.querySelector(".tommorowText");
const afterTommorowDate = document.querySelector(".afterTommorowDate");
const afterTommorowMax = document.querySelector(".afterTommorowMax");
const afterTommorowIcon = document.querySelector(".afterTommorowIcon");
const afterTommorowText = document.querySelector(".afterTommorowText");

const defaultCity = "Cairo";

let CityInfo = [];

getCity(defaultCity)
async function getCity(city) {
  try {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=fe8a9d1c694b4bb99d2204200241512&q=${city}&days=3`);
    let result = await response.json();

    CityInfo = result;

    displayCurrent()

  } catch (error) {
    console.log(error);
    
  }
}

function displayCurrent() {
  let {location: {name}, 
       current:{temp_c, last_updated, condition: {text, icon}, humidity, wind_kph } ,
       forecast: {forecastday}
      } = CityInfo

  current_temp.innerHTML = temp_c;
  location_name.innerHTML = name;
  dateOfToday.innerHTML = formatDate(`${last_updated}`);
  forecastDate.innerHTML =  formatDayWeek(`${last_updated}`)
  current_icon.setAttribute("src", icon);
  current_status.innerHTML = text;
  location_name.forEach(element => {
    element.innerHTML = name
  })
  max_temp.innerHTML = `${Math.round(forecastday[0].day.maxtemp_c)}°` ;
  min_temp.innerHTML = `${Math.round(forecastday[0].day.mintemp_c)}°` ;
  humidity_.innerHTML = humidity;
  wind.innerHTML = Math.round(wind_kph);
  sunrise.innerHTML = forecastday[0].astro.sunrise;
  sunset.innerHTML = forecastday[0].astro.sunset;

  tommorowDate.innerHTML = formatDayWeek(`${forecastday[1].date}`)
  tommorowMax.innerHTML = `${Math.round(forecastday[1].day.maxtemp_c)}` 
  tommorowIcon.setAttribute("src", forecastday[1].day.condition.icon)
  tommorowText.innerHTML = forecastday[1].day.condition.text

  afterTommorowDate.innerHTML = formatDayWeek(`${forecastday[2].date}`)
  afterTommorowMax.innerHTML = `${Math.round(forecastday[2].day.maxtemp_c)}` 
  afterTommorowIcon.setAttribute("src", forecastday[2].day.condition.icon)
  afterTommorowText.innerHTML = forecastday[2].day.condition.text
}


searchBtn.addEventListener("input", function(e) {
  console.log(e.target.value);
  getCity(e.target.value)

})


function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [day, month, year].join("/");
}


function formatDayWeek(date) {
  var d = new Date(date),
    day = "" + d.getDate(),
    dNumber = d.getDay();
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  if (day.length < 2) day = "0" + day;
  let dd = weekday[dNumber];
  return [dd, day].join(", ");
}
