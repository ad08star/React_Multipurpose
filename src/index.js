import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AppDragDrop from "./Components/AppDragDrop";
import ApiCalling from "./Components/ApiCalling";
import { HashRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/dnd" component={AppDragDrop} />
      <Route path="/apicall" component={ApiCalling} />
    </div>
  </Router>,
  document.getElementById("root")
);
