import { useState } from "react";
import { ChevronRight, ChevronLeft, Heart } from "lucide-react";

const groundingSteps = [
  {
    number: 5,
    text: "Observe 5 coisas que você vê",
    prompt: "Olhe ao seu redor e identifique 5 coisas que você consegue ver agora.",
    color: "from-[#A7C7E7] to-[#89CFF0]",
  },
  {
    number: 4,
    text: "Toque em 4 coisas",
    prompt: "Sinta a textura de 4 objetos ao seu redor. Pode ser sua roupa, uma mesa, um travesseiro...",
    color: "from-[#89CFF0] to-[#A7C7E7]",
  },
  {
    number: 3,
    text: "Escute 3 sons",
    prompt: "Feche os olhos e identifique 3 sons diferentes que você consegue ouvir agora.",
    color: "from-[#A7C7E7] to-[#89CFF0]",
  },
  {
    number: 2,
    text: "Perceba 2 coisas que você sente",
    prompt: "Preste atenção em 2 sensações físicas ou emocionais que você está sentindo neste momento.",
    color: "from-[#89CFF0] to-[#A7C7E7]",
  },
  {
    number: 1,
    text: "Lembre-se de 1 coisa que você ama",
    prompt: "Pense em algo ou alguém que você realmente ama e sinta esse amor no seu coração.",
    color: "from-[#A7C7E7] to-[#89CFF0]",
  },
];

export function Grounding() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < groundingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  const step = groundingSteps[currentStep];

  return (
    <div className="pt-20 bg-gradient-to-b from-white to-[#A7C7E7]/5 dark:from-gray-900 dark:to-[#A7C7E7]/10 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Exercício de <span className="text-[#A7C7E7]">Grounding</span>
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Técnica 5-4-3-2-1 para acalmar a mente e ancorar-se no presente
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-3 mb-16">
          {groundingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? "w-12 bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0]"
                  : index < currentStep
                  ? "w-8 bg-[#A7C7E7]"
                  : "w-8 bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Step Card */}
        <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl overflow-hidden mb-12 animate-fade-in-up">
          <div className={`bg-gradient-to-r ${step.color} p-12 text-white text-center`}>
            <div className="text-8xl font-bold mb-6 animate-bounce-slow">{step.number}</div>
            <h2 className="text-4xl font-bold">{step.text}</h2>
          </div>

          <div className="p-16">
            <p className="text-2xl text-gray-700 dark:text-gray-300 text-center leading-relaxed">
              {step.prompt}
            </p>

            {currentStep === groundingSteps.length - 1 && (
              <div className="mt-10 text-center">
                <Heart className="w-20 h-20 text-[#A7C7E7] mx-auto animate-pulse" />
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-6 mb-16">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center space-x-3 px-8 py-5 text-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-105 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
            <span>Anterior</span>
          </button>

          {currentStep === groundingSteps.length - 1 ? (
            <button
              onClick={handleReset}
              className="flex items-center space-x-3 px-10 py-5 text-lg bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] text-white rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <span>Recomeçar</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center space-x-3 px-10 py-5 text-lg bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] text-white rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <span>Próximo</span>
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Info Card */}
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-[#A7C7E7] p-8 rounded-2xl">
            <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
              <strong>💡 Sobre o Grounding:</strong> Esta técnica ajuda a reduzir ansiedade e trazer
              você de volta ao momento presente, usando seus cinco sentidos para ancorar-se na
              realidade.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#A7C7E7]/10 to-[#89CFF0]/10 p-10 rounded-3xl text-center transform hover:scale-105 transition-all duration-300">
            <p className="text-2xl text-gray-800 dark:text-gray-200 font-semibold mb-4 leading-relaxed">
              💙 Você está aqui. Você está presente. Você está seguro(a).
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Este momento, aqui e agora, é seu refúgio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#A7C7E7]/5 to-[#89CFF0]/5 p-8 rounded-3xl text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
              <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
                🌟 Você está bem
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#89CFF0]/5 to-[#A7C7E7]/5 p-8 rounded-3xl text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
              <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
                💪 Você é forte
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#A7C7E7]/5 to-[#89CFF0]/5 p-8 rounded-3xl text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
              <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
                ✨ Você consegue
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
