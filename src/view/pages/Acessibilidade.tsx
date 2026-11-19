
import { Moon, Sun, Type, Volume2, Square } from "lucide-react";
import { useAccessibility } from "../components/AccessibilityContext";

export function Acessibilidade() {
  const {
    darkMode,
    toggleDarkMode,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    readPage,
    stopReading,
  } = useAccessibility();

  return (
    <div className="min-h-screen pt-20 bg-[#F4F9FC] dark:bg-gray-900 transition-colors">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Cabeçalho */}
        <header className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#A7C7E7]/20 flex items-center justify-center">
            <Sun className="w-8 h-8 text-[#83ACD3]" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Acessibilidade
          </h1>

          <p className="text-lg text-gray-500 dark:text-gray-300 max-w-xl mx-auto">
            Personalize sua experiência no GIMANIVI e utilize os recursos
            para navegar com mais conforto e autonomia.
          </p>
        </header>

        <div className="space-y-6">

          {/* Modo Escuro */}
          <section className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl border border-[#E5EEF6] dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 shrink-0 bg-[#A7C7E7]/20 rounded-2xl flex items-center justify-center">
                  {darkMode ? (
                    <Moon className="w-7 h-7 text-[#83ACD3]" />
                  ) : (
                    <Sun className="w-7 h-7 text-[#83ACD3]" />
                  )}
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                    Modo Escuro
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {darkMode
                      ? "O modo escuro está ativado."
                      : "Ative uma aparência mais confortável para os olhos."}
                  </p>
                </div>
              </div>

              <ToggleButton
                isActive={darkMode}
                onClick={toggleDarkMode}
                label="Alternar modo escuro"
              />
            </div>
          </section>

          {/* Tamanho da Fonte */}
          <section className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl border border-[#E5EEF6] dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 shrink-0 bg-[#A7C7E7]/20 rounded-2xl flex items-center justify-center">
                <Type className="w-7 h-7 text-[#83ACD3]" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                  Tamanho da Fonte
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Ajuste o tamanho dos textos para facilitar a leitura.
                </p>
              </div>
            </div>

            <div className="bg-[#F4F9FC] dark:bg-gray-700/60 rounded-2xl p-4 mb-5 text-center">
              <span className="text-sm text-gray-500 dark:text-gray-300">
                Tamanho atual
              </span>

              <p className="text-3xl font-bold text-[#83ACD3] mt-1">
                {fontSize}px
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={decreaseFontSize}
                disabled={fontSize <= 12}
                className="px-4 py-3 rounded-xl bg-[#EDF3F9] hover:bg-[#DCE8F3] text-[#6385A8] font-semibold disabled:opacity-40 transition-colors dark:bg-gray-700 dark:text-blue-200"
              >
                A− Diminuir
              </button>

              <button
                onClick={increaseFontSize}
                disabled={fontSize >= 24}
                className="px-4 py-3 rounded-xl bg-[#A7C7E7] hover:bg-[#91B9DF] text-white font-semibold disabled:opacity-40 transition-colors"
              >
                A+ Aumentar
              </button>
            </div>
          </section>

          {/* Leitura em Voz Alta */}
          <section className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl border border-[#E5EEF6] dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 shrink-0 bg-[#A7C7E7]/20 rounded-2xl flex items-center justify-center">
                <Volume2 className="w-7 h-7 text-[#83ACD3]" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                  Leitura em Voz Alta
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Ouça o conteúdo da página e interrompa quando desejar.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={readPage}
                className="flex items-center justify-center gap-2 px-5 py-3.5 bg-[#A7C7E7] hover:bg-[#91B9DF] text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <Volume2 size={19} />
                Ouvir página inteira
              </button>

              <button
                onClick={stopReading}
                className="flex items-center justify-center gap-2 px-5 py-3.5 bg-[#EDF3F9] hover:bg-[#DCE8F3] text-[#6385A8] font-semibold rounded-xl border border-[#D6E4F1] transition-all dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-200 dark:border-gray-600"
              >
                <Square size={17} />
                Parar leitura
              </button>
            </div>
          </section>
        </div>

        {/* Rodapé Informativo */}
        <footer className="mt-10 bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] p-8 rounded-3xl text-center shadow-sm">
          <p className="text-xl font-bold text-white mb-3">
            💙 Acessibilidade para Todos
          </p>

          <p className="text-white/90 leading-relaxed max-w-lg mx-auto">
            Acreditamos que todos devem ter acesso a recursos de saúde mental
            em um ambiente acolhedor, acessível e inclusivo.
          </p>
        </footer>

      </main>
    </div>
  );
}

interface ToggleButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

function ToggleButton({
  isActive,
  onClick,
  label,
}: ToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={label}
      className={`relative w-14 h-7 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#A7C7E7] focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
        isActive ? "bg-[#83ACD3]" : "bg-gray-300 dark:bg-gray-600"
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
          isActive ? "translate-x-7" : ""
        }`}
      />
    </button>
  );
}
