import React, { useState, useEffect } from "react";
import "./PopupStyles.css";

interface SenhaPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SenhaPopup: React.FC<SenhaPopupProps> = ({ isOpen, onClose, onConfirm }) => {
  const [senha, setSenha] = useState("");

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
        {/* Ícone de fechar reposicionado */}
        <button className="popup-close" onClick={onClose}>✖</button>

        <h3 className="popup-title">Insira a senha da sua conta</h3>

        <input 
          type="password" 
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="popup-input"
        />

        <button 
          className="popup-button confirm" 
          onClick={onConfirm} 
          disabled={!senha}
        >
          Cancelar plano
        </button>
      </div>
    </div>
  );
};

export default SenhaPopup;
