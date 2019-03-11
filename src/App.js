import React, { Component } from "react";
import "./App.css";
import AppDragDrop from "./Components/AppDragDrop";
import ApiCalling from "./Components/ApiCalling";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/dnd" component={AppDragDrop} />
          <Route path="/apicall" component={ApiCalling} />
          <Link to="/dnd">
            <Button variant="primary">
              <p>TO DO LIST</p>
            </Button>
          </Link>
          <Link to="/apicall">
            <Button variant="primary">
              <p>API CALLING</p>
            </Button>
          </Link>
        </div>
      </Router>
    );
  }
}

export default App;
