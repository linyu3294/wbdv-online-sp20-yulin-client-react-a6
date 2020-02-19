import {LESSONS_API_URL, MODULES_LESSONS_API_URL} from "../common/constants";

export const findLessonsForModuleCall = async (moduleId) =>{
     await fetch(MODULES_LESSONS_API_URL(moduleId)
    ).then(response => response.json());
}

export const createLessonCall = async (moduleId) => {
    const response = await fetch(MODULES_LESSONS_API_URL(moduleId), {
        method: "POST",
        body: JSON.stringify({title: 'New Lesson'}),
        headers: {
            'content-type': 'application/json'
        }
    })
    return await response.json()
}

export const deleteLessonCall = async (lesson) => {
    const response = await fetch(`${LESSONS_API_URL}/${lesson._id}`, {
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