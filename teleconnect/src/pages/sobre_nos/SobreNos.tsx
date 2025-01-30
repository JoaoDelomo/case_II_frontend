import { Link } from "react-router-dom";
import "./SobreNos.css";

export default function SobreNos() {
  return (
    <div className="sobre-nos">
      {/* Primeira seção */}
      <div className="section section-right section-1">
        <div className="text-content">
          <h2>O início da Teleconnect</h2>
          <p>Renato sonhava iniciar a Teleconnect com um pequeno investimento e poucos parceiros. Diminuiu o portfólio de vida para dar vida ao sonho de abrir uma empresa de telecomunicações.</p>
        </div>
        <img src="/src/assets/renatao.png" alt="Início da Teleconnect" />
      </div>

      {/* Segunda seção */}
      <div className="section section-left section-2">
        <img src="/src/assets/imagem3_site.png" alt="Mudanças na empresa" />
        <div className="text-content">
          <h2>Algumas mudanças...</h2>
          <p>Renato decidiu que a sua empresa deveria continuar se aperfeiçoando, e com a chegada de novas tecnologias decidiu se tornar uma MVNO.</p>
        </div>
      </div>

      {/* Terceira seção */}
      <div className="section section-right section-3">
        <div className="text-content">
          <h2>O que é uma MVNO?</h2>
          <p>Uma MVNO é uma operadora de telefonia móvel que não possui infraestrutura própria, como antenas ou torres. Em vez disso, ela utiliza a rede de outra operadora para oferecer serviços de telefonia, internet e mensagens, focando em nichos personalizados e atendimento diferenciado.</p>
        </div>
        <img src="/src/assets/mvno.png" alt="O que é uma MVNO" />
      </div>

      {/* Quarta seção */}
      <div className="section section-left section-4">
        <img src="/src/assets/imagem4_site.png" alt="Por que Teleconnect?" />
        <div className="text-content">
          <h2>Por que Teleconnect?</h2>
          <p>Uma Operadora Móvel Virtual (MVNO) é a maneira de modernizar telecomunicações através de planos personalizados, preços mais acessíveis, um melhor atendimento e exclusividade.</p>
        </div>
      </div>

      {/* Última seção (Chamada para ação) */}
      <div className="section section-final section-5">
        <h2>Está pronto para uma conexão do futuro?</h2>
        <div className="buttons">
          {/* Botão para planos individuais */}
          <Link to="/para-voce" className="plan-button">
            Veja os planos ideais para você!
          </Link>

          {/* Botão para planos empresariais */}
          <Link to="/para-empresas" className="plan-button business">
            Confira os planos para sua empresa!
          </Link>
        </div>
      </div>
    </div>
  );
}
