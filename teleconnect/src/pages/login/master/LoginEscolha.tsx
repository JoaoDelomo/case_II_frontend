import { Link } from "react-router-dom";
import "./LoginEscolha.css";
import { ArrowLeft, User, Users } from "@phosphor-icons/react";

export default function LoginEscolha() {
  return (
    <div className="container">
      {/* Lado esquerdo */}
      <div className="leftPanel">
        <div className="content">
          {/* Botão de voltar */}
          <Link to="/" className="backButton">
            <ArrowLeft size={24} />
          </Link>

          {/* Botões de escolha */}
          <Link to="/login/cliente" className="choiceButton client">
            Sou cliente <User size={20} />
          </Link>

          <Link to="/login/colaborador" className="choiceButton collaborator">
            Sou colaborador <Users size={20} />
          </Link>
        </div>
      </div>

      {/* Lado direito - Ilustração */}
      <div className="rightPanel">
        <img src="/src/assets/login.png" alt="Ilustração Login" />
      </div>
    </div>
  );
}
