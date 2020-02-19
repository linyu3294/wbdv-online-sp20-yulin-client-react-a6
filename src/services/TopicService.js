import {TOPICS_API_URL, LESSONS_TOPICS_API_URL, MODULES_API_URL} from "../common/constants";

export const findTopicsForLesson = async (lessonId) =>{
    const response = await fetch(LESSONS_TOPICS_API_URL(lessonId)
    )
    return await response.json()
}

export const createTopic = async (lessonId, topic) => {
    const response = await fetch(LESSONS_TOPICS_API_URL(lessonId), {
        method: "POST",
        body: JSON.stringify(topic),
        headers: {
            'content-type': 'application/json'
        }
    })
    return await response.json()
}

export const deleteTopic = async (topic) => {
    const response = await fetch(`${TOPICS_API_URL}/${topic._id}`, {
        method: 'DELETE'
    })
    return await response.json()
}

export const updateTopic = async (topic) =>
{
    const response = await fetch(`${TOPICS_API_URL}/${topic._id}`, {
        method: 'PUT',
        body: JSON.stringify(topic),
        headers: {
            'content-type': 'application/json'
        }
    })
    return await response.json()
}

export default {
    findTopicsForLesson,
    createTopic,
    updateTopic
}