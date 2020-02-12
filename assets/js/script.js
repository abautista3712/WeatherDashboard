var today = moment().format("dddd, MMMM Do");
function update() {
  $("#date").text(today);
}

setInterval(update(), 300000);

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
      ((response.main.temp - 273.15) * (9 / 5) + 32).toFixed(1) + "°"
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

// 5-Day Forecast
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
function forecastMini(indexValAtNoon, targetRow) {
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/forecast?q=Los+Angeles&appid=2d2e3d50a761f51d222ae328e374ca3b",
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
        $("#forecastUV" + targetRow).text(response[1].value);
        $("#forecastUV" + targetRow).attr("class", "fontStd");
      });
    });
  });
}

var noonNextFiveDaysArr = [3, 11, 19, 27, 35];

for (b = 0; b < noonNextFiveDaysArr.length; b++)
  forecastMini(noonNextFiveDaysArr[b], b + 1);
// 3, 11, 19, 27, 35
