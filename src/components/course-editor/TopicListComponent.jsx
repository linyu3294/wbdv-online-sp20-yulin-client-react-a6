import React, { Component } from "react";
import TopicListItemComponent from "./TopicListItemComponent";
import topicService from "../../services/topicService";
import topicActions from "../../actions/topicActions";
import { connect } from "react-redux";

class TopicListComponent extends Component {
  state = {
    showAddTopicInput: false,
    newTopicTitle: ""
  };

  componentDidMount() {
    this.props.findTopicsForLesson(this.props.selectedLessonID);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLessonID !== this.props.selectedLessonID) {
      this.props.findTopicsForLesson(this.props.selectedLessonID);
    }
  }

  handleTopicTitleChange = e => {
    this.setState({ newTopicTitle: e.target.value });
  };

  submitNewTopic = () => {
    const topicToCreate = {
      title: this.state.newTopicTitle
    };

    this.props.createTopic(this.props.selectedLessonID, topicToCreate);
    this.setState({ showAddTopicInput: false });
  };

  render() {
    return (
      <div className="row">
        <div className="mt-3">
          {this.props.topics &&
            this.props.topics.map(topic => (
              <TopicListItemComponent
                key={topic.id}
                topic={topic}
                history={this.props.history}
                courseId={this.props.courseId}
                selectedModuleID={this.props.selectedModuleID}
                selectedLessonID={this.props.selectedLessonID}
                selectedTopicID={parseInt(this.props.selectedTopicID)}
              />
            ))}
          {!this.state.showAddTopicInput && (
            <i
              className="fa fa-2x fa-plus pointer align-middle ml-3"
              onClick={() => this.setState({ showAddTopicInput: true })}
            ></i>
          )}
        </div>
        {this.state.showAddTopicInput && (
          <div className="row mt-3">
            <div className="col-8 col-md-6">
              <input
                type="text"
                placeholder="New Topic Title"
                className="form-control ml-3"
                onChange={this.handleTopicTitleChange}
              />
            </div>
            <div className="col-4">
              <button className="btn btn-sm" onClick={this.submitNewTopic}>
                <i className="fa fa-2x fa-check text-success"></i>
              </button>
              <button
                className="btn btn-sm"
                onClick={() => this.setState({ showAddTopicInput: false })}
              >
                <i className="fa fa-2x fa-times text-danger"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const stateToPropertyMapper = state => {
  return {
    topics: state.topics.topics
  };
};

const dispatchToPropertyMapper = dispatch => {
  return {
    findTopicsForLesson: lessonId => {
        topicService.findTopicsForLesson(lessonId).then(topics => {
        dispatch(topicActions.findAllTopics(topics));
      });
    },

    createTopic: (lessonId, topic) => {
      topicService.createTopic(lessonId, topic).then(newTopic => {
        dispatch(topicActions.createTopic(newTopic));
      });
    }
  };
};

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(TopicListComponent);
