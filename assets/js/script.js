// Function to update dates
var today = moment().format("dddd, MMMM Do");
function update() {
  $("#date").text(today);
}
setInterval(update(), 300000);

// Functions for various obtaining various values from Open Weather API
function getTemp(city) {
  // Ajax call for current temperature
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=2d2e3d50a761f51d222ae328e374ca3b",
    method: "GET"
  }).then(function(response) {
    $("#tempToday").text(
      ((response.main.temp - 273.15) * (9 / 5) + 32).toFixed(1) + "°"
    );
  });
}
getTemp("Los Angeles");

function getStatus(city) {
  // Ajax call for current status
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=2d2e3d50a761f51d222ae328e374ca3b",
    method: "GET"
  }).then(function(response) {
    $("#statusToday").text(response.weather[0].main);
    var iconcode = response.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    $("#statusToday").attr("src", "http://openweathermap.org/img/w/01d.png");
  });
}
getStatus("Los Angeles");

function getPressure(city) {
  // Ajax call for pressure (humidity)
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=2d2e3d50a761f51d222ae328e374ca3b",
    method: "GET"
  }).then(function(response) {
    $("#humidity").text("Humidity " + response.main.pressure + " hPa");
  });
}
getPressure("Los Angeles");

function getWind(city) {
  // Ajax call for wind
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=2d2e3d50a761f51d222ae328e374ca3b",
    method: "GET"
  }).then(function(response) {
    $("#wind").text("Wind " + response.wind.speed + " m/s");
  });
}
getWind("Los Angeles");

function getUV(city) {
  // Ajax call for UV
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=2d2e3d50a761f51d222ae328e374ca3b",
    method: "GET"
  }).then(function(response) {
    var lon = response.coord.lon;
    var lat = response.coord.lat;
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=2d2e3d50a761f51d222ae328e374ca3b&lat=" +
        lat +
        "&lon=" +
        lon +
        "&cnt=5",
      method: "GET"
    }).then(function(response) {
      $("#uv").text("UV " + response[0].value);
    });
  });
}
getUV("Los Angeles");

// 5-Day Forecast
// Generate dates
function generateDate(daysPastToday) {
  $("#forecastDate" + daysPastToday).text(
    moment()
      .add(daysPastToday, "d")
      .format("M/DD")
  );
}
for (a = 1; a < 6; a++) {
  generateDate(a);
}
// Populates forecast table with values
function forecastMini(city, indexValAtNoon, targetRow) {
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=2d2e3d50a761f51d222ae328e374ca3b",
    method: "GET"
  }).then(function(response) {
    $("#forecastTemp" + targetRow).text(
      (
        (response.list[indexValAtNoon].main.temp - 273.15) * (9 / 5) +
        32
      ).toFixed(1) + "°"
    );
    $("#forecastTemp" + targetRow).addClass("fontStd");

    $("#forecastStatus" + targetRow).text(
      response.list[indexValAtNoon].weather[0].main
    );
    $("#forecastStatus" + targetRow).addClass("fontStd");

    $("#forecastPressure" + targetRow).text(
      response.list[indexValAtNoon].main.pressure + " hPa"
    );
    $("#forecastPressure" + targetRow).addClass("fontStd");

    $("#forecastWind" + targetRow).text(
      response.list[indexValAtNoon].wind.speed + " m/s"
    );
    $("#forecastWind" + targetRow).addClass("fontStd");

    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=2d2e3d50a761f51d222ae328e374ca3b",
      method: "GET"
    }).then(function(response) {
      var lon = response.coord.lon;
      var lat = response.coord.lat;
      $.ajax({
        url:
          "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=2d2e3d50a761f51d222ae328e374ca3b&lat=" +
          lat +
          "&lon=" +
          lon +
          "&cnt=5",
        method: "GET"
      }).then(function(response) {
        $("#forecastUV" + targetRow).text(response[1].value);
        $("#forecastUV" + targetRow).addClass("fontStd");
      });
    });
  });
}

var noonNextFiveDaysArr = [3, 11, 19, 27, 35];

function fillForecast(city) {
  for (b = 0; b < noonNextFiveDaysArr.length; b++)
    forecastMini(city, noonNextFiveDaysArr[b], b + 1);
}
fillForecast("Los Angeles");

// Change values on page upon user input click
$("#inputBtnArrow").on("click", function() {
  var inputCityVal = $("#inputCity").val();
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    inputCityVal +
    "&appid=2d2e3d50a761f51d222ae328e374ca3b";
  var localStorageArr = [];
  $("#inputCity").val("");
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $("#contentCity").text(inputCityVal);
    $("#tempToday").text(getTemp(inputCityVal));
    $("#statusToday").text(getStatus(inputCityVal));
    $("#humidity").text(getPressure(inputCityVal));
    $("#wind").text(getWind(inputCityVal));
    $("#uv").text(getUV(inputCityVal));
    fillForecast(inputCityVal);
  });
});

// Change values on page upon user keypress (enter)
$(document).keypress(function(event) {
  var keycode = event.keyCode ? event.keyCode : event.which;
  if (keycode == "13") {
    var inputCityVal = $("#inputCity").val();
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputCityVal +
      "&appid=2d2e3d50a761f51d222ae328e374ca3b";
    $("#inputCity").val("");
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      $("#contentCity").text(inputCityVal);
      $("#tempToday").text(getTemp(inputCityVal));
      $("#statusToday").text(getStatus(inputCityVal));
      $("#humidity").text(getPressure(inputCityVal));
      $("#wind").text(getWind(inputCityVal));
      $("#uv").text(getUV(inputCityVal));
      fillForecast(inputCityVal);
    });
  }
});

function setIcon() {
  var iconcode = response.weather[0].icon;
  var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  $("#wicon".attr("src", iconurl));
}
