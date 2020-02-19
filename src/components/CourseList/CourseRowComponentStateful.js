import React from "react";
import {Link} from "react-router-dom";

class CourseRowComponentStateful extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        active: false,
        course: this.props.course
    }
    editCourse = () => {
        this.setState(prevState => ({
            active: !prevState.active
        }))
    }
    saveCourse = () => {
        this.setState(prevState => ({
            active: !prevState.active
        }))
    }
    updateForm = (e) => {
        this.setState({
            course: {
                title: e.target.value
            }
        })
    }
    render() {
        return(
            <li className={`list-group-item ${this.state.active?'active':''}`}>
                {
                    !this.state.active &&
                        <Link to={`/course-editor/${this.state.course._id}`}>
                            {this.state.course.title}
                        </Link>
                }
                {
                    this.state.active &&
                    <input
                        onChange={this.updateForm}
                        value={this.state.course.title}/>
                }
                {
                    !this.state.active &&
                    <button onClick={() => this.editCourse()}>edit</button>
                }
                {
                    this.state.active && <span>
                        <button onClick={(event) => this.props.deleteCourse(this.props.course)}>Delete</button>
                        <button onClick={() => this.saveCourse()}>save</button>
                    </span>
                }
            </li>
        )
    }
}
    
export default CourseRowComponentStateful
