import "./SubscriptionModal.css";

export default function SubscriptionModal({ plan, onClose }: { plan: any, onClose: () => void }) {
  if (!plan) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h3>Complete seus dados</h3>
        <p><strong>{plan.name}: {plan.speed} - {plan.price}/mês</strong></p>

        <input type="text" placeholder="CEP" className="wide-input"/>
        <input type="text" placeholder="Rua" className="wide-input"/>
        <input type="text" placeholder="Número" className="wide-input"/>
        <input type="text" placeholder="Complemento" className="wide-input"/>
        
        <button className="continue-btn">Continuar</button>
      </div>
    </div>
  );
}
