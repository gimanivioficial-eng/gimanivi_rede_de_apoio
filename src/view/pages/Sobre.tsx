import { Heart, Target, Users } from "lucide-react";

export function Sobre() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Sobre o <span className="text-[#A7C7E7]">GIMANIVI</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Uma plataforma dedicada ao cuidado emocional e bem-estar mental
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="bg-gradient-to-br from-[#A7C7E7] to-[#89CFF0] p-8 rounded-3xl shadow-2xl">
              <Heart className="w-32 h-32 text-white mx-auto" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              O que é o GIMANIVI?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              GIMANIVI é uma rede de apoio emocional criada com o objetivo de oferecer suporte,
              informação e ferramentas para cuidar da saúde mental. Acreditamos que todos merecem
              acesso a recursos que promovam o bem-estar emocional.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Nossa plataforma oferece desde exercícios de respiração até um chat de apoio,
              sempre com foco em criar um ambiente acolhedor e seguro para todos.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-[#A7C7E7]/20 rounded-full flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-[#A7C7E7]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Nossa Missão
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Proporcionar um espaço seguro e acolhedor onde pessoas possam encontrar apoio
              emocional, recursos educativos e ferramentas práticas para cuidar da saúde mental.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-[#89CFF0]/20 rounded-full flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-[#89CFF0]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Nosso Objetivo
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Democratizar o acesso a informações e ferramentas de saúde mental, quebrando
              estigmas e promovendo uma cultura de cuidado e empatia.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] p-12 rounded-3xl shadow-2xl text-center text-white">
          <h2 className="text-3xl font-bold mb-4">💙 Você não está sozinho(a)</h2>
          <p className="text-xl opacity-90">
            Estamos aqui para apoiar você em cada passo da sua jornada
          </p>
        </div>
      </div>
    </div>
  );
}
