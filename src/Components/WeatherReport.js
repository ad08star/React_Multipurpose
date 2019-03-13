import React, { Component } from "react";
import Spinner from "react-spinner-material";
import axios from "axios";

export default class WeatherReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityID: 0,
      forecast: null,
      showLoading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchWeather = this.fetchWeather.bind(this);
  }

  handleChange = e => {
    this.setState({ cityID: e.target.value });
  };
  fetchWeather = e => {
    e.preventDefault();
    if (this.state.cityID != 0) {
      this.setState({ showLoading: true });
      console.log("city selected: ", this.state.cityID);
      axios
        .get(
          "https://api.openweathermap.org/data/2.5/weather?id=" +
            this.state.cityID +
            "&APPID=11aae5b663fce4efb87b44afa2069e54&units=metric"
        )
        .then(response => {
          this.setState({
            forecast: response.data,
            showLoading: false
          });
        })
        .catch(error => console.log(error.response));
    }
  };

  render() {
    var cities = [
      { name: "select", id: 0 },
      { name: "Delhi", id: 1273294 },
      { name: "Mumbai", id: 1275339 },
      { name: "Kolkata", id: 1275004 },
      { name: "Chennai", id: 1264527 },
      { name: "Bangalore", id: 1277333 },
      { name: "Hyderabad", id: 1269843 },
      { name: "Chandigarh", id: 1274746 },
      { name: "Pune", id: 1259229 },
      { name: "Patna", id: 1260086 },
      { name: "Jaipur", id: 1269517 }
    ];
    var cityDivs = [];
    cities.forEach(city => {
      cityDivs.push(
        <option key={city.id} value={city.id}>
          {city.name}
        </option>
      );
    });
    return (
      <div>
        <form>
          <select name="city" onChange={this.handleChange}>
            {cityDivs}
          </select>
          <br />
          <br />
          <input type="submit" onClick={e => this.fetchWeather(e)} />
        </form>
        <Spinner
          size={120}
          spinnerColor={"#333"}
          spinnerWidth={2}
          visible={this.state.showLoading}
        />
        {JSON.stringify(this.state.forecast)}
      </div>
    );
  }
}
