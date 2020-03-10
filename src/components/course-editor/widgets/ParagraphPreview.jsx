import React, { Component } from "react";

const ParagraphPreview = ({ text, size }) => {
    return (
        <>
            {size === 6 && <h1>{text}</h1>}
            {size === 5 && <h2>{text}</h2>}
            {size === 4 && <h3>{text}</h3>}
            {size === 3 && <h4>{text}</h4>}
            {size === 2 && <h5>{text}</h5>}
            {size === 1 && <h6>{text}</h6>}
        </>
    );
};

export default ParagraphPreview;
