const apiKey = '26e31cbc35c784618479d84d29ae4e03'; 

const cityInput = document.querySelector('.city-input');
const searchButton = document.querySelector('.search-btn');

const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city');
const weatherInfoSection = document.querySelector('.weather-info');

const countryText = document.querySelector('.country-txt');
const tempText = document.querySelector('.temp-txt');
const conditionText = document.querySelector('.condition-txt');
const humidityText = document.querySelector('.humidity-value-txt');
const windText = document.querySelector('.wind-value-txt');
const weatherSummaryImage = document.querySelector('.weather-summary-img');
const currentDateText = document.querySelector('.current-date-txt')

searchButton.addEventListener('click', () => {
    if(cityInput.value.trim()!=''){
        update_weather_info(cityInput.value);
        cityInput.value = ' '
        cityInput.blur();
    }  
});

cityInput.addEventListener('keydown', (event) => {
    if(event.key == "Enter" && cityInput.value.trim() != ''){
        update_weather_info(cityInput.value);
        cityInput.value = ' '
        cityInput.blur();
    }
    
});

async function getFetchData(endPoint, city){
    const apiURL = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
    const respose = await fetch(apiURL);

    return respose.json();
}

function getWeatherIcon(id){
    if(id <= 232) return 'thunderstorm.svg';
    if(id <= 321) return 'drizzle.svg';
    if(id <= 531) return 'rain.svg';
    if(id <= 622) return 'snow.svg';
    if(id <= 781) return 'atmosphere.svg';
    if(id == 800) return 'clear.svg';
    else return 'clouds.svg';
}

function getCurrentDate(){
    const currentDate = new Date();
    const options = { 
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }
    return currentDate.toLocaleDateString('en-GB', options);
}

async function update_weather_info(city){
    const weather_data = await getFetchData('weather', city);

    if(weather_data.cod != 200){
        showDisplaySection(notFoundSection);
        return
    }

    console.log(weather_data);
    
    const{
        name: country,
        main: {temp, humidity},
        weather: [{id, main}],
        wind: {speed}
    } = weather_data

    countryText.textContent = country;
    tempText.textContent = Math.round(temp) + ' °C';
    conditionText.textContent = main;
    humidityText.textContent = humidity + '%';
    windText.textContent = speed + ' M/s';
    weatherSummaryImage.src = `assets/weather/${getWeatherIcon(id)}`;
    currentDateText.textContent = getCurrentDate();

    showDisplaySection(weatherInfoSection);
}

function showDisplaySection(section){
    [weatherInfoSection, searchCitySection, notFoundSection]
        .forEach(section => section.style.display = 'none');

    section.style.display = 'flex';
}