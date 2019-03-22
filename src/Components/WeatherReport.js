import React, { Component } from "react";
import Spinner from "react-spinner-material";

import { Form } from "react-bootstrap";
import HeaderNavbar from "./HeaderNavbar";
import "./DragAndDrop.css";
import { connect } from "react-redux";
import * as actionCreator from "./Actions/action";

var cityID;
class WeatherReport extends Component {
  handleChange = event => {
    event.preventDefault();
    cityID = event.target.value;
    console.log("city_id: ", cityID);
  };

  Unix_timestamp = t => {
    var dt = new Date(t * 1000);
    var hr = dt.getHours();
    var m = "0" + dt.getMinutes();
    console.log(hr + ":" + m.substr(-2));
    return hr + ":" + m.substr(-2);
  };

  render() {
    var sunRiseTime = this.Unix_timestamp(this.props.sunRise);
    var sunSetTime = this.Unix_timestamp(this.props.sunSet);
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
        <HeaderNavbar pagetitle={"WEATHER REPORT (REDUX THUNK)"} />
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
                  onClick={this.props.fetchWeather}
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
            visible={this.props.showLoading}
          />
        </div>
        <br />
        <br />

        <div
          className="col-lg-6 col-md-6 col-sm-6 col-xs-6"
          style={
            this.props.cityName == ""
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
                <td className="weatherTd2">{this.props.wind}</td>
              </tr>
              <tr>
                <td className="weatherTd1">Humidity</td>
                <td className="weatherTd2">{this.props.humidity}</td>
              </tr>
              <tr>
                <td className="weatherTd1">Pressure</td>
                <td className="weatherTd2">{this.props.pressure}</td>
              </tr>
              <tr>
                <td className="weatherTd1">Cloudiness</td>
                <td className="weatherTd2">{this.props.cloudiness}</td>
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
                <td className="weatherTd2">{this.props.maxTemp}&#x2103;</td>
              </tr>
              <tr>
                <td className="weatherTd1">Min Temp</td>
                <td className="weatherTd2">{this.props.minTemp}&#x2103;</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className="col-lg-6 col-md-6 col-sm-6 col-xs-6"
          style={
            this.props.cityName == ""
              ? { display: "none" }
              : { display: "block" }
          }
        >
          <p id="weatherCity">{this.props.cityName},IN</p>
          <p id="CityTemp">{this.props.currentTemp}&#x2103;</p>
          <p style={{ fontSize: "2vw", fontWeight: "600" }}>
            <img src={this.props.iconUrl} />
            &nbsp;{this.props.weatherType}
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

const mapStateToProps = state => {
  return {
    forecast: state.forecast,
    cityName: state.cityName,
    cityID: state.cityID,
    currentTemp: state.currentTemp,
    wind: state.wind,
    humidity: state.humidity,
    pressure: state.pressure,
    cloudiness: state.cloudiness,
    sunRise: state.sunRise,
    sunSet: state.sunSet,
    maxTemp: state.maxTemp,
    minTemp: state.minTemp,
    weatherType: state.weatherType,
    iconUrl: state.iconUrl,
    forecast: state.forecast,
    showLoading: state.showLoading
  };
};

const mapDispachToProps = dispatch => {
  console.log("Ciy id", cityID);
  return {
    fetchWeather: event => {
      event.preventDefault();
      return dispatch(actionCreator.fetchWeather(cityID));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(WeatherReport);
