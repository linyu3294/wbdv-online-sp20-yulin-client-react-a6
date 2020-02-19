

const lessons = (state = {lessons: []}, action) => {
    switch (action.type) {
        case 'CREATE_LESSON':
            return {
                lessons: [
                    ...state.lessons,
                    action.lesson
                ]
            }
            break;
        case 'DELETE_LESSON':
            return {
                lessons: state.lessons.filter(
                    lesson => lesson._id !== action.lessonId)
            }
            break;
        case 'UPDATE_LESSON':
            return {
                lessons: state.lessons.map(lesson =>
                    lesson._id === action.lessonId ? action.lesson : lesson
                )
            }
            break;
        case 'FIND_LESSONS_FOR_MODULE':
            return {
                lessons: action.lessons
            }
        case 'FIND_ALL_LESSONS':
            return {
                lessons: action.lessons
            }
        default:

            return state
    }
}

export default lessons
