import { useState } from "react";
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
=======
import { useNavigate } from "react-router-dom"; // Redirecionamento após login
>>>>>>> 18c92953c7840c7f42b718b41a1fd0345d50da43
import { Eye, EyeSlash } from "@phosphor-icons/react";
import "./LoginCliente.css"; // Importando o CSS

export default function LoginCliente() {
  const [identifier, setIdentifier] = useState(""); // Email ou telefone
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
<<<<<<< HEAD
  const navigate = useNavigate(); // Hook para navegação
=======
  const [error, setError] = useState(""); // Para exibir erros
  const navigate = useNavigate(); // Para redirecionar o usuário

  // 🔹 Função para enviar os dados ao backend
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault(); // Evita recarregar a página

    const loginData = { identifier, password };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Erro ao fazer login");
      }

      // 🔹 Armazena o token no localStorage
      localStorage.setItem("token", data.access_token);

      // 🔹 Redireciona o usuário para a página principal ou dashboard
      navigate("/");

    } catch (err: any) {
      setError(err.message);
    }
  }
>>>>>>> 18c92953c7840c7f42b718b41a1fd0345d50da43

  return (
    <div className="container">
      {/* Lado esquerdo - Formulário de Login */}
      <div className="leftPanel">
        <div className="content">
<<<<<<< HEAD
          {/* Botão de Voltar */}
          <button className="backButton" onClick={() => navigate("/login")}>←</button>
=======
          <button onClick={() => navigate("/login")} className="backButton">←</button>
>>>>>>> 18c92953c7840c7f42b718b41a1fd0345d50da43

          <h2>Portal do Cliente</h2>

          {/* Formulário */}
          <form className="form" onSubmit={handleLogin}>
            <label>Login</label>
            <input
              type="text"
              placeholder="Telefone ou Email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />

            <label>Senha</label>
            <div className="passwordContainer">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="eyeIcon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
              </span>
            </div>

<<<<<<< HEAD
            {/* Botão de Login */}
            <button className="loginButton" onClick={() => navigate("/portal-cliente")}>
              Login
            </button>
=======
            {/* Exibir erro, se houver */}
            {error && <p className="error">{error}</p>}
>>>>>>> 18c92953c7840c7f42b718b41a1fd0345d50da43

            <button type="submit" className="loginButton">Login</button>
          </form>

          <a href="/forgot-password" className="forgotPassword">Esqueci minha senha</a>

          <div className="registerLink">
            Não possui uma conta? <a href="/register">Registre-se</a>
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
