import { FIND_ALL_TOPICS, CREATE_TOPIC, DELETE_TOPIC, UPDATE_TOPIC } from "../constants/TopicConstants";

export const findAllTopics = (topics) => ({
    type: FIND_ALL_TOPICS,
    topics: topics
})

export const createTopic = (newTopic) => ({
    type: CREATE_TOPIC,
    newTopic: newTopic
})

export const deleteTopic = (topicId) => ({
    type: DELETE_TOPIC,
    topicId: topicId
})

export const updateTopic = (topic) => ({
    type: UPDATE_TOPIC,
    topic: topic
})

export default {
    createTopic,
    findAllTopics,
    deleteTopic,
    updateTopic
}