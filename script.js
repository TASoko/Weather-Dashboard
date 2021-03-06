$(document).ready(function () {
  function naturalstate() {
    console.log("Javascript is running");
    var lastSearched = localStorage.getItem("lastSearched");
    if (lastSearched !== null) {
      $("#cityValue").val(lastSearched);
      render();
    }
  }
  console.log('before first function call')
  render();
  naturalstate();
  $("#currentDay").text(
    luxon.DateTime.local().toLocaleString({
      weekday: "long",
      month: "long",
      day: "2-digit",
    })
  );

  function render() {
    var cityName = $("#cityValue").val() || "Atlanta";

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

      //   //   var inputBtn = $("<button>");
      var link = $("<nav>");
      //   //link.attr("href", "#");
      link.text(response.name);
      link.addClass("linkName");

      $("#v-pills-home-tab").append(link);
      if (response.name !== cityName) {
      }

      // $("#Psearched").append(inputBtn);
      //  $("#v-pills-tab").append(link);

      //   inputBtn.text(response.name);
      //   inputBtn.addClass("searchBar");
      // $("#Psearched").empty();

      $(".city").html("<h1>" + response.name + " Weather Details</h1>");
      $(".wind").text("Wind Speed: " + response.wind.speed + " MPH ");
      $(".humidity").text("Humidity: " + response.main.humidity + " % ");
      $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);

      var icon1 = response.weather[0].icon;
      var iconURL1 = "https://openweathermap.org/img/w/" + icon1 + ".png";

      $("#bigIcon").attr("src", iconURL1);

      // var icon = response.weather[0].icon;
      // var iconURL = "http://openweathermap.org.img/wn" + icon + ".png";

      var lat = response.coord.lat;
      var lon = response.coord.lon;

      var queryURL1 = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIkey}`;

      $.ajax({
        method: "GET",
        url: queryURL1,
      }).then(function (response) {
        $(".UV").text("UV Index: " + response.value);
        console.log(response);

        UVindexEl = $(".UV");
        var UVindex = response.value;
        if (UVindex <= 2) {
          UVindexEl.removeClass("moderate");
          UVindexEl.removeClass("high");
          UVindexEl.removeClass("very-high");
          UVindexEl.removeClass("extreme");
          UVindexEl.addClass("low");
        } else if (UVindex >= 2 && UVindex <= 5) {
          UVindexEl.removeClass("low");
          UVindexEl.removeClass("high");
          UVindexEl.removeClass("very-high");
          UVindexEl.removeClass("extreme");
          UVindexEl.addClass("moderate");
        } else if (UVindex >= 5 && UVindex <= 7) {
          UVindexEl.removeClass("low");
          UVindexEl.removeClass("moderate");
          UVindexEl.removeClass("very-high");
          UVindexEl.removeClass("extreme");
          UVindexEl.addClass("high");
        } else if (UVindex >= 7 && UVindex <= 10) {
          UVindexEl.removeClass("low");
          UVindexEl.removeClass("moderate");
          UVindexEl.removeClass("high");
          UVindexEl.addClass("extreme");
          UVindexEl.addClass("very-high");
        } else {
          UVindexEl.removeClass("low");
          UVindexEl.removeClass("moderate");
          UVindexEl.removeClass("high");
          UVindexEl.removeClass("very-high");
          UVindexEl.addClass("extreme");
        }
      });
    });

    // var queryURL3 = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,daily,alerts&appid=${APIkey}`
    // $.ajax ({
    //     method: "GET",
    //     url: queryURL3
    // }).then (function (response){
    //     console.log(response);
    //     for (i = 0; i<5; i++){

    //     }
    // })

    var queryURL2 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}`;

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
        var date = new Date(
          response.list[forecast[i]].dt * 1000
        ).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        });
        $(".card-body" + i).append(`
        <h5 class="card-title">${date}</h5>`);

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

    //   };

    var initialBtn = $(".initialBtn");
    initialBtn.on("click", function (event) {
      console.log("Clicked!");
      localStorage.setItem("lastSearched", $("#cityValue").val());

      event.preventDefault();
      render();

      //});
    });

    // function display (){
    //   var cityscreen = $(".tab-pane");
    //   if (cityscreen.style.display === "none"){
    //     cityscreen.style.display = "block";
    //   }else {
    //     cityscreen.display = "none";
    //   }
    //   render ();
    // }
    // display ()

    // var searchBtn = $(".searchBar");
    // var linkN = $(".linkName");

    // linkN.click(function (e) {
    //   alert("Button is good");
    //   e.preventDefault();

    //   var city = $("#cityValue").val().trim();
    //   console.log("#cityValue");
    //   render ();
    // });
  }
});
//var prevS = $("#Psearched").val();
//if cityName === prevS {
//don't duplicate
//}
