import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import LoginCliente from "./pages/login/cliente/LoginCliente";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/cliente" element={<LoginCliente />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
