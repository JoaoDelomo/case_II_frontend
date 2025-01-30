import "./Footer.css";
import { FaWhatsapp, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      {/* 🔹 Contato à esquerda */}
      <div className="footer-contact">
        <h3>Contato</h3>
        <p>Telefone: (19) 99999-9999  🖁</p>
        <p>Email: contato@teleconnect.com 📧</p>
      </div>

      {/* 🔹 Redes sociais */}
      <div className="footer-social">
        <a href="https://wa.me/seu_numero" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp />
        </a>
        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com/in" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
}
