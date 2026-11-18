import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";

export function Navigation() {

  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
const logado = location.pathname !== "/" 
&& location.pathname !== "/sobre"
&& location.pathname !== "/origem"
&& location.pathname !== "/equipe"
&& location.pathname !== "/projeto";

  // MENU ANTES DO LOGIN
  const menuInicial = [
    { name: "Início", path: "/" },
    { name: "Sobre", path: "/sobre" },
    { name: "Origem", path: "/origem" },
    { name: "Equipe", path: "/equipe" },
    { name: "Projeto", path: "/projeto" },
  ];

  // MENU DEPOIS DO LOGIN
  const menuRecursos = [
    { name: "Respiração", path: "/respiracao" },
    { name: "Grounding", path: "/grounding" },
    { name: "Mensagens", path: "/mensagens" },
    { name: "Sons Calmantes", path: "/sons-calmantes" },
    { name: "Mini Exercícios", path: "/mini-exercicios" },
    { name: "Sentimentos", path: "/sentimentos" },
    { name: "Pergunta do Dia", path: "/pergunta-do-dia" },
    { name: "Acessibilidade", path: "/acessibilidade" },
    { name: "Apoio", path: "/apoio" },
    { name: "Agradecimentos", path: "/contato" },
  ];

  // SE ESTIVER LOGADO -> mostra recursos
  // SENÃO -> mostra menu inicial
  const navItems = logado ? menuRecursos : menuInicial;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-md">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between h-20">

          {/* Desktop */}
          <div className="hidden lg:flex items-center space-x-1 w-full justify-center">

            {navItems.map((item) => (

              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-[#A7C7E7] text-white"
                    : "text-gray-700 hover:bg-[#A7C7E7]/20"
                }`}
              >
                {item.name}
              </Link>

            ))}

          </div>

          {/* Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      {isOpen && (

        <div className="lg:hidden bg-white border-t">

          <div className="px-4 py-4 space-y-2">

            {navItems.map((item) => (

              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg hover:bg-[#A7C7E7]/20"
              >
                {item.name}
              </Link>

            ))}

          </div>

        </div>

      )}

    </nav>
  );
}