const apiKey = "de5ccbfb425fd32a4038020ec3d384c9"

const searchInput = document.querySelector('#loc');
const searchBtn = document.querySelector('#btn-loc');

const cityElement = document.querySelector('#loc-atual');
const tempElement = document.querySelector('#temp');
const maxElement = document.querySelector('#max');
const minElement = document.querySelector('#min');
const windElement = document.querySelector('#wind');
const humidityElement = document.querySelector('#humidity');

const getWeatherData = async(city)=> {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const response = await fetch (url);
  const data = await response.json();
  console.log(data)
  return data;
}

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp); 
  maxElement.innerText = parseInt(data.main.temp_max) + "°C";
  minElement.innerText = parseInt(data.main.temp_min) + "°C";
  windElement.innerText = parseInt(data.wind.speed) + "km/h";
  humidityElement.innerText = parseInt(data.main.humidity) + "%";

} 

searchBtn.addEventListener("click", (e)=>{
      e.preventDefault();
      const city = searchInput.value;
      showWeatherData(city);

})


function showInput() {
  if (window.innerWidth < 1100){
    const input = document.querySelector("#loc");
    input.style.visibility = "visible";
  }
}

  function hideInput() {
    if (window.innerWidth < 1100 ){
    const input = document.querySelector("#loc");
    input.style.visibility = "hidden";
    }
  }

