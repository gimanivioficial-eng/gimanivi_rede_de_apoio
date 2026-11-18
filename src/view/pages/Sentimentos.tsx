import { Brain, Heart, Zap, CloudRain } from "lucide-react";

interface Feeling {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tips: string[];
  icon: any;
  color: string;
}

const feelings: Feeling[] = [
  {
    id: "anxiety",
    title: "Ansiedade",
    subtitle: "É normal sentir ansiedade",
    description: "A ansiedade é uma resposta natural do corpo a situações de estresse. Ela se manifesta através de preocupação excessiva, nervosismo ou medo do futuro. É importante lembrar que sentir ansiedade não significa fraqueza.",
    tips: [
      "Pratique exercícios de respiração",
      "Identifique e questione pensamentos negativos",
      "Mantenha uma rotina regular de sono",
      "Limite cafeína e álcool",
    ],
    icon: Zap,
    color: "from-[#A7C7E7] to-[#89CFF0]",
  },
  {
    id: "stress",
    title: "Estresse",
    subtitle: "Seu corpo está pedindo uma pausa",
    description: "O estresse acontece quando nos sentimos sobrecarregados por demandas físicas ou emocionais. É a forma do corpo dizer que precisa de descanso. Reconhecer o estresse é o primeiro passo para cuidar de si.",
    tips: [
      "Faça pausas regulares durante o dia",
      "Pratique atividades físicas",
      "Organize suas tarefas por prioridade",
      "Reserve tempo para lazer e hobbies",
    ],
    icon: Brain,
    color: "from-[#89CFF0] to-[#A7C7E7]",
  },
  {
    id: "sadness",
    title: "Tristeza",
    subtitle: "Está tudo bem não estar bem",
    description: "A tristeza é uma emoção humana válida e necessária. Ela nos ajuda a processar perdas e mudanças. Permitir-se sentir tristeza é um ato de coragem e autocuidado. Você não precisa estar feliz o tempo todo.",
    tips: [
      "Permita-se sentir sem julgamento",
      "Converse com alguém de confiança",
      "Escreva sobre seus sentimentos",
      "Seja gentil consigo mesmo(a)",
    ],
    icon: CloudRain,
    color: "from-[#A7C7E7] to-[#89CFF0]",
  },
  {
    id: "overwhelm",
    title: "Sobrecarga",
    subtitle: "Você não precisa fazer tudo sozinho(a)",
    description: "Sentir-se sobrecarregado(a) acontece quando temos mais responsabilidades do que conseguimos gerenciar. É um sinal de que precisamos reorganizar prioridades e pedir ajuda. Lembre-se: pedir ajuda é força, não fraqueza.",
    tips: [
      "Delegue tarefas quando possível",
      "Aprenda a dizer não",
      "Divida grandes tarefas em etapas menores",
      "Peça ajuda sem culpa",
    ],
    icon: Heart,
    color: "from-[#89CFF0] to-[#A7C7E7]",
  },
];

export function Sentimentos() {
  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Entenda Seus <span className="text-[#A7C7E7]">Sentimentos</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Conhecer suas emoções é o primeiro passo para cuidar delas
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {feelings.map((feeling) => {
            const Icon = feeling.icon;

            return (
              <div
                key={feeling.id}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${feeling.color} p-6 text-white`}>
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{feeling.title}</h3>
                      <p className="text-sm opacity-90">{feeling.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {feeling.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                      <span className="text-[#A7C7E7] mr-2">💡</span>
                      Como lidar:
                    </h4>
                    <ul className="space-y-2">
                      {feeling.tips.map((tip, index) => (
                        <li
                          key={index}
                          className="flex items-start space-x-2 text-gray-600 dark:text-gray-400"
                        >
                          <span className="text-[#A7C7E7] mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[#A7C7E7]/10 to-[#89CFF0]/10 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              💙 Todas as emoções são válidas
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Não existem emoções "boas" ou "ruins". Cada sentimento tem seu propósito e merece
              ser reconhecido e respeitado.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#89CFF0]/10 to-[#A7C7E7]/10 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🤝 Você não está sozinho(a)
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Milhões de pessoas experimentam esses sentimentos todos os dias. Buscar ajuda
              profissional é um ato de autocuidado e coragem.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-200">
            <strong>⚠️ Importante:</strong> Se seus sentimentos estão interferindo
            significativamente na sua vida diária, considere buscar ajuda de um profissional de
            saúde mental. Confira nossos{" "}
            <a href="/apoio" className="underline font-semibold">
              números de apoio
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
