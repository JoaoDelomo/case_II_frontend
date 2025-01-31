import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProcessoSeletivo.css";

// Definição do tipo para candidatos
interface Candidato {
  nome: string;
  email: string;
  telefone: string;
  status: string;
}

// Definição do tipo para vagas
interface Vaga {
  id: number;
  nome: string;
}

const vagasIniciais: Vaga[] = [
  { id: 1, nome: "Estagiário" },
  { id: 2, nome: "Consultor" },
  { id: 3, nome: "Coordenador" },
  { id: 4, nome: "Gerente" },
  { id: 5, nome: "Analista" },
];

// Define o estado inicial dos candidatos
const candidatosIniciais: Record<number, Candidato[]> = {
  1: [{ nome: "Amanda", email: "amanda@gmail.com", telefone: "(19) 98765-4321", status: "Contratado" }],
  2: [{ nome: "Vitória", email: "vitoria@hotmail.com", telefone: "(11) 98765-4321", status: "3ª Fase" }],
  3: [{ nome: "Vitor", email: "vitor@icloud.com", telefone: "(11) 98765-4321", status: "Não contratado" }],
};

const ProcessoSeletivo: React.FC = () => {
  const navigate = useNavigate();
  const [vagas] = useState<Vaga[]>(vagasIniciais);
  const [candidatos, setCandidatos] = useState<Record<number, Candidato[]>>(candidatosIniciais);
  const [vagaSelecionada, setVagaSelecionada] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Função para alterar o status do candidato
  const handleStatusChange = (vagaId: number, index: number, newStatus: string) => {
    setCandidatos((prevState) => {
      const newCandidatos = { ...prevState };
      newCandidatos[vagaId] = newCandidatos[vagaId].map((candidato, i) =>
        i === index ? { ...candidato, status: newStatus } : candidato
      );
      return newCandidatos;
    });
  };

  return (
    <div className="processo-seletivo-container">
      <aside className="sidebar">
        <div className="logo">📡</div>
        <button className="menu-btn" onClick={() => navigate("/portal-colaborador")}>
          Início
        </button>
        <button className="menu-btn" onClick={() => navigate("/clientes")}>
          Clientes
        </button>
        <button className="menu-btn">Processo Seletivo</button>
        <button className="logout-btn" onClick={() => navigate("/")}>Sair 🔄</button>
      </aside>

      <main className="processo-content">
        <h1>Processo Seletivo</h1>

        {/* Filtros */}
        <div className="filters">
          <label>
            Mostrar
            <select>
              <option>10</option>
              <option>25</option>
              <option>50</option>
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

        {/* Botão Adicionar Vaga */}
        <button className="add-btn">+ Adicionar Vaga</button>

        {/* Lista de Vagas */}
        <div className="vaga-grid">
          {vagas.map((vaga) => (
            <div key={vaga.id} className="vaga-card" onClick={() => setVagaSelecionada(vaga.id)}>
              {vaga.nome}
            </div>
          ))}
        </div>

        {/* Lista de Candidatos */}
        {vagaSelecionada !== null && candidatos[vagaSelecionada] && (
          <div className="candidatos-container">
            <h2>Candidatos para {vagas.find((v) => v.id === vagaSelecionada)?.nome}</h2>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Telefone</th>
                  <th>Status</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {candidatos[vagaSelecionada]?.map((candidato, index) => (
                  <tr key={index}>
                    <td>{candidato.nome}</td>
                    <td>{candidato.email}</td>
                    <td>{candidato.telefone}</td>
                    <td>
                      <select
                        value={candidato.status}
                        onChange={(e) => handleStatusChange(vagaSelecionada, index, e.target.value)}
                      >
                        <option>Contratado</option>
                        <option>3ª Fase</option>
                        <option>Não contratado</option>
                      </select>
                    </td>
                    <td>
                      <button className="delete-btn">🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProcessoSeletivo;
