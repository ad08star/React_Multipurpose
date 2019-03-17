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
    this.handleChange = this.handleChange.bind(this);
    this.fetchWeather = this.fetchWeather.bind(this);
    this.Unix_timestamp = this.Unix_timestamp.bind(this);
  }

  handleChange = e => {
    this.setState({ cityID: e.target.value });
  };

  Unix_timestamp = t => {
    var dt = new Date(t * 1000);
    var hr = dt.getHours();
    var m = "0" + dt.getMinutes();
    console.log(hr + ":" + m.substr(-2));
    return hr + ":" + m.substr(-2);
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
            cityName: response.data.name,
            cityID: 0,
            currentTemp: response.data.main.temp,
            wind: response.data.wind.speed + " m/s",
            humidity: response.data.main.humidity + "%",
            pressure: response.data.main.pressure + " hpa",
            cloudiness: response.data.clouds.all + "%",
            sunRise: response.data.sys.sunrise,
            sunSet: response.data.sys.sunset,
            maxTemp: response.data.main.temp_max,
            minTemp: response.data.main.temp_min,
            iconUrl:
              "https://openweathermap.org/img/w/" +
              response.data.weather[0].icon +
              ".png",
            weatherType: response.data.weather[0].main
          });
        })
        .catch(error => console.log(error.response));
    }
  };

  render() {
    var sunRiseTime = this.Unix_timestamp(this.state.sunRise);
    var sunSetTime = this.Unix_timestamp(this.state.sunSet);
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
        <div style={{ paddingLeft: "45%" }}>
          <Spinner
            size={120}
            spinnerColor={"#333"}
            spinnerWidth={1}
            visible={this.state.showLoading}
          />
        </div>
        <br />
        <br />

        <div
          className="col-lg-6 col-md-6 col-sm-6 col-xs-6"
          style={
            this.state.cityName == ""
              ? { display: "none" }
              : { display: "block", paddingTop: "1vw" }
          }
        >
          <table className="weatherTable">
            <tbody>
              <tr>
                <th colSpan="2" style={{ textAlign: "center" }}>
                  Details
                </th>
              </tr>
              <tr>
                <td className="weatherTd1">Wind</td>
                <td className="weatherTd2">{this.state.wind}</td>
              </tr>
              <tr>
                <td className="weatherTd1">Humidity</td>
                <td className="weatherTd2">{this.state.humidity}</td>
              </tr>
              <tr>
                <td className="weatherTd1">Pressure</td>
                <td className="weatherTd2">{this.state.pressure}</td>
              </tr>
              <tr>
                <td className="weatherTd1">Cloudiness</td>
                <td className="weatherTd2">{this.state.cloudiness}</td>
              </tr>
              <tr>
                <td className="weatherTd1">SunRise (HH:MM)</td>
                <td className="weatherTd2">{sunRiseTime}</td>
              </tr>
              <tr>
                <td className="weatherTd1">SunSet (HH:MM)</td>
                <td className="weatherTd2">{sunSetTime}</td>
              </tr>
              <tr>
                <td className="weatherTd1">Max Temp</td>
                <td className="weatherTd2">{this.state.maxTemp}&#x2103;</td>
              </tr>
              <tr>
                <td className="weatherTd1">Min Temp</td>
                <td className="weatherTd2">{this.state.minTemp}&#x2103;</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className="col-lg-6 col-md-6 col-sm-6 col-xs-6"
          style={
            this.state.cityName == ""
              ? { display: "none" }
              : { display: "block" }
          }
        >
          <p id="weatherCity">{this.state.cityName},IN</p>
          <p id="CityTemp">{this.state.currentTemp}&#x2103;</p>
          <p style={{ fontSize: "2vw", fontWeight: "600" }}>
            <img src={this.state.iconUrl} />
            &nbsp;{this.state.weatherType}
          </p>
        </div>
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
