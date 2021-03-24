import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Field, Form } from 'react-final-form';
import s from './ProfileForms.module.css';
import { required } from '../../../../utils/validators/validators';



const AboutForm = (props) => {
        const onSubmit = values => {
                let newProfile = {
                        ...props.profile,
                        name: values.name,
                        profile: {
                                ...props.profile.profile,
                                lookingForAJob: !!values.lookingForAJob,
                                lookingForAJobDescription: values.lookingForAJobDescription,
                                aboutMe: values.aboutMe
                        }
                };
                props.updateProfile(newProfile).then(response => { if (response === 'success') props.setEditMode() });
        }

        return <Form
                onSubmit={onSubmit}
                initialValues={
                        {
                                name: props.profile.name,
                                lookingForAJob: props.profile.profile.lookingForAJob ? 'true' : '',
                                lookingForAJobDescription: props.profile.profile.lookingForAJobDescription,
                                aboutMe: props.profile.profile.aboutMe
                        }
                }
                render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                                <div>
                                        <div className={s.fieldWrap}><span>Name:</span><Field className={s.formInputText} name='name' component='input' /></div>
                                        <div className={s.fieldWrap}><span>Looking for a job:</span>
                                                <Field name='lookingForAJob' type='radio' value='true' component='input' />
                                                {' '}Yes
                                                        <Field name='lookingForAJob' type='radio' value='' component='input' />
                                                {' '}No
                                                <div>
                                                        <Field validate={required} className={s.formInputText}
                                                                name='lookingForAJobDescription'
                                                        >{({ input, meta }) => (
                                                                <div>
                                                                        <TextareaAutosize placeholder='Skills' {...input} />
                                                                        <div>
                                                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                                                        </div>
                                                                </div>
                                                        )}
                                                        </Field>
                                                </div>

                                        </div>
                                        <div className={s.fieldWrap}>
                                                <span>About me:</span>
                                                <Field className={s.formInputText}
                                                        name='aboutMe'
                                                >{({ input, meta }) => (
                                                        <div>
                                                                <TextareaAutosize placeholder='Tell anyting about you' {...input} />
                                                                <div>
                                                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                                                </div>
                                                        </div>
                                                )}
                                                </Field>
                                        </div>
                                        <button className={s.submitBtn} type='submit'>Save</button>
                                        <button className={s.submitBtn} type='button' onClick={() => props.setEditMode()}>Cancel</button>
                                </div>
                        </form>
                )}
        />
}

export default AboutForm