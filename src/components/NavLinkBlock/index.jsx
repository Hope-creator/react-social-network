import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinkBlock.scss";

const NavLinkBlock = ({ className, to, children }) => {
  return (
    <div className={className || undefined}>
      <span className="navLinkBlock__text">
        <NavLink to={to}>{children}</NavLink>
      </span>
    </div>
  );
};

export default NavLinkBlock;
