import React from "react";

import "./NoContentBlock.scss";

const NoContentBlock = ({ icon, children }) => {
  return (
    <div className="noContentBlock">
      <div className="noContentBlock__content">
        {icon}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default NoContentBlock;
