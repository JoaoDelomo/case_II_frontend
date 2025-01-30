import "./ParaEmpresas.css";
import { useRef, useState, useEffect } from "react";

export default function ParaEmpresas() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Função para verificar se os botões devem estar ativos ou desativados
  const checkScrollPosition = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // Função para rolar o slider
  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 320;
      sliderRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Adiciona um listener para detectar quando o usuário rolar manualmente
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
    { name: "Plano 1", speed: "1 giga", price: "R$ 179,90" },
    { name: "Plano 2", speed: "2 giga", price: "R$ 369,90" },
    { name: "Plano 3", speed: "3 giga", price: "R$ 599,90" },
    { name: "Plano 4", speed: "5 giga", price: "R$ 799,90" },
    { name: "Plano 5", speed: "7 giga", price: "R$ 999,90" },
  ];

  return (
    <div className="plans-container">
      <h2 className="title">Escolha seu plano empresarial</h2>

      <div className="plans-slider-container">
        <div className="plans-slider" ref={sliderRef}>
          {plans.map((plan, index) => (
            <div key={index} className="plan-card">
              <h3>{plan.name}</h3>
              <p className="speed">{plan.speed}</p>
              <p className="subtext">Adicionais do plano:</p>
              <ul>
                <li>+ Ligações ilimitadas</li>
                <li>+ Modem Wi-Fi grátis</li>
              </ul>
              <p className="price">por {plan.price} /mês</p>
              <button className="subscribe-btn">Assine já</button>
            </div>
          ))}
        </div>
      </div>

      {/* Botões de navegação abaixo dos planos */}
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
    </div>
  );
}
