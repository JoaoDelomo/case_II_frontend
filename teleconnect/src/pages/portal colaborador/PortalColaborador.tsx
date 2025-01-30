import React from "react";
import { useNavigate } from "react-router-dom";
import "./PortalColaborador.css";

const PortalColaborador: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="portal-container">
      <aside className="sidebar">
        <div className="logo">📡</div>
        <button className="menu-btn" onClick={() => navigate("/portal-colaborador")}>Início</button>
        <button className="menu-btn" onClick={() => navigate("/clientes")}>Clientes</button>
        <button className="menu-btn" onClick={() => navigate("/processo-seletivo")}>Processo Seletivo</button>
        <button className="logout-btn" onClick={() => navigate("/")}>
          Sair 🔄
        </button>
      </aside>

      <main className="portal-content">
        <h1>Seja bem-vindo, [nome do colaborador]!</h1>

        <section className="info-box">
          <h3>Informações Pessoais</h3>
          <p><strong>Departamento:</strong> Vendas</p>
          <p><strong>Tempo na empresa:</strong> 10 anos e 3 meses</p>
          <p><strong>Ingresso na empresa:</strong> 28/10/2014</p>
        </section>

        <section className="info-box">
          <h3>Histórico de Feedbacks</h3>
          <div className="feedback-chart">
            <span className="negative">😡 4</span>
            <span className="neutral">😐 15</span>
            <span className="positive">😊 35</span>
          </div>
        </section>

        <section className="info-box">
          <h3>Time</h3>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Nome</th>
                <th>Nome</th>
                <th>Nome</th>
                <th>Nome</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Gerente</strong></td>
                <td><strong>Coordenador</strong></td>
                <td><strong>Consultor</strong></td>
                <td><strong>Consultor</strong></td>
                <td><strong>Consultor</strong></td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default PortalColaborador;
