import React from "react";

const ListPreview = ({ text}) => {
  return (
  text.toString().split("\n").map(lstItem =>
      <li>{lstItem}</li>
  ))
}


export default ListPreview;
