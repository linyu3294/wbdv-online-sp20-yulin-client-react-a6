import React from 'react'
import CourseEditorComponent from "../components/CourseEditor/CourseEditorComponent";
import {createCourse, findAllCourses, deleteCourse} from '../services/CourseService'
import CourseListComponent from "../components/CourseList/CourseListComponent";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

class CourseManagerContainer extends React.Component {
    state = {
        showEditor: false,
        layout: 'table',
        newCourseTitle: 'New Course',
        courses: []
    }

    componentDidMount = async () => {

        const courses = await findAllCourses()
        this.setState({
            courses: courses
        })
    }

    deleteCourse = async (deletedToCourse) => {
        const status = await deleteCourse(deletedToCourse._id)
        const courses = await findAllCourses()
        this.setState({
            courses: courses
        })
    }

    addCourse = () => {
        createCourse({
            title: this.state.newCourseTitle
        }).then(actual => {
            return findAllCourses()
        })
        .then(courses => {
            this.setState({
                courses: courses
            })
        })
    }

    toggle = () => {
        this.setState(prevState => ({
            layout: prevState.layout === 'grid' ? 'table': 'grid'
        }))
    }

    updateFormState = (event) => {
        console.log(event.target.value)
        this.setState({
            newCourseTitle: event.target.value
        })
    }


    editCourse = (course) => {
        this.setState(prevState => ({
            courses: prevState.courses.map(c => {
                c.editing = false
                if(c._id === course._id) {
                    c.editing = true
                } else {
                    c.editing = false
                }
                return c
        })}))
    }

    showEditor = () =>
        this.setState({
            showEditor: true
        })

    hideEditor = () =>
        this.setState({
            showEditor: false
        })

    render() {
        return (
            <div className="container-fluid">
                <h1>Course Manager</h1>

                <Router>
                    {/*<Link to="/page1">Page 1</Link>*/}
                    {/*<Link to="/page2">Page 2</Link>*/}
                    {/*<Route path="/page1" component={Page1}/>*/}
                    {/*<Route path="/page2" component={Page2}/>*/}

                    <Route
                        path="/"
                        exact={true}
                        render={() =>
                        <CourseListComponent
                            updateFormState={this.updateFormState}
                            newCourseTitle={this.state.newCourseTitle}
                            addCourse={this.addCourse}
                            toggle={this.toggle}
                            deleteCourse={this.deleteCourse}
                            courses={this.state.courses}
                            layout={this.state.layout}
                            showEditor={this.showEditor}
                            editCourse={this.editCourse}/>
                        }/>

                    <Route
                        path="/course-editor/:courseId"
                        exact={true}
                        render={(props) =>
                        <CourseEditorComponent
                            {...props}
                            courseId={props.match.params.courseId}
                            moduleId={props.match.params.moduleId}
                            lessonId={props.match.params.lessonId}
                            modules= {props.match.params.modules}
                            lessons ={props.match.params.lessons}
                            hideEditor={this.hideEditor}/>
                        }/>

                    <Route
                        path="/course-editor/:courseId/module/:moduleId"
                        exact={true}
                        render={(props) =>
                            <CourseEditorComponent
                                {...props}
                                courseId={props.match.params.courseId}
                                moduleId={props.match.params.moduleId}
                                lessonId={props.match.params.lessonId}
                                modules= {props.match.params.modules}
                                lessons ={this.props.lessons}
                                hideEditor={this.hideEditor}/>
                        }/>
                    <Route
                        path="/course-editor/:courseId/module/:moduleId/lesson/:lessonId"
                        exact={true}
                        render={(props) =>
                            <CourseEditorComponent
                                {...props}
                                courseId={props.match.params.courseId}
                                moduleId={props.match.params.moduleId}
                                lessonId={props.match.params.lessonId}
                                modules= {props.match.params.modules}
                                lessons ={props.match.params.lessons}
                                hideEditor={this.hideEditor}/>
                        }/>

                    <Route
                        path="/course-editor/:courseId/module/:moduleId/lesson/:lessonId/topic/:topicId"
                        exact={true}
                        render={(props) =>
                            <CourseEditorComponent
                                {...props}
                                courseId={props.match.params.courseId}
                                lessonId={props.match.params.lessonId}
                                moduleId={props.match.params.moduleId}
                                topicId={props.match.params.topicId}
                                lessons ={props.match.params.lessons}
                                hideEditor={this.hideEditor}/>
                        }/>

                    <Route
                        path ="/course-editor/:courseId/module/:moduleId/lesson/:lessonId/topic/:topicId/widget/:widgetId"
                        exact={true}
                        render={(props) =>
                            <CourseEditorComponent
                                {...props}
                                courseId={props.match.params.courseId}
                                lessonId={props.match.params.lessonId}
                                moduleId={props.match.params.moduleId}
                                topicId={props.match.params.topicId}
                                widgetId={props.match.params.widgetId}
                                widgets = {props.match.params.widgets}
                                lessons ={props.match.params.lessons}
                                topics  ={props.match.params.topics}
                                hideEditor={this.hideEditor}/>
                        }/>




                </Router>
            </div>
        );
    }
}

export default CourseManagerContainer
