import { useState } from "react";
import { useNavigate } from "react-router";

export function Login() {
  const navigate = useNavigate();
  
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");

  function entrar(e: any) {
    e.preventDefault();

    if (!usuario.trim() || !senha.trim()) {
      setErro("Por favor, preencha todos os campos para continuar.");
      return;
    }

    setErro("");
    localStorage.setItem("logado", "true");
    navigate("/respiracao");
  }

  return (
    <div className="min-h-screen w-screen flex bg-[#F4F9FC] font-sans antialiased selection:bg-[#A7C7E7]/30">
      
      {/* COLUNA ESQUERDA: Formulário de Login */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 md:px-16 lg:px-24 max-w-xl bg-white shadow-[20px_0_60px_rgba(167,199,231,0.08)] z-10">
        <div className="w-full max-w-sm mx-auto">
          
          {/* LOGO GIMANIVI */}
          <div className="flex flex-col mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#A7C7E7] to-[#CBE0F7] flex items-center justify-center shadow-md shadow-blue-100">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-sky-950 to-slate-700 bg-clip-text text-transparent tracking-widest uppercase">
                GIMANIVI
              </span>
            </div>
           
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
              Seu espaço seguro
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Conecte-se inserindo qualquer dado para acessar as suas ferramentas de bem-estar.
            </p>
          </div>

          {erro && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold rounded-2xl flex items-center gap-3">
              <svg className="w-4 h-4 flex-shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{erro}</span>
            </div>
          )}

          <form onSubmit={entrar} className="space-y-6">
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2.5 ml-1">
                Usuário ou E-mail
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="Nome de usuário"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200/60 rounded-2xl text-slate-800 text-sm focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#A7C7E7]/15 focus:border-[#A7C7E7] transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2.5 ml-1">
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                  Senha de Acesso
                </label>
                <a href="#" className="text-[11px] text-sky-600 font-bold hover:underline">Esqueceu?</a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={mostrarSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Sua senha"
                  className="w-full pl-12 pr-14 py-4 bg-slate-50 border border-slate-200/60 rounded-2xl text-slate-800 text-sm focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#A7C7E7]/15 focus:border-[#A7C7E7] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-sky-600 cursor-pointer text-xs font-bold"
                >
                  {mostrarSenha ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            <div className="relative pt-2">
              <div className="absolute inset-x-4 bottom-[-4px] top-4 bg-[#A7C7E7] rounded-2xl blur-lg opacity-50 transform translate-y-1"></div>
              <button
                type="submit"
                className="w-full relative bg-gradient-to-r from-[#A7C7E7] to-[#8ebae4] hover:from-[#9bc1e8] hover:to-[#7daadd] active:scale-[0.98] text-white font-bold py-4 rounded-2xl transition-all duration-300 cursor-pointer text-sm tracking-widest uppercase shadow-md"
              >
                Acessar Portal
              </button>
            </div>
          </form>

          <div className="mt-12 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400 font-medium">
              TCC Centro Universitário — Projeto GIMANIVI
            </p>
          </div>

        </div>
      </div>

      {/* COLUNA DIREITA: Área Visual Relaxante Aurora */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-tr from-[#E3F2FD] via-[#F0F6FA] to-[#FFF0F5] items-center justify-center overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#A7C7E7]/40 to-[#EBF3FC]/30 blur-[120px] -top-20 -right-20 animate-pulse" style={{ animationDuration: '9s' }}></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#FFE4EC]/40 to-[#B5FFFC]/20 blur-[130px] -bottom-20 -left-10 animate-pulse" style={{ animationDuration: '13s' }}></div>

        <div className="max-w-md p-10 z-10 bg-white/35 backdrop-blur-2xl rounded-[36px] border border-white/60 shadow-[0_30px_60px_-15px_rgba(146,187,230,0.2)] text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center shadow-lg text-[#A7C7E7]">
            <svg className="w-8 h-8 animate-spin" style={{ animationDuration: '30s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">Respire fundo, viva melhor</h3>
          <p className="text-slate-600 leading-relaxed text-sm mb-4">
            Um ambiente terapêutico desenvolvido para auxiliar no controle da ansiedade e no monitoramento da saúde mental.
          </p>
          <div className="w-16 h-[2px] bg-[#A7C7E7] mx-auto rounded-full"></div>
        </div>
      </div>

    </div>
  );
}
