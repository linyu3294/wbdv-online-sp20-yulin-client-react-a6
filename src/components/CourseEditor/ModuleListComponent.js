import React from "react";
import ModuleListItemComponent from "./ModuleListItemComponent";
import {MODULES_API_URL} from "../../common/constants";
import {connect} from "react-redux";
import service from "../../services/ModuleService";
import actions from "../../actions/moduleActions";

class ModuleListComponent extends React.Component {
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
                            {...this.props}
                            key={module._id}
                            changeVal = {this.changeVal}
                            editingInputTitle = {this.editingInputTitle}
                            editing={module._id === this.state.editingModuleId}
                            active={module._id === this.state.activeModuleId}
                            module={module}

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
    createModule: (courseId, module) =>
        service.createModuleCall(courseId, module)
            .then(actualModule =>
                dispatch(actions.createModule(actualModule))),
    findModulesForCourse: (courseId) =>
        service.findModuleForCourseCall(courseId)
            .then(modules =>
                dispatch(actions.findModulesForCourse(modules)))

})

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(ModuleListComponent)
