
import { useEffect, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Check,
  Wind,
  Smile,
  Eye,
  Timer,
} from "lucide-react";

interface Exercise {
  id: string;
  title: string;
  instruction: string;
  duration: string;
  seconds: number;
  icon: any;
  color: string;
}

const exercises: Exercise[] = [
  {
    id: "breathing",
    title: "Respire Fundo",
    instruction:
      "Feche os olhos e respire profundamente. Inspire pelo nariz, segure por 4 segundos e expire pela boca.",
    duration: "30 segundos",
    seconds: 30,
    icon: Wind,
    color: "from-[#A7C7E7] to-[#89CFF0]",
  },
  {
    id: "shoulders",
    title: "Relaxe os Ombros",
    instruction:
      "Levante seus ombros até as orelhas, segure por 5 segundos e depois solte completamente. Sinta a tensão saindo.",
    duration: "20 segundos",
    seconds: 20,
    icon: Smile,
    color: "from-[#89CFF0] to-[#A7C7E7]",
  },
  {
    id: "eyes",
    title: "Feche os Olhos",
    instruction:
      "Afaste-se da tela e feche os olhos por alguns segundos. Relaxe sua visão e sua mente.",
    duration: "15 segundos",
    seconds: 15,
    icon: Eye,
    color: "from-[#A7C7E7] to-[#89CFF0]",
  },
  {
    id: "break",
    title: "Faça uma Pausa",
    instruction:
      "Levante-se, estique-se e caminhe um pouco. Seu corpo precisa de movimento.",
    duration: "1 minuto",
    seconds: 60,
    icon: Timer,
    color: "from-[#89CFF0] to-[#A7C7E7]",
  },
];

export function MiniExercicios() {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [remainingTimes, setRemainingTimes] = useState<Record<string, number>>(
    () =>
      Object.fromEntries(
        exercises.map((exercise) => [exercise.id, exercise.seconds])
      )
  );
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || !activeExercise) return;

    const interval = window.setInterval(() => {
      setRemainingTimes((previous) => {
        const currentTime = previous[activeExercise] ?? 0;
        const nextTime = Math.max(0, currentTime - 1);

        return {
          ...previous,
          [activeExercise]: nextTime,
        };
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [running, activeExercise]);

  useEffect(() => {
    if (!activeExercise) return;

    const currentTime = remainingTimes[activeExercise];

    if (currentTime === 0) {
      setRunning(false);
      setCompletedExercises((previous) =>
        previous.includes(activeExercise)
          ? previous
          : [...previous, activeExercise]
      );
      setActiveExercise(null);
    }
  }, [remainingTimes, activeExercise]);

  const handleStartExercise = (exercise: Exercise) => {
    if (completedExercises.includes(exercise.id)) return;

    setActiveExercise(exercise.id);
    setRunning(true);
  };

  const handlePause = () => {
    setRunning(false);
  };

  const handleContinue = () => {
    if (activeExercise) {
      setRunning(true);
    }
  };

  const handleRestart = (exercise: Exercise) => {
    setRemainingTimes((previous) => ({
      ...previous,
      [exercise.id]: exercise.seconds,
    }));
    setActiveExercise(exercise.id);
    setRunning(true);
  };

  const handleCompleteExercise = (exerciseId: string) => {
    setCompletedExercises((previous) =>
      previous.includes(exerciseId)
        ? previous
        : [...previous, exerciseId]
    );

    setActiveExercise(null);
    setRunning(false);
  };

  const handleReset = () => {
    setCompletedExercises([]);
    setActiveExercise(null);
    setRunning(false);

    setRemainingTimes(
      Object.fromEntries(
        exercises.map((exercise) => [exercise.id, exercise.seconds])
      )
    );
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="pt-20 bg-gradient-to-b from-white to-[#A7C7E7]/5 dark:from-gray-900 dark:to-[#A7C7E7]/10 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28">

        {/* Cabeçalho */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Mini <span className="text-[#A7C7E7]">Exercícios</span> Guiados
          </h1>

          <p className="text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Pequenas ações que fazem grande diferença
          </p>
        </div>

        {/* Progresso */}
        {completedExercises.length > 0 && (
          <div className="mb-12 bg-gradient-to-r from-[#A7C7E7]/20 to-[#89CFF0]/20 p-8 rounded-3xl text-center">
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

        {/* Exercícios */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {exercises.map((exercise) => {
            const Icon = exercise.icon;
            const isActive = activeExercise === exercise.id;
            const isCompleted = completedExercises.includes(exercise.id);
            const remaining = remainingTimes[exercise.id];
            const progress =
              ((exercise.seconds - remaining) / exercise.seconds) * 100;

            return (
              <div
                key={exercise.id}
                className={`bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl overflow-hidden transition-all duration-300 ${
                  isActive ? "ring-4 ring-[#A7C7E7]" : ""
                } ${isCompleted ? "opacity-80" : ""}`}
              >
                {/* Topo do cartão */}
                <div
                  className={`bg-gradient-to-r ${exercise.color} p-8 text-white`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <Icon className="w-16 h-16" />

                    {isCompleted && (
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <Check className="w-7 h-7 text-[#A7C7E7]" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold mb-3">
                    {exercise.title}
                  </h3>

                  <p className="text-lg opacity-90">
                    {exercise.duration}
                  </p>
                </div>

                {/* Conteúdo */}
                <div className="p-8 space-y-5">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {exercise.instruction}
                  </p>

                  {isActive && (
                    <div className="bg-[#F4F9FC] dark:bg-gray-700/60 rounded-2xl p-6 text-center">
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-300 mb-2">
                        TEMPO RESTANTE
                      </p>

                      <p className="text-5xl font-bold text-[#83ACD3] tabular-nums">
                        {formatTime(remaining)}
                      </p>

                      {/* Barra de progresso */}
                      <div className="w-full h-3 bg-[#DCE8F3] dark:bg-gray-600 rounded-full mt-5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] rounded-full transition-all duration-1000"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <p className="text-sm text-gray-500 dark:text-gray-300 mt-3">
                        {running ? "Continue no seu ritmo 💙" : "Exercício pausado"}
                      </p>
                    </div>
                  )}

                  {!isCompleted && (
                    <div className="space-y-3">
                      {!isActive ? (
                        <button
                          onClick={() => handleStartExercise(exercise)}
                          disabled={activeExercise !== null}
                          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <Play className="w-5 h-5" />
                          Começar exercício
                        </button>
                      ) : (
                        <>
                          <div className="grid grid-cols-2 gap-3">
                            {running ? (
                              <button
                                onClick={handlePause}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#A7C7E7] text-white rounded-full hover:bg-[#91B9DF] transition-colors"
                              >
                                <Pause size={18} />
                                Pausar
                              </button>
                            ) : (
                              <button
                                onClick={handleContinue}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#A7C7E7] text-white rounded-full hover:bg-[#91B9DF] transition-colors"
                              >
                                <Play size={18} />
                                Continuar
                              </button>
                            )}

                            <button
                              onClick={() => handleRestart(exercise)}
                              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                              <RotateCcw size={18} />
                              Reiniciar
                            </button>
                          </div>

                          <button
                            onClick={() => handleCompleteExercise(exercise.id)}
                            className="w-full px-6 py-3 bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] text-white rounded-full hover:shadow-lg transition-all"
                          >
                            Concluir exercício
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {isCompleted && (
                    <div className="text-center text-[#83ACD3] font-semibold py-3">
                      <Check className="inline w-5 h-5 mr-1" />
                      Exercício concluído!
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Informações */}
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-[#A7C7E7] p-8 rounded-2xl">
            <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
              <strong>💡 Importante:</strong> Estes exercícios podem ser feitos
              a qualquer momento do dia. Não há hora errada para cuidar de si
              mesmo(a).
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#A7C7E7]/10 to-[#89CFF0]/10 p-10 rounded-3xl text-center">
            <p className="text-2xl text-gray-800 dark:text-gray-200 font-semibold mb-4 leading-relaxed">
              💙 Pequenos gestos de autocuidado têm grande impacto
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-400">
              Cada exercício que você completa é um ato de amor próprio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#A7C7E7]/5 to-[#89CFF0]/5 p-8 rounded-3xl text-center">
              <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
                🌟 Você merece pausas e descanso
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#89CFF0]/5 to-[#A7C7E7]/5 p-8 rounded-3xl text-center">
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
