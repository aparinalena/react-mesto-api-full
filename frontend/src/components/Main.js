import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";

function Main({
  loggedIn,
  logout,
  userLoginData,
  cards,
  onEditAvatarPopupOpen,
  onEditProfilePopupOpen,
  onAddPlacePopupOpen,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header
        headerText={"Выйти"}
        loggedIn={loggedIn}
        login={userLoginData}
        onClick={logout}
        link="/sign-in"
      />
      <main className="content">
        <section className="profile">
          <div
            className="profile__avatar-container"
            onClick={onEditAvatarPopupOpen}
          >
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Фото профиля"
            ></img>
            <button
              className="profile__avatar-edit"
              type="button"
              aria-label="Изменить аватар"
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit edit-open"
                id="edit-button"
                aria-label="Редактировать профиль"
                onClick={onEditProfilePopupOpen}
              ></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
          <button
            type="button"
            className="profile__add add-open"
            id="add-button"
            aria-label="Добавить"
            onClick={onAddPlacePopupOpen}
          ></button>
        </section>

        <section className="elements">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}

export default Main;
