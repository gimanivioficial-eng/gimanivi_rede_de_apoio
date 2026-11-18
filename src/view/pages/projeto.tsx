
import { useNavigate } from "react-router";

export function Projeto() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F9FC] font-sans text-slate-800">

      {/* CABEÇALHO */}
      <header className="bg-white shadow-sm px-6 md:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#A7C7E7] to-[#CBE0F7] flex items-center justify-center shadow-md">
            <span className="text-white text-3xl">♡</span>
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-widest text-sky-950">
              GIMANIVI
            </h1>
            <p className="text-xs text-slate-400 tracking-wider">
              SUA REDE DE APOIO
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="bg-[#A7C7E7] hover:bg-[#8ebae4] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all"
        >
          Entrar
        </button>
      </header>

      {/* APRESENTAÇÃO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-6 py-16">

        <section className="text-center max-w-4xl mx-auto mb-20">

          <div className="w-32 h-32 mx-auto mb-8 rounded-[35px] bg-gradient-to-tr from-[#A7C7E7] to-[#FFE4EC] flex items-center justify-center shadow-xl">
            <span className="text-7xl text-white">♡</span>
          </div>

          <p className="text-sky-600 font-extrabold tracking-[0.3em] text-xs mb-5">
            CONHEÇA NOSSO PROJETO
          </p>

          <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6">
            GIMANIVI
            <span className="block text-[#8ebae4] mt-2">
              Sua Rede de Apoio
            </span>
          </h2>

          <p className="text-slate-500 text-base md:text-lg leading-relaxed">
            Um espaço digital criado para acolher, apoiar e incentivar
            o cuidado com o bem-estar emocional. Nosso objetivo é
            proporcionar ferramentas e informações que ajudem as
            pessoas a compreenderem seus sentimentos e cuidarem de si.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-10 px-10 py-5 rounded-2xl bg-gradient-to-r from-[#A7C7E7] to-[#8ebae4] text-white font-extrabold tracking-widest shadow-lg hover:scale-105 transition-all"
          >
            ACESSAR PLATAFORMA →
          </button>

        </section>

        {/* NOSSO OBJETIVO */}
        <section className="bg-white rounded-[35px] p-8 md:p-12 shadow-sm mb-12">
          <div className="max-w-4xl mx-auto text-center">

            <div className="text-5xl mb-5">💙</div>

            <h3 className="text-3xl font-black text-slate-800 mb-6">
              Nosso objetivo
            </h3>

            <p className="text-slate-500 leading-relaxed text-lg">
              O GIMANIVI foi desenvolvido com o propósito de oferecer
              um ambiente digital de acolhimento e apoio emocional.
              Buscamos incentivar o autoconhecimento, o reconhecimento
              dos sentimentos e a prática do autocuidado, disponibilizando
              recursos acessíveis e atividades que promovam momentos
              de tranquilidade e reflexão.
            </p>

          </div>
        </section>

        {/* FUNCIONALIDADES */}
        <section className="py-10">

          <div className="text-center mb-12">
            <p className="text-sky-600 font-bold tracking-widest text-xs mb-3">
              CONHEÇA NOSSOS RECURSOS
            </p>

            <h3 className="text-3xl md:text-4xl font-black text-slate-800">
              O que oferecemos?
            </h3>

            <p className="text-slate-400 mt-3">
              Conheça algumas das funcionalidades da nossa plataforma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <span className="text-4xl">💗</span>
              <h4 className="text-xl font-bold mt-5 mb-3">Apoio emocional</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Um espaço de acolhimento e apoio para momentos em que
                precisamos de compreensão.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <span className="text-4xl">🌬️</span>
              <h4 className="text-xl font-bold mt-5 mb-3">Respiração</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Exercícios respiratórios para incentivar pausas
                e momentos de tranquilidade.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <span className="text-4xl">💭</span>
              <h4 className="text-xl font-bold mt-5 mb-3">Sentimentos</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Um espaço para reconhecer e expressar emoções.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <span className="text-4xl">💌</span>
              <h4 className="text-xl font-bold mt-5 mb-3">Mensagens</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Mensagens positivas para incentivar o acolhimento
                e a reflexão.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <span className="text-4xl">♿</span>
              <h4 className="text-xl font-bold mt-5 mb-3">Acessibilidade</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Recursos pensados para tornar a navegação mais acessível.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <span className="text-4xl">🌷</span>
              <h4 className="text-xl font-bold mt-5 mb-3">Autocuidado</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Incentivo ao autoconhecimento e ao cuidado pessoal.
              </p>
            </div>

          </div>
        </section>

        {/* CHAMADA FINAL */}
        <section className="mt-16 mb-10 rounded-[35px] bg-gradient-to-r from-[#E3F2FD] to-[#FFF0F5] p-10 md:p-16 text-center">

          <h3 className="text-3xl font-black text-slate-800 mb-5">
            Faça parte dessa rede de apoio!
          </h3>

          <p className="text-slate-500 mb-8 max-w-2xl mx-auto">
            Conheça nossa plataforma e explore os recursos
            que preparamos para você.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="px-10 py-4 rounded-2xl bg-[#8ebae4] hover:bg-[#79a9d7] text-white font-extrabold tracking-wider shadow-lg transition-all"
          >
            ACESSAR PLATAFORMA
          </button>

        </section>

      </main>

      {/* RODAPÉ */}
      <footer className="bg-white border-t border-slate-100 text-center py-8">
        <h4 className="font-black tracking-widest text-sky-950">
          GIMANIVI
        </h4>

        <p className="text-xs text-slate-400 mt-2">
          Sua Rede de Apoio | TCC Centro Universitário
        </p>

        <p className="text-xs text-slate-300 mt-2">
          Acolher, apoiar e transformar.
        </p>
      </footer>

    </div>
  );
}
