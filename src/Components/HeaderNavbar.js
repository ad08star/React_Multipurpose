import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import logo from "../images/logo.png";

export default class HeaderNavbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar" style={{ backgroundColor: "#c1666b" }}>
          <div className="container-fluid">
            <div className="navbar-header">
              <a
                className="navbar-brand"
                href="#/"
                style={{ paddingTop: "0vw" }}
              >
                <Image style={{ width: "26%" }} src={logo} />
              </a>
            </div>

            <a
              className="navbar-brand"
              style={{ color: "#e4dfda", fontWeight: "bold" }}
            >
              React Multipurpose App
            </a>
            <Link to="/" className="nav navbar-nav navbar-right">
              <span
                className="navbar-brand fas fa-home"
                style={{ color: "#e4dfda" }}
              />
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
