import React from 'react';
import User from './User';
import { Field, Form } from 'react-final-form';
import s from './Users.module.css';



let Users = (props) => {

    return (
        <div>
            <SearchUserForm 
            searchName={props.searchName}
            setSearchUsersName={props.setSearchUsersName}
            />
            <User users={props.users}
            followingInProgress={props.followingInProgress}
            unfollow={props.unfollow}
            follow={props.follow}
            ownerId={props.ownerId}
            />
        </div>
    )
}

const SearchUserForm = (props) => {

    const onSubmit = values => {
        props.setSearchUsersName(values.searchUser)
    }

    return <Form
        onSubmit={onSubmit}
        initialValues={{searchUser: props.searchName}}
        render={(props) =>
            <form className={s.searchUsersForm} onSubmit={props.handleSubmit}>
                
                <Field
                    name='searchUser'
                >{({ input, meta }) => (
                    <>
                        <input className={s.searchUsersInput} placeholder="Name" {...input} />
                        <div>
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    </>
                )}
                </Field>
                <button className={s.searchUsersButton} type="submit"><i className="fas fa-search"></i></button>
                
            </form>
        }

    />


}
export default Users;