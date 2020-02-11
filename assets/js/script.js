function update() {
  var today = moment().format("dddd, MMMM Do");
  $("#date").text(today);
}

setInterval(update(), 3600000);

// $("#inputBtnArrow").on("click", function() {
//   var city = $("#inputCity").val();
//   var queryURL =
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//     city +
//     "&appid=2d2e3d50a761f51d222ae328e374ca3b";
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {
//     console.log(response);
//     console.log(response.main[0].temp);
//     $("#statusToday").text(response.weather[0].main);
//   });
// });

function getTemp() {
  // Ajax call for current temperature
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/weather?q=Los+Angeles&appid=2d2e3d50a761f51d222ae328e374ca3b",
    method: "GET"
  }).then(function(response) {
    $("#tempToday").text(
      Math.floor(response.main.temp - 273.15) * (9 / 5) + 32 + "°"
    );
  });
}
getTemp();

function getStatus() {
  // Ajax call for current status
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/weather?q=Los+Angeles&appid=2d2e3d50a761f51d222ae328e374ca3b",
    method: "GET"
  }).then(function(response) {
    $("#statusToday").text(response.weather[0].main);
  });
}
getStatus();

function getPressure() {
  // Ajax call for pressure (humidity)
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/weather?q=Los+Angeles&appid=2d2e3d50a761f51d222ae328e374ca3b",
    method: "GET"
  }).then(function(response) {
    $("#humidity").text(response.main.pressure + " hPa");
  });
}
getPressure();

function getWind() {
  // Ajax call for wind
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/weather?q=Los+Angeles&appid=2d2e3d50a761f51d222ae328e374ca3b",
    method: "GET"
  }).then(function(response) {
    $("#wind").text(response.wind.speed + " m/s");
  });
}
getWind();

function getUV() {
  // Ajax call for UV
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/weather?q=Los+Angeles&appid=2d2e3d50a761f51d222ae328e374ca3b",
    method: "GET"
  }).then(function(response) {
    var lon = response.coord.lon;
    var lat = response.coord.lat;
    $.ajax({
      url:
        "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=2d2e3d50a761f51d222ae328e374ca3b&lat=" +
        lat +
        "&lon=" +
        lon +
        "&cnt=5",
      method: "GET"
    }).then(function(response) {
      $("#uv").text(response[0].value);
    });
  });
}
getUV();

// 5-Day Forecast

$("#inputBtnArrow").on("click", function() {
  var city = $("#inputCity").val();
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=2d2e3d50a761f51d222ae328e374ca3b";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    console.log(response.weather[0].main);
    $("#statusToday").text(response.weather[0].main);
  });
});

console.log(Math.floor(new Date().getTime() / 1000.0));

// $(document).ajaxError(function() {
// });
