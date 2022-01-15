import React from "react";
import { Field } from "react-final-form";

import "./FormInput.scss";

const FormInput = ({ className, name, validate, placeholder, type }) => (
  <Field name={name} validate={validate}>
    {({ input, meta }) => (
      <div className={className || "formField"}>
        <input {...input} type={type} placeholder={placeholder} />
        {meta.error && meta.touched && (
          <span className="formField__error">{meta.error}</span>
        )}
      </div>
    )}
  </Field>
);

export default FormInput;
