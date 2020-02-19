import React from "react";
import {connect} from "react-redux";
import {LESSONS_API_URL, LESSONS_TOPICS_API_URL, MODULES_LESSONS_API_URL, TOPICS_API_URL} from "../../common/constants";
import {updateLesson} from "../../services/LessonService";
import {updateTopic} from "../../services/TopicService";

class TopicPillsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.findTopicsForLesson(this.props.lessonId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.lessonId !== prevProps.lessonId) {
            this.props.findTopicsForLesson(this.props.lessonId)
        }
    }

    state = {
        selectedTopicId: '',
        editingTopicId: '',
        topics: {title: '', _id: ''}
    }

    render() {
        return(
            <div>
            <h1>Topics</h1>

            <ul className="nav nav-pills">
                 {
                    this.props.topics && this.props.topics.map(topic =>
                        <li className={`nav-item`}
                            onClick={() => this.setState({selectedTopicId: topic._id})}
                            key={topic._id}>

                            <a className={
                                `nav-link
                            ${(this.state.editingTopicId === topic._id
                                    || this.state.selectedTopicId === topic._id)?
                                    'active':''}`}>

                            {this.state.selectedTopicId === topic._id &&
                            this.props.history.push(`/course-editor/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${topic._id}`)
                            }

                            {this.state.editingTopicId  !== topic._id && <span>{topic.title}</span>}



                            {this.state.editingTopicId === topic._id &&

                                <input onChange={(e) => {
                                    const newTopicTitle = e.target.value
                                    this.setState(prevState => ({
                                        topic: {
                                            ...prevState.topic,
                                            title: newTopicTitle
                                        }
                                    }))
                                }} value={this.state.topic.title}/>}

                                <button onClick={() =>
                                {this.props.updateTopic(this.state.topic)
                                    .then(() =>
                                        this.setState({
                                            editingTopicId: ''
                                        })
                                    )}
                                }>Save</button>

                                <button onClick={
                                    () => this.props.deleteTopic(topic._id)}>
                                    X
                                </button>

                                <button onClick={() => {
                                    this.setState({
                                        topic: topic,
                                        editingTopicId: topic._id
                                    })
                                }}>Edit
                                </button>
                            </a>
                         </li>)
                 }
                <li className="nav-item">
                    <button onClick={() => this.props.addTopic(this.props.lessonId)}>+</button>
                </li>
            </ul>
            </div>
        )
    }
}


const stateToPropertyMapper = (state) => ({
    topics: state.topics.topics
})

const dispatcherToPropertyMapper = (dispatcher) => ({

    findTopicsForLesson: lessonId =>
        fetch(LESSONS_TOPICS_API_URL(lessonId))
            .then(response => response.json())
            .then(topics => dispatcher({
                type: 'FIND_TOPICS_FOR_LESSON',
                topics: topics
            })),

    updateTopic: async (topic) => {
        const actualTopic = await updateTopic(topic)
        dispatcher({
            type: 'UPDATE_TOPIC',
            topic: actualTopic,
            topicId: actualTopic._id
        })
    },
    addTopic: (lessonId) => {
        fetch(LESSONS_TOPICS_API_URL(lessonId), {
            method: 'POST',
            body: JSON.stringify({title: 'New Topic'}),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
            .then(actualTopic =>
                dispatcher({
                    type: 'CREATE_TOPIC',
                    topic: actualTopic
                }))
    },

    deleteTopic: (topicId) => {
        fetch(`${TOPICS_API_URL}/${topicId}`, {
            method: 'DELETE'
        }).then(response => response.json())
            .then(status =>
                dispatcher({
                    type: 'DELETE_TOPIC',
                    topicId: topicId
                }))
    },

    findAllTopics: () =>
        fetch(TOPICS_API_URL)
            .then(response => response.json())
            .then(topics =>
                dispatcher({
                    type: 'FIND_ALL_TOPICS',
                    topics: topics
                })
            )
})

export default connect(
    stateToPropertyMapper,
    dispatcherToPropertyMapper
)(TopicPillsComponent)