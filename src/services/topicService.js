import {JANNUNZI_API_URL, LOCAL_API_URL} from "../constants/app-constants";

export const createTopic = async (lessonId, topic) => {
    const response = await fetch(`${JANNUNZI_API_URL}/lessons/${lessonId}/topics`, {
        method: "POST",
        body: JSON.stringify(topic),
        headers: {
            'content-type': 'application/json'
        }
    })

    return await response.json()
}


export const findTopicsForLesson = async (lessonId) => {
    const response = await fetch(`${JANNUNZI_API_URL}/lessons/${lessonId}/topics`, {
        headers: {
            'content-type': 'application/json'
        }
    })

    return await response.json()
}

export const findTopicById = async (topicId) => {
    const response = await fetch(`${JANNUNZI_API_URL}/topics/${topicId}`, {
        headers: {
            'content-type': 'application/json'
        }
    })

    return await response.json();
}

export const updateTopic = async (topicId, topic) => {
    const response = await fetch(`${JANNUNZI_API_URL}/topics/${topicId}`, {
        method: 'PUT',
        body: JSON.stringify(topic),
        headers: {
            'content-type': 'application/json'
        }
    })

    return await response.json();
}

export const deleteTopic = async (topicId) => {
    const response = await fetch(`${JANNUNZI_API_URL}/topics/${topicId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    })

    return await response.json();
}

export default {
    createTopic,
    findTopicsForLesson,
    findTopicById,
    updateTopic,
    deleteTopic
}