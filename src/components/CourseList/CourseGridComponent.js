import React from 'react'
import CourseGridCardComponent from './CourseGridCardComponent'

const CourseGridComponent = ({courses, deleteCourse}) =>
	<div>
		<h3>Course Grid {courses.length}</h3>
		<div className="row">
			{
				courses.map(function(course, index) {
					return (
						<CourseGridCardComponent
							key={course._id}
							deleteCourse={deleteCourse}
							course={course}/>
					)
				})
			}
		</div>
	</div>

export default CourseGridComponent