import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup ${card.link ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <button className="popup__close" onClick={onClose}></button>
        <img
          className="popup__image"
          src={card.link}
          alt={card.name}
        />
        <p className="popup__image-caption">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
