import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateUserStatusThunk } from '../../../redux/auth-reducer';
import Preloader from '../../common/preloader/Preloader';





const AccountVerifiedSuccess = (props) => {

    const {updateUserStatusThunk} = props;
    //Timeout on verify
    let timeout = setTimeout(()=> {
        setRedirectToProfile(true);
        window.location.reload();
    }, 2500);

    //redirect state
    const [redirectTo, setRedirectTo] = useState(false);
    const [redirectToProfile, setRedirectToProfile] = useState(false);


    // response for update status (redirect on active status)
    useEffect(() => {
        updateUserStatusThunk().then(res => {
            if(!res || res.userStatus === "pending") setRedirectTo(true);
            else {
                return timeout
            }
        });
    }, [updateUserStatusThunk, timeout])

    if (!props.userStatus || redirectTo) return <Redirect to="/login" />;
    if(redirectToProfile) return <Redirect to="/users" />

    return (<div>
        <h2>Your email has been successfully verified. You will be
        redirected in a moment...
        </h2>
        <Preloader />
    </div>
    
    )
}

let mapStateToProps = (state) => ({
    userStatus: state.auth.userStatus
})


let mapDispatchToProps = { updateUserStatusThunk }

export default connect(mapStateToProps, mapDispatchToProps)(AccountVerifiedSuccess) 