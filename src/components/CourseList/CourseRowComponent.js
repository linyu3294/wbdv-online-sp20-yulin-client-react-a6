import React from "react";

const CourseRowComponent = ({editCourse, deleteCourse, course}) =>
    <li className={`list-group-item ${course.editing?'active':''}`}
    	onClick={() => editCourse(course)}>
        {course.title} {course.editing}
        {
        	course.editing && <span>
        		<button>edit</button>
		        <button onClick={(event) => deleteCourse(course)}>Delete</button>
        	</span>
        }
    </li>

export default CourseRowComponent
