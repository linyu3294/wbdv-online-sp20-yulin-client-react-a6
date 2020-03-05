import { FIND_ALL_MODULES, CREATE_MODULE, DELETE_MODULE, UPDATE_MODULE } from "../constants/ModuleConstants";

export const findAllModules = (modules) => ({
    type: FIND_ALL_MODULES,
    modules: modules
})

export const createModule = (newModule) => ({
    type: CREATE_MODULE,
    module: newModule
})

export const deleteModule = (moduleId) => ({
    type: DELETE_MODULE,
    moduleId: moduleId
})

export const updateModule = (module) => ({
    type: UPDATE_MODULE,
    module: module
})

export default {
    createModule,
    findAllModules,
    deleteModule,
    updateModule
}