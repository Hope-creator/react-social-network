import React from "react";
import { NavLink } from "react-router-dom";

import "./AuthBlock.scss";

const AuthBlock = ({ isAuth, logout }) => {
  return (
    <div className="authBlock">
      <NavLink to="/reset">
        <span>Reset password</span>
      </NavLink>
      {isAuth ? (
        <button className="authBlock__button" onClick={() => logout()}>
          Logout
        </button>
      ) : (
        <>
          <NavLink to="/login">
            <span>Sign in</span>
          </NavLink>
          <NavLink to="/join">
            <span>Sign up</span>
          </NavLink>
        </>
      )}
    </div>
  );
};

export default AuthBlock;
