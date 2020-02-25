import React from "react";
import {connect} from 'react-redux'
import {COURSES_MODULES_API_URL, MODULES_API_URL} from "../../common/constants";
import {updateModule} from "../../actions/moduleActions";

class ModuleListItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {refresh: true}
    }

    render() {
        return(
            <li
                onClick={this.props.select}
                className={`list-group-item ${this.props.active ? 'active' : ''}`}>
                {!this.props.editing && this.props.module.title}
                {this.props.editing &&
                <input onChange={(e) => {
                    this.props.changeVal(e)
                }}
                       value={this.props.editingInputTitle}
                />


                }
                {this.props.editing &&
                <span>
            <button onClick={() => {
                this.props.deleteModule(this.props.module._id);

            }
            }
                    className="float-right">
                Delete
            </button>
            //TODO Fix Save so that it can be persistent.
            <button onClick={
                this.props.save
            }>
                Save
            </button>
        </span>}
                {!this.props.editing && <button onClick={this.props.edit}>
                    Edit
                </button>}
            </li>
        )
    }
}
export default ModuleListItemComponent