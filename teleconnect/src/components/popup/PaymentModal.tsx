import React, { useState, useEffect } from "react";
import "./SubscriptionModal.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface PaymentModalProps {
  plan: { id: string; name: string; speed: string; price: string } | null;
  onClose: () => void;
  onBack: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ plan, onClose, onBack }) => {
  const navigate = useNavigate();

  // 🔹 Estados para armazenar os dados do cartão
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cpf, setCpf] = useState("");
  const [hasSavedCard, setHasSavedCard] = useState(false); // Verifica se o usuário já tem cartão salvo
  const [error, setError] = useState("");

  // 🔹 Buscar dados do cartão salvo no banco
  useEffect(() => {
    const fetchPaymentInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://127.0.0.1:8000/api/customer/payment-info", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Erro ao buscar dados do pagamento");

        const data = await response.json();
        console.log("💳 Dados do cartão:", data);

        if (data.payment_info) {
          setCardNumber(data.payment_info.card_number || "");
          setCvv(data.payment_info.cvv || "");
          setCardHolder(data.payment_info.card_holder || "");
          setCpf(data.payment_info.cpf || "");
          setHasSavedCard(true); // O usuário tem um cartão salvo
        }
      } catch (error) {
        console.error("❌ Erro ao buscar os dados do pagamento:", error);
      }
    };

    fetchPaymentInfo();
  }, []);

  // 🔹 Função para confirmar o pagamento
  const handlePayment = async () => {
    if (!plan) return;

    const paymentData = {
      plan_id: plan.id,
      card_number: cardNumber,
      cvv: cvv,
      card_holder: cardHolder,
      cpf: cpf,
    };

    console.log("📡 Enviando pagamento:", JSON.stringify(paymentData));

    try {
      const response = await fetch("http://127.0.0.1:8000/api/payment/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Erro ao processar pagamento");
      }

      alert("Pagamento realizado com sucesso!");
      navigate("/pedido-confirmado");

    } catch (err: any) {
      console.error("❌ Erro ao processar pagamento:", err);
      setError(err.message || "Erro desconhecido.");
    }
  };

  if (!plan) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <button className="back-btn" onClick={onBack}><IoIosArrowBack /></button>

        <h2>Pagamento</h2>
        <p><strong>{plan.name}: {plan.speed} - {plan.price}/mês</strong></p>

        {/* 🔹 Inputs preenchidos automaticamente se já houver cartão salvo */}
        <input 
          type="text" 
          placeholder="Número do Cartão" 
          value={cardNumber} 
          onChange={(e) => setCardNumber(e.target.value)} 
          disabled={hasSavedCard} // Se já tem cartão salvo, não deixa editar
        />
        <input 
          type="text" 
          placeholder="CVV" 
          value={cvv} 
          onChange={(e) => setCvv(e.target.value)} 
          disabled={hasSavedCard} 
        />
        <input 
          type="text" 
          placeholder="Nome do Titular" 
          value={cardHolder} 
          onChange={(e) => setCardHolder(e.target.value)} 
          disabled={hasSavedCard} 
        />
        <input 
          type="text" 
          placeholder="CPF do Titular" 
          value={cpf} 
          onChange={(e) => setCpf(e.target.value)} 
          disabled={hasSavedCard} 
        />

        {/* 🔹 Mensagem de erro */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button className="confirm-btn" onClick={handlePayment}>
          {hasSavedCard ? "Confirmar Pagamento" : "Assinar"}
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
