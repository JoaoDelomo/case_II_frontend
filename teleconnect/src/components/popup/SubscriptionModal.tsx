import React, { useEffect, useState } from "react";
import "./SubscriptionModal.css";

interface SubscriptionModalProps {
  plan: { name: string; speed: string; price: string } | null;
  onClose: () => void;
  onContinue: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ plan, onClose, onContinue }) => {
  const [formData, setFormData] = useState({
    cep: "",
    street: "",
    number: "",
    complement: "",
  });

  const USER_INFO_URL = "http://127.0.0.1:8000/api/customer";

  // 🔹 Buscar os dados do usuário assim que o modal abrir
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(USER_INFO_URL, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Erro ao buscar dados do cliente");

        const userData = await response.json();

        // 🔹 Preenchendo os inputs com os dados do usuário
        setFormData({
          cep: userData.cep || "",
          street: userData.street || "",
          number: userData.number || "",
          complement: userData.complement || "",
        });
      } catch (error) {
        console.error("❌ Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Complete seus dados</h2>
        <p><strong>{plan?.name}: {plan?.speed} - {plan?.price}/mês</strong></p>

        <input type="text" value={formData.cep} placeholder="CEP" readOnly />
        <input type="text" value={formData.street} placeholder="Rua" readOnly />
        <input type="text" value={formData.number} placeholder="Número" readOnly />
        <input type="text" value={formData.complement} placeholder="Complemento" readOnly />

        <button className="confirm-btn" onClick={onContinue}>Continuar</button>
      </div>
    </div>
  );
};

export default SubscriptionModal;
