import React from "react";

import "./ErrorBlock.scss";

const ErrorBlock = ({ children }) => {
  return <div className={"errorBlock"}>{children}</div>;
};

export default ErrorBlock;
