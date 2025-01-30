import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Clientes.css";

const Clientes: React.FC = () => {
  const navigate = useNavigate();

  // Estado para armazenar o termo de pesquisa
  const [searchTerm, setSearchTerm] = useState("");

  // Lista simulada de clientes (pronta para integração com backend)
  const [clientes] = useState([
    { id: 1, nome: "André", email: "andre@gmail.com", telefone: "(19) 98765-4321", tipo: "Empresa", status: "Finalizado" },
    { id: 2, nome: "Ronaldo", email: "ronaldo@hotmail.com", telefone: "(11) 98765-4321", tipo: "Pessoal", status: "Instalação" },
    { id: 3, nome: "Bruno", email: "bruno@icloud.com", telefone: "(11) 98765-4321", tipo: "Empresa", status: "Não contatado" },
  ]);

  // Função para filtrar os clientes com base no termo de pesquisa
  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefone.includes(searchTerm) ||
      cliente.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="clientes-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">📡</div>
        <button className="menu-btn" onClick={() => navigate("/portal-colaborador")}>Início</button>
        <button className="menu-btn">Clientes</button>
        <button className="menu-btn" onClick={() => navigate("/processo-seletivo")}>Processo Seletivo</button>
        <button className="logout-btn" onClick={() => navigate("/")}>Sair 🔄</button>
      </aside>

      {/* Conteúdo principal */}
      <main className="clientes-content">
        <h2>Clientes</h2>

        {/* Barra de Filtros */}
        <div className="filtros">
          <label>Mostrar 
            <select>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            entradas
          </label>
          <input 
            type="text" 
            placeholder="Procurar" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabela de Clientes */}
        <table className="clientes-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Tipo Cliente</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.tipo}</td>
                <td className={`status ${cliente.status.toLowerCase().replace(" ", "-")}`}>{cliente.status}</td>
                <td>
                  <button className="delete-btn">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Botão de Adicionar Cliente */}
        <button className="add-client-btn">+ Adicionar cliente</button>
      </main>
    </div>
  );
};

export default Clientes;
