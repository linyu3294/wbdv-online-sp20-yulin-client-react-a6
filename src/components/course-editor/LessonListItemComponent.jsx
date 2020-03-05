import React, { Component } from "react";
import lessonsService from "../../services/LessonService";
import lessonActions from "../../actions/LessonActions";
import { connect } from "react-redux";

class LessonListItemComponent extends Component {
  state = {
    isHovered: false,
    isSelected: false,
    isEditEnabled: false,
    newLessonTitle: ""
  };

  componentDidMount() {
    this.setState({
      isSelected: this.props.lesson._id === this.props.selectedLessonID
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isSelected !== this.state.isSelected) {
      this.setState({ isEditEnabled: false });
    }

    if (
      this.state.isSelected !==
      (this.props.lesson._id === this.props.selectedLessonID)
    ) {
      this.setState({
        isSelected: this.props.lesson._id === this.props.selectedLessonID
      });
    }
  }

  setSelectedIdToRoute = () => {
    this.props.history.push(
      `/course-editor/${this.props.courseId}/module/${this.props.selectedModuleID}/lesson/${this.props.lesson._id}`
    );
  };

  deleteLessonClicked = e => {
    e.stopPropagation();
    this.props.deleteLesson(this.props.lesson._id);
    if (this.props.lesson._id === this.props.selectedLessonID) {
      this.props.history.push(
        `/course-editor/${this.props.courseId}/module/${this.props.selectedModuleID}`
      );
    }
  };

  updateLessonClicked = e => {
    e.stopPropagation();
    const lesson = { ...this.props.lesson };
    lesson.title = this.state.newLessonTitle;
    this.props.updateLesson(lesson);
    this.setState({isEditEnabled: false});
  };

  enableEditMode = e => {
    e.stopPropagation();
    this.setState({ isEditEnabled: true });
  };

  handleTitleChange = e => {
    this.setState({ newLessonTitle: e.target.value });
  };

  render() {
    return (
      <>
        <li
          className={`nav-item pointer`}
          onMouseEnter={() => this.setState({ isHovered: true })}
          onMouseLeave={() => this.setState({ isHovered: false })}
          onClick={this.setSelectedIdToRoute}
        >
          {!this.state.isEditEnabled && (
            <a
              href="#!"
              className={`nav-link ${
                this.state.isSelected ? "bg-light text-dark" : "text-light"
              } ${this.state.isHovered ? "shadow-sm" : ""}`}
            >
              <span className="mx-1">{this.props.lesson.title}</span>

              {this.state.isSelected && (
                <>
                  <i
                    className="fa fa-pencil text-info mx-1"
                    onClick={this.enableEditMode}
                  ></i>
                  <i
                    className="fa fa-trash text-danger mx-1"
                    onClick={this.deleteLessonClicked}
                  ></i>
                </>
              )}
            </a>
          )}

          {this.state.isEditEnabled && (
            <div className="row">
              <div className="col-8">
                <input
                  type="text"
                  placeholder="New Lesson Title"
                  className="form-control ml-3"
                  onChange={this.handleTitleChange}
                />
              </div>
              <div className="col-4">
                <button className="btn btn-sm" onClick={this.updateLessonClicked}>
                  <i className="fa fa-2x fa-check text-success"></i>
                </button>
                <button
                  className="btn btn-sm"
                  onClick={() => this.setState({ isEditEnabled: false })}
                >
                  <i className="fa fa-2x fa-times text-danger"></i>
                </button>
              </div>
            </div>
          )}
        </li>
      </>
    );
  }
}

const stateToPropertyMapper = state => {
  return {
    lessons: state.lessons.lessons
  };
};

const dispatchToPropertyMapper = dispatch => {
  return {
    deleteLesson: lessonID => {
      lessonsService.deleteLesson(lessonID).then(() => {
        dispatch(lessonActions.deleteLesson(lessonID));
      });
    },

    updateLesson: lesson => {
      lessonsService.updateLesson(lesson._id, lesson).then(() => {
        dispatch(lessonActions.updateLesson(lesson));
      });
    }
  };
};

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(LessonListItemComponent);
