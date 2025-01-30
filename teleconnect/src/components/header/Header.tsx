import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Ícone Hamburguer - Só aparece no Mobile */}
        <button onClick={() => setIsOpen(!isOpen)} className={styles.menuButton}>
          {isOpen ? <X size={28} className={styles.menuIcon} /> : <List size={28} className={styles.menuIcon} />}
        </button>

        {/* Logo - Centralizada no Mobile */}
        <Link to="/" className={styles.logo}>
          Teleconnect
        </Link>

        {/* Menu Desktop - Some no mobile */}
        <nav className={styles.navDesktop}>
          <Link to="/" className={styles.navLink}>Início</Link>
          <Link to="/sobre-nos" className={styles.navLink}>Sobre nós</Link>
          <Link to="/para-voce" className={styles.navLink}>Para você</Link>
          <Link to="/business" className={styles.navLink}>Para empresas</Link>
          <Link to="/login" className={styles.navLink}>Login</Link>
        </nav>

        {/* Botão Cadastro - Some no Mobile */}
        <div className={styles.actions}>
          <Link to="/register" className={styles.registerButton}>
            Cadastre-se →
          </Link>
        </div>
      </div>

      {/* Menu Mobile (Só aparece se isOpen for true) */}
      {isOpen && (
        <nav className={styles.navMobile}>
          <Link to="/" className={styles.navLink} onClick={() => setIsOpen(false)}>Início</Link>
          <Link to="/sobre-nos" className={styles.navLink} onClick={() => setIsOpen(false)}>Sobre nós</Link>
          <Link to="/para-voce" className={styles.navLink} onClick={() => setIsOpen(false)}>Para você</Link>
          <Link to="/business" className={styles.navLink} onClick={() => setIsOpen(false)}>Para empresas</Link>
          <Link to="/login" className={styles.navLink} onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/register" className={styles.registerButton}>
            Cadastre-se →
          </Link>
        </nav>
      )}
    </header>
  );
}
