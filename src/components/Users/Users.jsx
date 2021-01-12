import React from 'react';
import { useEffect } from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { Field, Form } from 'react-final-form';
import s from './Users.module.css';



let Users = (props) => {

    return (
        <div>
            <SearchUserForm 
            setSearchUsersName={props.setSearchUsersName}
            />
            <User users={props.users}
            followingInProgress={props.followingInProgress}
            unfollow={props.unfollow}
            follow={props.follow}
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
                <button className={s.searchUsersButton} type="submit"><i class="fas fa-search"></i></button>
                
            </form>
        }

    />


}
export default Users;