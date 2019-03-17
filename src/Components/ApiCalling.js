import React, { Component } from "react";
import { Navbar, ProgressBar } from "react-bootstrap";
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
      <div>
        <HeaderNavbar />
        <div>
          <ProgressBar
            striped
            variant="success"
            now={this.state.progress_val}
            label={this.state.progress_val}
          />
        </div>
        <div>Firstname : {this.state.firstname}</div>
        <div>Lastname : {this.state.lastname}</div>
        <div>Company : {this.state.company}</div>
        <div>Designation : {this.state.designation}</div>
        <div>Occupation : {this.state.occupation}</div>
        <div>Component_use : {this.state.component_use}</div>
      </div>
    );
  }
}
