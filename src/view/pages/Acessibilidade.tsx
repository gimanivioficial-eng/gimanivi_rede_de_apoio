import { Moon, Sun, Type, Volume2 } from "lucide-react";
import { useAccessibility } from "../components/AccessibilityContext";

export function Acessibilidade() {
  const {
    darkMode,
    toggleDarkMode,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    readText,
  } = useAccessibility();

  return (
    <div className="pt-20">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Cabeçalho Principal */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="text-[#A7C7E7]">Acessibilidade</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Personalize sua experiência no GIMANIVI
          </p>
        </header>

        {/* Seções de Opções */}
        <div className="space-y-6">
          {/* Modo Escuro */}
          <section className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-[#A7C7E7]/20 rounded-full flex items-center justify-center" aria-hidden="true">
                  {darkMode ? (
                    <Moon className="w-7 h-7 text-[#A7C7E7]" />
                  ) : (
                    <Sun className="w-7 h-7 text-[#A7C7E7]" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Modo Escuro
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {darkMode ? "Desativar modo escuro" : "Ativar modo escuro"}
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
          <section className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-14 h-14 bg-[#89CFF0]/20 rounded-full flex items-center justify-center" aria-hidden="true">
                <Type className="w-7 h-7 text-[#89CFF0]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Tamanho da Fonte
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Ajuste o tamanho do texto (atual: {fontSize}px)
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={decreaseFontSize}
                disabled={fontSize <= 12}
                className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-[#89CFF0]"
              >
                A- Diminuir
              </button>
              <button
                onClick={increaseFontSize}
                disabled={fontSize >= 24}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-[#89CFF0]"
              >
                A+ Aumentar
              </button>
            </div>
          </section>

          {/* Leitura de Texto */}
          <section className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-14 h-14 bg-[#89CFF0]/20 rounded-full flex items-center justify-center" aria-hidden="true">
                <Volume2 className="w-7 h-7 text-[#89CFF0]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Leitura de Texto
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Ouça o texto em voz alta
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                readText(
                  "Bem-vindo ao GIMANIVI, sua rede de apoio emocional e saúde mental. Estamos aqui para você."
                )
              }
              className="w-full px-6 py-3 bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] text-white rounded-lg hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#89CFF0]"
            >
              Testar Leitura de Texto
            </button>
          </section>
        </div>

        {/* Rodapé Informativo */}
        <footer className="mt-12 bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] p-8 rounded-3xl shadow-2xl text-center text-white">
          <p className="text-2xl font-bold mb-3">💙 Acessibilidade para Todos</p>
          <p className="text-lg opacity-90">
            Acreditamos que todos devem ter acesso a recursos de saúde mental
          </p>
        </footer>
      </main>
    </div>
  );
}

{/* Subcomponente isolado para o Toggle */}
interface ToggleButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

function ToggleButton({ isActive, onClick, label }: ToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={label}
      className={`relative w-16 h-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#A7C7E7] focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
        isActive ? "bg-[#A7C7E7]" : "bg-gray-300"
      }`}
    >
      <div
        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
          isActive ? "translate-x-8" : ""
        }`}
      />
    </button>
  );
}
