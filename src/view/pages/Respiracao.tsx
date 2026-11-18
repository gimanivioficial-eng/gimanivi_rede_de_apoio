import { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";

type Phase = "inspire" | "hold" | "expire" | "idle";

export function Respiracao() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const phaseTexts = {
    idle: "Clique em Iniciar",
    inspire: "Inspire profundamente",
    hold: "Segure a respiração",
    expire: "Expire lentamente",
  };

  // Gerencia o loop infinito das fases de respiração de forma limpa e segura
  useEffect(() => {
    if (!isActive) {
      setPhase("idle");
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const runPhase = (currentPhase: Phase) => {
      setPhase(currentPhase);

      // Define a lógica de transição da próxima fase do loop
      let nextPhase: Phase = "inspire";
      if (currentPhase === "inspire") nextPhase = "hold";
      if (currentPhase === "hold") nextPhase = "expire";
      if (currentPhase === "expire") nextPhase = "inspire"; // Aqui fecha o loop infinito

      timerRef.current = setTimeout(() => {
        runPhase(nextPhase);
      }, 4000); // 4 segundos por fase
    };

    // Inicia o ciclo imediatamente ao clicar no botão
    runPhase("inspire");

    // Limpa o timer se o componente for desmontado ou pausado
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive]);

  const handleStart = () => {
    setIsActive((prev) => !prev);
  };

  const getCircleScale = () => {
    switch (phase) {
      case "inspire":
      case "hold":
        return "scale-150";
      case "expire":
      case "idle":
      default:
        return "scale-100";
    }
  };

  return (
    <div className="pt-20 bg-gradient-to-b from-white to-[#A7C7E7]/5 dark:from-gray-900 dark:to-[#A7C7E7]/10 min-h-screen">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        
        {/* Cabeçalho */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Exercício de <span className="text-[#A7C7E7]">Respiração</span>
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Acalme sua mente e relaxe seu corpo
          </p>
        </header>

        {/* Bloco Central do Exercício */}
        <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl p-16 mb-16">
          {/* Círculo de Respiração */}
          <div className="flex items-center justify-center mb-12 h-80" aria-hidden="true">
            <div className="relative">
              <div
                className={`w-64 h-64 rounded-full bg-gradient-to-br from-[#A7C7E7] to-[#89CFF0] transition-all duration-[4000ms] ease-in-out ${getCircleScale()}`}
                style={{
                  boxShadow: "0 0 60px rgba(167, 199, 231, 0.6)",
                }}
              />
            </div>
          </div>

          {/* Texto de Orientação */}
          <div className="text-center mb-8" aria-live="polite">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {phaseTexts[phase]}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {phase !== "idle" && "Acompanhe o movimento do círculo"}
            </p>
          </div>

          {/* Botão de Controle */}
          <div className="flex justify-center">
            <button
              onClick={handleStart}
              aria-label={isActive ? "Pausar exercício de respiração" : "Iniciar exercício de respiração"}
              className="flex items-center space-x-4 px-10 py-5 text-lg bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] text-white rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#89CFF0]"
            >
              {isActive ? (
                <>
                  <Pause className="w-7 h-7" />
                  <span className="font-semibold">Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-7 h-7" />
                  <span className="font-semibold">Iniciar</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Instruções */}
        <section className="grid md:grid-cols-3 gap-8 mb-12" aria-label="Passo a passo do exercício">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg text-center">
            <span className="text-5xl block mb-4" role="img" aria-label="Vento">🌬️</span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Inspire</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Respire profundamente pelo nariz enquanto o círculo cresce
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg text-center">
            <span className="text-5xl block mb-4" role="img" aria-label="Pausa">⏸️</span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Segure</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Mantenha o ar nos pulmões enquanto o círculo permanece grande
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg text-center">
            <span className="text-5xl block mb-4" role="img" aria-label="Fumaça saindo">💨</span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Expire</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Solte o ar pela boca enquanto o círculo diminui
            </p>
          </div>
        </section>

        {/* Dicas e Mensagens */}
        <footer className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-[#A7C7E7] p-8 rounded-2xl">
            <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
              <strong>💡 Dica:</strong> Pratique este exercício por 5-10 minutos quando sentir
              ansiedade, estresse ou precisar relaxar.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#A7C7E7]/10 to-[#89CFF0]/10 p-10 rounded-3xl text-center">
            <p className="text-2xl text-gray-800 dark:text-gray-200 font-semibold mb-4 leading-relaxed">
              💙 Respire. Você está seguro(a). Você está aqui. Você está presente.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A respiração consciente é um presente que você dá a si mesmo(a)
            </p>
          </div>
        </footer>

      </main>
    </div>
  );
}
