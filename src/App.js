import React, { Component } from "react";
import "./App.css";
import { HashRouter as Router, Link } from "react-router-dom";
import HeaderNavbar from "./Components/HeaderNavbar";

class App extends Component {
  render() {
    return (
      <div>
        <HeaderNavbar pagetitle={"React Multipurpose App"} />
        <Router>
          <div>
            <div className="contentBlock">
              <span>
                <p className="contentHeading">
                  START YOUR DAY IN AN ORGAINSED WAY
                </p>
                <p>
                  Click the button to go to the{" "}
                  <em>HAPPY MONKEYS' TO-DO LIST</em>, which uses pure Drag and
                  Drop implementation.
                </p>
                <Link to="/dnd">
                  <button
                    type="button"
                    className="btn btn-default"
                    style={{
                      backgroundColor: "#c1666b",
                      border: "1px solid #d4b483",
                      color: "white",
                      fontWeight: "500"
                    }}
                  >
                    TO DO LIST
                  </button>
                </Link>
              </span>
            </div>

            <div className="contentBlock">
              <p className="contentHeading">
                GOT NO WINDOWS AROUND? DONT WORRY... WE HAVE GOT YOU COVERED!
              </p>
              <p>
                Checkout the weather report. (Powered by:{" "}
                <em>OpenWeatherMap.org</em>)
              </p>
              <Link to="/weather">
                <button
                  type="button"
                  className="btn btn-default"
                  style={{
                    backgroundColor: "#c1666b",
                    border: "1px solid #d4b483",
                    color: "white",
                    fontWeight: "500"
                  }}
                >
                  WEATHER REPORT
                </button>
              </Link>
            </div>

            <div className="contentBlock">
              <p className="contentHeading">GET TO KNOW THE CREATOR</p>
              <p>
                CLick the button which asynchronously call multiple chained APIs
                and fetch the details.
              </p>
              <Link to="/apicall">
                <button
                  type="button"
                  className="btn btn-default"
                  style={{
                    backgroundColor: "#c1666b",
                    border: "1px solid #d4b483",
                    color: "white",
                    fontWeight: "500"
                  }}
                >
                  API CALLING
                </button>
              </Link>
            </div>

            <div className="contentBlock">
              <p className="contentHeading">
                <em>(COMING SOON)</em> FROM FRONTEND TO LOGO DESIGNING{" "}
              </p>
              <p>
                Checkout our commissioned and some times free logo designs.
                Featured Gallery{" "}
                <a
                  href="https://www.behance.net/ad08star"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-external-link-alt" />
                </a>
              </p>

              <button
                disabled
                type="button"
                className="btn btn-default"
                style={{
                  backgroundColor: "#c1666b",
                  border: "1px solid #d4b483",
                  color: "white",
                  fontWeight: "500"
                }}
              >
                IMAGE GALLERY
              </button>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
