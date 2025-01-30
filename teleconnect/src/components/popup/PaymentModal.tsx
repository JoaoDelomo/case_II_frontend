import React from "react";
import "./SubscriptionModal.css"; // Reutiliza o CSS do SubscriptionModal
import { IoIosArrowBack } from "react-icons/io";

interface PaymentModalProps {
  plan: { name: string; speed: string; price: string } | null;
  onClose: () => void;
  onBack: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ plan, onClose, onBack }) => {
  if (!plan) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <button className="back-btn" onClick={onBack}><IoIosArrowBack /></button>

        <h2>Pagamento</h2>
        <p><strong>{plan.name}: {plan.speed} - {plan.price}/mês</strong></p>

        <input type="text" placeholder="Número do Cartão" />
        <input type="text" placeholder="CVV" />
        <input type="text" placeholder="Nome do Titular" />
        <input type="text" placeholder="CPF do Titular" />

        <button className="confirm-btn">Assinar</button>
      </div>
    </div>
  );
};

export default PaymentModal;
