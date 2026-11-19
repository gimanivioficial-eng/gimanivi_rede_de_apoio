
import { Phone, Heart, AlertTriangle } from "lucide-react";

const supportNumbers = [
  {
    name: "CVV - Centro de Valorização da Vida",
    number: "188",
    phone: "188",
    description:
      "Apoio emocional e prevenção do suicídio. Atendimento 24h, gratuito e sigiloso.",
    icon: Heart,
    color: "from-[#A7C7E7] to-[#89CFF0]",
  },
  {
    name: "SAMU - Serviço de Atendimento Móvel de Urgência",
    number: "192",
    phone: "192",
    description:
      "Emergências médicas. Atendimento 24h em todo território nacional.",
    icon: AlertTriangle,
    color: "from-red-400 to-red-500",
  },
  {
    name: "Bombeiros",
    number: "193",
    phone: "193",
    description:
      "Emergências e resgates. Atendimento 24h para situações de risco.",
    icon: Phone,
    color: "from-orange-400 to-orange-500",
  },
  {
    name: "CAPS - Centro de Atenção Psicossocial",
    number: "Procure o mais próximo",
    phone: null,
    description:
      "Atendimento em saúde mental pelo SUS. Consulte a unidade mais próxima de você.",
    icon: Heart,
    color: "from-[#89CFF0] to-[#A7C7E7]",
  },
];

export function Apoio() {
  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Números de <span className="text-[#A7C7E7]">Apoio</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Se você está em crise ou precisa de ajuda imediata, entre em contato com estes
            serviços.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {supportNumbers.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`bg-gradient-to-r ${service.color} p-6`}>
                  <div className="flex items-center space-x-4 text-white">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Icon className="w-8 h-8" />
                    </div>

                    <div>
                      {service.phone ? (
                        <a
                          href={`tel:${service.phone}`}
                          aria-label={`Ligar para ${service.name}, número ${service.number}`}
                          className="text-2xl font-bold hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded"
                        >
                          {service.number}
                        </a>
                      ) : (
                        <h3 className="text-xl font-bold">
                          {service.number}
                        </h3>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {service.name}
                  </h4>

                  <p className="text-gray-600 dark:text-gray-300">
                    {service.description}
                  </p>

                  {service.phone && (
                    <a
                      href={`tel:${service.phone}`}
                      className="mt-4 inline-flex items-center space-x-2 text-[#A7C7E7] hover:text-[#89CFF0] transition-colors font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#89CFF0] rounded"
                    >
                      <Phone className="w-5 h-5" />
                      <span>Ligar agora</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-8 rounded-lg mb-8">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />

            <div>
              <h3 className="text-xl font-bold text-red-900 dark:text-red-200 mb-2">
                Emergência Imediata
              </h3>

              <p className="text-red-800 dark:text-red-300 mb-4">
                Se você está em risco imediato ou pensando em se machucar, procure ajuda
                imediatamente. Em emergências médicas, ligue para o SAMU (192).
                Para apoio emocional, entre em contato com o CVV (188).
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:188"
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  Ligar CVV - 188
                </a>

                <a
                  href="tel:192"
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  Ligar SAMU - 192
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] p-12 rounded-3xl shadow-2xl text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            💙 Você não está sozinho(a)
          </h2>

          <p className="text-xl opacity-90 mb-2">
            Não hesite em pedir ajuda quando precisar
          </p>

          <p className="text-lg opacity-80">
            Buscar apoio é um sinal de coragem e autocuidado
          </p>
        </div>

        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-[#A7C7E7] p-6 rounded-lg">
          <p className="text-gray-800 dark:text-gray-200">
            <strong>💡 Importante:</strong> Os serviços possuem condições próprias de
            atendimento. O CVV é gratuito e sigiloso. Para o CAPS, consulte a unidade
            mais próxima para verificar horários e formas de atendimento.
          </p>
        </div>
      </div>
    </div>
  );
}
