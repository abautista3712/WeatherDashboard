function update() {
  var today = moment().format("dddd, MMMM Do");
  $("#date").text(today);
}

setInterval(update(), 3600000);

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
  });
});
