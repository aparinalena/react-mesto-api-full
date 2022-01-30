import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup ${card && "popup_opened"}`}>
      <div className="popup__image-container">
        <button className="popup__close" onClick={onClose}></button>
        <img
          className="popup__image"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <p className="popup__image-caption">{card ? card.name : ""}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
