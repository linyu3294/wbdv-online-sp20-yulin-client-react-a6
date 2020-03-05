import React, { Component } from "react";

const HeadingPreview = ({ text, size }) => {
  return (
    <>
      {size === 1 && <h1>{text}</h1>}
      {size === 2 && <h2>{text}</h2>}
      {size === 3 && <h3>{text}</h3>}
      {size === 4 && <h4>{text}</h4>}
      {size === 5 && <h5>{text}</h5>}
      {size === 6 && <h6>{text}</h6>}
    </>
  );
};

export default HeadingPreview;
