import React from "react";

import { Field } from "react-final-form";

import "./FormCheckbox.scss";

const FormCheckbox = ({ name, children }) => {
  return (
    <div className="formCheckbox">
      <Field name={name} id="FormCheckbox" component="input" type="checkbox" />
      <label htmlFor="FormCheckbox">{children}</label>
    </div>
  );
};

export default FormCheckbox;
