import React, { Component } from 'react';
import './App.css';
import CourseManager from './containers/CourseManager';
import CourseEditor from './containers/CourseEditor';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/course-editor/:courseId"
          exact={true}
          render={(props) =>
            <CourseEditor
              {...props}
              history={props.history}
              courseId={props.match.params.courseId} />
          } />
        <Route path="/course-editor/:courseId/module/:selectedModuleID"
          exact={true}
          render={(props) =>
            <CourseEditor
              {...props}
              history={props.history}
              selectedModuleID={props.match.params.selectedModuleID}
              courseId={props.match.params.courseId} />
          } />
        <Route path="/course-editor/:courseId/module/:selectedModuleID/lesson/:selectedLessonID"
          exact={true}
          render={(props) =>
            <CourseEditor
              {...props}
              history={props.history}
              selectedLessonID={props.match.params.selectedLessonID}
              selectedModuleID={props.match.params.selectedModuleID}
              courseId={props.match.params.courseId} />
          } />
        <Route path="/course-editor/:courseId/module/:selectedModuleID/lesson/:selectedLessonID/topic/:selectedTopicID"
          exact={true}
          render={(props) =>
            <CourseEditor
              {...props}
              history={props.history}
              selectedLessonID={props.match.params.selectedLessonID}
              selectedModuleID={props.match.params.selectedModuleID}
              selectedTopicID={props.match.params.selectedTopicID}
              courseId={props.match.params.courseId} />
          } />
        <Route path="/course-manager"
          exact={true}
          render={(props) =>
            <CourseManager {...props} history={props.history} selected={props.location.search} />
          } />
        <Route path="/course-manager/:view"
          exact={true}
          render={(props) =>
            <CourseManager {...props} history={props.history} selected={props.location.search} view={props.match.params.view || 'list'} order="asc" />
          } />
        <Route path="/course-manager/:view/:order"
          exact={true}
          render={(props) =>
            <CourseManager {...props} history={props.history} selected={props.location.search} view={props.match.params.view || 'list'} order={props.match.params.view || 'asc'} />
          } />
        <Route path="/"
          exact={true}
          render={(props) =>
            <CourseManager {...props} history={props.history} view="list" order='asc' />
          } />
      </Router>
    )
  }
}
export default App;