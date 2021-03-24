import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authLoginThunk, getNewVerificationEmail } from '../../../redux/auth-reducer';
import AccountVerification from './AccountVerification';




const AccountVerifiedContainer = (props) => {
    //login form wrapper for testing <Form render/>

    const [sendingStatus, setSendingStatus] = useState("")
    
    const onSubmit = () => {
        setSendingStatus("pending");
        props.getNewVerificationEmail()
        .then(result=> result.success === true ? setSendingStatus("success") : setSendingStatus("error"))
    }


return <AccountVerification onSubmit={onSubmit} sendingStatus={sendingStatus} />
}



let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    authErrorMessage: state.auth.authErrorMessage,
    captchaUrl: state.auth.captchaUrl
});

let mapDispatchToProps = { authLoginThunk, getNewVerificationEmail };

export default connect(mapStateToProps, mapDispatchToProps)(AccountVerifiedContainer);