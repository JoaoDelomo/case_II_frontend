import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 🔹 Controla o estágio (1 = email, 2 = código, 3 = redefinir senha)
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = "http://127.0.0.1:8000/api"; // URL do backend

  // 🔹 Enviar o email/telefone para receber o código de verificação
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email }),
      });

      const data = await response.json();
      console.log("📧 Resposta do backend:", data);

      if (!response.ok) throw new Error(data.detail || "Erro ao enviar o código.");

      alert("Código de recuperação enviado para seu email!");
      setStep(2); // Avança para a tela de código
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  // 🔹 Validar código digitado pelo usuário
  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, code }),
      });

      const data = await response.json();
      console.log("🔢 Resposta do backend:", data);

      if (!response.ok) throw new Error(data.detail || "Código inválido.");

      setStep(3); // Avança para redefinir senha
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  // 🔹 Redefinir a senha
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, code, new_password: password }),
      });

      const data = await response.json();
      console.log("🔒 Resposta do backend:", data);

      if (!response.ok) throw new Error(data.detail || "Erro ao redefinir senha.");

      alert("Senha redefinida com sucesso!");
      navigate("/login"); // Redireciona para login
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        {error && <p style={{ color: "red" }}>❌ {error}</p>} {/* Exibir erros */}
        {loading && <p>⏳ Processando...</p>}

        {step === 1 && (
          <>
            <h2>Recuperação de Senha</h2>
            <form onSubmit={handleEmailSubmit}>
              <label>Email ou Telefone</label>
              <input 
                type="text"
                placeholder="Digite seu email ou telefone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Enviar Código</button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Digite o Código</h2>
            <form onSubmit={handleCodeSubmit}>
              <label>Código</label>
              <input 
                type="text"
                placeholder="Digite o código recebido"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <button type="submit">Validar Código</button>
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Redefinir Senha</h2>
            <form onSubmit={handlePasswordReset}>
              <label>Nova Senha</label>
              <input 
                type="password"
                placeholder="Digite sua nova senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label>Confirmar Senha</label>
              <input 
                type="password"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button type="submit">Redefinir Senha</button>
            </form>
          </>
        )}

        <Link to="/login" className="back-link">Voltar ao Login</Link>
      </div>
    </div>
  );
}
