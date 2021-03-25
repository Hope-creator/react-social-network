import React from 'react';

const AccountVerification = ({ onSubmit, sendingStatus, regUrl }) => {
    //login form wrapper for testing <Form render/>

    return (<div>
        {regUrl ? <a href={regUrl}>{regUrl}</a> : null}
        <h2>Confirm your email</h2>
        <p>Please check your email inbox for the activation link.
        If you do not find the email, check your spam folder as well.</p>
        <p>You did not receive an email?</p>
        <button onClick={() => onSubmit()}>Send new activation link</button>
        {sendingStatus === "success" ?
            <div>The activation link was sent to your registered email address.</div> :
            sendingStatus === "error" ?
                <div>Oh, something went wrong. Please try again later.</div> :
                null}
    </div>
    )
}



export default AccountVerification