import { API_URL } from "../constants/app-constants";

export const createModule = async (courseId, module) => {
    const response = await fetch(`${API_URL}/courses/${courseId}/modules`, {
        method: "POST",
        body: JSON.stringify(module),
        headers: {
            'content-type': 'application/json'
        }
    })

    return await response.json()
}

export const findModulesForCourse = async (courseId) => {
    const response = await fetch(`${API_URL}/courses/${courseId}/modules`, {
        headers: {
            'content-type': 'application/json'
        }
    })

    return await response.json()
}

export const findModuleById = async (moduleId) => {
    const response = await fetch(`${API_URL}/modules/${moduleId}`, {
        headers: {
            'content-type': 'application/json'
        }
    })

    return await response.json();
}

export const updateModule = async (moduleId, module) => {
    const response = await fetch(`${API_URL}/modules/${moduleId}`, {
        method: 'PUT',
        body: JSON.stringify(module),
        headers: {
            'content-type': 'application/json'
        }
    })

    return await response.json();
}

export const deleteModule = async (moduleId) => {
    const response = await fetch(`${API_URL}/modules/${moduleId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    })

    return await response.json();
}

export default {
    createModule,
    findModulesForCourse,
    findModuleById,
    updateModule,
    deleteModule
}