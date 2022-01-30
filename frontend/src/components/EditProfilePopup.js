import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-form"
      title="Редактировать профиль"
      buttonName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_el_name"
        name="name"
        id="name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={name ? name : ""}
        onChange={handleChangeName}
        required
      />
      <span className="popup__error name-error" id="name-error" />
      <input
        type="text"
        className="popup__input popup__input_el_job"
        name="about"
        id="job"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        value={description ? description : ""}
        onChange={handleChangeDescription}
        required
      />
      <span className="popup__error job-error" id="job-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
