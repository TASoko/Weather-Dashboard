var APIkey= "ca7397c46053898d7c12dc596fd7cf71";
//eventually this will be what the user types in
var cityName= "Rome"
var queryURL =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`;
$.ajax({
    method: "GET",
    url: queryURL

}).then(function(response) {
    console.log(response)
    var temp = response.main.temp
    console.log(temp)
});

var initialBtn = $(".initialBtn");

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
// }
// Storing();