import React from "react";
import { NavLink } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import "./Navbar.scss";

const Navbar = ({ isNavHidden, unreadConversations, changeVisibleNav }) => {
  const { width } = useWindowDimensions();

  React.useEffect(() => {
    if (width > 600 && isNavHidden) {
      changeVisibleNav();
    }
  }, [width, changeVisibleNav, isNavHidden]);

  return (
    <nav className={isNavHidden ? "navbar_hidden" : "navbar"}>
      <ul>
        <li onClick={() => width <= 600 && changeVisibleNav()}>
          <NavLink
            to="/profile"
            className="navbar__link"
            activeClassName="navbar__link_active"
          >
            <i className="far fa-user-circle"></i>
            <div>Profile</div>
          </NavLink>
        </li>
        <li onClick={() => width <= 600 && changeVisibleNav()}>
          <NavLink
            to="/dialogs"
            className="navbar__link"
            activeClassName="navbar__link_active"
          >
            <i className="far fa-comments"></i>
            <div>Messages</div>
            <span className="navbar__unread">
              {unreadConversations > 0 && unreadConversations}
            </span>
          </NavLink>
        </li>
        <li onClick={() => width <= 600 && changeVisibleNav()}>
          <NavLink
            to="/news"
            className="navbar__link"
            activeClassName="navbar__link_active"
          >
            <i className="far fa-newspaper"></i>
            <div>Timeline</div>
          </NavLink>
        </li>
        <li onClick={() => width <= 600 && changeVisibleNav()}>
          <NavLink
            to="/friends"
            className="navbar__link"
            activeClassName="navbar__link_active"
          >
            <i className="fas fa-user-friends"></i>
            <div>Friends</div>
          </NavLink>
        </li>
        <li onClick={() => width <= 600 && changeVisibleNav()}>
          <NavLink
            to="/users"
            className="navbar__link"
            activeClassName="navbar__link_active"
          >
            <i className="fas fa-users"></i>
            <div>Users</div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
