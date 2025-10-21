import { useState } from "react";
// Importe seu arquivo de CSS, se estiver usando um
import "./LoginForm.css";
import { Link } from "react-router-dom";
function LoginForm() {
  // Estados para armazenar o nome de usuário e a senha
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Estado para feedback

  // Função para lidar com o envio do formulário (clique no botão)
  const handleSubmit = (e: any) => {
    e.preventDefault(); // Impede o recarregamento da página

    // **AQUI você faria a lógica de autenticação REAL (ex: chamada de API)**

    // Simulação: Apenas mostra o que foi digitado
    console.log("Tentativa de Login:", { username, password });
    setMessage(`Tentativa de login com Usuário: ${username}`);

    // Limpar os campos após a tentativa (opcional)
    // setUsername('');
    // setPassword('');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="input-group">
          <label htmlFor="username">Nome de Usuário:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required // Torna o campo obrigatório
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // Torna o campo obrigatório
          />
        </div>

        <button type="submit" className="login-button">
          <Link to="vendas" className="text-wrapper px-5 py-2">
            Login
          </Link>
        </button>

        {/* Feedback visual após a tentativa */}
        {message && <p className="feedback-message">{message}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
