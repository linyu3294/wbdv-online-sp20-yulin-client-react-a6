
export const FIND_LESSONS_FOR_MODULE = "FIND_LESSONS_FOR_MODULE"
export const findLessonsForModuleAction = (lessons) => ({
    type: FIND_LESSONS_FOR_MODULE,
    lessons: lessons
})

export const CREATE_LESSON = "CREATE_LESSON"
export const createLessonAction = (lesson) => ({
    type: CREATE_LESSON,
    lesson: lesson
})

export const DELETE_LESSON = "DELETE_LESSON"
export const deleteLessonAction = (lessonId) => ({
    type: DELETE_LESSON,
    lessonId: lessonId
})

export const UPDATE_LESSON = "UPDATE_LESSON"
export const updateLessonAction = (lesson) => ({
    type: 'UPDATE_LESSON',
    lesson: lesson,
    lessonId: lesson._id
})
