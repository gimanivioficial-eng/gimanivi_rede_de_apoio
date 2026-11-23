
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Menu, X, UserRound, ChevronDown } from "lucide-react";
import { supabase } from "../../supabase";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const logado =
    location.pathname !== "/" &&
    location.pathname !== "/sobre" &&
    location.pathname !== "/origem" &&
    location.pathname !== "/equipe" &&
    location.pathname !== "/projeto";

  const menuInicial = [
    { name: "Início", path: "/" },
    { name: "Sobre", path: "/sobre" },
    { name: "Origem", path: "/origem" },
    { name: "Equipe", path: "/equipe" },
    { name: "Projeto", path: "/projeto" },
  ];

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

  const navItems = logado ? menuRecursos : menuInicial;

  async function desativarConta() {
    const confirmar = window.confirm(
      "Tem certeza de que deseja desativar sua conta? Você será desconectado."
    );

    if (!confirmar) return;

    try {
      const {
        data: { user },
        error: erroUsuario,
      } = await supabase.auth.getUser();

      if (erroUsuario || !user) {
        throw new Error("Não foi possível identificar sua conta.");
      }

      const { error } = await supabase
        .from("usuarios")
        .update({ ativo: false })
        .eq("auth_id", user.id);

      if (error) throw error;

      const { error: erroSaida } = await supabase.auth.signOut();

      if (erroSaida) throw erroSaida;

      alert("Sua conta foi desativada com sucesso!");

      setAccountOpen(false);
      setIsOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao desativar conta:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Não foi possível desativar sua conta."
      );
    }
  }

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

            {logado && (
              <div className="relative ml-3">
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#A7C7E7] text-[#668DB5] hover:bg-[#A7C7E7]/15 transition-all"
                >
                  <UserRound size={18} />
                  <span>Minha conta</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      accountOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {accountOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-blue-100 p-2">
                    <button
                      onClick={desativarConta}
                      className="flex items-center w-full gap-2 px-3 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-all text-sm"
                    >
                      Desativar minha conta
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-[#668DB5]"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-blue-100">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg hover:bg-[#A7C7E7]/20 text-gray-700"
              >
                {item.name}
              </Link>
            ))}

            {logado && (
              <div className="pt-2 border-t border-blue-100">
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-[#668DB5] hover:bg-[#A7C7E7]/15"
                >
                  <span className="flex items-center gap-2">
                    <UserRound size={18} />
                    Minha conta
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      accountOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {accountOpen && (
                  <button
                    onClick={desativarConta}
                    className="w-full text-left px-7 py-3 text-sm text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    Desativar minha conta
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
