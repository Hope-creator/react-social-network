import React from "react";
import { Field } from "react-final-form";
import ErrorBlock from "../ErrorBlock";

import "./FormMediaUpload.scss";

const FormMediaUpload = ({
  count,
  name,
  onAddHandle,
  onClearHandle,
  clearField,
  validate,
  accept,
  icon,
}) => {
  return (
    <Field name={name} validate={validate}>
      {({ input: { value, onChange, ...input }, meta }) => {
        const handleChange = ({ target }) => {
          onChange(target.files);
          onAddHandle(target.files);
        };

        return (
          <div>
            <input
              id={name}
              onClick={(event) => {
                event.target.value = null;
              }}
              className="formMediaUpload__input_hidden"
              {...input}
              onChange={handleChange}
              accept={accept}
              type="file"
              multiple={true}
            />
            <label htmlFor={name} className="formMediaUpload__icon">
              {icon}
            </label>
            {count ? (
              <span className="formMediaUpload__count">{`+ ${count}`}</span>
            ) : null}
            {count ? (
              <button
                type="button"
                className="formMediaUpload__button"
                onClick={() => {
                  clearField(name, undefined);
                  onClearHandle();
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            ) : null}
            {meta.error && meta.touched && (
              <ErrorBlock>{meta.error}</ErrorBlock>
            )}
          </div>
        );
      }}
    </Field>
  );
};

export default FormMediaUpload;
