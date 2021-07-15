import { FORM_ERROR } from "final-form";
import React from "react";
import { Form } from "react-final-form";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { authLoginThunk } from "../../modules/auth/thunks";
import { composeValidators, required } from "../../utils/validators/validators";
import { selectIsAuth } from "../../modules/auth/selectors";
import FormContainer from "../../components/FormContainer";
import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import NavLinkBlock from "../../components/NavLinkBlock";
import Avatar from "../../components/Avatar";
import ErrorBlock from "../../components/ErrorBlock";

const Login = ({ isAuth, authLoginThunk }) => {
  const onSubmit = async (values) => {
    let errors = [];
    await authLoginThunk(values.login, values.password, values.captcha).then(
      (response) => {
        if (response && response.errors)
          response.errors.forEach((error) => errors.push(error.msg));
      }
    );
    return { [FORM_ERROR]: errors };
  };

  return isAuth ? (
    <Redirect to="/profile" />
  ) : (
    <div>
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <FormContainer>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitError }) => (
            <form onSubmit={handleSubmit}>
              <Avatar />
              <FormInput
                name="login"
                placeholder={"Login"}
                type="text"
                validate={composeValidators(required)}
              />
              <FormInput
                name="password"
                placeholder={"Enter a password"}
                type="password"
                validate={composeValidators(required)}
              />
              {submitError && <ErrorBlock>{submitError}</ErrorBlock>}
              <NavLinkBlock to="/join">Create account</NavLinkBlock>
              <FormButton style={{ marginTop: "20px" }} type="submit">
                Login
              </FormButton>
              <NavLinkBlock to="/reset">Forgot password?</NavLinkBlock>
            </form>
          )}
        />
      </FormContainer>
    </div>
  );
};

let mapStateToProps = (state) => ({
  isAuth: selectIsAuth(state),
});

let maspDispatchToProps = { authLoginThunk };

export default connect(mapStateToProps, maspDispatchToProps)(Login);
