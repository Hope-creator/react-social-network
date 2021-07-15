import React from "react";
import { Form } from "react-final-form";
import FormButton from "../../../../components/FormButton";
import Avatar from "../../../../components/Avatar";
import {
  composeValidators,
  required,
} from "../../../../utils/validators/validators";
import { FORM_ERROR } from "final-form";
import FormInput from "../../../../components/FormInput";
import ErrorBlock from "../../../../components/ErrorBlock";
import FormContainer from "../../../../components/FormContainer";
import { authApi } from "../../../../api/api";

const ResetForm = ({ setSuccess }) => {
  const [disableSubmitButton, setDisableSubmitButton] = React.useState(false);

  const onSubmit = async (values) => {
    let errors = [];
    setDisableSubmitButton(true);
    await authApi.resetPasswordGetCode(values.email).then((result) => {
      if (result.data.success) {
        setSuccess(true);
      } else {
        setDisableSubmitButton(false);
        if (result.data.errors)
          result.errors.forEach((error) => errors.push(error.msg));
      }
    });
    return { [FORM_ERROR]: errors };
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Reset password</h1>
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
              <FormButton
                style={{ marginTop: "20px" }}
                type="submit"
                disabled={disableSubmitButton}
              >
                Reset
              </FormButton>
              {submitError && <ErrorBlock>{submitError}</ErrorBlock>}
            </form>
          )}
        />
      </FormContainer>
    </div>
  );
};

export default ResetForm;
