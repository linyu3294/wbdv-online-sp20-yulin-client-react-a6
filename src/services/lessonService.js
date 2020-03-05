import { API_URL } from "../constants/app-constants";

export const createLesson = async (moduleId, lesson) => {
    const response = await fetch(`${API_URL}/modules/${moduleId}/lessons`, {
        method: "POST",
        body: JSON.stringify(lesson),
        headers: {
            'content-type': 'application/json'
        }
    })

    return await response.json()
}

export const findLessonsForModule = async (moduleId) => {
    const response = await fetch(`${API_URL}/modules/${moduleId}/lessons`, {
        headers: {
            'content-type': 'application/json'
        }
    })

    return await response.json()
}

export const findLessonById = async (lessonId) => {
    const response = await fetch(`${API_URL}/lessons/${lessonId}`, {
        headers: {
            'content-type': 'application/json'
        }
    })

    return await response.json();
}

export const updateLesson = async (lessonId, lesson) => {
    const response = await fetch(`${API_URL}/lessons/${lessonId}`, {
        method: 'PUT',
        body: JSON.stringify(lesson),
        headers: {
            'content-type': 'application/json'
        }
    })

    return await response.json();
}

export const deleteLesson = async (lessonId) => {
    const response = await fetch(`${API_URL}/lessons/${lessonId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    })

    return await response.json();
}

export default {
    createLesson,
    findLessonsForModule,
    findLessonById,
    updateLesson,
    deleteLesson
}