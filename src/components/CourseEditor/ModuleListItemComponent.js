import React from "react";
import {connect} from 'react-redux'
import {COURSES_MODULES_API_URL, MODULES_API_URL} from "../../common/constants";

const ModuleListItemComponent = ({save, edit, editing, module, deleteModule, active, select}) =>
    <li
        onClick={select}
        className={`list-group-item ${active ? 'active':''}`}>
        {module.title}
        {editing &&
        <span>
            <button onClick={() =>
                deleteModule(module._id)}
                    className="float-right">
                Delete
            </button>
            <button onClick={save}>
                Save
            </button>
        </span>}
        {!editing && <button onClick={edit}>
            Edit
        </button>}
    </li>

const stateToPropertyMapper = (state) => ({})
const dispatchToPropertyMapper = (dispatch) => ({
    deleteModule: (moduleId) => {
        fetch(`${MODULES_API_URL}/${moduleId}`, {
            method: 'DELETE'
        }).then(response => response.json())
            .then(status => dispatch({
                type: 'DELETE_MODULE',
                moduleId: moduleId
            }))
    }
})

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(ModuleListItemComponent)
