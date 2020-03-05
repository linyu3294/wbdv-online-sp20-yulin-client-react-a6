import React, { Component } from "react";
import modulesService from "../../services/ModuleService";
import moduleActions from "../../actions/ModuleActions";
import { connect } from "react-redux";

class ModuleListItemComponent extends Component {
  state = {
    isHovered: false,
    isSelected: false,
    isEditEnabled: false,
    newModuleTitle: ""
  };

  componentDidMount() {
    this.setState({
      isSelected: this.props.module._id === this.props.selectedModuleID
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isSelected !== this.state.isSelected) {
      this.setState({isEditEnabled: false});
    }

    if (
      this.state.isSelected !==
      (this.props.module._id === this.props.selectedModuleID)
    ) {
      this.setState({
        isSelected: this.props.module._id === this.props.selectedModuleID
      });
    }
  }

  handleModuleTitleInputChange = event => {
    this.setState({newModuleTitle: event.target.value});
  }

  setSelectedIdToRoute = () => {
    this.props.history.push(
      `/course-editor/${this.props.courseId}/module/${this.props.module._id}`
    );
  };

  deleteModuleClicked = e => {
    e.stopPropagation();
    this.props.deleteModule(this.props.module._id);
    if (this.props.module._id === this.props.selectedModuleID) {
      this.props.history.push(`/course-editor/${this.props.courseId}`);
    }
  };

  updateModuleClikcked = e => {
    e.stopPropagation();
    const module = { ...this.props.module };
    module.title = this.state.newModuleTitle;
    this.props.updateModule(module);
    this.setState({isEditEnabled: false});
  };

  enableEditMode = e => {
    e.stopPropagation();
    this.setState({ isEditEnabled: true });
  };

  handleTitleChange = e => {
    this.setState({ newModuleTitle: e.target.value });
  };

  render() {
    return (
      <>
        <div
          className={`card pointer ml-2 my-2 ${
            this.state.isHovered ? "shadow-sm border-dark" : ""
          } ${this.state.isSelected ? "bg-dark" : ""}`}
          onMouseEnter={() => this.setState({ isHovered: true })}
          onMouseLeave={() => this.setState({ isHovered: false })}
          onClick={this.setSelectedIdToRoute}
        >
          <div className="card-body">
            <div className="row">
              {(!this.state.isSelected  || !this.state.isEditEnabled) && (
                <>
                  <div className="col-8">
                    <h4
                      className={`${this.state.isSelected ? "text-white" : ""}`}
                    >
                      {this.props.module.title}
                    </h4>
                  </div>
                  <div className="col-4">
                    {this.state.isSelected && (
                      <>
                        <i
                          className="fa fa-2x fa-pencil text-info mx-1"
                          onClick={this.enableEditMode}
                        ></i>
                        <i
                          className="fa fa-2x fa-trash text-danger mx-1"
                          onClick={this.deleteModuleClicked}
                        ></i>
                      </>
                    )}
                  </div>
                </>
              )}
              {this.state.isSelected && this.state.isEditEnabled && (
                <>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="New Module Title"
                      onChange={this.handleModuleTitleInputChange}
                    />
                  </div>
                  <div className="col-4">
                    <i
                      className="fa fa-2x fa-check text-success mx-1"
                      onClick={this.updateModuleClikcked}
                    ></i>
                    <i
                      className="fa fa-2x fa-times text-danger mx-1"
                      onClick={() => this.setState({ isEditEnabled: false })}
                    ></i>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const stateToPropertyMapper = state => {
  return {
    modules: state.modules.modules
  };
};

const dispatchToPropertyMapper = dispatch => {
  return {
    deleteModule: moduleID => {
      modulesService.deleteModule(moduleID).then(() => {
        dispatch(moduleActions.deleteModule(moduleID));
      });
    },

    updateModule: module => {
      modulesService.updateModule(module._id, module).then(() => {
        dispatch(moduleActions.updateModule(module));
      });
    }
  };
};

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(ModuleListItemComponent);
