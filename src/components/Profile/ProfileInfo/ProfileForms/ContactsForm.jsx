import { FORM_ERROR } from 'final-form';
import React from 'react';
import { Field, Form } from 'react-final-form';
import s from './ProfileForms.module.css';

const ContactsForm = ({ profile, updateProfile, setEditMode }) => {

        const onSubmit = async values => {
                let newProfile = {
                        ...profile,
                        profile: {
                                ...profile.profile,
                                contacts: {
                                        facebook: values.facebook,
                                        github: values.github,
                                        instagram: values.instagram,
                                        mainLink: values.mainLink,
                                        vk: values.vk,
                                        website: values.website,
                                        youtube: values.youtube,
                                        twitter: values.twitter,
                                        mainlink: values.mainlink
                                }
                        }
                };
                let errors;
                await updateProfile(newProfile).then(response => {
                        if (response === 'success') setEditMode()
                        else {
                                return response ? errors = response.map(err => err) : null
                        }
                }
                );
                return { [FORM_ERROR]: errors }
        }

        return <Form
                onSubmit={onSubmit}
                initialValues={{
                        facebook: profile.profile.contacts.facebook,
                        github: profile.profile.contacts.github,
                        instagram: profile.profile.contacts.instagram,
                        mainLink: profile.profile.contacts.mainLink,
                        twitter: profile.profile.contacts.twitter,
                        vk: profile.profile.contacts.vk,
                        website: profile.profile.contacts.website,
                        youtube: profile.profile.contacts.youtube,
                }}
                render={({ handleSubmit, submitError }) => (
                        <form onSubmit={handleSubmit}>
                                {Object.keys(profile.profile.contacts).map(key => {
                                        return (
                                                <div key={key} className={s.fieldWrap}>
                                                        <span>{key}:</span>
                                                        <Field name={key} placeholder={key + ".com"}>
                                                                {({ input, meta, placeholder }) => (
                                                                        <>
                                                                                <input className={s.formInputText} {...input} type='text' placeholder={placeholder} />
                                                                                {(meta.error || meta.submitError) && meta.touched && (
                                                                                        <span>{meta.error || meta.submitError}</span>)}

                                                                        </>
                                                                )}
                                                        </Field>
                                                </div>
                                        )
                                })}
                                {submitError && <div className={s.submitError}>{submitError.map(err => {
                                        return <div className={s.submitErrorBlock} key={err}>{err}</div>
                                })}</div>}
                                <button className={s.submitBtn} type='submit'>Save</button>
                                <button className={s.submitBtn} type='button' onClick={()=> setEditMode()}>Cancel</button>
                        </form>)}
        />
}

export default ContactsForm