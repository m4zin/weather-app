const data = (function () {
  // Fetches weather data and extracts return necessary values.
  async function fetchWeatherData (city) {
    try {
      const url = 'https://api.weatherapi.com/v1/';
      const apiKey = '91e51d6b3cdb4631a0382533243001';
      const weather = await fetch(`${url}current.json?key=${apiKey}&q=${city}`, {
        mode: 'cors'
      });

      const data = await weather.json();

      return {
        countryName: data.location.country,
        cityName: data.location.name,
        tempInC: data.current.temp_c,
        tempInF: data.current.temp_f,
        windSpeedInKph: data.current.wind_kph,
        windSpeedInMph: data.current.wind_mph,
        conditionText: data.current.condition.text,
        conditionIcon: `https:${data.current.condition.icon}`
      };
    } catch (error) {
      return error;
    }
  }
  return {
    fetchWeatherData
  };
})();

export { data };
