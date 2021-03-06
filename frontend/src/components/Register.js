import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(email, password);
    setEmail("");                 
    setPassword(""); 
  }

  return (
    <>
      <div className="authorization">
        <form className="authorization__form" onSubmit={handleSubmit}>
          <h2 className="authorization__title">Регистрация</h2>
          <input
            id="email"
            type="email"
            className="authorization__input"
            name="email"
            placeholder="Email"
            minLength="2"
            maxLength="30"
            value={email}
            onChange={handleEmailChange}
            autoComplete="off"
            required
          />
          <input
            id="password"
            type="password"
            className="authorization__input"
            name="password"
            placeholder="Пароль"
            minLength="2"
            maxLength="30"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="off"
            required
          />
          <button className="authorization__button" type="submit">
            Зарегистрироваться
          </button>
          <Link className="authorization__login-redirect" to="/signin">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </div>
    </>
  );
}

export default Register;
