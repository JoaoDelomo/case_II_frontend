import "./ParaEmpresas.css";

export default function ParaEmpresas() {
  return (
    <div className="contact-container">
      <h2 className="title">Entre em contato para um orçamento personalizado</h2>
      <p className="description">
        Oferecemos planos empresariais sob medida para atender às necessidades da sua empresa.
        Entre em contato conosco e solicite um orçamento exclusivo.
      </p>

      {/* Espaço para imagem */}
      <div className="image-placeholder">
        <img src="/src/assets/imagem5_site.png" alt="Entre em contato para um orçamento" />
      </div>

      {/* Informações de contato */}
      <div className="contact-info">
        <p><strong>Email:</strong> contato@empresa.com</p>
        <p><strong>Telefone:</strong> (11) 98765-4321</p>
      </div>

      {/* Botão para abrir o email */}
      <a href="mailto:contato@empresa.com" className="contact-btn">Solicitar Orçamento</a>
    </div>
  );
}
