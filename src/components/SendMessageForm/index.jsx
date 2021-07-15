import React from "react";

import { Form } from "react-final-form";
import { maxLength } from "../../utils/validators/validators";
import FormTextareaAutosize from "../FormTextareaAutosize";

import "./SendMessageForm.scss";

const SendMessageForm = ({ onSubmit }) => {
  const handleFormSubmit = (values) => {
    onSubmit(values.newMessageBody);
    values.newMessageBody = "";
  };

  return (
    <Form
      initialValues={{ newMessageBody: "" }}
      onSubmit={handleFormSubmit}
      render={({ handleSubmit, values, form, errors }) => (
        <form className="sendMessageForm" onSubmit={handleSubmit}>
          <div>
            <div className="sendMessageForm__message">
              <FormTextareaAutosize
                className="sendMessageForm__textarea"
                validate={maxLength(1000)}
                name="newMessageBody"
                placeholder="Enter your message"
              />
            </div>
            {values.newMessageBody ? (
              <button
                disabled={errors.newMessageBody}
                className={"sendMessageForm__button"}
                type="submit"
              >
                Send
              </button>
            ) : null}
          </div>
        </form>
      )}
    />
  );
};

export default SendMessageForm;
