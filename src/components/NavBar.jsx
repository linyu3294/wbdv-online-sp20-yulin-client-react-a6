import React, { Component } from "react";
import "../styles/NavBar.css";

class NavBar extends Component {
  state = {
    newCourseTitle: ""
  };

  handleChange = event => {
    this.setState({ newCourseTitle: event.target.value });
  };

  addCourse = () => {
    this.props.onAddCourse(this.state.newCourseTitle);
    this.setState({ newCourseTitle: "" });
  };

  render() {
    return (
      <>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="#!">
            {this.props.title}
          </a>
          <input
            type="text"
            className="form-control new-course-title"
            placeholder="Enter new course title"
            value={this.state.newCourseTitle}
            onChange={this.handleChange}
          />
          <a href="#!">
            <i
              className="fa fa-2x fa-plus text-white pointer ml-3"
              onClick={this.addCourse}
            ></i>
          </a>
        </nav>
      </>
    );
  }
}

export default NavBar;
