
const topics = (state = {topics: []}, action) => {
    switch (action.type) {
        case 'CREATE_TOPIC':
            return {
                topics: [
                    ...state.topics,
                    action.topic
                ]
            }
            break;
        case 'DELETE_TOPIC':
            return {
                topics: state.topics.filter(
                    topic => topic._id !== action.topicId)
            }
            break;
        case 'UPDATE_TOPIC':
            return {
                topics: state.topics.map(topic =>
                    topic._id === action.topicId ? action.topics : topic
                )
            }
            break;
        case 'FIND_TOPICS_FOR_LESSON':
            return {
                topics: action.topics
            }
        case 'FIND_ALL_TOPICS':
            return {
                topics: action.topics
            }
        default:
            return state
    }
}

export default topics
