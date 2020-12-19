$(document).ready(function () {

function naturalstate (){
    var lastSearched = localStorage.getItem("lastSearched");
    if (lastSearched !== null){
        $("#cityValue").val(lastSearched);
        render();
    }
}
naturalstate ();
  $("#currentDay").text(
    luxon.DateTime.local().toLocaleString({
      weekday: "long",
      month: "long",
      day: "2-digit",
    })
  );

  function render() {
    var cityName = $("#cityValue").val();


    var APIkey = "ca7397c46053898d7c12dc596fd7cf71";
    //eventually this will be what the user types in
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`;

    $.ajax({
      method: "GET",
      url: queryURL,
    }).then(function (response) {
      console.log(response);
      var tempF = (response.main.temp - 273.15) * 1.8 + 32;
      console.log(tempF);

    //   var inputBtn = $("<button>");
      var link = $("<nav-link>");
      //link.attr("href", "#");
      link.text(response.name);
      link.addClass("linkName");

    //   $("#Psearched").append(inputBtn);
      $("#v-pills-home-tab").append(link);

    //   inputBtn.text(response.name);
    //   inputBtn.addClass("searchBar");
    //   $("#Psearched").empty();
      


      $(".city").html("<h1>" + response.name + " Weather Details</h1>");
      $(".wind").text("Wind Speed: " + response.wind.speed + " MPH ");
      $(".humidity").text("Humidity: " + response.main.humidity + " % ");
      $(".tempF").text("Temperature (F) " + tempF.toFixed(2));



    //   let city = [];
    //   for (i=0;)

      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);

      // var icon = response.weather[0].icon;
      // var iconURL = "http://openweathermap.org.img/wn" + icon + ".png";

      //console.log("Temperature (F): " + tempF);

      var lat = response.coord.lat;
      var lon = response.coord.lon;

      var queryURL1 = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIkey}`;

      $.ajax({
        method: "GET",
        url: queryURL1,
      }).then(function (response) {
        $(".UV").text("UV Index: " + response.value);
        console.log(response);
      });

      if (response.value < 2){
          
      }

      // var queryURL3 = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,daily,alerts&appid=${APIkey}`
      // $.ajax ({
      //     method: "GET",
      //     url: queryURL3
      // }).then (function (response){
      //     console.log(response);
      //     for (i = 0; i<5; i++){

      //     }
      // })
    });

    var queryURL2 = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}`;

    $.ajax({
      method: "GET",
      url: queryURL2,
    }).then(function (response) {
      console.log(response);
      console.log(response.list);

      let forecast = [];
      for (var i = 0; i <= response.list.length; i += 8) {
        forecast.push(i);
      }

      console.log(forecast);

      for (var i = 0; i < forecast.length; i++) {
        console.log(i);
        //forecast.forEach(function ())
        var tempF = (response.list[forecast[i]].main.temp - 273.15) * 1.8 + 32;

        $(".wind" + i).text(
          "Wind Speed: " + response.list[forecast[i]].wind.speed + " MPH "
        );
        $(".humidity" + i).text(
          "Humidity: " + response.list[forecast[i]].main.humidity + " % "
        );
        $(".tempF" + i).text("Temperature (F) " + tempF.toFixed(2));

        console.log(tempF);

        var icon = response.list[forecast[i]].weather[0].icon;
        var iconURL = "https://openweathermap.org/img/w/" + icon + ".png";

        $("#icon" + i).attr("src", iconURL);
      }
    });
    }
 

    var initialBtn = $(".initialBtn");
    initialBtn.on("click", function (event) {
    localStorage.setItem("lastSearched", $("#cityValue").val())
      event.preventDefault();
      render();
      //});
    });

    // var searchBtn = $(".searchBar");
    var linkN= $(".linkName")

    linkN.click(function (e){
        alert("Button is good");
        e.preventDefault();

        // var city = $("#cityValue").val().trim();
        // console.log("#cityValue");
        // render ();
    });
  
  
});
//var prevS = $("#Psearched").val();
//if cityName === prevS {
//don't duplicate
//}
