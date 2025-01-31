import { Link } from "react-router-dom";
import "./Landing.css";

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* Primeira Seção */}
      <section className="hero full-width">
        <div className="hero-text">
          <h1>Com a Teleconnect, você se conecta com sua família.</h1>
          <p>Adquira o plano familiar mais vantajoso para as suas necessidades.</p>
        </div>
        <img src="/src/assets/imagem_casal.png" alt="Família conectada" className="section-image" />
        <div className="plan-card">
          <h3>100 Mega</h3>
          <p className="plan-info">+ Plano celular 10 GB</p>
          <p className="plan-info">+ Ligações ilimitadas</p>
          <span>Por R$ 99,90/mês</span>
          <Link to="/para-voce" className="cta-button">Conferir planos</Link>
        </div>
      </section>

      {/* Seção de Planos Empresariais */}
      <section className="business-section full-width">
        <div className="plan-card">
          <h3>1 Giga</h3>
          <p className="plan-info">+ Modem Wi-Fi grátis</p>
          <p className="plan-info">+ Ligações ilimitadas</p>
          <span>Por R$ 179,90/mês</span>
          <Link to="/para-empresas" className="cta-button">Conferir planos</Link>
        </div>
        <img src="/src/assets/imagem_homem_trabalho.png" alt="Trabalhando com Teleconnect" className="section-image" />
        <div className="hero-text">
          <h2>Com a Teleconnect, você ganha leveza e velocidade no trabalho.</h2>
          <p>Adquira o plano empresarial mais vantajoso para as necessidades da sua empresa.</p>
        </div>
      </section>

      {/* Seção de Impacto */}
      <section className="impact-section full-width">
        <h2>Há mais de 15 anos conectando pessoas com o mundo.</h2>
        <p>Conheça a história da Teleconnect e como transformamos conexões em resultados.</p>
        <Link to="/sobre-nos" className="cta-button">Saiba mais</Link>
        <img src="/src/assets/pessoas_celular.png" alt="Conectando Pessoas" className="section-image" />
      </section>

      {/* Seção de diferenciais */}
      <section className="differentials full-width">
        <div className="diff-box">
          <h2>Transforme sua conectividade pessoal com nossos planos.</h2>
          <p>Escolha o plano ideal para você e sua família aproveitar o melhor da internet.</p>
          <Link to="/para-voce" className="cta-button">Saiba mais</Link>
          <img src="/src/assets/conectividade_pessoal.png" alt="Conectividade Pessoal" className="section-image" />
        </div>
        <div className="diff-box">
          <h2>Acelere seu negócio com nossos planos empresariais.</h2>
          <p>Internet de alta performance para empresas de todos os portes.</p>
          <Link to="/" className="cta-button">Saiba mais</Link>
          <img src="/src/assets/conectividade_empresarial.png" alt="Conectividade Empresarial" className="section-image" />
        </div>
      </section>
    </div>
  );
}
