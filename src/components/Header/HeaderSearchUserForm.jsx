import React from 'react';
import s from './Header.module.css';
import { useHistory } from 'react-router-dom';
import { Field, Form } from 'react-final-form';

const HeaderSearchUserForm = (props) => {

    let history = useHistory()

    const onSubmit = values => {
        const name = values.searchName;
        props.setSearchUsersName(name);
        history.push("/users")
    }

    return (<Form
    onSubmit={onSubmit}
    render={({handleSubmit}) => (
        <form onSubmit={handleSubmit} className={s.HeaderSearchForm}>
            <Field name="searchName" component="input" placeholder="Search user" />
        </form>
    )}
    />
    )
}

export default HeaderSearchUserForm;