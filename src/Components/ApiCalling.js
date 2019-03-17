import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import axios from "axios";
import HeaderNavbar from "./HeaderNavbar";
import "./DragAndDrop.css";

export default class ApiCalling extends Component {
  state = {
    firstname: "",
    lastname: "",
    company: "",
    designation: "",
    occupation: "",
    component_use: "",
    progress_val: 0
  };
  async componentDidMount() {
    axios
      .get(
        "https://3dd22789-8f19-4bdc-928b-7b7a918d494c.mock.pstmn.io/fetchName"
      )
      .then(response => {
        this.setState({
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          progress_val: 33
        });
        return axios.get(
          "https://3dd22789-8f19-4bdc-928b-7b7a918d494c.mock.pstmn.io/fetchDesignation"
        );
      })
      .then(response => {
        setTimeout(() => {
          this.setState({
            designation: response.data.Designation,
            company: response.data.Company,
            progress_val: 66
          });
        }, 2000);
        return axios.get(
          "https://3dd22789-8f19-4bdc-928b-7b7a918d494c.mock.pstmn.io/fetchOccupation"
        );
      })
      .then(response => {
        setTimeout(() => {
          this.setState({
            occupation: response.data.Occupation,
            component_use: response.data.Component_use,
            progress_val: 100
          });
        }, 2000);
      })
      .catch(error => console.log(error.response));
  }

  render() {
    return (
      <div style={{ backgroundColor: "#e4dfda" }}>
        <HeaderNavbar pagetitle={"GET TO KNOW THE CREATOR"} />
        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3" />
        <div
          className="col-lg-6 col-md-6 col-sm-6 col-xs-6"
          style={{
            border: "5px double #c1666b",
            borderRadius: "15px",
            padding: "20px",
            fontWeight: 700,
            fontSize: "medium",
            color: "#4a4747"
          }}
        >
          <div
            style={
              this.state.progress_val == 100
                ? { display: "none" }
                : { display: "block" }
            }
          >
            <ProgressBar
              striped
              variant="success"
              now={this.state.progress_val}
              label={this.state.progress_val}
            />
          </div>
          <div>
            <a style={{ color: "#c1666b" }}>Firstname : </a>
            {this.state.firstname}
          </div>
          <div>
            <a style={{ color: "#c1666b" }}>Lastname : </a>
            {this.state.lastname}
          </div>
          <hr />
          <div>
            <a style={{ color: "#c1666b" }}>Company : </a>
            {this.state.company}
          </div>
          <div>
            <a style={{ color: "#c1666b" }}>Designation : </a>
            {this.state.designation}
          </div>
          <hr />
          <div>
            <a style={{ color: "#c1666b" }}>Occupation : </a>
            {this.state.occupation}
          </div>
          <div style={{ paddingTop: "5px" }}>
            <a style={{ color: "#c1666b" }}>Component_use : </a>
            {this.state.component_use}
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3" />
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
