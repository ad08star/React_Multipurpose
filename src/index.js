import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AppDragDrop from "./Components/AppDragDrop";
import ApiCalling from "./Components/ApiCalling";
import WeatherReport from "./Components/WeatherReport";
import { HashRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./Reducer/reducer";

const store = createStore(reducer, applyMiddleware(thunk));
ReactDOM.render(
  <div>
    <div>
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={App} />
            <Route path="/dnd" component={AppDragDrop} />
            <Route path="/apicall" component={ApiCalling} />
            <Route path="/weather" component={WeatherReport} />
          </div>
        </Router>
      </Provider>
    </div>
  </div>,
  document.getElementById("root")
);
