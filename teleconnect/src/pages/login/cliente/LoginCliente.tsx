import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import "./LoginCliente.css"; // Importando o CSS

export default function LoginCliente() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Hook para navegação

  return (
    <div className="container">
      {/* Lado esquerdo - Formulário de Login */}
      <div className="leftPanel">
        <div className="content">
          {/* Botão de Voltar */}
          <button className="backButton" onClick={() => navigate("/login")}>←</button>

          {/* Título */}
          <h2>Portal do Cliente</h2>

          {/* Formulário */}
          <div className="form">
            <label>Login</label>
            <input type="text" placeholder="Telefone ou Email" />

            <label>Senha</label>
            <div className="passwordContainer">
              <input type={showPassword ? "text" : "password"} placeholder="Digite sua senha" />
              <span className="eyeIcon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {/* Botão de Login */}
            <button className="loginButton" onClick={() => navigate("/portal-cliente")}>
              Login
            </button>

            {/* Link de Esqueci minha senha */}
            <Link to="/forgot-password" className="forgotPassword">Esqueci minha senha</Link>

            {/* Link de Registro */}
            <div className="registerLink">
              Não possui uma conta? <Link to="/register">Registre-se</Link>
            </div>
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
