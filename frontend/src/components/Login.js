import React, { useState } from "react";
import Header from "./Header";

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [authData, setAuthData] = useState({ email: "", password: "" });

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  // function handleSubmit(evt) {
  //   evt.preventDefault();
  //   handleLogin(authData);
  // }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(email, password);

    setEmail("");
    setPassword("");
  }

  // function handleOnChange(evt) {
  //   const { name, value } = evt.target;
  //   setAuthData({ ...authData, [name]: value });
  // }

  return (
    <>
      <Header link="/signup" headerText="Регистрация" />
      <div className="authorization">
        <form className="authorization__form" onSubmit={handleSubmit}>
          <h2 className="authorization__title">Вход</h2>
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
            required
          />
          <button className="authorization__button" type="submit">
            Войти
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
