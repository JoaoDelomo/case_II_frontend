import React, { useState } from "react";
import "./SubscriptionModal.css"; // Reutilizando o mesmo CSS dos outros modais
import { useNavigate } from "react-router-dom";

interface CompanySubscriptionModalProps {
  plan: { name: string; speed: string; price: string } | null;
  onClose: () => void;
}

const CompanySubscriptionModal: React.FC<CompanySubscriptionModalProps> = ({ plan, onClose }) => {
  if (!plan) return null;

  const navigate = useNavigate(); // Função para redirecionamento

  // Estados para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    cnpj: "",
    companyName: "",
    ownerName: "",
    email: "",
    phone: ""
  });

  // Função para atualizar os valores dos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para enviar os dados e redirecionar para a página de confirmação
  const handleSubmit = () => {
    // Aqui pode ser adicionada uma validação dos campos antes de redirecionar
    navigate("/pedido-confirmado");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>

        <h2>Complete os dados</h2>
        <p><strong>{plan.name}: {plan.speed} - {plan.price}/mês</strong></p>

        <h3 className="modal-section-title">Dados da empresa:</h3>
        <input type="text" name="cnpj" placeholder="CNPJ" value={formData.cnpj} onChange={handleChange} />
        <input type="text" name="companyName" placeholder="Razão Social" value={formData.companyName} onChange={handleChange} />

        <h3 className="modal-section-title">Dados do responsável legal da empresa:</h3>
        <input type="text" name="ownerName" placeholder="Nome completo" value={formData.ownerName} onChange={handleChange} />
        <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Ex: (99) 99999-9999" value={formData.phone} onChange={handleChange} />

        <button className="confirm-btn" onClick={handleSubmit}>Confirmar pedido</button>
      </div>
    </div>
  );
};

export default CompanySubscriptionModal;
