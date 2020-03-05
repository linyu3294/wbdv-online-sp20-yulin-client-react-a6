import React from "react";
import CourseRow from "./CourseRow";

const CourseTable = props => {
  const {
    courses,
    onDeleteCourse,
    updateCourse,
    showAlert,
    toggleEditor
  } = props;

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <caption>Click on course title to view editor.</caption>
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col" className="d-none d-md-table-cell">
              Owner
            </th>
            <th scope="col" className="d-none d-md-table-cell">
              Last Modified
            </th>
            <th scope="col" className="text-right"></th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <CourseRow
              key={course._id}
              course={course}
              selected={props.selected}
              history={props.history}
              updateCourse={updateCourse}
              showAlert={showAlert}
              onDelete={onDeleteCourse}
              toggleEditor={toggleEditor}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
