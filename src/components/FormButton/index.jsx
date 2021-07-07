import React from "react";

import "./FormButton.scss";

const FormButton = ({ disabled , type, children}) => {
  return (
    <button
      disabled={disabled}
      className={disabled ? "formButton formButton-disabled" : "formButton"}
      type={type}
    >
      <span>{children}</span>
    </button>
  );
};

export default FormButton;
