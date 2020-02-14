getInfo();

function getWeather(city) { 
    var APIkey = "4971bbf933e132e86212d1bc1c100553";
    var city; 
  
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city + ",USA&units=imperial&appid=" +APIkey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
  
    var today = new Date();
    var date = (today.getMonth()+1)+"/"+today.getDate() + "/" + today.getFullYear();
    var icon = response.weather[0].icon;
    var newDiv = $("<div>");
    newDiv.addClass("searchItem");


    console.log(response.weather[0].main);

    if(response.weather[0].main !== null){ 
        icon = ("<img id='icon' src='http://openweathermap.org/img/wn/"+ icon +"@2x.png'>"); 
    }
    console.log(response);



    var newCity = $("<h1 class='searchTitle'>"+(response.name) + " "+ icon + " "+  date+ "</h1>");
    var newTemp = $("<p> Temperature: " + (response.main.temp)+ "°F</p>"); 
    var newHum = $("<p> Humidity: " + (response.main.humidity)+"%</p>");
    var newSpeed= $("<p> Wind Speed: "+ (response.wind.speed)+"mph</p>");
    
    

    newDiv.append(newCity);
    newDiv.append(newTemp);
    newDiv.append(newHum);
    newDiv.append(newSpeed);
    
    $("#right-container").append(newDiv);

   })
  }
  
  
  var cities = [];
  
  $("#searchBtn").on("click", function(){

    var searchBarResult = $("#searchBar").val();
    city = $(".searchItem").val(getWeather(searchBarResult));
    
    getWeather(city);
  
    
    cities.push(searchBarResult);
    
    
     var leftBtn = $("<button>"+(searchBarResult)+"</button>");
     leftBtn.attr("data-city",(searchBarResult));
     leftBtn.addClass("searchList");
  
     $(".searchHolder").append(leftBtn);
           
     localStorage.setItem("city", searchBarResult);
  
    })


  function getInfo() {
      var stayOnScreen = localStorage.getItem("city");
      if(stayOnScreen) { 

     var rememberedButton = $("<button>"+(stayOnScreen)+"</button>");
     rememberedButton.attr("data-city",(stayOnScreen));
     rememberedButton.addClass("searchList");
  
     $(".searchHolder").append(rememberedButton);

    }
  }
  
  

//   $(".searchHolder").on("click", "button",  function() { 
  
//     var bigT = $(this).attr("data-city");
//     var item = $(".searchItem");
//     item.attr("style","display: none;");
//     var bigH = $("<h1>"+bigT+"</h1>");
//     var bigD = $(".bigDisplay");
//     bigD.attr("style","display: block;");
  
//     bigD.append(bigH);
  
//     var APIkey = "4971bbf933e132e86212d1bc1c100553";
    
  
//     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ bigT + ",USA&units=imperial&appid=" +APIkey;
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response){
  
//     var today = new Date();
//     var date = (today.getMonth()+1)+"/"+today.getDate() + "/" + today.getFullYear();
      
//     var newCity = $("<h1>"+ date+ "</h1>");
//     var newTemp = $("<p> Temperature: " + (response.main.temp)+ "°</p>"); 
//     var newHum = $("<p> Humidity: " + (response.main.humidity)+"%</p>");
//     var newSpeed= $("<p> Wind Speed: "+ (response.wind.speed)+"mph</p>");
//     var newLong = (response.coord.lon);
//     var newLat = (response.coord.lat);
//     var uvFix = $("<p class='lat'>"+newLat+"</p>");
//     var uvFix1 = $("<p class ='lon'>"+newLong+"</p>");
//     uvFix.attr("style","display: none;");
//     uvFix1.attr("style","display: none;");
  
  
//     bigD.append(newCity);
//     bigD.append(newTemp);
//     bigD.append(newHum);
//     bigD.append(newSpeed);
//     bigD.append(uvFix);
//     bigD.append(uvFix1);
    
    
    
//     getUV(newLong,newLat);

 
//     var newCardDeck = $("<div class='card-deck'></div>");
//     var newCardPrim = $("<div id = 'card' class='card-main bg-primary'></div>");
//     var newCardBody = $("<div class='card-body text-center'></div>")
//     var newCardText = $("<div class='card-text'>Some text inside</p>");

    

//     $("#right-container").append(newCardDeck);
//     newCardDeck.append(newCardPrim);
//     newCardPrim.append(newCardBody);

    
//    })
//   })
  
  
//   function getUV() { 
//     var APIkey = "4971bbf933e132e86212d1bc1c100553";
//     var lat = $(".lat").text();
//     var lon = $(".lon").text();
  
  
  
//     var queryURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid="+APIkey+"&lat="+lat+"&lon="+lon+"&cnt=1";
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response){

//     var newUV = $("<p class = newUV>UV Index: <button type='button' class='btn btn-danger'>"+(response[0].value)+"</button></p>");
//     $(".bigDisplay").append(newUV);


//   })
//   }