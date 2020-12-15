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
            var tempF = (response.list[8].main.temp - 273.15) * 1.80 + 32;

            $(".wind1").text("Wind Speed: " + response.list[8].wind.speed + " MPH ");
            $(".humidity1").text("Humidity: " + response.list[8].main.humidity + " % ");
            $(".tempF1").text("Temperature (F) " + tempF.toFixed(2));


            // console.log("Wind Speed: " + response.time.wind.speed);
            // console.log("Humidity: " + response.main.humidity);
            let str = "";
            var arr = [];
        for (var i=0; i<response.list.length;i+8){
           arr.push(i)
        }
        console.log(arr)


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
