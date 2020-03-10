import React from "react";

const ImagePreview = ({sourceUrl}) => {
  return (
    <>
        <div className="card">
            <div className="card-body">
      <img
          src={sourceUrl}
          alt="new"
      />
            </div>
        </div>
    </>
  );
};

export default ImagePreview;
