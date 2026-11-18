import { useState, useRef, useEffect } from "react";
import { Send, Heart } from "lucide-react";

interface Message {
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const autoResponses = [
  "Estou aqui com você 💙",
  "Você não está sozinho(a) 🫂",
  "Quer conversar mais sobre isso?",
  "Seus sentimentos são válidos ✨",
  "Estou te ouvindo com atenção 👂",
  "Você está fazendo o melhor que pode 💪",
  "É corajoso falar sobre seus sentimentos 🌟",
  "Agradeço por compartilhar isso comigo 🙏",
  "Como posso te apoiar melhor?",
  "Lembre-se: dias difíceis passam 🌈",
];

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Olá! Bem-vindo(a) ao chat de apoio GIMANIVI 💙 Como você está se sentindo hoje?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() === "") return;

    const userMessage: Message = {
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");

    // Auto response after a short delay
    setTimeout(() => {
      const randomResponse =
        autoResponses[Math.floor(Math.random() * autoResponses.length)];
      const botMessage: Message = {
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Chat de <span className="text-[#A7C7E7]">Apoio</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Um espaço seguro para compartilhar seus sentimentos
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] p-6 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#A7C7E7]" />
              </div>
              <div>
                <h3 className="font-bold text-lg">GIMANIVI Apoio</h3>
                <p className="text-sm opacity-90">Sempre disponível para você</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-[#f0f8ff] dark:bg-gray-900">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-6 py-3 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] text-white"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md"
                  }`}
                >
                  <p className="break-words">{message.text}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.sender === "user" ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A7C7E7]"
              />
              <button
                onClick={handleSend}
                className="px-6 py-3 bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-200">
            <strong>Aviso:</strong> Este é um chat de apoio automatizado. Se você está em crise,
            por favor, entre em contato com os{" "}
            <a href="/apoio" className="underline font-semibold">
              números de emergência
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
