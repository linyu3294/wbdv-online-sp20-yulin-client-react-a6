import React from "react";
import LessonTabsComponent from "./LessonTabsComponent";
import {Link} from "react-router-dom";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import ModuleListContainer from "../../containers/ModuleListContaner";
import WidgetListComponent from "./WidgetListComponent";
import TopicPillsComponent from "./TopicPillsComponent";
import modules from '../../reducers/moduleReducer'
import lessons from '../../reducers/lessonReducer'
import topics from "../../reducers/topicReducer";
import widgets from "../../reducers/widgetReducer";

const reducers = combineReducers({
    modules, lessons, topics, widgets
})

const store = createStore(reducers)

//({hideEditor, match, courseId, moduleId, history})
class CourseEditorComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <button onClick={() => {
                        this.props.match.params.history.push("/")
                    }}>
                        Close
                    </button>
                    <Link to="/">
                        Back
                    </Link>
                    <h3>Course Editor {this.props.moduleId}</h3>
                    <div className="row">
                        <div className="col-3">
                            <ModuleListContainer
                                history ={this.props.history}
                                moduleId={this.props.moduleId}
                                courseId={this.props.courseId}
                                modules ={this.props.modules}
                            />

                        </div>
                        <div className="col-9">
                            <LessonTabsComponent
                                history ={this.props.history}
                                courseId={this.props.courseId}
                                moduleId={this.props.moduleId}
                                lessonId={this.props.lessonId}
                                lessons ={this.props.lessons}
                            />

                            <TopicPillsComponent
                                history ={this.props.history}
                                courseId={this.props.courseId}
                                moduleId={this.props.moduleId}
                                lessons ={this.props.lessons}
                                topics = {this.props.topics}
                                lessonId={this.props.lessonId}
                            />

                            <WidgetListComponent
                                history ={this.props.history}
                                courseId={this.props.courseId}
                                moduleId={this.props.moduleId}
                                lessons ={this.props.lessons}
                                topics = {this.props.topics}
                                widgets={this.props.widgets}
                                lessonId={this.props.lessonId}
                                topicId = {this.props.topicId}
                                widgetId={this.props.widgetId}
                            />

                        </div>
                    </div>
                </div>
            </Provider>
        )
    }
}
export default CourseEditorComponent