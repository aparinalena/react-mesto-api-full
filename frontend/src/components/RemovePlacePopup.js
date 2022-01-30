import React from "react";
import PopupWithForm from "./PopupWithForm";

function RemovePlacePopup({ onDeleteCard, isOpen, onClose }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="delete"
      buttonName="Да"
      title="Вы уверены?"
      onSubmit={handleSubmit}
    />
  );
}

export default RemovePlacePopup;