import { BookOpen, Heart, Lightbulb, Users } from "lucide-react";

export function Origem() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            A Origem do <span className="text-[#A7C7E7]">GIMANIVI</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Um projeto de TCC nascido da vontade de fazer a diferença
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-t-4 border-[#A7C7E7]">
            <div className="w-16 h-16 bg-[#A7C7E7]/20 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="w-8 h-8 text-[#A7C7E7]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Projeto de TCC
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              O GIMANIVI nasceu como um Trabalho de Conclusão de Curso, resultado da dedicação
              e paixão de quatro estudantes comprometidas com a saúde mental.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-t-4 border-[#89CFF0]">
            <div className="w-16 h-16 bg-[#89CFF0]/20 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-[#89CFF0]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Por que saúde mental?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Escolhemos este tema pela crescente necessidade de apoio emocional, especialmente
              entre jovens. A saúde mental não pode mais ser negligenciada.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-t-4 border-[#A7C7E7]">
            <div className="w-16 h-16 bg-[#A7C7E7]/20 rounded-full flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-[#A7C7E7]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Impacto Social
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Nosso objetivo é criar um impacto positivo na sociedade, oferecendo ferramentas
              acessíveis para quem precisa de apoio emocional.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-[#f0f8ff] dark:from-gray-800 dark:to-gray-900 p-12 rounded-3xl shadow-2xl mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            A Importância da Saúde Mental
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#A7C7E7] rounded-full flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  Conscientização
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  A saúde mental afeta todos os aspectos da vida. É fundamental falar sobre o
                  tema e quebrar o estigma que ainda existe.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#89CFF0] rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  Prevenção
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Cuidar da saúde mental é uma forma de prevenção. Pequenas práticas diárias
                  podem fazer uma grande diferença.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#A7C7E7] rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  Apoio Coletivo
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Ninguém precisa enfrentar desafios emocionais sozinho. O apoio de uma
                  comunidade é essencial para a recuperação.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#89CFF0] rounded-full flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  Transformação
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Ao cuidar da saúde mental, transformamos não apenas indivíduos, mas toda a
                  sociedade em um lugar mais empático e acolhedor.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] p-12 rounded-3xl shadow-2xl text-center text-white">
          <h2 className="text-3xl font-bold mb-4">💙 Nossa Motivação</h2>
          <p className="text-xl opacity-90 mb-6">
            Acreditamos que cada pessoa merece acesso a recursos de saúde mental de qualidade
          </p>
          <p className="text-lg opacity-80">
            Por isso, criamos o GIMANIVI: para ser uma rede de apoio acessível a todos
          </p>
        </div>
      </div>
    </div>
  );
}
