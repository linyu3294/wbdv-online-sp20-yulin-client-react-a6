import React from "react";


class ModuleListItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            module : this.props.module}
    }

    changeVal = (e) =>{
        const newTitle = e.target.value

        this.setState(prevState => ({
            module: {
                ...prevState.module,
                title: newTitle
            }
           })
        )

    }

    render() {
        return(
            <li
            onClick={this.props.select}
            className={`list-group-item ${this.props.active ? 'active' : ''}`}>
            {!this.props.editing && this.props.module.title}

            {this.props.editing &&
            <span>
                    <input onChange={(e) => {
                        this.changeVal(e)
                    }}
                           value={this.state.module.title}
                    />
            </span>
                    }
            {this.props.editing &&
            <span>
                <button onClick={() => {
                    this.props.deleteModule(this.props.module._id);
                }} className="float-right">
                    Delete
                </button>

                //TODO Fix Save so that it can be persistent.
                <button onClick={(e)=>{
                    this.props.updateModule(this.state.module, this.state.module._id)
                    this.props.fixChange();
                }}>Save</button>
            </span>}

        {!this.props.editing &&
                <button onClick={this.props.edit}>Edit</button>
                }

            </li>
        )
    }
}
export default ModuleListItemComponent