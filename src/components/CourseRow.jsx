import React, { Component } from "react";
import moment from "moment";
import _ from "lodash";


class CourseRow extends Component {
  state = { isEditable: false, courseTitle: "", isSelected: false };

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

  handleOnChange = event => {
    this.setState({ courseTitle: event.target.value });
  };

  toggleEditable = () => {
    this.setState({ isEditable: !this.state.isEditable });
  };

  openEditor = (e) => {
    e.stopPropagation(); 
    this.props.history.push(`/course-editor/${this.props.course._id}`);
  }

  saveCourseTitle = () => {
    if (!this.vaildateCourseTitle(this.state.courseTitle)) return;
    this.props.updateCourse(this.props.course._id, this.state.courseTitle);
    this.toggleEditable();
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

  setSelectedIdToParams = () => {
    this.selectedId = this.props.course._id;
    this.props.history.push(`/course-manager/list?selected=${this.props.course._id}`);
  };

  render() {
    const { course, onDelete } = this.props;
    return (
      <>
        <tr
          onClick={this.setSelectedIdToParams}
          className={this.state.isSelected ? "bg-dark" : ""}
        >
          {!this.state.isEditable && (
            <td>
              <img
                src={process.env.PUBLIC_URL + "/course.svg"}
                width="50"
                alt="Course Icon"
              />
                <span onClick={this.openEditor}
                  className={`ml-3 pointer ${
                    this.state.isSelected ? "text-white" : ""
                  }`}
                >
                  {course.title}
                </span>
            </td>
          )}

          {this.state.isEditable && (
            <td>
              <input
                type="text"
                className="form-control new-course-title"
                placeholder="Enter new course title"
                onChange={this.handleOnChange}
              />
            </td>
          )}
          <td
            className={`d-none d-md-table-cell ${
              this.state.isSelected ? "text-white" : ""
            }`}
          >
            {course.owner}
          </td>
          <td
            className={`d-none d-md-table-cell ${
              this.state.isSelected ? "text-white" : ""
            }`}
          >
            {moment(course.lastModified).fromNow()}
          </td>
          {!this.state.isEditable && (
            <td className="text-right">
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
            </td>
          )}

          {this.state.isEditable && (
            <td className="text-right">
              <button
                className="btn btn-danger btn-sm mx-1"
                onClick={this.toggleEditable}
              >
                Cancel
              </button>
              <button
                className="btn btn-success btn-sm mx-1"
                onClick={this.saveCourseTitle}
              >
                Save
              </button>
            </td>
          )}
        </tr>
      </>
    );
  }
}

export default CourseRow;
