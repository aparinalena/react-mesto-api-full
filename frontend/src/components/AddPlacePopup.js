import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePoppup({ isOpen, onClose, onAddPlace }) {
  const [cardName, setName] = useState("");
  const [cardLink, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleCardNameChange(e) {
    setName(e.target.value);
  }
  function handleCardLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name: cardName, link: cardLink });
  }

  return (
    <PopupWithForm
      name="add-form"
      title="Новое место"
      buttonName="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_el_place"
        name="name"
        id="place"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={cardName}
        onChange={handleCardNameChange}
        required
      />
      <span id="place-error" className="popup__error place-error" />
      <input
        type="url"
        className="popup__input popup__input_el_link"
        name="link"
        id="link"
        placeholder="Ссылка на картинку"
        value={cardLink}
        onChange={handleCardLinkChange}
        required
      />
      <span id="link-error" className="popup__error link-error" />
    </PopupWithForm>
  );
}

export default AddPlacePoppup;
