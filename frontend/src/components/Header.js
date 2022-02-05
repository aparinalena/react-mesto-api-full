import React from "react";
import logo from "../images/header-logo.svg";
import { Link } from "react-router-dom";

function Header({ link, loggedIn, headerText, logout, userLoginData }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt={"логотип"} />
      <div className="header__logged-info">
        <p className="header__logged-email">{userLoginData}</p>
        <Link
          to={link}
          onClick={logout}
          className={`header__link ${loggedIn && "header__link_logout"}`}
        >
          {headerText}
        </Link>
      </div>
    </header>
  );
}

export default Header;
