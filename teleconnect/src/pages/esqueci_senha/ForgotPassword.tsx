import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 🔹 Controla o estágio (1 = email, 2 = código, 3 = redefinir senha)
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // 🔹 Simula envio de email e avança para o código
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email enviado:", email);
    alert("Código de recuperação enviado para seu email!");
    setStep(2); // Avança para a tela de código
  };

  // 🔹 Simula validação do código e avança para redefinir senha
  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === "123456") { // Simulação de código válido
      setStep(3); // Avança para a tela de redefinição de senha
    } else {
      alert("Código inválido. Tente novamente.");
    }
  };

  // 🔹 Simula redefinição de senha e redireciona para login
  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    console.log("Senha redefinida com sucesso!");
    alert("Senha redefinida com sucesso!");
    navigate("/login"); // Redireciona para login
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        {step === 1 && (
          <>
            <h2>Recuperação de Senha</h2>
            <form onSubmit={handleEmailSubmit}>
              <label>Email</label>
              <input 
                type="email" 
                placeholder="Digite seu email" 
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
