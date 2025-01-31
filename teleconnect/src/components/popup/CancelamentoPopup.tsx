import React, { useEffect } from "react";
import "./PopupStyles.css";
import { useNavigate } from "react-router-dom";

interface CancelamentoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const CancelamentoPopup: React.FC<CancelamentoPopupProps> = ({ isOpen}) => {
  const navigate = useNavigate();
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
        <h3 className="popup-title cancel">Plano cancelado!</h3>
        <p>
          Sentimos muito pelo cancelamento. Se houver algo que possamos fazer para melhorar sua experiência, por favor, entre em contato conosco.
        </p>

        <button className="popup-button confirm" onClick={() => navigate("/nenhum-plano-ativo")}>
          Próximo
        </button>
      </div>
    </div>
  );
};

export default CancelamentoPopup;
