import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "@phosphor-icons/react";

export default function LoginColaborador() {
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // Para exibir erros
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(""); // Limpa erros anteriores
  
    console.log("Dados enviados para o backend:", {
      email: email,
      cpf: cpf,
      password: password,
    });
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/collaborator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          cpf: cpf,
          password: password,
        }),
      });
  
      const data = await response.json();
  
      console.log("Resposta do backend:", data); // Log para ver a resposta da API
  
      if (!response.ok) {
        throw new Error(data.detail || "Erro ao fazer login");
      }
  
      // Salva o token no localStorage ou state global
      localStorage.setItem("token", data.access_token);
      navigate("/portal-colaborador"); // Redireciona após login bem-sucedido
  
    } catch (err: any) {
      console.error("Erro na requisição:", err.message);
      setError(err.message);
    }
  };
  

  return (
    <div className="container">
      <div className="leftPanel">
        <div className="content">
          <Link to="/login" className="backButton">←</Link>
          <h2>Portal do Colaborador</h2>
          <p className="subtitle">Entre na sua conta</p>

          {error && <p style={{ color: "red" }}>{error}</p>} {/* Exibe erros */}

          <div className="form">
            <label>Login (E-mail)</label>
            <input type="text" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>CPF</label>
            <input type="text" placeholder="Digite seu CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />

            <label>Senha</label>
            <div className="passwordContainer">
              <input type={showPassword ? "text" : "password"} placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
              <span className="eyeIcon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <button className="loginButton" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>

      <div className="rightPanel">
        <img src="/src/assets/login.png" alt="Ilustração Login" />
      </div>
    </div>
  );
}
