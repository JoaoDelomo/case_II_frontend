import React from "react";
import { useNavigate } from "react-router-dom";
import "./NenhumPlanoAtivo.css";

const NenhumPlanoAtivo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="plano-inativo-container">
      <header className="portal-header">
        <div className="portal-logo">📡</div>
        <h2>Portal do Cliente</h2>
        <button className="logout-btn" onClick={() => navigate("/")}>
          Sair ↩
        </button>
      </header>

      <main className="plano-inativo-content">
        <h1><strong>Nenhum plano ativo.</strong></h1>
        <p>
          Encerre sua sessão (<strong>sair</strong>) e confira nossos planos na página inicial do nosso site.
        </p>
      </main>
    </div>
  );
};

export default NenhumPlanoAtivo;
