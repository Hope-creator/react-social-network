import React from 'react';
import s from './Forms.module.css'

export const FormCreator = (Element) => ({input,meta, ...props}) => {
    return (
        <div className={s.formControl}>
        <Element {...input} {...props} className={meta.error && meta.touched && s.error || undefined}/>
        {meta.submitError && <span>{meta.submitError}</span>}
        {meta.error && meta.touched && <span>{meta.error}</span>}
    </div>
    )
}