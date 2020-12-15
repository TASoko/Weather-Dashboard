$(document).ready(function () {

    $("#currentDay").text(
        luxon.DateTime.local().toLocaleString({
            weekday: "long",
            month: "long",
            day: "2-digit",
        })
    );


    var APIkey = "ca7397c46053898d7c12dc596fd7cf71";
    //eventually this will be what the user types in
    //var cityName = "Rome";
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=Rome&appid=${APIkey}`;

    var initialBtn = $(".initialBtn");

    //initialBtn.click(function () {





        $.ajax({
            method: "GET",
            url: queryURL

        }).then(function (response) {
            console.log(response)
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            console.log(tempF)


            $(".city").html("<h1>" + response.name + " Weather Details</h1>");
            $(".wind").text("Wind Speed: " + response.wind.speed + " MPH ");
            $(".humidity").text("Humidity: " + response.main.humidity + " % ");
            $(".tempF").text("Temperature (F) " + tempF.toFixed(2));


            console.log("Wind Speed: " + response.wind.speed);
            console.log("Humidity: " + response.main.humidity);
            //console.log("Temperature (F): " + tempF);

            var lat = (response.coord.lat);
            var lon = (response.coord.lon);

            var queryURL1 = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIkey}`;

            $.ajax({
                method: "GET",
                url: queryURL1

            }).then(function (response) {
                $(".UV").text("UV Index: " + response.value);
                console.log(response)
            })


        });
        
        var queryURL2 = `http://api.openweathermap.org/data/2.5/forecast?q=Rome&appid=${APIkey}`;

        $.ajax({
            method: "GET",
            url: queryURL2

        }).then(function (response) {
            console.log(response)
            console.log(response.list)
    
        let forecast = [];
        for (var i=0; i<=response.list.length;i += 8){
           forecast.push(i);
        }
        
        console.log(forecast)
        for (var i=0; i<forecast.length; i++) {
             $("#card1")
         }
         var tempF = (response.list[forecast[0]].main.temp - 273.15) * 1.80 + 32;

         $(".wind1").text("Wind Speed: " + response.list[forecast[0]].wind.speed + " MPH ");
         $(".humidity1").text("Humidity: " + response.list[forecast[0]].main.humidity + " % ");
         $(".tempF1").text("Temperature (F) " + tempF.toFixed(2));
     

         $(".wind2").text("Wind Speed: " + response.list[forecast[1]].wind.speed + " MPH ");
         $(".humidity2").text("Humidity: " + response.list[forecast[1]].main.humidity + " % ");

       
       
         $(".wind3").text("Wind Speed: " + response.list[forecast[2]].wind.speed + " MPH ");
         $(".humidity3").text("Humidity: " + response.list[forecast[2]].main.humidity + " % ");



         $(".wind4").text("Wind Speed: " + response.list[forecast[3]].wind.speed + " MPH ");
         $(".humidity4").text("Humidity: " + response.list[forecast[3]].main.humidity + " % ");



         $(".wind5").text("Wind Speed: " + response.list[forecast[4]].wind.speed + " MPH ");
         $(".humidity5").text("Humidity: " + response.list[forecast[4]].main.humidity + " % ");


            //for loop to grab for time of the date called - filtering
            //0, 7, 15,

            //dot push into a new array
            //create blank array - forecast
            //each card id 1-5
            //new for loop, run through new array to run through length, i+ when targeting id
            //target 5 
        })

    //});
});   
// for (var i=0; i<response.length;i+8){
//     $(".card").text(response[i].Day)
//         $("<div>").text(response[i].Time)
// }

//One API 3 queries
//





// initalBtn.on("click", function () {
//   let hour = $(this).siblings(".hour").text();
//   let input = $(this).siblings("#input").val();
//   // console.log(input);
//   // console.log(hour);

//   localStorage.setItem(hour, input);
// });

// function Storing (){
//     $(".hour").each(function(){
//         let time = $(this).text();
//         let text = localStorage.getItem(time);
//     if (text !== null) {
//         $(this).siblings("textarea").val(text);
//     }
//     });
// 
