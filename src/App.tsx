import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Bg from "./Components/Bg";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginForm from "./Components/Pages/Login/LoginForm";
import VendaBody from "./Components/Pages/Venda/VendaBody";
import ProdutoBody from "./Components/Pages/Produto/ProdutoBody";
import ClienteBody from "./Components/Pages/Cliente/ClienteBody";

function App() {
  return (
    <Router>
      <Bg>
        <Header />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="vendas" element={<VendaBody />} />
          <Route path="produtos" element={<ProdutoBody />} />
          <Route path="clientes" element={<ClienteBody />} />
        </Routes>
        <Footer />
      </Bg>
    </Router>
  );
}

export default App;
