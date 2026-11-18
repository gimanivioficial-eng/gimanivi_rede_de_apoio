import { Outlet } from "react-router";
import { Navigation } from "./Navigation";
import { AccessibilityProvider } from "./AccessibilityContext";

export function Layout() {
  return (
    <AccessibilityProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f0f8ff] via-white to-[#e6f3ff]">
        <Navigation />
        
        <main className="flex-grow">
          <Outlet />
        </main>

        {/* 🌟 RODAPÉ PROFISSIONAL BRANCO COM ALTO CONTRASTE */}
        <footer className="w-full bg-white border-t border-[#A7C7E7]/30 pt-12 pb-8 mt-12 z-10 shadow-[0_-12px_40px_rgba(167,199,231,0.04)]">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 pb-8 border-b border-slate-100">
            
            {/* LADO ESQUERDO: Sobre a Plataforma (Texto escuro e legível) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#A7C7E7]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span className="text-lg font-black text-slate-800 tracking-widest uppercase">
                  GIMANIVI
                </span>
              </div>
              <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-md">
                Uma plataforma desenvolvida com carinho para ser a sua rede de apoio emocional, oferecendo ferramentas de relaxamento e monitoramento do bem-estar.
              </p>
            </div>

            {/* LADO DIREITO: Menu de Navegação Alinhado à Direita no Computador */}
            <div className="space-y-3 md:justify-self-end">
              <h4 className="text-xs font-black text-[#A7C7E7] uppercase tracking-widest md:text-right">
                Navegação
              </h4>
              <ul className="flex flex-col sm:flex-row gap-x-8 gap-y-2.5 text-sm text-slate-700 font-bold md:justify-end">
                <li>
                  <a href="#/" className="hover:text-[#A7C7E7] transition-colors">
                    Início
                  </a>
                </li>
                <li>
                  <a href="#/sobre" className="hover:text-[#A7C7E7] transition-colors">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#/origem" className="hover:text-[#A7C7E7] transition-colors">
                    Origem
                  </a>
                </li>
                <li>
                  <a href="#/equipe" className="hover:text-[#A7C7E7] transition-colors">
                    Equipe
                  </a>
                </li>
                <li>
                  <a href="#/projeto" className="hover:text-[#A7C7E7] transition-colors">
                    Projeto
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* SEÇÃO INFERIOR: Direitos Reservados Simples e Alinhados nas Extremidades */}
          <div className="max-w-6xl mx-auto px-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-xs text-slate-500 font-semibold tracking-wide">
              &copy; 2026 GIMANIVI. Todos os direitos reservados.
            </p>
            <p className="text-[11px] text-slate-400 font-medium">
              Plataforma acadêmica protegida nos termos da lei de direitos autorais.
            </p>
          </div>
        </footer>

      </div>
    </AccessibilityProvider>
  );
}
