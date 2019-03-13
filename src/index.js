import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AppDragDrop from "./Components/AppDragDrop";
import ApiCalling from "./Components/ApiCalling";
import WeatherReport from "./Components/WeatherReport";
import { HashRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <div>
    <div>
      <Router>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/dnd" component={AppDragDrop} />
          <Route path="/apicall" component={ApiCalling} />
          <Route path="/weather" component={WeatherReport} />
        </div>
      </Router>
    </div>
  </div>,
  document.getElementById("root")
);
