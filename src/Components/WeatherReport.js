import React, { Component } from "react";
import Spinner from "react-spinner-material";
import axios from "axios";
import { Form } from "react-bootstrap";
import HeaderNavbar from "./HeaderNavbar";
import "./DragAndDrop.css";

export default class WeatherReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      cityID: 0,
      currentTemp: "",
      wind: "",
      humidity: "",
      Pressure: "",
      cloudiness: "",
      sunRise: "",
      sunSet: "",
      maxTemp: "",
      minTemp: "",
      iconUrl: "https://openweathermap.org/img/w/",
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
            showLoading: false,
            cityName: "",
            cityID: 0,
            currentTemp: response.data.main.temp,
            wind: "",
            humidity: response.data.main.humidity + "%",
            Pressure: response.data.main.pressure + " hpa",
            cloudiness: "",
            sunRise: "",
            sunSet: "",
            maxTemp: response.data.main.temp_max,
            minTemp: response.data.main.temp_min,
            iconUrl: "https://openweathermap.org/img/w/"
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
        <option
          key={city.id}
          value={city.id}
          disabled={city.id === 0}
          selected={city.id === 0}
        >
          {city.name}
        </option>
      );
    });
    return (
      <div style={{ backgroundColor: "#e4dfda" }}>
        <HeaderNavbar />
        <nav className="navbar" style={{ marginBottom: "0px" }}>
          <div id="WeatherSelector">
            <Form inline style={{ float: "left" }}>
              <span style={{ color: "#c1666b", fontWeight: "700" }}>
                <i className="fas fa-map-marker-alt" />
                &nbsp; SELECT CITY : &nbsp;
              </span>
              <span>
                <select
                  id="citySelector"
                  name="city"
                  onChange={this.handleChange}
                >
                  {cityDivs}
                </select>
                <input
                  id="taskAddBtn"
                  type="submit"
                  onClick={e => this.fetchWeather(e)}
                />
              </span>
            </Form>
          </div>
        </nav>
        <Spinner
          size={120}
          spinnerColor={"#333"}
          spinnerWidth={1}
          visible={this.state.showLoading}
        />
        {this.state.currentTemp} &#8451;,{this.state.Pressure},
        {this.state.humidity},{this.state.minTemp} &#8451;,{this.state.maxTemp}{" "}
        &#x2103;
        <div
          style={{
            position: "fixed",
            display: "block",
            height: "100%",
            width: "100%",
            backgroundColor: "#e4dfda",
            zIndex: "-1"
          }}
        />
      </div>
    );
  }
}
