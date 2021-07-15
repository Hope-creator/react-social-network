import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { updateUserStatusThunk } from "../../modules/auth/thunks";
import Preloader from "../../parts/preloader";
import { useHistory } from "react-router";

const AccountVerifiedSuccess = ({ userStatus, updateUserStatusThunk }) => {
  const history = useHistory();

  // response for update status (redirect on active status)
  useEffect(() => {
    updateUserStatusThunk().then((res) => {
      if (!res || res.userStatus === "pending") history.push("/login");
      else {
        setTimeout(() => {
          history.push("/profile");
          window.location.reload();
        }, 2500);
      }
    });
  }, [updateUserStatusThunk, history]);

  if (!userStatus) return <Redirect to="/login" />;

  return (
    <div>
      <h2>
        Your email has been successfully verified. You will be redirected in a
        moment...
      </h2>
      <Preloader />
    </div>
  );
};

let mapStateToProps = (state) => ({
  userStatus: state.auth.userStatus,
});

let mapDispatchToProps = { updateUserStatusThunk };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountVerifiedSuccess);
