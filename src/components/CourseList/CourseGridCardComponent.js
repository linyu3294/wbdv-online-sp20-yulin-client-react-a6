import React from 'react'

const CourseGridCardComponent = ({course, deleteCourse}) =>
	<div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
		{course.title}
        <button onClick={(event) => deleteCourse(course)}>Delete</button>
	</div>

export default CourseGridCardComponent;