import React from "react";
import { connect } from "react-redux";
import { selectRegUrl } from "../../modules/auth/selectors";
import { Redirect } from "react-router";
import { updateUserRegUrlThunk } from "../../modules/auth/thunks";

const Verify = ({ regUrl, updateUserRegUrlThunk }) => {
  const handleNewLinkClick = () => updateUserRegUrlThunk();

  if (!regUrl) return <Redirect to="/profile" />;

  return (
    <div>
      {regUrl ? <a href={regUrl}>{regUrl}</a> : null}
      <h2>Confirm your email</h2>
      <p>
        Please check your email inbox for the activation link. If you do not
        find the email, check your spam folder as well.
      </p>
      <p>You did not receive an email?</p>
      <button onClick={handleNewLinkClick}>Send new activation link</button>
      {regUrl ? (
        <div>
          The activation link was sent to your registered email address.
        </div>
      ) : (
        <div>Oh, something went wrong. Please try again later.</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  regUrl: selectRegUrl(state),
});

const mapDispatchToProps = { updateUserRegUrlThunk };

export default connect(mapStateToProps, mapDispatchToProps)(Verify);
