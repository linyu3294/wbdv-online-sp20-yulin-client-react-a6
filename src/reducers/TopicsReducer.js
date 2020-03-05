import _ from 'lodash';
import { FIND_ALL_TOPICS, CREATE_TOPIC, DELETE_TOPIC, UPDATE_TOPIC } from "../constants/TopicConstants";

const initialState = {
    topics: []
}

const topicsReducer = (state = initialState, action) => {
    let topics;
    switch (action.type) {
        case FIND_ALL_TOPICS:
            topics = _.sortBy(action.topics, '_createdAt')
            return {
                topics: topics
            }

        case CREATE_TOPIC:
            topics = [...state.topics];
            topics.push(action.newTopic);

            return {
                topics: topics
            }

        case DELETE_TOPIC:
            topics = [...state.topics];
            _.remove(topics, {_id: action.topicId})

            return {
                topics: topics
            }
            
        case UPDATE_TOPIC:
            topics = [...state.topics];
            const indexToUpdate = _.findIndex(topics, {_id: action.topic._id});
            topics.splice(indexToUpdate, 1, action.topic);
            
            return {
                topics: _.cloneDeep(topics)
            }
        default:
            return state
    }
}

export default topicsReducer;