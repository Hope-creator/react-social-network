import React from "react";
import { Field, Form } from "react-final-form";
import { fileType } from "../../utils/validators/validators";
import ErrorBlock from "../ErrorBlock";

import "./AddPhotosForm.scss";

const AddPhotosForm = ({ onAddPhotosHandle }) => {
  const onSubmit = (values) => {
    const typeCheck = fileType("image")(values);
    let datenow = Date.now();
    let data = new FormData();
    data.append("ts", datenow);
    if (values) {
      for (let i = 0; i < values.length; i++) {
        data.append("profilePhotos", values[i]);
      }
    }
    if (typeCheck === undefined) {
      onAddPhotosHandle(data);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={(_props) => (
        <form onSubmit={_props.handleSubmit} className="addPhotosForm">
          <Field name="newPhotos" validate={fileType("image")}>
            {({ input: { value, onChange, ...input }, meta }) => {
              const handleChange = ({ target }) => {
                onChange(target.files);
                onSubmit(target.files);
                target.value = "";
              };
              return (
                <div>
                  <input
                    {...input}
                    id="newPhotosInput"
                    style={{ display: "none" }}
                    onChange={handleChange}
                    accept=".jpg, .jpeg, .png"
                    type="file"
                    multiple={true}
                  />
                  <label htmlFor="newPhotosInput">
                    <div className={"addPhotosForm__iconBlock"}></div>
                  </label>
                  {meta.error && (
                    <div className="addPhotosForm__error">
                      <ErrorBlock>{meta.error}</ErrorBlock>
                    </div>
                  )}
                </div>
              );
            }}
          </Field>
        </form>
      )}
    ></Form>
  );
};

export default AddPhotosForm;
