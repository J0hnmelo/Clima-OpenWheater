const apiKey = "1443cb945bf1df2d3a4e66680d04ac79"
const apiCountryURL = "https://www.countryflagicons.com/FLAT/64/" // BR.png

const cityInput = document.querySelector("#isearch-city");
const searchBtn = document.querySelector("#search");

const cityEl = document.querySelector("#choserCity");
const tempEl = document.querySelector("#temperature span");
const descEl = document.querySelector("#clima-description");
const weatherIconEl = document.querySelector("#weather-icon");
const countryEl = document.querySelector("#country");
const umidityEl = document.querySelector("#umidade span");
const windEl = document.querySelector("#wind span");

const weatherInfo = document.querySelector(".infoClima")
//Functions
const getWeatherData = async(city)/*função assíncrona*/ => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);/*await é para esperar o retorno da busca */
    const data = await res.json();
    console.log(data);
    weatherInfo.classList.remove("hide");
    return data
}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);
    if(data.name == undefined){
        cityEl.innerHTML = "Não encontrado"
        tempEl.innerHTML = "";
        descEl.innerHTML = "";
        weatherIconEl.setAttribute("src",``);
        countryEl.setAttribute("src", ``);
        umidityEl.innerHTML = ``;
        windEl.innerHTML = ``;
    }else{
        cityEl.innerHTML = data.name;
        tempEl.innerHTML = parseInt(data.main.temp);
        descEl.innerHTML = data.weather[0].description;
        weatherIconEl.setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        countryEl.setAttribute("src", `https://www.countryflagicons.com/FLAT/64/${data.sys.country}.png`);
        umidityEl.innerHTML = `${data.main.humidity}%`
        windEl.innerHTML = `${data.wind.speed}km/h`
    }


};


//Events

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if(e.code == "Enter"){
        const city = e.target.value;

        showWeatherData(city);
    }
    


});
