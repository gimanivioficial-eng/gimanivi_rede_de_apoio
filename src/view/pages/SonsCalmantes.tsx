import { useState, useRef } from "react";
import { Play, Pause, Volume2, CloudRain, Waves, Music } from "lucide-react";

interface Sound {
  id: string;
  name: string;
  icon: any;
  url: string;
  color: string;
}

const sounds: Sound[] = [
  {
    id: "rain",
    name: "Som de Chuva",
    icon: CloudRain,
    url: "https://assets.mixkit.co/active_storage/sfx/2390/2390.wav",
    color: "from-[#A7C7E7] to-[#89CFF0]",
  },
  {
    id: "ocean",
    name: "Ondas do Mar",
    icon: Waves,
    url: "https://assets.mixkit.co/active_storage/sfx/2393/2393.wav",
    color: "from-[#89CFF0] to-[#A7C7E7]",
  },
  {
    id: "nature",
    name: "Sons da Natureza",
    icon: Music,
    url: "https://assets.mixkit.co/active_storage/sfx/2465/2465.wav",
    color: "from-[#A7C7E7] to-[#89CFF0]",
  },
];

export function SonsCalmantes() {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlaySound = (sound: Sound) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (activeSound === sound.id && isPlaying) {
      setIsPlaying(false);
      setActiveSound(null);
      return;
    }

    const audio = new Audio(sound.url);
    audio.loop = true;
    audioRef.current = audio;

    audio.play().then(() => {
      setActiveSound(sound.id);
      setIsPlaying(true);
    }).catch((error) => {
      console.error("Erro ao reproduzir áudio:", error);
    });
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setActiveSound(null);
    }
  };

  return (
    <div className="pt-20 bg-gradient-to-b from-white to-[#A7C7E7]/5 dark:from-gray-900 dark:to-[#A7C7E7]/10 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Sons <span className="text-[#A7C7E7]">Calmantes</span>
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Relaxe com sons da natureza e músicas tranquilas
          </p>
        </div>

        {/* Sound Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {sounds.map((sound) => {
            const Icon = sound.icon;
            const isActive = activeSound === sound.id && isPlaying;

            return (
              <button
                key={sound.id}
                onClick={() => handlePlaySound(sound)}
                className={`relative bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 overflow-hidden ${
                  isActive ? "ring-4 ring-[#A7C7E7] scale-105" : ""
                }`}
              >
                <div className={`bg-gradient-to-br ${sound.color} p-10 text-white`}>
                  <Icon className={`w-20 h-20 mx-auto mb-6 transition-transform duration-500 ${isActive ? "animate-bounce-slow" : ""}`} />
                  <h3 className="text-2xl font-bold mb-4">{sound.name}</h3>
                  <div className="flex items-center justify-center space-x-3 text-lg">
                    {isActive ? (
                      <>
                        <Pause className="w-6 h-6" />
                        <span>Pausar</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-6 h-6" />
                        <span>Tocar</span>
                      </>
                    )}
                  </div>
                </div>

                {isActive && (
                  <div className="absolute top-4 right-4">
                    <div className="relative">
                      <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
                      <div className="w-4 h-4 bg-white rounded-full absolute top-0"></div>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Player */}
        {isPlaying && activeSound && (
          <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl p-10 animate-fade-in-up mb-16">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#A7C7E7] to-[#89CFF0] rounded-full flex items-center justify-center">
                  <Volume2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Tocando agora</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {sounds.find((s) => s.id === activeSound)?.name}
                  </p>
                </div>
              </div>
              <button
                onClick={handlePause}
                className="px-6 py-3 bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] text-white rounded-full hover:shadow-lg transition-all"
              >
                <Pause className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-r from-[#A7C7E7]/10 to-[#89CFF0]/10 p-8 rounded-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
              <span className="text-3xl mr-4">🎧</span>
              Dica de uso
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Use fones de ouvido para uma experiência mais imersiva e relaxante.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#89CFF0]/10 to-[#A7C7E7]/10 p-8 rounded-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
              <span className="text-3xl mr-4">⏰</span>
              Quando usar
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Ideal para meditação, estudo, trabalho focado ou antes de dormir.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#A7C7E7]/10 to-[#89CFF0]/10 p-8 rounded-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
              <span className="text-3xl mr-4">🌊</span>
              Benefícios do som do mar
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              O som das ondas ajuda a reduzir ansiedade e promove um estado de relaxamento profundo.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#89CFF0]/10 to-[#A7C7E7]/10 p-8 rounded-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
              <span className="text-3xl mr-4">🌧️</span>
              Benefícios do som da chuva
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              O som da chuva cria um ambiente acolhedor e ajuda a melhorar o foco e concentração.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-[#A7C7E7] p-8 rounded-2xl">
            <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
              <strong>💡 Sons terapêuticos:</strong> Estudos mostram que sons da natureza podem
              reduzir estresse, diminuir a pressão arterial e melhorar a qualidade do sono.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#A7C7E7]/5 to-[#89CFF0]/5 p-10 rounded-3xl text-center transform hover:scale-105 transition-all duration-300">
            <p className="text-2xl text-gray-800 dark:text-gray-200 font-semibold mb-4 leading-relaxed">
              💙 Respire fundo, feche os olhos e deixe os sons te levarem para um lugar de paz
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Permita-se esse momento de autocuidado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
