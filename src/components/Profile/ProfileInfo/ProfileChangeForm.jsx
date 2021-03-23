import React from 'react';
import { useState } from 'react';
import { Field, Form } from 'react-final-form';
import AboutForm from './ProfileForms/AboutForm';
import ContactsForm from './ProfileForms/ContactsForm';
import s from './ProfileForms/ProfileForms.module.css'



const ProfileContactForm = (props) => {

    let [currentForm, setCurrentForm] = useState('About')
    return (
        <div className={s.formWrap}>
            <div className={s.formArea}>
                {currentForm === 'About'
                    ? <AboutForm 
                    profile={props.profile}
                    setEditMode={props.setEditMode}
                    updateProfile={props.updateProfile}
                    /> :
                    currentForm === 'Contacts' ?
                        <ContactsForm 
                        profile={props.profile}
                        setEditMode={props.setEditMode}
                        updateProfile={props.updateProfile}
                        />
                        : null
                }
            </div>
            <div className={s.formsButton}>
                <button className={s.formChangeBtn} onClick={() => setCurrentForm('About')}>About</button>
                <button className={s.formChangeBtn} onClick={() => setCurrentForm('Contacts')}>Contacts</button>
            </div>
        </div>
    )
}

export default ProfileContactForm;