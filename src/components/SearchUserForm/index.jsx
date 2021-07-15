import React from "react";
import { useHistory } from "react-router-dom";
import { Field, Form } from "react-final-form";

import "./SearchUserForm.scss";

const SearchUserForm = ({
  submitHandler,
  redirectLink,
  className,
  placeholder,
  withButton,
}) => {
  const history = useHistory();

  const onSubmit = (values) => {
    const name = values.searchName;
    submitHandler(name);
    if (redirectLink) {
      history.push(redirectLink);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className={
            className ? "searchUserForm " + className : "searchUserForm"
          }
        >
          <Field
            name="searchName"
            component="input"
            placeholder={placeholder ? placeholder : "Search user"}
          />
          {withButton && (
            <button className="searchUserForm__button" type="submit">
              <i className="fas fa-search"></i>
            </button>
          )}
        </form>
      )}
    />
  );
};

export default SearchUserForm;
