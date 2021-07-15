import React from "react";
import { connect } from "react-redux";
import { authSelectors, authThunks } from "../../modules/auth";
import { usersActionCreators } from "../../modules/users";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import SearchUserForm from "../../components/SearchUserForm";
import { NavLink } from "react-router-dom";
import AuthBlock from "../../components/AuthBlock";

import "./Header.scss";

export const HeaderContainer = ({
  auth,
  changeVisibleNav,
  setSearchUsersName,
  authLogoutThunk,
}) => {
  const { width } = useWindowDimensions();

  const logout = () => {
    authLogoutThunk();
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="header__link">
        {width <= 600 ? (
          <button onClick={() => changeVisibleNav()}>
            <i className="fas fa-bars"></i>
          </button>
        ) : (
          <NavLink className="header__navlink" to="/profile">
            Social Network
          </NavLink>
        )}
      </div>
      <div className="header__form">
        <SearchUserForm
          submitHandler={setSearchUsersName}
          redirectLink="/users"
        />
      </div>
      <AuthBlock isAuth={auth.isAuth} logout={logout} />
    </header>
  );
};

const mapStateToProps = (state) => ({
  auth: authSelectors.selectAuthState(state),
});

const mapDispatchToProps = {
  setSearchUsersName: usersActionCreators.setSearchUsersName,
  authLogoutThunk: authThunks.authLogoutThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
