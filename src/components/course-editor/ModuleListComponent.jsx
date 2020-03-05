import React, { Component } from "react";
import ModuleListItemComponent from "./ModuleListItemComponent";
import modulesService from "../../services/ModuleService";
import moduleActions from "../../actions/ModuleActions";
import { connect } from "react-redux";

class ModuleListComponent extends Component {
  state = {
    showAddModuleInput: false,
    newModuleTitle: ""
  };

  handleModuleTitleChange = e => {
    this.setState({ newModuleTitle: e.target.value });
  };

  componentDidMount() {
    this.props.findModulesForCourse(this.props.courseId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.courseId !== this.props.courseId) {
      this.props.findModulesForCourse(this.props.courseId);
    }
  }

  submitNewModule = () => {
    const moduleToCreate = {
      title: this.state.newModuleTitle
    };

    this.props.createModule(this.props.courseId, moduleToCreate);
    this.setState({ showAddModuleInput: false });
  };

  render() {
    return (
      <>
        {this.props.modules &&
          this.props.modules.map(module => (
            <ModuleListItemComponent key={module._id} module={module} history={this.props.history} courseId={this.props.courseId} selectedModuleID={this.props.selectedModuleID} />
          ))}
        <div
          className={`card ml-2 my-2 ${
            this.state.showAddModuleInput ? "border-dark shadow-sm" : "border-0"
          } bg-transparent`}
        >
          <div className="card-body">
            <div className="row">
              {this.state.showAddModuleInput && (
                <>
                  <div className="col-7">
                    <input
                      type="text"
                      placeholder="New Module Title"
                      className="form-control"
                      onChange={this.handleModuleTitleChange}
                    />
                  </div>
                  <div className="col-5">
                    <button
                      className="btn btn-sm"
                      onClick={this.submitNewModule}
                    >
                      <i className="fa fa-2x fa-check"></i>
                    </button>
                    <button
                      className="btn btn-sm"
                      onClick={() =>
                        this.setState({ showAddModuleInput: false })
                      }
                    >
                      <i className="fa fa-2x fa-times"></i>
                    </button>
                  </div>
                </>
              )}
              {!this.state.showAddModuleInput && (
                <div className="offset-10 col-2">
                  <i
                    className="fa fa-2x fa-plus pointer"
                    onClick={() => this.setState({ showAddModuleInput: true })}
                  ></i>
                </div>
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
    findModulesForCourse: courseId => {
      modulesService.findModulesForCourse(courseId).then(modules => {
        dispatch(moduleActions.findAllModules(modules));
      });
    },

    createModule: (courseId, module) => {
      modulesService.createModule(courseId, module).then(newModule => {
        dispatch(moduleActions.createModule(newModule));
      });
    }
  };
};

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(ModuleListComponent);
