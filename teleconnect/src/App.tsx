import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LoginEscolha from "./pages/login/master/LoginEscolha";
import LoginCliente from "./pages/login/cliente/LoginCliente";
import LoginColaborador from "./pages/login/colaborador/LoginColaborador";
import SobreNos from "./pages/sobre_nos/SobreNos";
import Registrar from "./pages/registrar/Registrar";
import ForgotPassword from "./pages/esqueci_senha/ForgotPassword";
import LandingPage from "./pages/landing/Landing";
import ParaVoce from "./pages/para_voce/ParaVoce"
import ParaEmpresas from "./pages/para_empresas/ParaEmpresas";
import PedidoConfirmado from "./pages/pedido_confirmado/PedidoConfirmado";


export default function App() {
  return (
    <BrowserRouter>
      <div id="root">
        <Header />
        <div className="page-container">
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/login" element={<LoginEscolha />} />
            <Route path="/login/cliente" element={<LoginCliente />} />
            <Route path="/login/colaborador" element={<LoginColaborador />} />
            <Route path="/sobre-nos" element={<SobreNos />} />
            <Route path="/register" element={<Registrar />} /> {/* 🔹 Adicionada a rota de registro */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/para-voce" element={<ParaVoce />} />
            <Route path="/para-empresas" element={<ParaEmpresas />} />
            <Route path="/pedido-confirmado" element={<PedidoConfirmado />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
