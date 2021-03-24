import React from 'react';
import { Field, Form } from 'react-final-form';
import s from './ProfilePhotos.module.css';
import { fileType } from '../../../../utils/validators/validators';



const AddPhotosForm = (props) => {

    const onSubmit = (values) => {
        const typeCheck = fileType("image")(values);
        let datenow = Date.now();
        let data = new FormData();
        data.append("ts", datenow);
        if(values) {
            for(let i = 0; i < values.length; i++) {
                data.append("profilePhotos", values[i])
            }
        }
        if (typeCheck === undefined) {
            props.addNewPhotos(data);
        }
    }

    return <Form
        onSubmit={onSubmit}
        render={(props) =>
            <form onSubmit={props.handleSubmit} className={s.addPhotosForm}>
                <Field name='newPhotos' validate={fileType("image")}>
                    {({ input: { value, onChange, ...input }, meta}) => {
                        const handleChange = ({ target }) => {
                            onChange(target.files)
                            onSubmit(target.files);
                            target.value = '';
                        }
                        return <div>
                            <input
                                {...input}
                                id="newPhotosInput"
                                style={{ display: "none" }}
                                onChange={handleChange}
                                accept=".jpg, .jpeg, .png"
                                type="file"
                                multiple={true}
                            />
                            <label htmlFor="newPhotosInput">
                                <div className={s.addPhoto}></div>
                            </label>
                            {meta.error &&
                                <div className={s.formError}>
                                    <span>{meta.error}
                                    </span>
                                </div>}
                        </div>
                    }}
                </Field>
            </form>}
    >
    </Form>
}



export default AddPhotosForm;