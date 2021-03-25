import { FORM_ERROR } from 'final-form';
import React, { useState } from 'react';
import { Form, Field } from 'react-final-form'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setUserRegThunk } from '../../../redux/auth-reducer';
import { composeValidators, maxLength, required } from '../../../utils/validators/validators';
import s from './Registration.module.css';
import profilePicture from '../../../img/profilePic.png'
import AccountVerificationContainer from './AccountVerificationContainer';



const RegistationFormWrap = (props) => {
    //reg form wrapper for testing <Form render/>

    const [disableSubmitButton, setDisableSubmitButton] = useState(false);

    const onSubmit = async values => {
        let errors = [];
        setDisableSubmitButton(true);
        await props.setUserRegThunk(
            values.name, values.email,
            values.password, values.password2, values.acceptance
        ).then(
            result => {
                if (result.success) {
                    props.setOverlay(true);
                    props.setRegUrl(result.url)
                }
                else {
                    setDisableSubmitButton(false);
                    if (result.errors) result.errors.forEach(error => errors.push(error.msg));

                }
            }
        )
        return { [FORM_ERROR]: errors }
    }

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, submitError, errors }) => (
                <form onSubmit={handleSubmit}>
                    <img className={s.loginPicture} src={profilePicture} alt="profilepic" />
                    <div >
                        <Field name="name" validate={composeValidators(required, maxLength(30))} >
                            {({ input, meta }) => (
                                <div className={s.fieldWrap}>
                                    <input {...input} type="text" placeholder="Name" />
                                    {meta.error && meta.touched && <span className={s.fieldError}>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                    </div>
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
                    <div >
                        <Field name="password" validate={composeValidators(required, maxLength(30))} >
                            {({ input, meta }) => (
                                <div className={meta.error ? s.metaError + ' ' + s.fieldWrap : s.fieldWrap}>
                                    <input {...input} type="password" placeholder="Enter a password" />
                                    {meta.error && meta.touched && <span className={s.fieldError}>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                    </div>
                    <div >
                        <Field name="password2" validate={composeValidators(required, maxLength(30))} >
                            {({ input, meta }) => (
                                <div className={meta.error ? s.metaError + ' ' + s.fieldWrap : s.fieldWrap}>
                                    <input {...input} type="password" placeholder="Confirm password" />
                                    {meta.error && meta.touched && <span className={s.fieldError}>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                    </div>
                    <div>
                        {submitError && <div className={s.submitError}>{submitError}</div>}
                        <div className={s.checkBox}>
                            <Field
                                name="acceptance"
                                component="input" type="checkbox" value="accepted" />
                            <span>Accept of Terms of Service</span>
                        </div>
                        <button disabled={disableSubmitButton} className={disableSubmitButton ? s.submitBtn + ' ' + s.disabledButton : s.submitBtn} type="submit"> <span className={s.submitBtnText}>Join</span></button>
                    </div>
                </form>
            )}
        />
    )
}

const Registration = (props) => {

    const [showOverlay, setOverlay] = useState(false);
    const [regUrl, setRegUrl] = useState("");

    // redirect if no authorization

    return props.isAuth ? <Redirect to="/profile" />
        : showOverlay ? (<AccountVerificationContainer regUrl={regUrl} setRegUrl={setRegUrl} />) : (<div className={s.loginWrapper}>
            <h1>
                Sign up
        </h1>
            <RegistationFormWrap
                setRegUrl={setRegUrl}
                setOverlay={setOverlay}
                setUserRegThunk={props.setUserRegThunk}
                captchaUrl={props.captchaUrl}
                authFailed={props.authFailed}
                authErrorMessage={props.authErrorMessage}
                authLoginThunk={props.authLoginThunk} />

        </div>)
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    authErrorMessage: state.auth.authErrorMessage,
    captchaUrl: state.auth.captchaUrl,
});

let maspDispatchToProps = { setUserRegThunk };

export default connect(mapStateToProps, maspDispatchToProps)(Registration);