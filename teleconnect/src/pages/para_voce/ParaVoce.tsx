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
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; speed: string; price: string } | null>(null);

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

  const plans = [
    { name: "Plano 1", speed: "100 mega", price: "R$ 99,90" },
    { name: "Plano 2", speed: "200 mega", price: "R$ 139,90" },
    { name: "Plano 3", speed: "250 mega", price: "R$ 179,90" },
    { name: "Plano 4", speed: "300 mega", price: "R$ 199,90" },
    { name: "Plano 5", speed: "400 mega", price: "R$ 249,90" },
    { name: "Plano 6", speed: "500 mega", price: "R$ 299,90" },
    { name: "Plano 7", speed: "600 mega", price: "R$ 349,90" },
  ];

  return (
    <div className="plans-container">
      <h2 className="title">Escolha seu plano</h2>

      <div className="plans-slider-container">
        <div className="plans-slider" ref={sliderRef}>
          {plans.map((plan, index) => (
            <div key={index} className="plan-card">
              <h3>{plan.name}</h3>
              <p className="speed">{plan.speed}</p>
              <ul>
                <li>Plano celular 10GB</li>
                <li>Ligações ilimitadas</li>
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
