import React from "react";
import {connect} from "react-redux";
import service from "../services/ModuleService";
import {findModulesForCourse, createModule} from "../actions/moduleActions";
import ModuleListComponent from "../components/CourseEditor/ModuleListComponent";

const stateToPropertyMapper = (state) => ({
    modules: state.modules.modules
})

const dispatchToPropertyMapper = (dispatch) => ({
    createModule: (courseId, module) =>
        service.createModuleCall(courseId, module)
            .then(actualModule =>
                dispatch(createModule(actualModule))),
    findModulesForCourse: (courseId) =>
        service.findModuleForCourseCall(courseId)
            .then(modules =>
                dispatch(findModulesForCourse(modules)))
})

const ModuleListContainer = connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(ModuleListComponent)

export default ModuleListContainer
