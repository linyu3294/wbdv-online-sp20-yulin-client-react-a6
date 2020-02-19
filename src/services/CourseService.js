import {COURSES_API_URL} from "../common/constants";

export const createCourse = async (course) => {
	let response = await fetch(COURSES_API_URL, {
		method: 'POST',
		body: JSON.stringify(course),
		headers: {
			'content-type': 'application/json'
		}
	})
	return await response.json()
}

export const findAllCourses = async () => {
	let response = await fetch(COURSES_API_URL)
	return await response.json()
}

export const deleteCourse = async (courseId) => {
	let response = await fetch(`${COURSES_API_URL}/${courseId}`, {
		method: 'DELETE'
	})
	return await response.json()
}


// }

// export default CourseService;
