import CourseHeadingComponent from "./CourseHeadingComponent";
import CourseGridCardComponent from "./CourseGridCardComponent";
import CourseTableComponent from "./CourseTableComponent";
import React from "react";
import CourseGridComponent from "./CourseGridComponent";

const CourseListComponent =
    ({
         updateFormState,
         newCourseTitle,
         addCourse,
         toggle,
         deleteCourse,
         courses,
         layout,
         showEditor,
         editCourse,
    }) =>
<div>
    <CourseHeadingComponent/>
    <input
        onChange={updateFormState}
        value={newCourseTitle}
        placeholder="New Course Title"/>
    <button onClick={addCourse}>Add</button>
    <button onClick={toggle}>Toggle</button>
    {
        layout === "grid" &&
        <CourseGridComponent
            deleteCourse={deleteCourse}
            courses={courses}/>
    }
    {
        layout === "table"  &&
        <CourseTableComponent
            showEditor={showEditor}
            editCourse={editCourse}
            deleteCourse={deleteCourse}
            courses={courses}/>
    }
</div>

export default CourseListComponent
