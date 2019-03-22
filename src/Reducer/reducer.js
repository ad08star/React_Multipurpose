const initialState = {
  forecast: "",
  showLoading: false,
  cityName: "",
  cityID: 0,
  currentTemp: "",
  wind: "",
  humidity: "",
  pressure: "",
  cloudiness: "",
  sunRise: "",
  sunSet: "",
  maxTemp: "",
  minTemp: "",
  weatherType: "",
  iconUrl: "https://openweathermap.org/img/w/",
  forecast: null,
  showLoading: false
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "FETCH_WEATHER":
      newState.forecast = action.value;
      newState.showLoading = false;
      newState.cityName = action.value.name;
      newState.cityID = 0;
      newState.currentTemp = action.value.main.temp;
      newState.wind = action.value.wind.speed + " m/s";
      newState.humidity = action.value.main.humidity + "%";
      newState.pressure = action.value.main.pressure + " hpa";
      newState.cloudiness = action.value.clouds.all + "%";
      newState.sunRise = action.value.sys.sunrise;
      newState.sunSet = action.value.sys.sunset;
      newState.maxTemp = action.value.main.temp_max;
      newState.minTemp = action.value.main.temp_min;
      newState.iconUrl =
        "https://openweathermap.org/img/w/" +
        action.value.weather[0].icon +
        ".png";
      newState.weatherType = action.value.weather[0].main;
      break;
  }
  return newState;
};

export default reducer;
