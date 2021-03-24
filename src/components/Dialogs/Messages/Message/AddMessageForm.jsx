import React from 'react';
import s from './Message.module.css';

import { Field, Form } from 'react-final-form';
import { maxLength } from '../../../../utils/validators/validators';
import TextareaAutosize from 'react-textarea-autosize';



const AddMessageForm = ({onMessageThunk, fromId, peerId}) => {

    const onSubmit = (values) => {
        const date = Date.now();
        const text = values.newMessageBody;
        const message = {
            from: fromId,
            peerId: peerId,
            ts: date,
            text: text,
            attachments: []
        }
        onMessageThunk(message, peerId, 1)
    }

    return (
        <Form
        initialValues={{newMessageBody: ''}}
            onSubmit={onSubmit}
            render={({ handleSubmit, values, form, errors }) =>
                <form className={s.sendForm} onSubmit={handleSubmit}>
                    <div>
                        <div className={s.message_area}>
                            <Field validate={maxLength(1000)} className={s.formInputText}
                                name='newMessageBody'
                            >{({ input, meta }) => (
                                <div>
                                    <TextareaAutosize placeholder="Enter your message" {...input} maxRows='5' minRows='2' />
                                    <div>
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                </div>
                            )}
                            </Field>

                        </div>
                        {values.newMessageBody ? <button disabled={errors.newMessageBody} className={s.messageButton} type="submit" onClick={()=>{onSubmit(values); form.reset()}}>Send</button> : null}
                    </div>
                </form>}
        />

    )
}

export default AddMessageForm;