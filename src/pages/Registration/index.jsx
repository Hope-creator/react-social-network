import { FORM_ERROR } from "final-form";
import React, { useState } from "react";
import { Form } from "react-final-form";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { setUserRegThunk } from "../../modules/auth/thunks";
import {
  composeValidators,
  maxLength,
  required,
} from "../../utils/validators/validators";
import FormInput from "../../components/FormInput";
import FormContainer from "../../components/FormContainer";
import FormButton from "../../components/FormButton";
import Avatar from "../../components/Avatar";
import ErrorBlock from "../../components/ErrorBlock";
import FormCheckbox from "../../components/FormCheckbox";

const Registration = ({ isAuth, setUserRegThunk }) => {
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  const history = useHistory();

  const onSubmit = async (values) => {
    let errors = [];
    setDisableSubmitButton(true);
    await setUserRegThunk(
      values.name,
      values.email,
      values.password,
      values.password2,
      values.acceptance
    )
      .then((result) => {
        if (result.success) {
          history.push("/verify");
        } else {
          if (result.errors)
            result.errors.forEach((error) => errors.push(error.msg));
        }
      })
      .catch((e) => errors.push(e.message))
      .finally(() => setDisableSubmitButton(false));
    return { [FORM_ERROR]: errors };
  };

  return isAuth ? (
    <Redirect to="/profile" />
  ) : (
    <div>
      <h1 style={{ textAlign: "center" }}>Registration</h1>
      <FormContainer>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitError }) => (
            <form onSubmit={handleSubmit}>
              <Avatar />
              <FormInput
                name="name"
                placeholder={"Name"}
                type="text"
                validate={composeValidators(required, maxLength(50))}
              />
              <FormInput
                name="email"
                placeholder={"Email"}
                type="email"
                validate={composeValidators(required)}
              />
              <FormInput
                name="password"
                placeholder={"Enter a password"}
                type="password"
                validate={composeValidators(required)}
              />
              <FormInput
                name="password2"
                placeholder={"Confirm password"}
                type="password"
                validate={composeValidators(required, maxLength(30))}
              />

              {submitError && <ErrorBlock>{submitError}</ErrorBlock>}
              <FormCheckbox name="acceptance">
                Accept of Terms of Service
              </FormCheckbox>
              <FormButton
                style={{ marginTop: "20px" }}
                type="submit"
                disabled={disableSubmitButton}
              >
                Join
              </FormButton>
            </form>
          )}
        />
      </FormContainer>
    </div>
  );
};

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  authErrorMessage: state.auth.authErrorMessage,
  captchaUrl: state.auth.captchaUrl,
});

let maspDispatchToProps = { setUserRegThunk };

export default connect(mapStateToProps, maspDispatchToProps)(Registration);
