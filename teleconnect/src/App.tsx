import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import LoginEscolha from "./pages/login/master/LoginEscolha";
import LoginCliente from "./pages/login/cliente/LoginCliente";
import LoginColaborador from "./pages/login/colaborador/LoginColaborador";
import SobreNos from "./pages/sobre_nos/SobreNos"; // Importando a nova página

export default function App() {
  return (
    <BrowserRouter>
      <div id="root">
        <Header />
        <div className="page-container">
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginEscolha />} />
              <Route path="/login/cliente" element={<LoginCliente />} />
              <Route path="/login/colaborador" element={<LoginColaborador />} />
              <Route path="/sobre-nos" element={<SobreNos />} /> {/* Nova rota */}
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
