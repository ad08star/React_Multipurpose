import axios from "axios";

export const fetchWeatherAsync = data => {
  return { type: "FETCH_WEATHER", value: data };
};

export const fetchWeather = id => {
  return dispatch => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?id=" +
          id +
          "&APPID=11aae5b663fce4efb87b44afa2069e54&units=metric"
      )
      .then(response => {
        var forecast = response.data;
        dispatch(fetchWeatherAsync(forecast));
      })
      .catch(error => console.log(error.response));
  };
};
