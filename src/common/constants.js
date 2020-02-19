// export const COURSES_API_URL = "https://wbdv-generic-server.herokuapp.com/api/03291990/courses"
export const COURSES_API_URL = "https://wbdv-generic-server.herokuapp.com/api/03291990/courses"
export const MODULES_API_URL = "https://wbdv-generic-server.herokuapp.com/api/03291990/modules"
export const LESSONS_API_URL = "https://wbdv-generic-server.herokuapp.com/api/03291990/lessons"
export const TOPICS_API_URL = "https://wbdv-generic-server.herokuapp.com/api/03291990/topics"
export const COURSES_MODULES_API_URL = (courseId) => `https://wbdv-generic-server.herokuapp.com/api/03291990/courses/${courseId}/modules`
export const MODULES_LESSONS_API_URL = (moduleId) => `https://wbdv-generic-server.herokuapp.com/api/03291990/modules/${moduleId}/lessons`
export const LESSONS_TOPICS_API_URL = (lessonId) => `https://wbdv-generic-server.herokuapp.com/api/03291990/lessons/${lessonId}/topics`
