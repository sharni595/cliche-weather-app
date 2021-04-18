var searchButton = document.getElementById("search-button");
var cityNameSearch = document.getElementById("city-name");
var cityNameToday = document.getElementById("city-today");
var uvIndex = document.getElementById("uv-index");
var todaysWeather = document.querySelector("todays-weather");

function submitNameSearch(event){

    $("#future-forecast").html("");
    
    var cityName = cityNameSearch.value.trim();

    if (cityName){
        searchWeather(cityName);
        cityNameToday.textContent = cityName + moment().format("(MM/DD/YYYY)");
        cityNameSearch.value = "";
    }else{
        alert("Please enter a valid city name");
    }

}

function searchWeather(city){
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=6d97afac271bf76bda029031ba851c8a&units=imperial";

    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            //uv index
            getUvIndex(data.coord.lat, data.coord.lon);
            getForecast(city);
            console.log(data, city);
        });
    });
};


function getUvIndex(latitude, longitude){
    var apiUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=6d97afac271bf76bda029031ba851c8a";

    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data.value);
            uvIndex.textContent = data.value;

            if (uvIndex.textContent < 3){
                uvIndex.setAttribute("style", "background-color:green;");
            } else if(uvIndex.textContent < 6){
                uvIndex.setAttribute("style", "background-color:yellow;");
            } else if(uvIndex.textContent < 8){
                uvIndex.setAttribute("style", "background-color:orange;");
            }else{
                uvIndex.setAttribute("style", "background-color:red;");
            }
        });
    });
}

function getForecast(searchValue){

    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=6d97afac271bf76bda029031ba851c8a&units=imperial";

    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            //uv index
            console.log(data);
            for (var i = 4; i < 40; i += 8){
                $("#future-forecast").append(`
                <div class="card">
                    <h6 class="future-date"></h6>
                    <img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png">
                    <ul>
                        <li>Temp: ${data.list[i].main.temp}</li>
                        <li>Wind: ${data.list[i].wind.speed}</li>
                        <li>Humidity: ${data.list[i].main.humidity}</li>
                    </ul>
                </div>
                `)
               
            }
            for (var x = 1; x <= 5; x++){
                $(".future-date").eq(x - 1).text(moment().add([x], "d").format("(MM/DD/YYYY)"));
                console.log($(".future-date").text());
            }
        });

    });
}


//function to display all dynamic info on the page 
function displayWeather(weather, searchValue){
    
    cityNameToday.textContent = "";
    todaysWeather.textContent = "";
    
    
}

searchButton.addEventListener("click", function(){
    submitNameSearch();
});
