import React, { Component } from "react";
import { findCourseById } from "../services/CourseService";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import ModuleListComponent from "../components/course-editor/ModuleListComponent";
import moduleReducer from "../reducers/ModulesReducer";
import lessonReducer from "../reducers/LessonsReducer";
import topicReducer from "../reducers/TopicsReducer";
import LessonListComponent from "../components/course-editor/LessonListComponent";
import TopicListComponent from "../components/course-editor/TopicListComponent";
import HeadingWidgetComponent from "../components/course-editor/widgets/HeadingWidget";
import "../styles/CourseEditor.css";

class CourseEditor extends Component {
  state = {};

  componentDidMount() {
    findCourseById(this.props.courseId).then(course => {
      this.setState({ course: course });
    });
  }

  navigateBack = () => {
    this.props.history.push("/course-manager");
  };

  rootReducer = combineReducers({
    modules: moduleReducer,
    lessons: lessonReducer,
    topics: topicReducer
  });

  store = createStore(this.rootReducer);

  render() {
    return (
      <Provider store={this.store}>
        <div className="position-relative">
          <nav className="navbar navbar-dark bg-dark">
            <div>
              <i
                className="fa fa-times pointer mr-2 text-white"
                onClick={this.navigateBack}
              ></i>
              <a className="navbar-brand" href="#!">
                Whiteboard Course Editor -{" "}
                {this.state.course ? this.state.course.title : ""}
              </a>
            </div>
            {this.props.selectedModuleID && (
              <ul className="nav nav-pills">
                <LessonListComponent
                  history={this.props.history}
                  courseId={this.props.courseId}
                  selectedModuleID={this.props.selectedModuleID}
                  selectedLessonID={this.props.selectedLessonID}
                />
              </ul>
            )}
          </nav>
          <div className="row">
            <div className="col-3 module-list bg-light">
              <ul className="navbar-nav">
                {this.state.course && (
                  <ModuleListComponent
                    courseId={this.state.course._id}
                    history={this.props.history}
                    selectedModuleID={this.props.selectedModuleID}
                  />
                )}
              </ul>
            </div>
            <div className="col-9">
              {this.props.selectedModuleID && this.props.selectedLessonID && (
                <>
                  <TopicListComponent
                    history={this.props.history}
                    courseId={this.props.courseId}
                    selectedModuleID={this.props.selectedModuleID}
                    selectedLessonID={this.props.selectedLessonID}
                    selectedTopicID={this.props.selectedTopicID}
                  />
                  <hr />
                </>
              )}
              {(!this.props.selectedModuleID ||
                !this.props.selectedLessonID ||
                !this.props.selectedTopicID) && (
                <>
                  <div className="row">
                    <div className="offset-2 col-8" align="center">
                      <img
                        src={`${process.env.PUBLIC_URL}/no_selection.svg`}
                        alt="no_selection"
                        className="no-selection-img"
                      />
                      <h4 className="text-center">
                        Add / Select a module, lesson and topic to get started!
                      </h4>
                    </div>
                  </div>
                </>
              )}
              {this.props.selectedModuleID &&
                this.props.selectedLessonID &&
                this.props.selectedTopicID && (
                  <>
                    <HeadingWidgetComponent
                      widget={{
                        text: "Heading 1",
                        size: 1,
                        name: "Heading Widget"
                      }}
                    />
                  </>
                )}
            </div>
          </div>
        </div>
        <button className="btn-danger btn-lg fab">
          <i className="fa fa-plus"></i>
        </button>
      </Provider>
    );
  }
}

export default CourseEditor;
