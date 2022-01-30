import React from "react";

function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  buttonName,
  onSubmit,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть попап"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={`${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button type="submit" className="popup__button">
            {buttonName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
