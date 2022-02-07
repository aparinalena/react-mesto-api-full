import React from "react";
import logo from "../images/header-logo.svg";
import { Route, Link } from "react-router-dom";

function Header({ loggedIn, logout, userLoginData }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt={"логотип"} />

      <Route path="/signin">
        <Link className="header__link" to="/signup">
          Регистрация
        </Link>
      </Route>

      <Route path="/signup">
        <Link className="header__link" to="/signin">
          Войти
        </Link>
      </Route>

      <Route exact path="/">
        <div className="header__logged-info">
          <p className="header__logged-email">{userLoginData}</p>
          <Link
            to="/signin"
            onClick={logout}
            className={`header__link ${loggedIn && "header__link_logout"}`}
          >
            Выйти
          </Link>
        </div>
      </Route>
    </header>
  );
}

export default Header;
