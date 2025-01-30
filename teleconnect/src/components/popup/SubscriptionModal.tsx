import React from "react";
import "./SubscriptionModal.css";

interface SubscriptionModalProps {
  plan: { name: string; speed: string; price: string } | null;
  onClose: () => void;
  onContinue: () => void; // Adicionando a propriedade onContinue
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ plan, onClose, onContinue }) => {
  if (!plan) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Complete seus dados</h2>
        <p><strong>{plan.name}: {plan.speed} - {plan.price}/mês</strong></p>

        <input type="text" placeholder="CEP" />
        <input type="text" placeholder="Rua" />
        <input type="text" placeholder="Número" />
        <input type="text" placeholder="Complemento" />

        <button className="confirm-btn" onClick={onContinue}>Continuar</button>
      </div>
    </div>
  );
};

export default SubscriptionModal;
