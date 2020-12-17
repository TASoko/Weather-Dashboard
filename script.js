$(document).ready(function () {

    $("#currentDay").text(
        luxon.DateTime.local().toLocaleString({
            weekday: "long",
            month: "long",
            day: "2-digit",
        })
    );

    var initialBtn = $(".initialBtn");
    initialBtn.on("click", function (event) {
        event.preventDefault();

        var cityName = $("#cityValue").val();
        
        var APIkey = "ca7397c46053898d7c12dc596fd7cf71";
        //eventually this will be what the user types in
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`;





        $.ajax({
            method: "GET",
            url: queryURL

        }).then(function (response) {
            console.log(response)
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            console.log(tempF)


            $("#Psearched").append("<li>" + response.name + "</li>");

            $(".city").html("<h1>" + response.name + " Weather Details</h1>");
            $(".wind").text("Wind Speed: " + response.wind.speed + " MPH ");
            $(".humidity").text("Humidity: " + response.main.humidity + " % ");
            $(".tempF").text("Temperature (F) " + tempF.toFixed(2));



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
                url: queryURL1

            }).then(function (response) {
                $(".UV").text("UV Index: " + response.value);
                console.log(response)
            })


            var queryURL3 = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,daily,alerts&appid=${APIkey}`
            $.ajax ({
                method: "GET",
                url: queryURL3
            }).then (function (response){
                console.log(response);
                for (i = 0; i < 5; i++) {
                    var icon = response.daily[i].weather[0].icon;
                    var iconURL = "https://openweathermap.org/img/w/" + icon + ".png";
   
                    $("#icon"+i).attr('src', iconURL);
                }
            })


        });

        var queryURL2 = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}`;

        $.ajax({
            method: "GET",
            url: queryURL2

        }).then(function (response) {
            console.log(response)
            console.log(response.list)

            let forecast = [];
            for (var i = 0; i <= response.list.length; i += 8) {
                forecast.push(i);
            }

        
            console.log(forecast)

            for (var i = 0; i < forecast.length; i++) {
                console.log(i)
                //forecast.forEach(function ())
                var tempF = (response.list[forecast[i]].main.temp - 273.15) * 1.80 + 32;




                $(".wind" + i).text("Wind Speed: " + response.list[forecast[i]].wind.speed + " MPH ");
                $(".humidity" + i).text("Humidity: " + response.list[forecast[i]].main.humidity + " % ");
                $(".tempF" + i).text("Temperature (F) " + tempF.toFixed(2));

                console.log(tempF)

                 

               
            

            }

        })

        //});
    })

})
