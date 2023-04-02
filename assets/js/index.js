import config from './config.js';
const apiKey = (config.API_KEY);

const form = document.querySelector("#my-form");
const searchInput = document.querySelector("#loc");
const searchBtn = document.querySelector("#btn-loc");

const cityElement = document.querySelector("#loc-atual");
const tempElement = document.querySelector("#temp");
const maxElement = document.querySelector("#max");
const minElement = document.querySelector("#min");
const windElement = document.querySelector("#wind");
const humidityElement = document.querySelector("#humidity");
const errorElement = document.querySelector("#error");

//acesso a classe sun-chart para manipular o valor da variável(pos-x) que controla o ícone do sol.
const sunChart = document.querySelector(".sun-chart");
//acesso a classe now para atualizar a hora no gráfico do sol.
const horaSol = document.querySelector(".now");

const getWeatherData = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
};

//Essa função converte o dado(timezone) que vem da API para o formato "HH:mm:ss"
function getTimezoneOffset(timezone) {
  const timezoneOffsetInHours = timezone / 3600;
  const sign = timezoneOffsetInHours > 0 ? "-" : "+";
  const hours = Math.abs(Math.floor(timezoneOffsetInHours));
  const minutes = Math.abs(Math.floor((timezoneOffsetInHours - hours) * 60));
  const formattedTimezone = `${sign}${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}`;
  return formattedTimezone;
}

const showWeatherData = async (city) => {
  try {
    const data = await getWeatherData(city);

    cityElement.innerText = `${data.name}, ${data.sys.country}`;
    tempElement.innerText = parseInt(data.main.temp);
    maxElement.innerText = `${parseInt(data.main.temp_max)} °`;
    minElement.innerText = `${parseInt(data.main.temp_min)} °`;
    windElement.innerText = `${parseInt(data.wind.speed)}km/h`;
    humidityElement.innerText = `${parseInt(data.main.humidity)}%`;

    const timezoneOffset = getTimezoneOffset(data.timezone);
    const localTime = new Date(
      Date.now() + data.timezone * 1000
    ).toLocaleTimeString("pt-BR");
    horaSol.textContent = localTime;

    const hora = parseInt(localTime.substring(0, 2));

    if (hora < 6 || hora > 18) {
      sunChart.style.setProperty("--pos-x", "100");
    } else {
      const validHours = {
        6: 7,
        7: 14,
        8: 21,
        9: 28,
        10: 36,
        11: 43,
        12: 50,
        13: 57,
        14: 65,
        15: 72,
        16: 79,
        17: 86,
        18: 93,
      };

      const validHour = validHours[hora];
      console.log(validHour);
      sunChart.style.setProperty("--pos-x", `${validHour}`);
    }
  } catch (error) {
    console.error(error);
    cityElement.innerHTML = "Cidade não encontrada";
  }
};

let firstClick = true;
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (firstClick) {
    searchInput.focus();
    firstClick = false;
  } else {
    const city = searchInput.value;
    if (city.trim() !== "") {
      // verifica se o input não está vazio
      showWeatherData(city);
    } else {
      cityElement.innerHTML = "Digite o nome de uma cidade!"; // exibe uma mensagem de alerta se o input estiver vazio
    }
  }
});

searchInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;

    showWeatherData(city);
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const city = searchInput.value;
  if (city.trim() !== "") {
    showWeatherData(city);
  } else {
    cityElement.innerHTML = "Digite o nome de uma cidade!";
  }
});
