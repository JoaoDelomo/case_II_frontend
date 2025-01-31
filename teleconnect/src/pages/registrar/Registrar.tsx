import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import "./Registrar.css";

export default function Registrar() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    city: "",
    state: "",
    password: "",
  });
  const [error, setError] = useState(""); // Para exibir mensagens de erro

  // 🔹 Atualiza os campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Busca endereço pelo CEP (ViaCEP)
  const fetchAddress = async (cep: string) => {
    cep = cep.replace(/\D/g, "");
    if (cep.length !== 8) return;
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setFormData((prev) => ({
          ...prev,
          street: data.logradouro,
          city: data.localidade,
          state: data.uf,
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP", error);
    }
  };

  // 🔹 Enviar formulário para a API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    console.log("📡 Enviando dados para API:", formData);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log("🔹 Resposta do servidor:", data);

      if (!response.ok) {
        throw new Error(data.detail || "Erro ao registrar cliente");
      }

      alert("✅ Cadastro realizado com sucesso!");
      navigate("/login/cliente");

    } catch (err: any) {
      console.error("❌ Erro ao registrar:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="main-content">
        {/* Lado esquerdo - Formulário */}
        <div className="leftPanel">
          <div className="content">
            <Link to="/" className="backButton">←</Link>
            <h2>Registre-se</h2>

            {error && <p className="error" style={{ color: "red" }}>⚠️ {error}</p>}

            <form className="form" onSubmit={handleSubmit}>
              <label>Nome</label>
              <input type="text" name="name" placeholder="Nome Completo" onChange={handleChange} required />

              <label>Email</label>
              <input type="email" name="email" placeholder="Seu Email" onChange={handleChange} required />

              <label>Telefone</label>
              <input type="tel" name="phone" placeholder="11912345678" onChange={handleChange} required />

              <label>CPF</label>
              <input type="text" name="cpf" placeholder="12345678900" onChange={handleChange} required />

              <label>CEP</label>
              <input 
                type="text" 
                name="cep" 
                placeholder="03334000" 
                onChange={(e) => {
                  handleChange(e);
                  fetchAddress(e.target.value);
                }} 
                required 
              />

              <label>Rua</label>
              <input type="text" name="street" value={formData.street} readOnly required />

              <label>Número</label>
              <input type="text" name="number" placeholder="Número" onChange={handleChange} required />

              <label>Complemento</label>
              <input type="text" name="complement" placeholder="Apto/Casa/Bloco" onChange={handleChange} />

              <label>Cidade</label>
              <input type="text" name="city" value={formData.city} readOnly required />

              <label>Estado</label>
              <input type="text" name="state" value={formData.state} readOnly required />

              <label>Senha</label>
              <div className="passwordContainer">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  placeholder="Digite sua senha" 
                  onChange={handleChange} 
                  required 
                />
                <span className="eyeIcon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </span>
              </div>

              <button className="registerButton" type="submit">Registrar</button>

              <div className="loginLink">
                Já tem uma conta? <Link to="/login/cliente">Faça login</Link>
              </div>
            </form>
          </div>
        </div>

        {/* Lado direito - Ilustração */}
        <div className="rightPanel">
          <img src="/src/assets/login.png" alt="Ilustração Registro" />
        </div>
      </div>
    </div>
  );
}
