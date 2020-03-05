import _ from 'lodash';
import { FIND_ALL_LESSONS, CREATE_LESSON, DELETE_LESSON, UPDATE_LESSON } from "../constants/LessonConstants";

const initialState = {
    lessons: []
}

const lessonsReducer = (state = initialState, action) => {
    let lessons;
    switch (action.type) {
        case FIND_ALL_LESSONS:
            lessons = _.sortBy(action.lessons, '_createdAt')
            return {
                lessons: lessons
            }

        case CREATE_LESSON:
            lessons = [...state.lessons];
            lessons.push(action.newLesson);

            return {
                lessons: lessons
            }

        case DELETE_LESSON:
            lessons = [...state.lessons];
            _.remove(lessons, {_id: action.lessonId})

            return {
                lessons: lessons
            }
            
        case UPDATE_LESSON:
            lessons = [...state.lessons];
            const indexToUpdate = _.findIndex(lessons, {_id: action.lesson._id});
            lessons.splice(indexToUpdate, 1, action.lesson);
            
            return {
                lessons: _.cloneDeep(lessons)
            }
        default:
            return state
    }
}

export default lessonsReducer;