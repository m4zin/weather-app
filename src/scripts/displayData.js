import { data } from './fetchData';

const display = (function () {
  const searchBtn = document.querySelector('.search-btn');

  const weatherInfo = document.querySelector('.weather-info');
  const loader = document.querySelector('.loader');

  const weatherConditionIcon = document.getElementById('weatherConditionIcon');
  const conditionText = document.querySelector('.condition-text');
  const location = document.querySelector('.location');
  const temps = document.querySelector('.temps');
  const windSpeed = document.querySelector('.wind-speed');
  const error = document.querySelector('.error');

  function playLoader (isLoading) {
    if (isLoading) {
      loader.style.display = 'block';
    } else {
      loader.style.display = 'none';
    }
  }

  function checkIfInputEmpty (searchValue) {
    return searchValue === '' || searchValue === null;
  }

  function fillDOMInfo (fetchedData) {
    weatherInfo.style.display = 'flex';
    weatherConditionIcon.style.height,
    weatherConditionIcon.style.width = '100px';
    weatherConditionIcon.src = fetchedData.conditionIcon;
    conditionText.textContent = fetchedData.conditionText;
    location.textContent = `${fetchedData.countryName}, ${fetchedData.cityName}`;
    temps.textContent = `Temperature: ${fetchedData.tempInC} C / ${fetchedData.tempInF} F`;
    windSpeed.textContent = `Wind Speed: ${fetchedData.windSpeedInKph} KPH / ${fetchedData.windSpeedInMph} MPH`;
  }

  function hideWeatherInfo () {
    weatherInfo.style.display = 'none';
  }

  async function retrieveDataAndFillDOM () {
    const searchValue = document.getElementById('location').value;

    if (checkIfInputEmpty(searchValue)) {
      return;
    }

    hideWeatherInfo();

    // Plays loader until data is fetched.
    playLoader(true);
    const fetchedData = await data.fetchWeatherData(searchValue);
    playLoader(false);

    // Loading data onto DOM.
    if (!(fetchedData instanceof Error)) {
      if (error.textContent) {
        error.textContent = '';
      }
      fillDOMInfo(fetchedData);
    } else {
      error.textContent = 'Data for inputted location does not exist!';
      console.log('No data retrieved!');
    }
  }

  function init () {
    searchBtn.addEventListener('click', retrieveDataAndFillDOM);
  }

  return {
    init
  };
})();

export { display };
