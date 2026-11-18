import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";

const supportMessages = [
  "Você está fazendo o seu melhor 💙",
  "Isso vai passar, você é mais forte do que imagina",
  "Você não está sozinho(a) nessa jornada",
  "É okay não estar okay hoje",
  "Sua força é inspiradora, mesmo quando você não percebe",
  "Você merece cuidado, amor e gentileza",
  "Cada dia é uma nova oportunidade",
  "Seus sentimentos são válidos",
  "Você é importante e faz diferença no mundo",
  "Está tudo bem pedir ajuda",
  "Você já superou tantas coisas difíceis antes",
  "Respire. Você consegue",
  "Você é amado(a) exatamente como você é",
  "Celebre cada pequena vitória",
  "O descanso não é preguiça, é necessário",
  "Você não precisa ser perfeito(a) para ser incrível",
  "Sua presença importa",
  "Seja gentil consigo mesmo(a)",
  "Você merece todos os seus sonhos",
  "Este momento difícil não define quem você é",
  "Seu coração é mais forte do que você pensa 💪",
  "Dias difíceis não significam uma vida difícil",
  "Você tem o direito de se cuidar e priorizar sua paz",
  "Pequenos passos ainda são progresso",
  "Você não precisa ter todas as respostas agora",
  "Seus esforços não passam despercebidos",
  "Você merece gentileza, especialmente da sua parte",
  "Tudo bem descansar, você não precisa estar sempre produtivo(a)",
  "Sua jornada é única e valiosa",
  "Você é digno(a) de amor e respeito",
  "Aceite-se onde você está, enquanto trabalha para onde quer chegar",
  "Sua saúde mental é tão importante quanto sua saúde física",
  "Não tenha medo de começar de novo, quantas vezes for necessário",
  "Você tem superado 100% dos seus dias difíceis até agora",
  "Suas cicatrizes mostram que você sobreviveu",
  "Não há vergonha em sentir o que você sente",
  "Você é suficiente, exatamente como está agora",
  "Permita-se sentir orgulho de si mesmo(a)",
  "Você merece todas as coisas boas que a vida tem a oferecer",
  "Seu bem-estar importa, sempre",
];

export function Mensagens() {
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomMessage = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * supportMessages.length);
      setCurrentMessage(supportMessages[randomIndex]);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="pt-20 bg-gradient-to-b from-white to-[#A7C7E7]/5 dark:from-gray-900 dark:to-[#A7C7E7]/10 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Mensagens de <span className="text-[#A7C7E7]">Apoio</span>
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Palavras de carinho para quando você precisar
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl p-16 mb-12 animate-fade-in">
          {/* Heart Icon */}
          <div className="flex justify-center mb-10">
            <div className="w-28 h-28 bg-gradient-to-br from-[#A7C7E7] to-[#89CFF0] rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
              <Heart className="w-14 h-14 text-white fill-white" />
            </div>
          </div>

          {/* Message Display */}
          <div className="min-h-[250px] flex items-center justify-center mb-10">
            {currentMessage ? (
              <p
                className={`text-3xl md:text-4xl font-semibold text-center text-gray-900 dark:text-white leading-relaxed transition-all duration-500 ${
                  isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
              >
                {currentMessage}
              </p>
            ) : (
              <p className="text-2xl text-gray-500 dark:text-gray-400 text-center leading-relaxed">
                Clique no botão abaixo para receber uma mensagem de apoio 💙
              </p>
            )}
          </div>

          {/* Button */}
          <div className="flex justify-center">
            <button
              onClick={getRandomMessage}
              className="flex items-center space-x-4 px-10 py-5 text-lg bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] text-white rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300"
            >
              <Sparkles className="w-7 h-7" />
              <span className="font-semibold">
                {currentMessage ? "Outra Mensagem" : "Preciso de Apoio"}
              </span>
            </button>
          </div>
        </div>

        {/* Additional Cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-[#A7C7E7]/10 to-[#89CFF0]/10 p-8 rounded-3xl text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl mb-4">🌟</div>
            <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
              Você é suficiente
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#89CFF0]/10 to-[#A7C7E7]/10 p-8 rounded-3xl text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl mb-4">💪</div>
            <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
              Você é forte
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#A7C7E7]/10 to-[#89CFF0]/10 p-8 rounded-3xl text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl mb-4">💙</div>
            <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
              Você é amado(a)
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#89CFF0]/10 to-[#A7C7E7]/10 p-8 rounded-3xl text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl mb-4">🌈</div>
            <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
              Você é valioso(a)
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#A7C7E7]/10 to-[#89CFF0]/10 p-8 rounded-3xl text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl mb-4">✨</div>
            <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
              Você é especial
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#89CFF0]/10 to-[#A7C7E7]/10 p-8 rounded-3xl text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl mb-4">🦋</div>
            <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
              Você merece paz
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#A7C7E7]/10 to-[#89CFF0]/10 p-8 rounded-3xl text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl mb-4">🌸</div>
            <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
              Você merece felicidade
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#89CFF0]/10 to-[#A7C7E7]/10 p-8 rounded-3xl text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl mb-4">🌻</div>
            <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
              Você merece descanso
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-[#A7C7E7] p-8 rounded-2xl">
            <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
              <strong>💡 Lembre-se:</strong> É normal precisar de palavras de encorajamento.
              Volte aqui sempre que precisar de um lembrete de que você é incrível.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#A7C7E7]/5 to-[#89CFF0]/5 p-10 rounded-3xl text-center transform hover:scale-105 transition-all duration-300">
            <p className="text-2xl text-gray-800 dark:text-gray-200 font-semibold mb-4 leading-relaxed">
              💙 Você merece todo o amor, cuidado e gentileza do mundo
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              E isso inclui o amor, cuidado e gentileza que você oferece a si mesmo(a)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
