import React, { Component } from "react";
import LessonListItemComponent from "./LessonListItemComponent";
import lessonsService from "../../services/lessonService";
import lessonActions from "../../actions/lessonActions";
import { connect } from "react-redux";

class LessonListComponent extends Component {
  state = {
    showAddLessonInput: false,
    newLessonTitle: ""
  };

  componentDidMount() {
    this.props.findLessonsForModule(this.props.selectedModuleID);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedModuleID !== this.props.selectedModuleID) {
      this.props.findLessonsForModule(this.props.selectedModuleID);
    }
  }

  handleLessonTitleChange = e => {
    this.setState({ newLessonTitle: e.target.value });
  };

  submitNewLesson = () => {
    const lessonToCreate = {
      title: this.state.newLessonTitle
    };

    this.props.createLesson(this.props.selectedModuleID, lessonToCreate);
    this.setState({ showAddLessonInput: false });
  };

  render() {
    return (
      <>
        {this.props.lessons &&
          this.props.lessons.map(lesson => (
            <LessonListItemComponent
              key={lesson._id}
              lesson={lesson}
              history={this.props.history}
              courseId={this.props.courseId}
              selectedModuleID={this.props.selectedModuleID}
              selectedLessonID={this.props.selectedLessonID}
            />
          ))}
        <div>
          {this.state.showAddLessonInput && (
            <div className="row">
              <div className="col-8">
                <input
                  type="text"
                  placeholder="New Lesson Title"
                  className="form-control ml-3"
                  onChange={this.handleLessonTitleChange}
                />
              </div>
              <div className="col-4">
                <button className="btn btn-sm" onClick={this.submitNewLesson}>
                  <i className="fa fa-2x fa-check text-success"></i>
                </button>
                <button
                  className="btn btn-sm"
                  onClick={() => this.setState({ showAddLessonInput: false })}
                >
                  <i className="fa fa-2x fa-times text-danger"></i>
                </button>
              </div>
            </div>
          )}
          {!this.state.showAddLessonInput && (
            <i
              className="fa fa-2x fa-plus pointer text-white mt-1 ml-2"
              onClick={() => this.setState({ showAddLessonInput: true })}
            ></i>
          )}
        </div>
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
    findLessonsForModule: moduleId => {
      lessonsService.findLessonsForModule(moduleId).then(lessons => {
        dispatch(lessonActions.findAllLessons(lessons));
      });
    },

    createLesson: (moduleId, lesson) => {
      lessonsService.createLesson(moduleId, lesson).then(newLesson => {
        dispatch(lessonActions.createLesson(newLesson));
      });
    }
  };
};

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(LessonListComponent);
