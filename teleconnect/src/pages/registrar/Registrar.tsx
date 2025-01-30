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

  // 🔹 Enviar formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Dados enviados:", formData);
    alert("Cadastro realizado com sucesso!");
    navigate("/login");
  };

  return (
    <div className="register-container">
      {/* Conteúdo principal */}
      <div className="main-content">
        {/* Lado esquerdo - Formulário */}
        <div className="leftPanel">
          <div className="content">
            <Link to="/" className="backButton">←</Link>
            <h2>Registre-se</h2>

            <form className="form" onSubmit={handleSubmit}>
              <label>Nome</label>
              <input type="text" name="name" placeholder="Nome Completo" onChange={handleChange} required />

              <label>Email</label>
              <input type="email" name="email" placeholder="Seu Email" onChange={handleChange} required />

              <label>Telefone</label>
              <input type="tel" name="phone" placeholder="11912345678" onChange={handleChange} required />

              <label>CPF</label>
              <input type="text" name="cpf" placeholder="123.456.789-00" onChange={handleChange} required />

              <label>CEP</label>
              <input type="text" name="cep" placeholder="03334000" onChange={(e) => {
                handleChange(e);
                fetchAddress(e.target.value);
              }} required />

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
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Digite sua senha" onChange={handleChange} required />
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
