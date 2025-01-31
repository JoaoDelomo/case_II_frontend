import React, { useState, useEffect } from "react";
import "./InicioPortalCliente.css";
import ConfirmacaoPopup from "../../components/popup/ConfirmacaoPopup";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api/customer"; // 🔹 Rota para buscar os dados do cliente
const CANCEL_PLAN_URL = "http://127.0.0.1:8000/api/payment/cancel"; // 🔹 Rota para cancelar o plano

const InicioPortalCliente: React.FC = () => {
  const navigate = useNavigate();

  // Estados para controle dos popups
  const [showConfirmacaoPopup, setShowConfirmacaoPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Estado para armazenar os dados do cliente
  const [cliente, setCliente] = useState<{
    nome: string;
    email: string;
    phone: string;
    cpf: string;
    cep: string;
    street: string;
    number: string;
    complement?: string;
    city: string;
    state: string;
    active_plan?: {
      nome: string;
      preco: string;
    };
  } | null>(null);

  // 🔹 Buscar dados do cliente logado
  useEffect(() => {
    const fetchCustomerData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ Usuário não autenticado.");
        return;
      }

      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Erro ao buscar dados do cliente");

        const data = await response.json();
        console.log("📡 Dados do cliente recebidos:", data);
        setCliente(data);
      } catch (error) {
        console.error("❌ Erro ao buscar os dados do cliente:", error);
      }
    };

    fetchCustomerData();
  }, []);

  // 🔹 Função para cancelar o plano
  const handleCancelPlan = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado para cancelar o plano.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(CANCEL_PLAN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Erro ao cancelar plano");
      }

      alert("Plano cancelado com sucesso!");

      // 🔹 Fecha o popup e redireciona para o portal do cliente
      setShowConfirmacaoPopup(false);
      setCliente((prevCliente) => prevCliente ? { ...prevCliente, active_plan: undefined } : null);

      // 🔹 Redireciona após 1 segundo para evitar um refresh brusco
      setTimeout(() => {
        navigate("/portal-cliente");
      }, 1000);
      
    } catch (err: any) {
      alert(`Erro: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="portal-cliente-container">
      <header className="portal-header">
        <div className="portal-logo">📡</div>
        <h2>Portal do Cliente</h2>
        <button className="logout-btn" onClick={() => navigate("/")}>
          Sair ↩
        </button>
      </header>

      <main className="portal-content">
        <h1>Seja bem-vindo, <strong>{cliente?.nome || "Carregando..."}</strong>!</h1>

        <section className="plan-info">
          {/* 🔹 Esquerda - Informações do plano */}
          <div className="info-box plan-box">
            <h3>Meu Plano</h3>
            {cliente?.active_plan ? (
              <>
                <p><strong>Plano:</strong> {cliente.active_plan.nome}</p>
                <p><strong>Preço:</strong> {cliente.active_plan.preco}/mês</p>
              </>
            ) : (
              <p className="no-plan-message">📌 Você ainda não possui um plano contratado.</p>
            )}
          </div>

          {/* 🔹 Direita - Informações do cliente */}
          <div className="info-box customer-box">
            <h3>Seus Dados</h3>
            <p><strong>Email:</strong> {cliente?.email || "Não disponível"}</p>
            <p><strong>Telefone:</strong> {cliente?.phone || "Não disponível"}</p>
            <p><strong>CPF:</strong> {cliente?.cpf || "Não disponível"}</p>
            <h3>Endereço</h3>
            <p><strong>Rua:</strong> {cliente?.street || "Não disponível"}</p>
            <p><strong>Número:</strong> {cliente?.number || "Não disponível"}</p>
            <p><strong>Complemento:</strong> {cliente?.complement || "Não disponível"}</p>
            <p><strong>Cidade:</strong> {cliente?.city || "Não disponível"}</p>
            <p><strong>Estado:</strong> {cliente?.state || "Não disponível"}</p>
            <p><strong>CEP:</strong> {cliente?.cep || "Não disponível"}</p>
          </div>
        </section>

        <div className="actions">
          <button className="help-btn">Precisa de ajuda? 📲</button>
          {cliente?.active_plan && (
            <button 
              className="cancel-btn"
              onClick={() => setShowConfirmacaoPopup(true)}
            >
              {isLoading ? "Cancelando..." : "Cancelar plano ❌"}
            </button>
          )}
        </div>
      </main>

      {/* POPUP DE CONFIRMAÇÃO */}
      <ConfirmacaoPopup
        isOpen={showConfirmacaoPopup}
        onClose={() => setShowConfirmacaoPopup(false)}
        onConfirm={handleCancelPlan} // 🔹 Chama o cancelamento direto
      />
    </div>
  );
};

export default InicioPortalCliente;
