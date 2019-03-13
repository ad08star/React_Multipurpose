import React, { Component } from "react";
import "./App.css";
import { HashRouter as Router, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
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
          <Link to="/weather">
            <Button variant="primary">
              <p>WEATHER REPORT</p>
            </Button>
          </Link>
        </div>
      </Router>
    );
  }
}

export default App;
