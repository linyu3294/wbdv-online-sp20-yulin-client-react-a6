import React, { Component } from "react";
import topicService from "../../services/topicService";
import topicActions from "../../actions/topicActions";
import { connect } from "react-redux";

class TopicListItemComponent extends Component {
  state = {
    isSelected: false,
    isEditEnabled: false,
    newTopicTitle: ""
  };

  componentDidMount() {
      this.setState({
        isSelected: this.props.selectedTopicID === this.props.topic.id
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isSelected !== this.state.isSelected) {
      this.setState({ isEditEnabled: false });
    }
    if (
        this.state.isSelected !==
        (this.props.topic.id === this.props.selectedTopicID)
    ) {
      this.setState({
        isSelected: this.props.topic.id === this.props.selectedTopicID
      });
    }
  }

  setSelectedIdToRoute = () => {
    this.props.history.push(
        `/course-editor/${this.props.courseId}/module/${this.props.selectedModuleID}/lesson/${this.props.selectedLessonID}/topic/${this.props.topic.id}`
    );
  };

  deleteTopicClicked = e => {
    e.stopPropagation();
    this.props.deleteTopic(this.props.topic.id);
    if (this.props.topic.id === this.props.selectedTopicID) {
      this.props.history.push(
          `/course-editor/${this.props.courseId}/module/${this.props.selectedModuleID}/lesson/${this.props.selectedLessonID}`
      );
    }
  };

  updateTopicClicked = e => {
    e.stopPropagation();
    const topic = { ...this.props.topic };
    topic.title = this.state.newTopicTitle;
    this.props.updateTopic(topic);
    this.setState({ isEditEnabled: false });
  };

  enableEditMode = e => {
    e.stopPropagation();
    this.setState({ isEditEnabled: true });
  };

  handleTitleChange = e => {
    this.setState({ newTopicTitle: e.target.value });
  };

  render() {
    return (
        <>
          {!this.state.isEditEnabled && (
              <button
                  className={`btn mx-2 ${
                      this.state.isSelected ? "btn-dark" : "btn-outline-dark"
                  }`}
                  onClick={this.setSelectedIdToRoute}
              >
                <span className="mx-1">{this.props.topic.title}</span>
                {this.state.isSelected && (
                    <>
                      <i
                          className="fa fa-pencil text-info mx-1"
                          onClick={this.enableEditMode}
                      ></i>
                      <i
                          className="fa fa-trash text-danger mx-1"
                          onClick={this.deleteTopicClicked}
                      ></i>
                    </>
                )}
              </button>
          )}
          {this.state.isEditEnabled && (
              <div className="row my-2">
                <div className="col-6">
                  <input
                      type="text"
                      placeholder="New Topic Title"
                      className="form-control ml-3"
                      onChange={this.handleTitleChange}
                  />
                </div>
                <div className="col-6">
                  <button className="btn btn-sm" onClick={this.updateTopicClicked}>
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
        </>
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
    deleteTopic: topicID => {
      topicService.deleteTopic(topicID).then(() => {
        dispatch(topicActions.deleteTopic(topicID));
      });
    },

    updateTopic: topic => {
      topicService.updateTopic(topic.id, topic).then(() => {
        dispatch(topicActions.updateTopic(topic));
      });
    }
  };
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(TopicListItemComponent);