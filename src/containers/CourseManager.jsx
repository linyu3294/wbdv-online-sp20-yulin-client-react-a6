import React, { Component } from "react";
import NavBar from "../components/NavBar";
import CourseTable from "../components/CourseTable";
import {
  findAllCourses,
  createCourse,
  deleteCourse,
  updateCourse
} from "../services/CourseService";
import moment from "moment";
import _ from "lodash";
import CourseGrid from "../components/CourseGrid";

class CourseManager extends Component {
  state = {
    order: "asc",
    alertMessage: "",
    showAlert: false,
    alertType: "info"
  };

  showAlert = (message, type, duration) => {
    let timeout;
    clearTimeout(timeout);
    this.setState({
      alertMessage: message || "Alert",
      showAlert: true,
      alertType: type || "info"
    });
    timeout = setTimeout(() => {
      this.setState({ alertMessage: "", showAlert: false, alertType: "info" });
    }, duration || 2000);
  };

  vaildateCourseTitle = courseTitle => {
    if (!courseTitle) {
      this.showAlert("Course title is required!", "danger");
      return false;
    }

    if (_.find(this.state.courses, { title: courseTitle })) {
      this.showAlert("Course already added!", "warning");
      return false;
    }

    return true;
  };

  componentDidMount() {
    this.getCourses();
  }

  toggleView = () => {
    const viewToSet = this.props.view === "list" ? "grid" : "list";

    this.props.history.push(
      `/course-manager/${viewToSet}?selected=${this.props.selected &&
        this.props.selected.substring(this.props.selected.indexOf("=") + 1)}`
    );
  };

  toggleOrder = () => {
    let courses = [...this.state.courses];
    courses = courses.reverse();
    this.setState({
      order: this.state.order === "asc" ? "desc" : "asc",
      courses: courses
    });
  };

  addNewCourse = courseTitle => {
    if (!this.vaildateCourseTitle(courseTitle)) return;

    createCourse({
      title: courseTitle,
      owner: "Jainam Sheth",
      lastModified: moment()
    }).then(newCourse => {
      let courses = [...this.state.courses];
      courses.push(newCourse);
      courses = _.sortBy(courses, "title");
      if (this.state.order === "desc") {
        courses.reverse();
      }
      this.setState({ courses: courses });
      this.showAlert("Course Added Successfully!", "success");
    });
  };

  getCourses() {
    findAllCourses().then(courses => {
      courses = _.sortBy(courses, "title");
      this.setState({ courses: courses });
    });
  }

  editCourse = (courseId, newCourseTitle) => {
    let courses = [...this.state.courses];
    const courseToUpdate = _.find(courses, { _id: courseId });
    courseToUpdate.title = newCourseTitle;
    courseToUpdate.lastModified = moment();
    updateCourse(courseId, courseToUpdate).then(() => {
      courses = _.sortBy(courses, "title");
      if (this.state.order === "desc") {
        courses.reverse();
      }
      this.setState({ courses: courses });
      this.showAlert("Course Updated Successfully!", "success");
    });
  };

  removeCourse = courseId => {
    deleteCourse(courseId).then(res => {
      if (res === 1) {
        let courses = [...this.state.courses];
        const indexToDelete = _.findIndex(courses, { _id: courseId });
        courses.splice(indexToDelete, 1);
        courses = _.sortBy(courses, "title");
        if (this.state.order === "desc") {
          courses.reverse();
        }
        this.setState({ courses: courses });
        this.showAlert("Course Removed Successfully!", "success");
      }
    });
  };

  render() {
    const { toggleEditor } = this.props;

    return (
      <>
        <NavBar
          title="Whiteboard - Course Manager"
          onAddCourse={this.addNewCourse}
          showInput="true"
        />
        {this.state.courses !== undefined && this.state.courses.length > 0 && (
          <div className="row mx-0 my-2">
            <div className="col-12" align="end">
              <span onClick={this.toggleOrder} className="mx-2">
                {this.state.order === "asc" ? (
                  <i className="fa fa-2x fa-sort-alpha-desc pointer"></i>
                ) : (
                  <i className="fa fa-2x fa-sort-alpha-asc pointer"></i>
                )}
              </span>
              <span onClick={this.toggleView} className="mx-2">
                {this.props.view === "list" ? (
                  <i className="fa fa-2x fa-th pointer"></i>
                ) : (
                  <i className="fa fa-2x fa-list pointer"></i>
                )}
              </span>
            </div>
          </div>
        )}
        <div className={this.props.view === "list" ? "container" : ""}>
          {this.state.showAlert && (
            <div
              className={`alert alert-${this.state.alertType} fade show m-3`}
              role="alert"
            >
              {this.state.alertMessage}
            </div>
          )}
          {this.state.courses ? (
            this.state.courses.length > 0 ? (
              this.props.view === "list" ? (
                <CourseTable
                  courses={this.state.courses}
                  onDeleteCourse={this.removeCourse}
                  updateCourse={this.editCourse}
                  toggleEditor={toggleEditor}
                  history={this.props.history}
                  selected={this.props.selected}
                />
              ) : (
                <CourseGrid
                  courses={this.state.courses}
                  onDeleteCourse={this.removeCourse}
                  updateCourse={this.editCourse}
                  toggleEditor={toggleEditor}
                  history={this.props.history}
                  selected={this.props.selected}
                />
              )
            ) : (
              <div className="row">
                <div
                  className="offset-2 col-8 offset-lg-4 col-lg-4"
                  align="center"
                >
                  <img
                    src={process.env.PUBLIC_URL + "no_data.svg"}
                    alt="no_data"
                    className="mt-5"
                    width="100%"
                  />
                  <h5 className="mt-5">
                    Umm, We couldn't find anything! Start out by adding new
                    courses from the top.
                  </h5>
                </div>
              </div>
            )
          ) : (
            <h4 className="text-center mt-3">Fetching Courses ...</h4>
          )}
        </div>
      </>
    );
  }
}

export default CourseManager;
