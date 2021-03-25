import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authLoginThunk, getNewVerificationEmail } from '../../../redux/auth-reducer';
import AccountVerification from './AccountVerification';




const AccountVerifiedContainer = (props) => {

    const [sendingStatus, setSendingStatus] = useState("")

    const onSubmit = () => {
        setSendingStatus("pending");
        props.getNewVerificationEmail()
            .then(result => {
                if (result.success) {
                    setSendingStatus("success");
                    props.setRegUrl(result.url)
                } else {
                    setSendingStatus("error")
                }
            }
            )
    }


    return <AccountVerification
        regUrl={props.regUrl}
        setRegUrl={props.setRegUrl}
        onSubmit={onSubmit}
        sendingStatus={sendingStatus} />
}



let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    authErrorMessage: state.auth.authErrorMessage,
    captchaUrl: state.auth.captchaUrl
});

let mapDispatchToProps = { authLoginThunk, getNewVerificationEmail };

export default connect(mapStateToProps, mapDispatchToProps)(AccountVerifiedContainer);