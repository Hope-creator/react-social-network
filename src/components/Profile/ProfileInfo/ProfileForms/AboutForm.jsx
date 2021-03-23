import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Field, Form } from 'react-final-form';
import s from './ProfileForms.module.css';
import { required } from '../../../../utils/validators/validators';



const AboutForm = (props) => {
        const onSubmit = values => {
                let newProfile = {
                        ...props.profile,
                        fullName: values.fullName,
                        lookingForAJob: !!values.lookingForAJob,
                        lookingForAJobDescription: values.lookingForAJobDescription,
                        aboutMe: values.aboutMe
                };
        props.updateProfile(newProfile).then(response => {if (response === 'success') props.setEditMode()});
        }

        return <Form
                onSubmit={onSubmit}
                initialValues={
                        {
                                fullName: props.profile.fullName,
                                lookingForAJob: props.profile.lookingForAJob ? 'true' : '',
                                lookingForAJobDescription: props.profile.lookingForAJobDescription,
                                aboutMe: props.profile.aboutMe
                        }
                }
                render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                                <div>
                                        <div className={s.fieldWrap}><span>Fullname:</span><Field className={s.formInputText} name='fullName' component='input' /></div>
                                        <div className={s.fieldWrap}><span>Looking for a job:</span>
                                                <Field name='lookingForAJob' type='radio' value='true' component='input' />
                                                {' '}Yes
                                                        <Field name='lookingForAJob' type='radio' value='' component='input' />
                                                {' '}No
                                                <div>
                                                        <Field validate={required} className={s.formInputText} 
                                                        name='lookingForAJobDescription'
                                                        >{({input, meta}) => (
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
                                                <Field validate={required} className={s.formInputText} 
                                                        name='aboutMe'
                                                        >{({input, meta}) => (
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
                                </div>
                        </form>
                )}
        />
}

export default AboutForm