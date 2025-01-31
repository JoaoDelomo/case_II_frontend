import React, { useState } from "react";
import "./InicioPortalCliente.css";
import ConfirmacaoPopup from "../../components/popup/ConfirmacaoPopup";
import SenhaPopup from "../../components/popup/SenhaPopup";
import CancelamentoPopup from "../../components/popup/CancelamentoPopup";
import { useNavigate } from "react-router-dom";

const InicioPortalCliente: React.FC = () => {
  const navigate = useNavigate();

  // Estados para controle dos popups
  const [showConfirmacaoPopup, setShowConfirmacaoPopup] = useState(false);
  const [showSenhaPopup, setShowSenhaPopup] = useState(false);
  const [showCancelamentoPopup, setShowCancelamentoPopup] = useState(false);

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
        <h1>Seja bem-vindo, <strong>[nome do cliente]</strong>!</h1>

        <section className="plan-info">
          <div className="info-box">
            <h3>Meu plano:</h3>
            <p><strong>Plano Contratado:</strong> Premium +</p>
            <p><strong>Data Início:</strong> 15/10/2024</p>
            <p><strong>Data Fim:</strong> 15/02/2025</p>
          </div>
          <div className="info-box">
            <h3>Endereço</h3>
            <p><strong>Rua:</strong> Rua Quatá</p>
            <p><strong>Número:</strong> 99</p>
            <p><strong>Complemento:</strong> Apto 409</p>
            <p><strong>Valor:</strong> 179,90/mês</p>
          </div>
        </section>

        <div className="actions">
          <button className="help-btn">Precisa de ajuda? 📲</button>
          <button 
            className="cancel-btn"
            onClick={() => setShowConfirmacaoPopup(true)}
          >
            Cancelar plano ❌
          </button>
        </div>
      </main>

      {/* POPUPS */}
      <ConfirmacaoPopup
        isOpen={showConfirmacaoPopup}
        onClose={() => setShowConfirmacaoPopup(false)}
        onConfirm={() => {
          setShowConfirmacaoPopup(false);
          setShowSenhaPopup(true);
        }}
      />

      <SenhaPopup
        isOpen={showSenhaPopup}
        onClose={() => setShowSenhaPopup(false)}
        onConfirm={() => {
          setShowSenhaPopup(false);
          setShowCancelamentoPopup(true);
        }}
      />

      <CancelamentoPopup
        isOpen={showCancelamentoPopup}
        onClose={() => setShowCancelamentoPopup(false)}
      />
    </div>
  );
};

export default InicioPortalCliente;
