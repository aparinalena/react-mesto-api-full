import React from "react";
import successIcon from "../images/success-icon.png";
import failIcon from "../images/fail-icon.png";

function InfoTooltip({
  isOpen,
  onClose,
  isRegSuccess,
  successedReg,
  failedReg,
}) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__register">
        <button type="button" className="popup__close" onClick={onClose} />
        <img
          className="popup__register-image"
          src={`${isRegSuccess ? successIcon : failIcon}`}
          alt="статус регистрации"
        />
        <p className="popup__register-text">
          {`${isRegSuccess ? successedReg : failedReg}`}
        </p>
      </div>
    </div>
  );
}
export default InfoTooltip;
