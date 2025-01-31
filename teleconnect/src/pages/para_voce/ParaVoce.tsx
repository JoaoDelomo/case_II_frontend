import "./ParaVoce.css";
import { useRef, useState, useEffect } from "react";
import SubscriptionModal from "../../components/popup/SubscriptionModal";
import PaymentModal from "../../components/popup/PaymentModal"; // Novo modal de pagamento

export default function ParaVoce() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; speed: string; price: string; details: string[] } | null>(null);
  const [plans, setPlans] = useState<{ name: string; speed: string; price: string; details: string[] }[]>([]);
  const API_URL = "http://127.0.0.1:8000/api/plans";

  // 🔹 Buscar planos do backend quando a página carrega
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("📡 Planos recebidos:", data);

        // 🔹 Mapeia os planos para um formato compatível com o frontend
        const formattedPlans = data.plans.map((plan: { nome: string; franquia_internet: string; ligacoes: string; whatsapp: string; sms: string; beneficios: string[]; preco: string }) => ({
          name: plan.nome, // Nome do plano
          speed: plan.franquia_internet || "Sem informação", // Pega a franquia de internet
          price: `R$ ${parseFloat(plan.preco).toFixed(2)}`, // Formata preço corretamente
          details: [
            `📞 Ligações: ${plan.ligacoes}`,
            `💬 SMS: ${plan.sms}`,
            `📱 WhatsApp: ${plan.whatsapp}`,
            ...plan.beneficios, // Adiciona os benefícios ao array
          ],
        }));

        setPlans(formattedPlans); // Atualiza o estado com os planos formatados
      } catch (error) {
        console.error("❌ Erro ao buscar planos:", error);
      }
    };
    fetchPlans();
  }, []);

  // Função para verificar se pode rolar para esquerda ou direita
  const checkScrollPosition = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // Função para rolar os planos
  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.8;
      sliderRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Atualiza a posição das setas
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
    }
    return () => {
      if (slider) {
        slider.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);

  return (
    <div className="plans-container">
      <h2 className="title">Escolha seu plano</h2>

      <div className="plans-slider-container">
        <div className="plans-slider" ref={sliderRef}>
          {plans.map((plan, index) => (
            <div key={index} className="plan-card">
              <h3>{plan.name}</h3>
              <p className="speed">{plan.speed}</p> {/* Exibe a franquia de internet */}
              <ul>
                {plan.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
              <p className="price">{plan.price} /mês</p>
              <button 
                className="subscribe-btn" 
                onClick={() => {
                  setSelectedPlan(plan);
                  setIsSubscriptionModalOpen(true);
                }}
              >
                Assine já
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Botões de navegação */}
      <div className="scroll-buttons">
        <button 
          className={`scroll-btn ${!canScrollLeft ? "disabled" : ""}`} 
          onClick={() => scroll("left")} 
          disabled={!canScrollLeft}
        >
          &#10094;
        </button>
        <button 
          className={`scroll-btn ${!canScrollRight ? "disabled" : ""}`} 
          onClick={() => scroll("right")} 
          disabled={!canScrollRight}
        >
          &#10095;
        </button>
      </div>

      {/* Renderiza o modal de inscrição */}
      {isSubscriptionModalOpen && (
        <SubscriptionModal 
          plan={selectedPlan} 
          onClose={() => setIsSubscriptionModalOpen(false)}
          onContinue={() => {
            setIsSubscriptionModalOpen(false);
            setIsPaymentModalOpen(true);
          }}
        />
      )}

      {/* Renderiza o modal de pagamento */}
      {isPaymentModalOpen && (
        <PaymentModal 
          plan={selectedPlan} 
          onClose={() => setIsPaymentModalOpen(false)}
          onBack={() => {
            setIsPaymentModalOpen(false);
            setIsSubscriptionModalOpen(true);
          }}
        />
      )}
    </div>
  );
}
