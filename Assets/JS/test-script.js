// getInfo();

function getWeather(city) {
    var APIkey = "4971bbf933e132e86212d1bc1c100553";
    var city;

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",USA&units=imperial&appid=" + APIkey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var today = new Date();
        var date = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
        var icon = response.weather[0].icon;
        var newDiv = $("<div>");
        newDiv.addClass("searchItem");


        console.log(response.weather[0].main);

        if (response.weather[0].main !== null) {
            icon = ("<img id='icon' src='http://openweathermap.org/img/wn/" + icon + "@2x.png'>");
        }
        console.log(response);



        var newCity = $("<h1 class='searchTitle'>" + (response.name) + " " + icon + " " + date + "</h1>");
        var newTemp = $("<p> Temperature: " + (response.main.temp) + "°F</p>");
        var newHum = $("<p> Humidity: " + (response.main.humidity) + "%</p>");
        var newSpeed = $("<p> Wind Speed: " + (response.wind.speed) + "mph</p>");



        newDiv.append(newCity);
        newDiv.append(newTemp);
        newDiv.append(newHum);
        newDiv.append(newSpeed);

        $("#right-container").append(newDiv);

    })
}


//   var cities = [];

//   $("#searchBtn").on("click", function(){

//     var searchBarResult = $("#searchBar").val();
//     city = $(".searchItem").val(getWeather(searchBarResult));

//     getWeather(city);


// cities.push(searchBarResult);


//  var leftBtn = $("<button>"+(searchBarResult)+"</button>");
//  leftBtn.attr("data-city",(searchBarResult));
//  leftBtn.addClass("searchList");

//  $(".searchHolder").append(leftBtn);

//  localStorage.setItem("city", searchBarResult);

// })


//   function getInfo() {
//       var stayOnScreen = localStorage.getItem("city");
//       if(stayOnScreen) { 

//      var rememberedButton = $("<button>"+(stayOnScreen)+"</button>");
//      rememberedButton.attr("data-city",(stayOnScreen));
//      rememberedButton.addClass("searchList");

//      $(".searchHolder").append(rememberedButton);

//     }
//   }

// var savedLocations = JSON.parse(localStorage.getItem("oldLocation"));

// if (savedLocations){ 
//     savedSearch()
// } else {
//     savedLocations = []
// }




var cities = JSON.parse(localStorage.getItem("city"));

if (cities) {
    beGotten()
} else {
    cities = []
}

function beGotten() {
    $(".searchHolder").html("");
    for (var i = 0; i < cities.length; i++) {
        var leftBtn = $("<button>");
        // leftBtn.attr("data-city",(searchBarResult));
        leftBtn.addClass("searchList");
        leftBtn.attr("data-city", (cities[i]));
        leftBtn.text(cities[i]);
        $(".searchHolder").append(leftBtn);

    }
}


$("#searchBtn").on("click", function () {

    var searchBarResult = $("#searchBar").val();
    city = $(".searchItem").val(getWeather(searchBarResult));

    getWeather(city);

    cities.unshift(searchBarResult);

    localStorage.setItem("city", JSON.stringify(cities))


    console.log(cities);

})

$(".clearBtn").on("click", function () {

    localStorage.clear();
    $(".searchList").attr("style", "display: none;")
})


$(".searchHolder").on("click", "button", function () {
    $(".bigDisplay").empty();
    $(".card-deck").empty();
    $(".fiveDay").empty();
    

    var bigT = $(this).attr("data-city");
    var item = $(".searchItem");
    item.attr("style", "display: none;");
    var bigH = $("<h1>" + bigT + "</h1>");
    var bigD = $(".bigDisplay");
    bigD.attr("style", "display: block;");

    bigD.append(bigH);

    var APIkey = "4971bbf933e132e86212d1bc1c100553";


    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + bigT + ",USA&units=imperial&appid=" + APIkey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var today = new Date();
        var date = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
        var icon = response.weather[0].icon;
        if (response.weather[0].main !== null) {
            icon = ("<img id='icon' src='http://openweathermap.org/img/wn/" + icon + "@2x.png'>");
        }

        var newCity = $("<h1>" + icon + "</h1>");
        var newDate = $("<h2>" + date + "</h2>");
        var newTemp = $("<p> Temperature: " + (response.main.temp) + " °F</p>");
        var newHum = $("<p> Humidity: " + (response.main.humidity) + "%</p>");
        var newSpeed = $("<p> Wind Speed: " + (response.wind.speed) + " mph</p>");
        var newLong = (response.coord.lon);
        var newLat = (response.coord.lat);
        var uvFix = $("<p class='lat'>" + newLat + "</p>");
        var uvFix1 = $("<p class ='lon'>" + newLong + "</p>");
        uvFix.attr("style", "display: none;");
        uvFix1.attr("style", "display: none;");




        bigD.append(newCity);
        bigD.append(newDate);
        bigD.append(newTemp);
        bigD.append(newHum);
        bigD.append(newSpeed);
        bigD.append(uvFix);
        bigD.append(uvFix1);



        getUV(newLong, newLat);

        createBottomBlocks();

        console.log(newLong, newLat);

    })
})




function createBottomBlocks() {

     $("#right-container").append($("<h2 class='fiveDay'>5 Day Forecast:</h2>"));

    var APIkey = "4971bbf933e132e86212d1bc1c100553";

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + $("h1").text() + " &units=imperial&appid=" + APIkey;



    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        

        for (i = 0; i < 40; i++) {




        console.log(response);
        var today = new Date();
        var month = (today.getMonth() + 1) + "/";
        var day = + today.getDate();
        var year = + today.getFullYear();


        if((response.list[i].dt_txt).includes("12:00:00") === true && i < 10) { 
            
            var icon = response.list[i].weather[0].icon;
            
            if (response.list[i].weather[0].main !== null) {
            icon = ("<img id='icon' src='http://openweathermap.org/img/wn/" + icon + "@2x.png'>");
        }

            
           

            var blueTemp = $("<p class = 'blueTemp'>Temp: " + response.list[i].main.temp + " °F</p>");
            var blueHum = $("<p class = 'blueHum'>Humidity: " + response.list[i].main.humidity + "%</p>");
            var blueIcon = $("<h1>"+icon+"</h1>");

            // var blueTemp1 = $("<p class = 'blueTemp-"+ i +"'>" + response.list[i].main.temp + "</p>");
            // var blueTemp2 = $("<p class = 'blueTemp2' >" + response.list[i].main.temp + "</p>");
            // var blueTemp3 = $("<p class = 'blueTemp3' >" + response.list[i].main.temp + "</p>");
            // var blueTemp4 = $("<p class = 'blueTemp4' >" + response.list[i].main.temp + "</p>");


          
        


        var blueTitle = $("<h1 class = blueTitle>" + (response.list[i].dt_txt).replace('12:00:00', '') + "</h1>");
        blueTitle.text(month + (day + 1) + '/' + year);
        var blueTitle1 = $("<h1 class = blueTitle1>" + (response.list[i].dt_txt).replace('12:00:00', '') + "</h1>");
        blueTitle1.text(month + (day + 2) + '/' + year);
        var blueTitle2 = $("<h1 class = blueTitle2>" + (response.list[i].dt_txt).replace('12:00:00', '') + "</h1>");
        blueTitle2.text(month + (day + 3) + '/' + year);
        var blueTitle3 = $("<h1 class = blueTitle3>" + (response.list[i].dt_txt).replace('12:00:00', '') + "</h1>");
        blueTitle3.text(month + (day + 4) + '/' + year);
        var blueTitle4 = $("<h1 class = blueTitle4>" + (response.list[i].dt_txt).replace('12:00:00', '') + "</h1>");
        blueTitle4.text(month + (day + 5) + '/' + year);


        } else if((response.list[i].dt_txt).includes("12:00:00") === true &&  i > 10 && i < 20) { 

            var icon1 = response.list[i].weather[0].icon;
            
            if (response.list[i].weather[0].main !== null) {
            icon1 = ("<img id='icon' src='http://openweathermap.org/img/wn/" + icon1 + "@2x.png'>");
        }
            var blueTemp1 = $("<p class = 'blueTemp1'>Temp: " + response.list[i].main.temp + " °F</p>");
            var blueHum1 = $("<p class = 'blueHum1'>Humidity: " + response.list[i].main.humidity + "%</p>");
            var blueIcon1 = $("<h1>"+icon1+"</h1>");

        } else if((response.list[i].dt_txt).includes("12:00:00") === true && i > 20 && i < 30) { 
            var icon2 = response.list[i].weather[0].icon;
            
            if (response.list[i].weather[0].main !== null) {
            icon2 = ("<img id='icon' src='http://openweathermap.org/img/wn/" + icon2 + "@2x.png'>");
        }

            var blueTemp2 = $("<p class = 'blueTemp2' >Temp: " + response.list[i].main.temp + " °F</p>");
            var blueHum2 = $("<p class = 'blueHum2'>Humidity: " + response.list[i].main.humidity + "%</p>");
            var blueIcon2 = $("<h1>"+icon2+"</h1>");

        } else if((response.list[i].dt_txt).includes("12:00:00") === true && i >= 30 && i < 34) { 
            var icon3 = response.list[i].weather[0].icon;
            
            if (response.list[i].weather[0].main !== null) {
            icon3 = ("<img id='icon' src='http://openweathermap.org/img/wn/" + icon3 + "@2x.png'>");
        }

            var blueTemp3 = $("<p class = 'blueTemp3' >Temp: " + response.list[i].main.temp + " °F</p>");
            var blueHum3 = $("<p class = 'blueHum3'>Humidity: " + response.list[i].main.humidity + "%</p>");
            var blueIcon3 = $("<h1>"+icon3+"</h1>");

        } else if((response.list[i].dt_txt).includes("12:00:00") === true && i > 34) { 
            var icon4 = response.list[i].weather[0].icon;
            
            if (response.list[i].weather[0].main !== null) {
            icon4 = ("<img id='icon' src='http://openweathermap.org/img/wn/" + icon4 + "@2x.png'>");
        }

            var blueTemp4 = $("<p class = 'blueTemp4' >Temp: " + response.list[i].main.temp + " °F</p>");
            var blueHum4 = $("<p class = 'blueHum4'>Humidity: " + response.list[i].main.humidity + "%</p>");
            var blueIcon4 = $("<h1>"+icon4+"</h1>");

        }

    

        console.log(response.city.name);
            

                // var blueBoxTemp1 = $(".blueBox-0");
                
        
            


        }

        $(".card-body-0").append(blueTitle);
        $(".card-body-1").append(blueTitle1);
        $(".card-body-2").append(blueTitle2);
        $(".card-body-3").append(blueTitle3);
        $(".card-body-4").append(blueTitle4);
        blueTitle.append(blueIcon);
        blueIcon.append(blueTemp);
        blueTemp.append(blueHum);
        blueTitle1.append(blueIcon1);
        blueIcon1.append(blueTemp1);
        blueTemp1.append(blueHum1);
        blueTitle2.append(blueIcon2);
        blueIcon2.append(blueTemp2);
        blueTemp2.append(blueHum2);
        blueTitle3.append(blueIcon3);
        blueIcon3.append(blueTemp3);
        blueTemp3.append(blueHum3);
        blueTitle4.append(blueIcon4);
        blueIcon4.append(blueTemp4);
        blueTemp4.append(blueHum4);
        



    //     console.log(blueTemps);

    //    for ( i = 0; i < 5; i++) { 
    //        $(".blueTemp").addClass("blueTemp-"+i);
    //        console.log($(".blueTemp"));
    //    }

    })



    // var newCardDeck = $("<div class='card-deck'</div>");


    var newCardText = $("<div class='card-text'>Some text inside</p>");


    
    $("#right-container").append($(".card-deck"));

    for (i = 0; i < 5; i++) {
        var newCardPrim = $("<div id = 'card' class='card-main bg-primary'></div>");
        var newCardBody = $("<div class='card-body-" + i + "' " + "'text-center' ></div>")

        $(".card-deck").append(newCardPrim);
        newCardPrim.append(newCardBody);
    }




}

function getUV() {
    var APIkey = "4971bbf933e132e86212d1bc1c100553";
    var lat = $(".lat").text();
    var lon = $(".lon").text();

    console.log(lat,lon);



    var queryURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + APIkey + "&lat=" + lat + "&lon=" + lon + "&cnt=1";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response)

        

        var newUV = $("<p class = newUV>UV Index: <button type='button' class='btn btn-danger'>" + (response[0].value) + "</button></p>");
        $(".bigDisplay").append(newUV);


    })
}

