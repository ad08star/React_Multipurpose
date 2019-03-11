import React, { Component } from "react";
import UniqueId from "react-html-id";
import { Image, Navbar, Form } from "react-bootstrap";
import trash from "../images/trash.png";

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
          style={
            t.category === "WIP"
              ? { backgroundColor: "yellow", marginTop: "5px" }
              : { backgroundColor: "skyblue", marginTop: "5px" }
          }
        >
          {t.name}
        </div>
      );
    });

    return (
      <div>
        <Navbar style={{ backgroundColor: "Black" }}>
          <Navbar.Brand href="#home" style={{ color: "white" }}>
            <Form inline style={{ float: "left" }}>
              <span>TO DO LIST: &nbsp; &nbsp;</span>
              <span>
                <input
                  type="text"
                  placeholder="Enter task"
                  onChange={this.handleChange}
                />
                <button type="submit" onClick={e => this.addTask(e)}>
                  Add
                </button>
              </span>
            </Form>
          </Navbar.Brand>
        </Navbar>

        <div
          className="col-lg-4 col-md-4 col-sm-4 col-xs-4"
          style={{ backgroundColor: "green", height: "300px" }}
          onDrop={e => this.onDrop(e, "WIP")}
          onDragOver={e => this.onDragOver(e)}
        >
          <div>Panding/WIP Tasks</div>
          {tasks.WIP}
        </div>
        <div
          className="col-lg-4 col-md-4 col-sm-4 col-xs-4"
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => this.onDrop(e, "FINISH")}
          style={{
            height: "300px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center"
          }}
        >
          <Image
            style={{
              width: "50%",
              height: "50%"
            }}
            draggable={false}
            src={trash}
          />
        </div>
        <div
          className="col-lg-4 col-md-4 col-sm-4 col-xs-4"
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => this.onDrop(e, "COMPLETE")}
          style={{ backgroundColor: "gray", height: "300px" }}
        >
          <div>Completed Tasks</div>
          {tasks.COMPLETE}
        </div>
      </div>
    );
  }
}
