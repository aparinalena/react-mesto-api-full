import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButton = isOwn ? (
    <button
      className="element__trash"
      type="button"
      onClick={handleDeleteClick}
    />
  ) : (
    <button className="element__trash_hidden" />
  );
  const isLiked = card.likes.some((item) => item._id === currentUser._id);

  const cardLikeButtonClassName = `element__like 
  ${isLiked ? "element__like_active" : ""}`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            aria-label="Кнопка лайк"
          ></button>
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
      {cardDeleteButton}
    </div>
  );
}

export default Card;
