import { Link } from "react-router";
import {
  Heart,
  Brain,
  Wind,
  Sparkles,
  Volume2,
  ListChecks,
  MessageSquare,
} from "lucide-react";

// Corrigido: Agora puxa da pasta de assets local dentro de view
import logoImg from "../assets/371b02dd8122556bf52fe083c8cb3e43ff03131f.png";

export function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#A7C7E7]/5 dark:from-gray-900 dark:to-[#A7C7E7]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-40">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="text-center md:text-left animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 animate-slide-in-left">
                Bem-vindo ao{" "}
                <span className="text-[#A7C7E7]">GIMANIVI</span> 💙
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed animate-slide-in-left animation-delay-200">
                Sua ajuda emocional. Estamos aqui para você!
              </p>

              <Link
                to="/sobre"
                className="inline-block px-10 py-5 text-lg bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] text-white rounded-full shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 animate-slide-in-left animation-delay-400"
              >
                Explorar
              </Link>
            </div>

            <div className="flex justify-center animate-fade-in">
              <div className="relative animate-float">
                <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-[#A7C7E7] to-[#89CFF0] rounded-full opacity-20 blur-3xl absolute animate-pulse-slow"></div>

                <div className="relative transform hover:scale-105 transition-transform duration-500">
                  <img
                    src={logoImg}
                    alt="GIMANIVI - Sua rede de apoio"
                    className="w-80 h-80 md:w-96 md:h-96 object-contain rounded-3xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] p-16 rounded-[3rem] shadow-2xl text-center text-white transform hover:shadow-3xl transition-all duration-500">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              💙 Você não está sozinho(a)
            </h2>

            <p className="text-xl opacity-90 mb-8">
              Explore nossas ferramentas de apoio emotional
            </p>

            <Link
              to="/equipe"
              className="inline-block px-8 py-4 bg-white text-[#A7C7E7] rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
            >
              Conheça Nossa Equipe
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
