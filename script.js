const apiKey = "229a2b477f59a7ffcc149ca5e77050d5";

const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";









async function getWeather(city) {

    try {

        let response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        let data = await response.json();

        console.log(data);

        if (response.status !== 200) {

            document.getElementById("error").innerText =
                "City not found";

            return;
        }

        // Remove old error
        document.getElementById("error").innerText = "";

        // Display all weather data
        displayWeather(data);
    }

    catch (error) {

        console.log(error);

        document.getElementById("error").innerText =
            "Something went wrong";
    }
}


// DISPLAY WEATHER
function displayWeather(data) {

    document.getElementById("city").innerText =
        data.name;

    document.getElementById("temperature").innerText =
        Math.round(data.main.temp) + "°C";

    document.getElementById("description").innerText =
        data.weather[0].description;

    document.getElementById("feelsLike").innerText =
        Math.round(data.main.feels_like) + "°C";

    document.getElementById("humidity").innerText =
        data.main.humidity + "%";

    document.getElementById("wind").innerText =
        data.wind.speed + " m/s";

    document.getElementById("maxTemp").innerText =
        Math.round(data.main.temp_max) + "°C";

    document.getElementById("minTemp").innerText =
        Math.round(data.main.temp_min) + "°C";

    document.getElementById("clouds").innerText =
        data.clouds.all + "%";

    document.getElementById("visibility").innerText =
        (data.visibility / 1000).toFixed(1) + " km";

    document.getElementById("windDirection").innerText =
        data.wind.deg + "°";

    document.getElementById("pressure").innerText =
        data.main.pressure + " hPa";

    document.getElementById("sunrise").innerText =
        convertTime(data.sys.sunrise);

    document.getElementById("sunset").innerText =
        convertTime(data.sys.sunset);

    document.getElementById("date").innerText =
        new Date().toDateString();

    changeWeatherIcon(data.weather[0].main);
}



function changeWeatherIcon(weather) {

    let icon =
        document.getElementById("weatherIcon");

    icon.className =
        "weather-icon fa-solid";

    if (weather === "Clear") {
        icon.classList.add("fa-sun");
    }
    else if (weather === "Clouds") {
        icon.classList.add("fa-cloud");
    }
    else if (weather === "Rain") {
        icon.classList.add("fa-cloud-rain");
    }
    else if (weather === "Drizzle") {
        icon.classList.add("fa-cloud-showers-heavy");
    }
    else if (weather === "Thunderstorm") {
        icon.classList.add("fa-bolt");
    }
    else if (weather === "Snow") {
        icon.classList.add("fa-snowflake");
    }
    else {
        icon.classList.add("fa-cloud");
    }
}



function convertTime(timestamp) {

    let date =
        new Date(timestamp * 1000);
        console.log(date.toLocaleTimeString());

    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}


document.getElementById("searchButton").addEventListener(
    "click",
    function () {

        let city =
            document.getElementById("searchBox").value.trim();

        if (city === "") {

            document.getElementById("error").innerText =
                "Please enter a city name";

            return;
        }

        getWeather(city);
    }
);



document.getElementById("searchBox").addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            let city =
                document.getElementById("searchBox").value.trim();

            if (city === "") {

                document.getElementById("error").innerText =
                    "Please enter a city name";

                return;
            }

            getWeather(city);
        }
    }
);