import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef("");

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar-form"
      title="Обновить аватар"
      buttonName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="popup__input popup__input_el_avatar-link"
        name="link"
        id="avatar-url"
        placeholder="Добавьте ссылку на аватар"
        ref={avatarRef}
        required
      />
      <span id="avatar-url-error" className="popup__error avatar-url-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
