import React from "react";
import { FORM_ERROR } from "final-form";
import { Form } from "react-final-form";
import Avatar from "../../../../components/Avatar";
import FormInput from "../../../../components/FormInput";
import {
  composeValidators,
  required,
} from "../../../../utils/validators/validators";
import FormButton from "../../../../components/FormButton";
import ErrorBlock from "../../../../components/ErrorBlock";
import { useHistory } from "react-router-dom";
import FormContainer from "../../../../components/FormContainer";
import { authApi } from "../../../../api/api";

export const ResetSuccessForm = () => {
  const [disableSubmitButton, setDisableSubmitButton] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  const history = useHistory();

  const onSubmit = async (values) => {
    let errors = [];
    setDisableSubmitButton(true);
    await authApi
      .resetPasswordVerifyCode(
        values.email,
        values.password,
        values.password2,
        values.code
      )
      .then((result) => {
        if (result.data.success) {
          setSuccessMessage("Your password has been changed");
          setTimeout(() => history.push("/profile"), 3000);
        } else {
          if (result.data.errors)
            result.data.errors.forEach((error) => errors.push(error.msg));
        }
      })
      .catch((err) => errors.push(err.messages))
      .finally(setDisableSubmitButton(false));
    return { [FORM_ERROR]: errors };
  };

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Check your email for code</h3>
      <FormContainer>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitError }) => (
            <form onSubmit={handleSubmit}>
              <Avatar />
              <FormInput
                name="email"
                placeholder={"Email"}
                type="email"
                validate={composeValidators(required)}
              />
              <FormInput
                name="password"
                placeholder={"New password"}
                type="password"
                validate={composeValidators(required)}
              />
              <FormInput
                name="password2"
                placeholder={"Confirm your new password"}
                type="password"
                validate={composeValidators(required)}
              />
              <FormInput
                name="code"
                placeholder={"Code"}
                type="text"
                validate={composeValidators(required)}
              />
              <FormButton
                style={{ marginTop: "20px" }}
                type="submit"
                disabled={disableSubmitButton}
              >
                Reset password
              </FormButton>
              {submitError && <ErrorBlock>{submitError}</ErrorBlock>}
              {successMessage ? <p>{successMessage}</p> : null}
            </form>
          )}
        />
      </FormContainer>
    </div>
  );
};
