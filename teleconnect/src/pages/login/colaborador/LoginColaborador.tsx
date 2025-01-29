import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import "./LoginColaborador.css"; // Importa o CSS

export default function LoginColaborador() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container">
      {/* Lado esquerdo - Formulário de Login */}
      <div className="leftPanel">
        <div className="content">
          {/* Botão de Voltar */}
          <Link to="/login" className="backButton">←</Link>

          {/* Título */}
          <h2>Portal do Colaborador</h2>

          <p className="subtitle">Entre na sua conta</p>

          {/* Formulário */}
          <div className="form">
            <label>Login</label>
            <input type="text" placeholder="Telefone ou Email" />

            <label>CPF</label>
            <input type="text" placeholder="CPF" />

            <label>Senha</label>
            <div className="passwordContainer">
              <input type={showPassword ? "text" : "password"} placeholder="Digite sua senha" />
              <span className="eyeIcon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {/* Botão de Login */}
            <button className="loginButton">Login</button>
          </div>
        </div>
      </div>

      {/* Lado direito - Ilustração */}
      <div className="rightPanel">
        <img src="/src/assets/login.png" alt="Ilustração Login" />
      </div>
    </div>
  );
}
