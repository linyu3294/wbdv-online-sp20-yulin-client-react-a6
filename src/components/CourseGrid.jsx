import React from "react";
import CourseCard from "./CourseCard";

const CourseGrid = props => {
  const { courses, onDeleteCourse, updateCourse, toggleEditor } = props;

  return (
    <div className="row mx-0">
      {courses.map(course => (
        <div
          className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
          key={course._id}
        >
          <CourseCard
            course={course}
            onDelete={onDeleteCourse}
            toggleEditor={toggleEditor}
            updateCourse={updateCourse}
            selected={props.selected}
            history={props.history}
          />
        </div>
      ))}
    </div>
  );
};

export default CourseGrid;
