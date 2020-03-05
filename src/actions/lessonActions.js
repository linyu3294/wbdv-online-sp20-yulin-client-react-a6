import { FIND_ALL_LESSONS, CREATE_LESSON, DELETE_LESSON, UPDATE_LESSON } from "../constants/LessonConstants";

export const findAllLessons = (lessons) => ({
    type: FIND_ALL_LESSONS,
    lessons: lessons
})

export const createLesson = (newLesson) => ({
    type: CREATE_LESSON,
    newLesson: newLesson
})

export const deleteLesson = (lessonId) => ({
    type: DELETE_LESSON,
    lessonId: lessonId
})

export const updateLesson = (lesson) => ({
    type: UPDATE_LESSON,
    lesson: lesson
})

export default {
    createLesson,
    findAllLessons,
    deleteLesson,
    updateLesson
}