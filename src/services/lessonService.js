import {LESSONS_API_URL, MODULES_LESSONS_API_URL} from "../common/constants";

export const findLessonsForModuleCall = async (moduleId) =>{
    const response = await fetch(MODULES_LESSONS_API_URL(moduleId))
    return await response.json()
}

export const createLessonCall = async (moduleId, lesson) => {
    const response = await fetch(MODULES_LESSONS_API_URL(moduleId), {
        method: "POST",
        body: JSON.stringify(lesson),
        headers: {
            'content-type': 'application/json'
        }
    })
    return await response.json()
}

export const deleteLessonCall = async (lessonId) => {
    const response = await fetch(`${LESSONS_API_URL}/${lessonId}`, {
        method: 'DELETE'
    })
    return await response.json()
}


export const updateLessonCall = async (lesson) =>
{   const response = await fetch(`${LESSONS_API_URL}/${lesson._id}`, {
        method: 'PUT',
        body: JSON.stringify(lesson),
        headers: {
            'content-type': 'application/json'
        }
    })
    return await response.json()
}


export default {
    createLessonCall,
    deleteLessonCall,
    updateLessonCall,
    findLessonsForModuleCall
}