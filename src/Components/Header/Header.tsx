import { colors } from "../../colors/colors.ts";
import "./Header.css";
import { NavLink, Link, useLocation } from "react-router-dom";

export default function Header() {
  const navItems = [
    { path: "/vendas", label: "Venda" },
    { path: "/clientes", label: "Clientes" },
    { path: "/produtos", label: "Produtos" },
  ];
  const location = useLocation();

  // 2. Definir o caminho onde o Header DEVE ser escondido
  // No seu caso, a página de login está em '/'
  const isLoginPage = location.pathname === "/";

  // 3. Renderização Condicional
  if (isLoginPage) {
    return null; // Não renderiza nada se for a página de login
  }

  return (
    <header
      className="flex items-center justify-between border-b font-sans font-normal"
      style={{
        width: "95%",
        height: "7.5%",
        backgroundColor: colors.primary,
        borderColor: colors.second,
        borderWidth: "1px",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 200,
        color: colors.second,
        borderTopLeftRadius: "4px",
        borderTopRightRadius: "4px",
      }}
    >
      <nav className="flex-1 flex items-center relative">
        {/* Logo desktop */}
        <div className="px-12 py-2 border-r border-custom font-light">
          João - Vendedor
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex flex-grow">
          {navItems.map((item) => (
            <li key={item.path} className="border-r border-custom equal-width">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `text-wrapper px-5 py-2 ${isActive ? "active-link" : ""}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <ul className="hidden md:flex">
          <li className="border-l border-custom equal-width-contact">
            <Link to="/" className="text-wrapper px-5 py-2">
              Sair
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
