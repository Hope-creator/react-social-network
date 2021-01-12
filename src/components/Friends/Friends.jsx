import React from 'react';
import { Field, Form } from 'react-final-form';
import s from './Friends.module.css';
import Friend from './Friend';



let Friends = (props) => {

    return (
        <div>
            <SearchFriendForm 
            setSearchFriendsName={props.setSearchFriendsName}
            />
            <Friend friends={props.friends}
            followingInProgress={props.followingInProgress}
            unFollow={props.unFollow}
            follow={props.follow}
            />
        </div>
    )
}

const SearchFriendForm = (props) => {

    const onSubmit = values => {
        props.setSearchFriendsName(values.searchFriend)
    }

    return <Form
        onSubmit={onSubmit}

        render={(props) =>
            <form className={s.searchUsersForm} onSubmit={props.handleSubmit}>
                
                <Field
                    name='searchFriend'
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
export default Friends;