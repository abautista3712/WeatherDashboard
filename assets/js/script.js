function update() {
  var today = moment().format("dddd, MMMM Do");
  $("#date").text(today);
}

setInterval(update(), 3600000);
