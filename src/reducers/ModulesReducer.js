import _ from 'lodash';
import { FIND_ALL_MODULES, CREATE_MODULE, DELETE_MODULE, UPDATE_MODULE } from "../constants/ModuleConstants";

const initialState = {
    modules: []
}

const modulesReducer = (state = initialState, action) => {
    let modules;
    switch (action.type) {
        case FIND_ALL_MODULES:
            modules = _.sortBy(action.modules, '_createdAt')
            return {
                modules: modules
            }

        case CREATE_MODULE:
            modules = [...state.modules];
            modules.push(action.module);

            return {
                modules: modules
            }

        case DELETE_MODULE:
            modules = [...state.modules];
            _.remove(modules, {_id: action.moduleId})

            return {
                modules: modules
            }

        case UPDATE_MODULE:
            modules = [...state.modules];
            const indexToUpdate = _.findIndex(modules, {_id: action.module._id})
            modules.splice(indexToUpdate, 1, action.module);
            
            return {
                modules: modules
            }
        default:
            return state
    }
}

export default modulesReducer;