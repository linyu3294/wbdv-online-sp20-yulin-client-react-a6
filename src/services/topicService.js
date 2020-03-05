import { API_URL } from "../constants/app-constants";

export const createTopic = async (topicId, topic) => {
    const response = await fetch(`${API_URL}/topics/${topicId}/topics`, {
        method: "POST",
        body: JSON.stringify(topic),
        headers: {
            'content-type': 'application/json'
        }
    })

    return await response.json()
}

export const findTopicsForLesson = async (topicId) => {
    const response = await fetch(`${API_URL}/topics/${topicId}/topics`, {
        headers: {
            'content-type': 'application/json'
        }
    })

    return await response.json()
}

export const findTopicById = async (topicId) => {
    const response = await fetch(`${API_URL}/topics/${topicId}`, {
        headers: {
            'content-type': 'application/json'
        }
    })

    return await response.json();
}

export const updateTopic = async (topicId, topic) => {
    const response = await fetch(`${API_URL}/topics/${topicId}`, {
        method: 'PUT',
        body: JSON.stringify(topic),
        headers: {
            'content-type': 'application/json'
        }
    })

    return await response.json();
}

export const deleteTopic = async (topicId) => {
    const response = await fetch(`${API_URL}/topics/${topicId}`, {
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