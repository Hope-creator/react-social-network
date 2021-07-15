import React from "react";

import { Field } from "react-final-form";
import TextareaAutosize from "react-textarea-autosize";
import ErrorBlock from "../ErrorBlock";

const FormTextareaAutosize = ({
  validate,
  className,
  name,
  placeholder,
  maxRows = "5",
  minRows = "2",
}) => {
  return (
    <Field validate={validate} name={name}>
      {({ input, meta }) => (
        <div>
          <TextareaAutosize
            className={className ? className : undefined}
            placeholder={placeholder}
            {...input}
            maxRows={maxRows}
            minRows={minRows}
            style={{ overflowY: "auto" }}
          />
          {meta.error && meta.touched && <ErrorBlock>{meta.error}</ErrorBlock>}
        </div>
      )}
    </Field>
  );
};

export default FormTextareaAutosize;
