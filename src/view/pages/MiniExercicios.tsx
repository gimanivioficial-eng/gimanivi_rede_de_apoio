import { useState } from "react";
import { Play, Check, Wind, Smile, Eye, Timer } from "lucide-react";

interface Exercise {
  id: string;
  title: string;
  instruction: string;
  duration: string;
  icon: any;
  color: string;
}

const exercises: Exercise[] = [
  {
    id: "breathing",
    title: "Respire Fundo",
    instruction: "Feche os olhos e respire profundamente por 30 segundos. Inspire pelo nariz, segure por 4 segundos, expire pela boca.",
    duration: "30 segundos",
    icon: Wind,
    color: "from-[#A7C7E7] to-[#89CFF0]",
  },
  {
    id: "shoulders",
    title: "Relaxe os Ombros",
    instruction: "Levante seus ombros até as orelhas, segure por 5 segundos, depois solte completamente. Sinta a tensão saindo.",
    duration: "20 segundos",
    icon: Smile,
    color: "from-[#89CFF0] to-[#A7C7E7]",
  },
  {
    id: "eyes",
    title: "Feche os Olhos",
    instruction: "Afaste-se da tela e feche os olhos por alguns segundos. Relaxe sua visão e sua mente.",
    duration: "15 segundos",
    icon: Eye,
    color: "from-[#A7C7E7] to-[#89CFF0]",
  },
  {
    id: "break",
    title: "Faça uma Pausa",
    instruction: "Levante-se, estique-se, caminhe um pouco. Seu corpo precisa de movimento.",
    duration: "1 minuto",
    icon: Timer,
    color: "from-[#89CFF0] to-[#A7C7E7]",
  },
];

export function MiniExercicios() {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  const handleStartExercise = (exerciseId: string) => {
    setActiveExercise(exerciseId);
  };

  const handleCompleteExercise = (exerciseId: string) => {
    setCompletedExercises([...completedExercises, exerciseId]);
    setActiveExercise(null);
  };

  const handleReset = () => {
    setCompletedExercises([]);
    setActiveExercise(null);
  };

  return (
    <div className="pt-20 bg-gradient-to-b from-white to-[#A7C7E7]/5 dark:from-gray-900 dark:to-[#A7C7E7]/10 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Mini <span className="text-[#A7C7E7]">Exercícios</span> Guiados
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Pequenas ações que fazem grande diferença
          </p>
        </div>

        {/* Progress */}
        {completedExercises.length > 0 && (
          <div className="mb-12 bg-gradient-to-r from-[#A7C7E7]/20 to-[#89CFF0]/20 p-8 rounded-3xl text-center animate-fade-in-up">
            <p className="text-lg text-gray-900 dark:text-white">
              <span className="font-bold text-2xl text-[#A7C7E7]">
                {completedExercises.length}
              </span>{" "}
              de {exercises.length} exercícios completos 🎉
            </p>
            {completedExercises.length === exercises.length && (
              <div className="mt-4">
                <p className="text-xl font-bold text-[#A7C7E7] mb-3">
                  Parabéns! Você completou todos! 💙
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] text-white rounded-full hover:shadow-lg transition-all"
                >
                  Recomeçar
                </button>
              </div>
            )}
          </div>
        )}

        {/* Exercise Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {exercises.map((exercise) => {
            const Icon = exercise.icon;
            const isActive = activeExercise === exercise.id;
            const isCompleted = completedExercises.includes(exercise.id);

            return (
              <div
                key={exercise.id}
                className={`bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                  isActive ? "ring-4 ring-[#A7C7E7] scale-105" : ""
                } ${isCompleted ? "opacity-75" : ""}`}
              >
                <div className={`bg-gradient-to-r ${exercise.color} p-8 text-white`}>
                  <div className="flex items-center justify-between mb-6">
                    <Icon className="w-16 h-16" />
                    {isCompleted && (
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center animate-bounce-slow">
                        <Check className="w-7 h-7 text-[#A7C7E7]" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{exercise.title}</h3>
                  <p className="text-lg opacity-90">{exercise.duration}</p>
                </div>

                <div className="p-8">
                  {isActive ? (
                    <div className="space-y-4">
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        {exercise.instruction}
                      </p>
                      <button
                        onClick={() => handleCompleteExercise(exercise.id)}
                        className="w-full px-6 py-3 bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] text-white rounded-full hover:shadow-lg transition-all"
                      >
                        Concluir
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                        {exercise.instruction}
                      </p>
                      {!isCompleted && (
                        <button
                          onClick={() => handleStartExercise(exercise.id)}
                          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          <Play className="w-5 h-5" />
                          <span>Começar</span>
                        </button>
                      )}
                      {isCompleted && (
                        <div className="text-center text-[#A7C7E7] font-semibold">
                          ✓ Concluído
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-[#A7C7E7] p-8 rounded-2xl">
            <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
              <strong>💡 Importante:</strong> Estes exercícios podem ser feitos a qualquer momento
              do dia. Não há hora errada para cuidar de si mesmo(a).
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#A7C7E7]/10 to-[#89CFF0]/10 p-10 rounded-3xl text-center transform hover:scale-105 transition-all duration-300">
            <p className="text-2xl text-gray-800 dark:text-gray-200 font-semibold mb-4 leading-relaxed">
              💙 Pequenos gestos de autocuidado têm grande impacto
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Cada exercício que você completa é um ato de amor próprio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#A7C7E7]/5 to-[#89CFF0]/5 p-8 rounded-3xl text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
              <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
                🌟 Você merece pausas e descanso
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#89CFF0]/5 to-[#A7C7E7]/5 p-8 rounded-3xl text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
              <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
                ✨ Seu bem-estar é prioridade
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
