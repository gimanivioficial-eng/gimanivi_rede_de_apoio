import evellynImg from "../assets/1c75c8f91cfc782c1140e4e104dcce70714183e3.png";
import nicollyImg from "../assets/5df3018e2cc61b54aa8bbb112cd3fafcd6e74c51.png";
import giovannaImg from "../assets/8b9339013e44fa5f974f4e8578be628a4e465e87.png";
import manuelaImg from "../assets/8eba5f090a5bd46040c6b1dfc3e8f540345c422e.png";

const teamMembers = [
  {
    name: "Evellyn",
    role: "Líder do Projeto",
    icon: "👑",
    image: evellynImg,
    description: "Coordena todas as atividades, criou o site e garante que o projeto siga sua missão de apoio emocional.",
  },
  {
    name: "Nicolly",
    role: "Desenvolvimento / Apoio",
    icon: "💻",
    image: manuelaImg, // morena de azul
    description: "Responsável pelo suporte a lider do grupo sobre às iniciativas do projeto.",
  },
  {
    name: "Giovanna",
    role: "Pesquisa",
    icon: "📚",
    image: nicollyImg, // cabelo liso e camisa branca
    description: "Conduz pesquisas sobre saúde mental para fundamentar nossas ações e recursos.",
  },
  {
    name: "Manuela",
    role: "Design",
    icon: "🎨",
    image: giovannaImg, // vermelho e piercing
    description: "Cria toda a identidade visual delicada e acolhedora do GIMANIVI.",
  },
];

export function Equipe() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Nossa <span className="text-[#A7C7E7]">Equipe</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Conheça as pessoas dedicadas que tornaram o GIMANIVI possível
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-[#A7C7E7] to-[#89CFF0] p-6 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full overflow-hidden bg-white p-2">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="p-6 text-center">
                <div className="text-4xl mb-3">{member.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-[#A7C7E7] font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] p-12 rounded-3xl shadow-2xl text-center text-white">
          <h2 className="text-3xl font-bold mb-4">💙 Juntas pela Saúde Mental</h2>
          <p className="text-xl opacity-90">
            Uma equipe unida com o mesmo propósito: cuidar de você
          </p>
        </div>
      </div>
    </div>
  );
}
