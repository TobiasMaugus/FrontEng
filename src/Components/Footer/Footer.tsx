import { colors } from "../../colors/colors.ts";
import "./Footer.css";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  // 2. Definir o caminho onde o Header DEVE ser escondido
  // No seu caso, a página de login está em '/'
  const isLoginPage = location.pathname === "/";

  // 3. Renderização Condicional
  if (isLoginPage) {
    return null; // Não renderiza nada se for a página de login
  }
  return (
    <>
      {/* Footer */}
      <footer
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
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
        }}
      ></footer>
    </>
  );
}
