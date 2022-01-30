import React, { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {
  const [regData, setRegData] = useState({ email: "", password: "" });

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(regData);
  }

  function handleOnChange(evt) {
    const { name, value } = evt.target;
    setRegData({ ...regData, [name]: value });
  }

  return (
    <>
      <Header link="/sign-in" headerText={"Войти"} />
      <div className="authorization">
        <form className="authorization__form" onSubmit={handleSubmit}>
          <h2 className="authorization__title">Регистрация</h2>
          <input
            type="email"
            className="authorization__input"
            name="email"
            placeholder="Email"
            minLength="2"
            maxLength="30"
            value={regData.email}
            onChange={handleOnChange}
            required
          />
          <input
            type="password"
            className="authorization__input"
            name="password"
            placeholder="Пароль"
            minLength="2"
            maxLength="30"
            value={regData.password}
            onChange={handleOnChange}
            required
          />
          <button className="authorization__button" type="submit">
            Зарегистрироваться
          </button>
          <Link className="authorization__login-redirect" to="/sign-in">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </div>
    </>
  );
}

export default Register;
