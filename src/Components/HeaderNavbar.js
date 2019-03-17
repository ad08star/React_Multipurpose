import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { Modal, Image } from "react-bootstrap";
import logo from "../images/logo.png";

export default class HeaderNavbar extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

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
              {this.props.pagetitle}
            </a>
            <a
              className="nav navbar-nav navbar-right"
              onClick={this.handleShow}
              style={{ cursor: "pointer" }}
            >
              <span
                className="navbar-brand fab fa-creative-commons"
                style={{ color: "#e4dfda" }}
              />
            </a>
            <Link to="/" className="nav navbar-nav navbar-right">
              <span
                className="navbar-brand fas fa-home"
                style={{ color: "#e4dfda" }}
              />
            </Link>
          </div>
        </nav>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          style={{ backgroundColor: "rgba(228, 223, 218, 0.6)" }}
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#c1666b", color: "white" }}
          >
            <Modal.Title>NOT SO IMPORTANT DISCLAIMER</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              backgroundColor: "#e4dfda",
              textAlign: "center",
              fontWeight: 700,
              color: "#4e4a4a"
            }}
          >
            <div>
              <Image
                id="modalImage"
                style={{ width: "60%", border: "2px outset white" }}
                src={logo}
              />
            </div>
            <br />
            <p>
              HAPPY MONKEYS is <em>NOT</em> a registered Trademark. <br />
              So feel free to use it as you see fit.
            </p>
            <p style={{ color: "#c1666b" }}>
              <em>PS: This is just an example of MODAL WINDOW.</em>
            </p>
          </Modal.Body>
          <Modal.Footer
            style={{ backgroundColor: "#c1666b", padding: "8px 15px" }}
          >
            <button
              type="button"
              className="btn btn-default"
              style={{
                backgroundColor: "#c1666b",
                border: "3px solid #d4b483",
                borderRadius: "8px",
                color: "white",
                fontWeight: "500",
                outline: "none"
              }}
              onClick={this.handleClose}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
