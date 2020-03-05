import React, { Component } from "react";
import moment from "moment";
import _ from "lodash";

class CourseCard extends Component {
  state = { isEditable: false, courseTitle: "", isHovered: false };

  handleOnChange = event => {
    this.setState({ courseTitle: event.target.value });
  };

  toggleEditable = () => {
    this.setState({ isEditable: !this.state.isEditable });
  };

  saveCourseTitle = () => {
    if (!this.vaildateCourseTitle(this.state.courseTitle)) return;
    this.props.updateCourse(this.props.course._id, this.state.courseTitle);
    this.toggleEditable();
  };

  checkSelectedCourse = () => {
    const selectedId =
      this.props.selected &&
      this.props.selected.substring(this.props.selected.indexOf("=") + 1);
    if (this.state.isSelected !== (this.props.course._id === selectedId)) {
      this.setState({ isSelected: this.props.course._id === selectedId });
    }
  };

  componentDidMount() {
    this.checkSelectedCourse();
  }

  componentDidUpdate() {
    this.checkSelectedCourse();
  }

  setSelectedIdToParams = () => {
    this.selectedId = this.props.course._id;
    this.props.history.push(
      `/course-manager/grid?selected=${this.props.course._id}`
    );
  };

  openEditor = e => {
    e.stopPropagation();
    this.props.history.push(`/course-editor/${this.props.course._id}`);
  };

  vaildateCourseTitle = courseTitle => {
    if (!courseTitle) {
      return false;
    }

    if (_.find(this.state.courses, { title: courseTitle })) {
      return false;
    }

    return true;
  };

  render() {
    const { course, onDelete } = this.props;

    return (
      <div className="my-2">
        <div
          className={`card ${this.state.isSelected ? "bg-dark shadow" : ""} ${
            this.state.isHovered ? "shadow-sm border-dark" : ""
          }`}
          onClick={this.setSelectedIdToParams}
          onMouseEnter={() => this.setState({ isHovered: true })}
          onMouseLeave={() => this.setState({ isHovered: false })}
        >
          <div className="card-title" align="center">
            <img
              src={process.env.PUBLIC_URL + "/course.svg"}
              width="200"
              alt="course-img"
            />
          </div>
          <div className="card-body pointer">
            <h5
              onClick={this.openEditor}
              className={`card-title ${
                this.state.isSelected ? "text-white" : ""
              }`}
            >
              {course.title}
            </h5>
            <p
              className={`card-text p-0 m-0 ${
                this.state.isSelected ? "text-white" : ""
              }`}
            >
              <i className="fa fa-user-circle-o"></i>{" "}
              <strong>{course.owner}</strong>
            </p>
            <p
              className={`card-text p-0 m-0 ${
                this.state.isSelected ? "text-white" : ""
              }`}
            >
              <i className="fa fa-pencil-square-o"></i>{" "}
              <strong>{moment(course.lastModified).fromNow()}</strong>
            </p>
          </div>
          {!this.state.isEditable && (
            <div className="card-footer">
              {this.state.isSelected && (
                <>
                  <i
                    className="fa fa-2x fa-pencil mx-1 pointer text-info"
                    onClick={this.toggleEditable}
                  ></i>
                  <i
                    className="fa fa-2x fa-trash mx-1 pointer text-danger"
                    onClick={() => onDelete(course._id)}
                  ></i>
                </>
              )}
              {!this.state.isSelected && <p>Click to view actions.</p>}
            </div>
          )}

          {this.state.isEditable && (
            <div className="card-footer">
              <input
                type="text"
                className="form-control course-title"
                placeholder="Enter new course title"
                onChange={this.handleOnChange}
              />
              <button
                className="btn btn-sm btn-danger mt-2 mr-2"
                onClick={this.toggleEditable}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm btn-success mt-2"
                onClick={this.saveCourseTitle}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CourseCard;
