import React from "react";

import "./FormButton.scss";

const FormButton = ({ disabled, type, children, style }) => {
  return (
    <button
      disabled={disabled}
      className={disabled ? "formButton formButton-disabled" : "formButton"}
      type={type}
      style={style}
    >
      <span>{children}</span>
    </button>
  );
};

export default FormButton;
