import { useNavigate } from "react-router-dom";
import "./PedidoConfirmado.css";
import { FaHome } from "react-icons/fa"; // Ícone de casa

export default function PedidoConfirmado() {
  const navigate = useNavigate();

  return (
    <div className="confirmacao-container">

      <div className="content">
        <h2 className="title_pedido">Pedido confirmado!</h2>
        <p className="description">
          Um e-mail de confirmação foi enviado para você com maiores detalhes.
        </p>
        <button className="home-btn" onClick={() => navigate("/")}>
          Ir para o início <FaHome />
        </button>
      </div>

    </div>
  );
}
