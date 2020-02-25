import React from "react";
import {connect} from "react-redux";
import service from "../../services/lessonService";
import action from "../../actions/lessonActions";
import {LESSONS_API_URL, MODULES_LESSONS_API_URL} from "../../common/constants";



class LessonTabsComponent extends React.Component {
constructor(prop) {
    super(prop);
    this.state = {
        selectedLessonId: this.props.lessonId,
        editingLessonId: '',
        // lessons: {title: '', _id: ''}
    }
}


    componentDidMount() {
        this.props.findLessonsForModule(this.props.moduleId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.moduleId !== prevProps.moduleId) {
            this.props.findLessonsForModule(this.props.moduleId)
        }
    }



    render() {
        return(
            <ul className="nav nav-tabs">
                {this.props.lessons && this.props.lessons.map(lesson =>
                    <li className={`nav-item`}
                        onClick={() => this.setState({
                            selectedLessonId: lesson._id
                        })}

                        key={lesson._id}>

                        <a className={`nav-link
                        ${(this.state.editingLessonId === lesson._id || this.state.selectedLessonId === lesson._id)?'active':''}`}>

                            { (this.state.editingLessonId  === lesson._id
                                || this.state.selectedLessonId === lesson._id) &&
                            this.props.history.push(`/course-editor/${this.props.courseId}/module/${this.props.moduleId}/lesson/${lesson._id}`)
                            }

                            {this.state.editingLessonId !== lesson._id && <span>{lesson.title}</span>}

                            {this.state.editingLessonId === lesson._id &&

                            <input
                                onChange={(e) => {
                                    const newTitle = e.target.value
                                    this.setState(prevState => ({
                                        lesson: {
                                            ...prevState.lesson,
                                            title: newTitle
                                        }
                                    }))
                                }}
                                value={this.state.lesson.title}/>}

                            <button onClick={() =>
                            {this.props.updateLesson(this.state.lesson)
                                .then(() =>
                                    this.setState({
                                        editingLessonId: ''
                                    }))
                            }}>Save</button>

                            <button onClick={
                                () => this.props.deleteLesson(lesson._id)}>
                                X
                            </button>

                            <button onClick={() => {
                                this.setState({
                                    lesson: lesson,
                                    editingLessonId: lesson._id
                                })
                            }}>Edit
                            </button>
                        </a>
                    </li>)
                }
                <li className="nav-item">
                    <button onClick={() =>
                        this.props.createLesson(this.props.moduleId, {title: "New Lesson"})}>+</button>
                </li>
            </ul>
        )
    }
}


const stateToPropertyMapper = (state) => ({
    lessons: state.lessons.lessons
})

const dispatcherToPropertyMapper = (dispatch) => ({
    deleteLesson: async  (lessonId) => {
        await service.deleteLessonCall(lessonId)
        await dispatch(action.deleteLesson(lessonId))
    },
    createLesson: (moduleId, lesson) =>
        service.createLessonCall(moduleId, lesson)
            .then(actualLesson =>
                dispatch(action.createLesson(actualLesson))),

    findLessonsForModule: (moduleId) =>
        service.findLessonsForModuleCall(moduleId)
            .then(lessons =>
                dispatch(action.findLessonsForModule(lessons))),



    // findLessonsForModule: async (moduleId) =>
    //     fetch(MODULES_LESSONS_API_URL(moduleId))
    //         .then(response => response.json())
    //         .then(lessons => dispatch(action.findLessonsForModule(lessons))),

    updateLesson: async (lesson) => {
        const actualLesson = await service.updateLessonCall(lesson)
        await dispatch({
            type: 'UPDATE_LESSON',
            lesson: actualLesson,
            lessonId: actualLesson._id
        })
    },
    //
    // addLesson: (moduleId) =>
    //     fetch(MODULES_LESSONS_API_URL(moduleId), {
    //         method: 'POST',
    //         body: JSON.stringify({title: 'New Lesson'}),
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     }).then(response => response.json())
    //         .then(actualLesson =>
    //             dispatch(action.createLesson(actualLesson)))
    // ,
    //
    // deleteLesson: (lessonId) =>
    //     fetch(`${LESSONS_API_URL}/${lessonId}`, {
    //         method: 'DELETE'
    //     }).then(response => response.json())
    //         .then(status =>
    //             dispatch({
    //                 type: 'DELETE_LESSON',
    //                 lessonId: lessonId
    //             })),
    //
    // findAllLessons: () =>
    //     fetch(LESSONS_API_URL)
    //         .then(response => response.json())
    //         .then(lessons =>
    //             dispatcher({
    //                 type: 'FIND_ALL_LESSONS',
    //                 lessons: lessons
    //             })
    //         )
})

export default connect(
    stateToPropertyMapper,
    dispatcherToPropertyMapper
)(LessonTabsComponent)