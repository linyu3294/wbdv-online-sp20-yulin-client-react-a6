import {COURSES_MODULES_API_URL, MODULES_API_URL} from "../common/constants";

export const findModuleForCourseCall = async (courseId) =>{
    const response = await fetch(COURSES_MODULES_API_URL(courseId)
    )
    return await response.json()
}

export const createModuleCall = async (courseId, module) => {
    const response = await fetch(COURSES_MODULES_API_URL(courseId), {
        method: "POST",
        body: JSON.stringify(module),
        headers: {
            'content-type': 'application/json'
        }
    })
    return await response.json()
}

export const deleteModuleCall = async (module) => {
    const response = await fetch(`${MODULES_API_URL}/${module._id}`, {
        method: 'DELETE'
    })
    return await response.json()
}

export const updateModuleCall = async (module) =>
{
    const response = await fetch(`${MODULES_API_URL}/${module._id}`, {
        method: 'PUT',
        body: JSON.stringify(module),
        headers: {
            'content-type': 'application/json'
        }
    })
    return await response.json()
}

export default {
    findModuleForCourseCall,
    createModuleCall,
    deleteModuleCall,
    updateModuleCall
}



