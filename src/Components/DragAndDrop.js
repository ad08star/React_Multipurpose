import React, { Component } from "react";
import UniqueId from "react-html-id";
import { Image, Form } from "react-bootstrap";
import trash from "../images/trash.png";
import HeaderNavbar from "./HeaderNavbar";
import "./DragAndDrop.css";

export default class DragAndDrop extends Component {
  constructor(props) {
    super(props);
    UniqueId.enableUniqueIds(this);
    this.state = {
      name: "",
      tasks: []
    };
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = e => {
    this.state.name = e.target.value;
  };
  addTask = e => {
    if (this.state.name != "") {
      e.preventDefault();
      console.log("Name: ", this.state.name);
      let localObj = {
        name: this.state.name,
        category: "WIP",
        id: this.nextUniqueId()
      };
      this.state.tasks.push(localObj);
      this.setState({
        task: this.state.tasks
      });
      console.log(this.state.tasks);
    }
  };

  onDragOver = ev => {
    ev.preventDefault();
  };

  onDragStart = (ev, name) => {
    console.log("dragstart", name);
    ev.dataTransfer.setData("name", name);
  };

  onDrop = (ev, ctr) => {
    let name = ev.dataTransfer.getData("name");
    if (ctr !== "FINISH") {
      let tasks = this.state.tasks.filter(task => {
        if (task.name === name) {
          task.category = ctr;
        }
        return task;
      });
      this.setState({
        tasks: tasks
      });
    } else {
      let tasks = this.state.tasks.filter(task => task.name !== name);
      console.log("new tasks list: ", tasks);
      this.setState({
        tasks: tasks
      });
      this.setState({
        tasks: tasks
      });
    }
  };

  render() {
    var tasks = {
      WIP: [],
      COMPLETE: []
    };
    this.state.tasks.forEach(t => {
      tasks[t.category].push(
        <div
          onDragStart={e => this.onDragStart(e, t.name)}
          draggable
          key={this.nextUniqueId()}
          className={t.category === "WIP" ? "taskPanding" : "taskComplete"}
        >
          <span
            className={
              t.category === "WIP"
                ? "far fa-times-circle"
                : "far fa-check-circle"
            }
            style={
              t.category === "WIP"
                ? { paddingRight: "5px", color: "red" }
                : { paddingRight: "5px", color: "green" }
            }
          />
          {t.name}
        </div>
      );
    });

    return (
      <div style={{ backgroundColor: "#e4dfda" }}>
        <HeaderNavbar pagetitle={"DRAG AND DROP: TO DO LIST"} />
        <nav className="navbar" style={{ marginBottom: "0px" }}>
          <div id="AddListTask">
            <Form inline style={{ float: "left" }}>
              <span style={{ color: "#c1666b", fontWeight: "700" }}>
                TO DO LIST: &nbsp;
              </span>
              <span>
                <input
                  autoFocus
                  id="ipRound"
                  type="text"
                  placeholder="Enter task"
                  onChange={this.handleChange}
                />
                <button
                  id="taskAddBtn"
                  type="submit"
                  onClick={e => this.addTask(e)}
                >
                  Add
                </button>
              </span>
            </Form>
          </div>
        </nav>

        <div
          className="col-lg-4 col-md-4 col-sm-4 col-xs-4"
          style={{
            backgroundColor: "#d4b483",
            height: "500px",
            border: "3px solid #c1666b",
            borderRadius: "20px"
          }}
          onDrop={e => this.onDrop(e, "WIP")}
          onDragOver={e => this.onDragOver(e)}
        >
          <div className="taskBoxHeading">Pending/WIP Tasks</div>
          {tasks.WIP}
        </div>
        <div
          className="col-lg-4 col-md-4 col-sm-4 col-xs-4"
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => this.onDrop(e, "FINISH")}
          style={{
            height: "500px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            backgroundColor: "#e4dfda"
          }}
        >
          <Image
            style={{
              width: "30%",
              height: "30%"
            }}
            draggable={false}
            src={trash}
          />
        </div>
        <div
          className="col-lg-4 col-md-4 col-sm-4 col-xs-4"
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => this.onDrop(e, "COMPLETE")}
          style={{
            backgroundColor: "#48a9a6",
            height: "500px",
            border: "3px solid #c1666b",
            borderRadius: "20px"
          }}
        >
          <div className="taskBoxHeading">Completed Tasks</div>
          {tasks.COMPLETE}
        </div>
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
