import { FORM_ERROR } from 'final-form';
import React from 'react';
import { Form, Field } from 'react-final-form'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { resetPasswordGetCode, resetPasswordVerifyCode } from '../../redux/auth-reducer';
import { composeValidators, required } from '../../utils/validators/validators';
import s from './Login/Login.module.css';
import profilePicture from '../../img/profilePic.png'
import { useState } from 'react';


const ResetPasswordFormSuccess = (props) => {

    const [disableSubmitButton, setDisableSubmitButton] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("")

    const onSubmit = async values => {
        let errors = [];
        setDisableSubmitButton(true);
        await props.resetPasswordVerifyCode(values.email,
            values.password,
            values.password2,
            values.code).then(
            result => {
            if(result.success) {
                setSuccess(true);
                setSuccessMessage("Your password has been changed");
                setTimeout(()=> setSuccess(true), 3000);
            }
            else {
                setDisableSubmitButton(false);
                if(result.errors) result.errors.forEach(error => errors.push(error.msg));
            }},
           )
        return { [FORM_ERROR]: errors }
    }

    if(success) return <Redirect to="/users"/>

    return <div>
        <h3>Check your email for code</h3>
        <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitError }) => (
            <form onSubmit={handleSubmit}>
                <img className={s.loginPicture} src={profilePicture} alt="profilepic" />
                <div >
                    <Field name="email" validate={composeValidators(required)} >
                        {({ input, meta }) => (
                            <div className={s.fieldWrap}>
                                <input {...input} type="text" placeholder="Email" />
                                {meta.error && meta.touched && <span className={s.fieldError}>{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                    <Field name="password" validate={composeValidators(required)} >
                        {({ input, meta }) => (
                            <div className={s.fieldWrap}>
                                <input {...input} type="password" placeholder="New password" />
                                {meta.error && meta.touched && <span className={s.fieldError}>{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                    <Field name="password2" validate={composeValidators(required)} >
                        {({ input, meta }) => (
                            <div className={s.fieldWrap}>
                                <input {...input} type="password" placeholder="Confirm your new password" />
                                {meta.error && meta.touched && <span className={s.fieldError}>{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                    <Field name="code" validate={composeValidators(required)} >
                        {({ input, meta }) => (
                            <div className={s.fieldWrap}>
                                <input {...input} type="text" placeholder="Code" />
                                {meta.error && meta.touched && <span className={s.fieldError}>{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                </div>
                <button disabled={disableSubmitButton} className={disableSubmitButton ? s.submitBtn + ' ' +s.disabledButton : s.submitBtn} type="submit"> <span className={s.submitBtnText}>Reset password</span></button>
                {submitError && <div className={s.fieldError}>{submitError}</div>}
                {successMessage ? <p>{successMessage}</p> : null}
            </form>
        )}
    /></div>
}

const ResetPasswordForm = (props) => {

    const [disableSubmitButton, setDisableSubmitButton] = useState(false);
    const [success, setSuccess] = useState(false);

    const onSubmit = async values => {
        let errors = [];
        setDisableSubmitButton(true);
        await props.resetPasswordGetCode(values.email).then(
            result => {
            if(result.success) {
                setSuccess(true);
            }
            else {
                setDisableSubmitButton(false);
                if(result.errors) result.errors.forEach(error => errors.push(error.msg));
            }}
           );
        return { [FORM_ERROR]: errors}
    }

    return success ? <ResetPasswordFormSuccess resetPasswordVerifyCode={props.resetPasswordVerifyCode} /> : <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitError }) => (
            <form onSubmit={handleSubmit}>
                <img className={s.loginPicture} src={profilePicture} alt="profilepic" />
                <div >
                    <Field name="email" validate={composeValidators(required)} >
                        {({ input, meta }) => (
                            <div className={s.fieldWrap}>
                                <input {...input} type="email" placeholder="Email" />
                                {meta.error && meta.touched && <span className={s.fieldError}>{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                </div>
                <button disabled={disableSubmitButton} className={disableSubmitButton ? s.submitBtn + ' ' +s.disabledButton : s.submitBtn} type="submit"> <span className={s.submitBtnText}>Reset</span></button>
                {submitError && <div className={s.fieldError}>{submitError}</div>}
            </form>
        )}
    />
}

const ResetPassword = (props) => {
    //login form wrapper for testing <Form render/>

   

    return ( <div className={s.loginWrapper}>
            <h1>Reset password</h1>
            <ResetPasswordForm
            resetPasswordGetCode={props.resetPasswordGetCode}
            resetPasswordVerifyCode={props.resetPasswordVerifyCode}
            />
        </div>
    )
}


let mapStateToProps = (state) => ({
});

let maspDispatchToProps = { resetPasswordGetCode, resetPasswordVerifyCode };

export default connect(mapStateToProps, maspDispatchToProps)(ResetPassword);