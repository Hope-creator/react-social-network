import React from "react";

import "./FlexTextBlock.scss"

const FlexTextBlock = ({ leftText, rightText }) => {
  return (
    <div className="flexTextBlock">
      <span>{leftText} </span>
      <span>{rightText}</span>
    </div>
  );
};

export default FlexTextBlock;
