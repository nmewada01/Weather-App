//let data = [];
let T = new Date();
let date = T.getDate();
let year = T.getFullYear();
let month = T.toLocaleString("default", { month: "long" });
let day = T.toLocaleString("default", { weekday: "long" });
let time = T.toLocaleTimeString("en-US", { hour12: true });
let flag = false;
function getData() {
  let city = document.querySelector("#city").value;

  console.log(city);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a3500654ec4190e1d18be80e3576d553`; //here we change sehore into curly inside

  fetch(url) //always remember not use semicolon here.it is not working give a error
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      //data = res.data;
      append(res);
      console.log(res);
      //console.log(res.main.temp);
      //appendProducts(data)
    })
    .catch(function (err) {
      console.log(err);
    });
}

function getDataLocation(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a3500654ec4190e1d18be80e3576d553`; //here we define the latitude and longitude

  const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current&appid=a3500654ec4190e1d18be80e3576d553`;
  fetch(url) //always remember not use semicolon here.it is not working give a error
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      //data = res.data;
      append(res);
      console.log(res);
      //console.log(res.main.temp);
      //appendProducts(data)
    })
    .catch(function (err) {
      console.log(err);
    });
}

function append(data) {
  let container = document.querySelector("#container");
  let map = document.querySelector("#gmap_canvas");
  container.innerHTML = null;
  let tempdibb = document.createElement("div");
  tempdibb.id = "tempId";
  let dibb = document.createElement("div");
  dibb.className = "cloudId";
  let dibb1 = document.createElement("div");
  dibb1.className = "windSpeedId";
  let dibb2 = document.createElement("div");
  dibb2.className = "lowTempId";
  let dibb3 = document.createElement("div");
  dibb3.className = "HumidityId";
  let dibb4 = document.createElement("div");
  dibb4.className = "HighTempId";
  let dibb5 = document.createElement("div");
  dibb5.className = "NowTempId";
  let cityDibb = document.createElement("div");
  cityDibb.id = "cityName";

  //================================================
  let cityicon = document.createElement("span");
  cityicon.innerHTML = `<i class="fa-solid fa-city"></i>`;
  let city = document.createElement("h2");
  city.innerText = ` ${data.name}`;
  cityDibb.append(cityicon, city);

  //==============================================
  let minIcon = document.createElement("span");
  minIcon.innerHTML = `<i class="fa-solid fa-temperature-low"></i>`;
  let min = document.createElement("p");
  min.innerText = ` ${(data.main.temp_min - 273).toFixed(2)} \u00B0C`;
  dibb2.append(minIcon, min);

  //================================================
  let maxIcon = document.createElement("span");
  maxIcon.innerHTML = `<i class="fa-solid fa-temperature-high"></i>`;
  let max = document.createElement("p");
  max.innerText = ` ${(data.main.temp_max - 273).toFixed(2)} \u00B0C`;
  dibb4.append(maxIcon, max);

  //===============================================
  let currentIcon = document.createElement("span");
  currentIcon.innerHTML = `<i class="fa-solid fa-scale-balanced"></i>`;
  let current = document.createElement("p");
  current.innerText = ` ${(data.main.temp - 273).toFixed(2)} \u00B0C`;

  //==============================================
  dibb5.append(currentIcon, current);
  tempdibb.append(dibb5, dibb2, dibb4);
  let humidityicon = document.createElement("span");
  humidityicon.innerHTML = `<i class="fa-solid fa-cloud-sun"></i>`;
  let humidity = document.createElement("h2");
  humidity.innerText = `humidity: ${data.main.humidity}`;
  dibb3.append(humidityicon, humidity);

  let windSpeedicon = document.createElement("span");
  windSpeedicon.innerHTML = `<i class="fa-solid fa-wind"></i>`;
  let windSpeed = document.createElement("h2");
  windSpeed.innerText = `Speed -${data.wind.speed},${data.wind.deg}C`;
  dibb1.append(windSpeedicon, windSpeed);

  //================================================
  let cloudicon = document.createElement("span");
  cloudicon.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
  let clouds = document.createElement("h2");
  clouds.innerText = `${data.weather[0].description}: ${data.clouds.all}`;
  dibb.append(cloudicon, clouds);

  //==============================================

  let timer = document.createElement("h3");
  timer.className = "samay"
  timer.innerText = `${day}, ${month}, ${year},  ${time}`;
  container.append(cityDibb, dibb3, dibb, dibb1, tempdibb, timer);
  map.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
}

function getWeather() {
  navigator.geolocation.getCurrentPosition(success);

  function success(position) {
    let crd = position.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    getDataLocation(crd.latitude, crd.longitude);
    daysData(crd.latitude, crd.longitude);
  }
}

//second 7 days weather start

// function daysData(lat,lon) {
//   // let dayName = document.querySelector("#dayInput");
//    const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current&appid=d91d9888bfad2dfc2816750e0f485742`;
// //console.log(url2)
//   fetch(url2)
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (res) {
//       //sevenDays();
//       console.log(res);
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// }

// const arr = ["Today","Monday","Tuesday","Wednesday","Thirsday","Friday","Saturday","Sunday"];

// function sevenDays(lat,lon){

//   for(let i=0; i<din.daily.length; i++){

//       let box1 = document.createElement("div")
//       box1.innerText = arr[i];

//   }
//  }

//<i class="fa-solid fa-city"></i>
//<i class="fa-solid fa-cloud"></i>
//<i class="fa-solid fa-cloud-sun"></i>
//<i class="fa-solid fa-sunset"></i>
//<i class="fa-solid fa-temperature-full"></i>  for temprature
//<i class="fa-solid fa-temperature-low"></i>  for low temp
//<i class="fa-solid fa-temperature-high"></i> for high
