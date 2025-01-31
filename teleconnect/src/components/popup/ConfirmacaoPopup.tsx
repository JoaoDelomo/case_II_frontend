import React, { useEffect } from "react";
import "./PopupStyles.css";

interface ConfirmacaoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmacaoPopup: React.FC<ConfirmacaoPopupProps> = ({ isOpen, onClose, onConfirm }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3 className="popup-title">Você tem certeza que quer cancelar seu plano?</h3>

        <div className="popup-buttons">
          <button className="popup-button cancel" onClick={onClose}>Cancelar</button>
          <button className="popup-button confirm" onClick={onConfirm}>Sim</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacaoPopup;
