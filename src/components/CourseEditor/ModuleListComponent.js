import React from "react";
import ModuleListItemComponent from "./ModuleListItemComponent";
import {MODULES_API_URL} from "../../common/constants";
import {connect} from "react-redux";
import service from "../../services/moduleService";
import actions from "../../actions/moduleActions";

class ModuleListComponent extends React.Component {
    componentDidMount() {
        this.props.findModulesForCourse(this.props.courseId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.courseId !== prevProps.courseId ) {
            this.props.findModulesForCourse (this.props.courseId)
        }
    }

    state = {
        activeModuleId: '',
        editingModuleId: '',
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
                            fixChange = {
                                ()=>{this.setState({activeModule: '', editingModuleId: ''})}}
                            // editingInputTitle = {this.editingInputTitle}
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

const stateToPropertyMapper = (state) => ( {
    modules: state.modules.modules
})

const dispatchToPropertyMapper = (dispatch) => ({

    deleteModule: async  (moduleId) => {
        await service.deleteModuleCall(moduleId)
        await dispatch(actions.deleteModule(moduleId))
    },
    createModule: (courseId, module) =>
        service.createModuleCall(courseId, module)
            .then(actualModule =>
                dispatch(actions.createModule(actualModule))),

    findModulesForCourse: (courseId) =>
        service.findModuleForCourseCall(courseId)
            .then(modules =>
                dispatch(actions.findModulesForCourse(modules))),

    updateModule: async (module, moduleId) => {
        const updatedModule = await service.updateModuleCall(module, moduleId)
        await dispatch(actions.updateModule(updatedModule, updatedModule._id))
    }


})

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(ModuleListComponent)