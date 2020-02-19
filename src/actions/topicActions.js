
export const FIND_TOPICS_FOR_LESSON= "FIND_TOPICS_FOR_LESSON"
export const findTopicsForLesson = (topics) => ({
    type: FIND_TOPICS_FOR_LESSON,
    topics: topics
})

export const CREATE_TOPIC = "CREATE_TOPIC"
export const createTopic = (topic) => ({
    type: CREATE_TOPIC,
    topic: topic
})

export const DELETE_TOPIC = "DELETE_TOPIC"
export const deleteTopic = (topicId) => ({
    type: DELETE_TOPIC,
    topicId: topicId
})

export const UPDATE_TOPIC = "UPDATE_TOPIC"
export const updateTopic = (topic) => ({
    type: 'UPDATE_TOPIC',
    topic: topic,
    topicId: topic._id
})

