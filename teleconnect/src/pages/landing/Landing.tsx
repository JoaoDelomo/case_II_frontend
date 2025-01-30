import { Link } from "react-router-dom";
import "./Landing.css";

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="logo">Teleconnect</div>
        <nav>
          <Link to="/">Início</Link>
          <Link to="/sobre-nos">Sobre nós</Link>
          <Link to="/plans">Para você</Link>
          <Link to="/business">Para empresas</Link>
          <Link to="/login" className="login-button">Login</Link>
          <Link to="/register" className="cta-button">Cadastre-se</Link>
        </nav>
      </header>

      {/* Primeira Seção */}
      <section className="hero">
        <div className="hero-text">
          <h1>Com a Teleconnect, você se conecta com sua família.</h1>
          <p>Planos de internet de alta velocidade para conectar você com quem mais importa.</p>
          <Link to="/plans" className="cta-button">Conheça os planos</Link>
        </div>
        <img src="/assets/family.png" alt="Família conectada" />
      </section>

      {/* Seção de Planos */}
      <section className="plans-section">
        <div className="plan-card">
          <h3>100 Mega</h3>
          <p>Plano ideal para o dia a dia.</p>
          <span>Por R$ 99,90/mês</span>
          <Link to="/plans" className="cta-button">Conheça planos</Link>
        </div>
        <div className="plan-card">
          <h3>1 Giga</h3>
          <p>Velocidade máxima para você.</p>
          <span>Por R$ 179,90/mês</span>
          <Link to="/plans" className="cta-button">Conheça planos</Link>
        </div>
      </section>

      {/* Seção de Impacto */}
      <section className="impact-section">
        <h2>Há mais de 15 anos conectando pessoas com o mundo.</h2>
        <p>Nosso objetivo é transformar a maneira como as pessoas interagem com a internet.</p>
        <Link to="/sobre-nos" className="cta-button">Saiba mais</Link>
      </section>

      {/* Diferenciais */}
      <section className="differentials">
        <div className="diff-box">
          <h2>Transforme sua conectividade pessoal com nossos planos.</h2>
          <p>Alta velocidade e estabilidade para você e sua família.</p>
          <Link to="/plans" className="cta-button">Saiba mais</Link>
        </div>
        <div className="diff-box">
          <h2>Acelere seu negócio com nossos planos empresariais.</h2>
          <p>Internet de alta performance para empresas de todos os portes.</p>
          <Link to="/business" className="cta-button">Saiba mais</Link>
        </div>
      </section>
    </div>
  );
}
