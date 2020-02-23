import React from "react";
import ModuleListItemComponent from "./ModuleListItemComponent";
import {MODULES_API_URL} from "../../common/constants";
import {connect} from "react-redux";

export default class ModuleListComponent extends React.Component {
    componentDidMount() {
        this.props.findModulesForCourse(this.props.courseId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.courseId !== prevProps.courseId) {
            // this.props.findModulesForCourse (this.props.courseId)
        }
    }

    state = {
        activeModuleId: this.props.moduleId,
        editingModuleId: '',
        editingInputTitle: "New Module"
    }

    changeVal = (e) =>{
        this.setState(
        {editingInputTitle : e.target.value}
        )
    }

    render() {
        return (
            <ul className="list-group">
                {
                    this.props.modules && this.props.modules.map(module =>
                        <ModuleListItemComponent
                            key={module._id}
                            changeVal = {this.changeVal}
                            editingInputTitle = {this.editingInputTitle}
                            edit={() => {
                                const moduleId = module._id
                                this.props.history.push(`/course-editor/${this.props.courseId}/module/${moduleId}`)
                                this.setState({
                                    editingModuleId: module._id
                                })
                            }}
                            select={() => {
                                const moduleId = module._id
                                this.props.history.push(`/course-editor/${this.props.courseId}/module/${moduleId}`)
                                this.setState({
                                    activeModuleId: module._id
                                })
                            }}
                            save={() => this.setState({
                                editingModuleId: ''
                            })}

                            editing={module._id === this.state.editingModuleId}
                            active={module._id === this.state.activeModuleId}

                            module={module}
                        />)
                }
                <li className="list-group-item">
                    <button onClick={
                        () => this.props.createModule(this.props.courseId, {title: 'New Module'})
                    }>
                        Add
                    </button>
                </li>
            </ul>
        );
    }


}

const stateToPropertyMapper = (state) => ( {modules: state.modules.modules})
const dispatchToPropertyMapper = (dispatch) => ({
    deleteModule: (moduleId) => {
        fetch(`${MODULES_API_URL}/${moduleId}`, {
            method: 'DELETE'
        }).then(response => response.json())
            .then(status => dispatch({
                type: 'DELETE_MODULE',
                moduleId: moduleId
            }))
    },


})

  connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(ModuleListComponent)

