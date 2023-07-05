const appKey = "You can get api key from api.openweather.org"

const searchButton = document.querySelector('#search-btn')
const searchInput = document.querySelector('#search-txt')
const cityName = document.querySelector('.city')
const icon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temp')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')

searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

function enterPressed(event) {
    if (event.key == "Enter") {
        findWeatherDetails();
    }
}

function findWeatherDetails() {
    if (searchInput.value === "") {
    
    } else {
        const searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + appKey;
        httpRequestAsync(searchLink, theResponse);
        document.querySelector(".error").style.display = "none"
        document.querySelector(".weather").style.display = "block"
    }
}

function theResponse(response) {
    const jsonObject = JSON.parse(response);
    cityName.innerHTML = jsonObject.name;
    icon.src = 'http://openweathermap.org/img/w/' + jsonObject.weather[0].icon + ".png";
    temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°C";
    humidity.innerHTML = jsonObject.main.humidity + "%";
    wind.innerHTML = jsonObject.wind.speed + " km/hr"

}

function httpRequestAsync(url, callback) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if(httpRequest.readyState == 4 && httpRequest.status == 200) {
            callback(httpRequest.responseText);
        }
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
}
