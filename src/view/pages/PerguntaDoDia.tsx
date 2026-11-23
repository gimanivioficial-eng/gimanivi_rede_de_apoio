
import { useState, useEffect } from "react";
import {
  MessageCircle,
  RefreshCw,
  Sparkles,
  Trash2,
} from "lucide-react";
import { supabase } from "../../supabase";

const questions = [
  "O que te fez sorrir hoje? 😊",
  "O que você precisa agora? 💭",
  "O que você pode fazer por você hoje? 💙",
  "Qual foi a última vez que você se sentiu orgulhoso(a) de si mesmo(a)? 🌟",
  "O que você gostaria de deixar para trás hoje? 🍃",
  "Qual pequena coisa te trouxe alegria recentemente? ✨",
  "Como você pode ser mais gentil consigo hoje? 💕",
  "O que você está grato(a) neste momento? 🙏",
  "Que palavra descreveria como você se sente agora? 🎨",
  "O que seu corpo está tentando te dizer? 🧘‍♀️",
  "Qual é um sonho que você ainda quer realizar? 🌈",
  "Como você pode tornar o dia de alguém melhor? 🤝",
  "O que você aprendeu sobre si mesmo(a) recentemente? 📚",
  "Qual é uma coisa que você ama em você? 💖",
  "Como você se sentiria se falasse consigo como fala com seu melhor amigo? 🫂",
];

interface Reflection {
  id: number;
  pergunta: string;
  resposta: string;
  created_at: string;
}

export function PerguntaDoDia() {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [savedAnswers, setSavedAnswers] = useState<Reflection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const randomIndex = Math.floor(Math.random() * questions.length);
      setCurrentQuestion(questions[randomIndex]);

      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authData.user) {
        setFeedback("Entre na sua conta para acessar suas reflexões.");
        setLoading(false);
        return;
      }

      setUserId(authData.user.id);

      const { data, error } = await supabase
        .from("reflexoes")
        .select("id, pergunta, resposta, created_at")
        .eq("user_id", authData.user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Erro ao carregar reflexões:", error);
        setFeedback("Não foi possível carregar suas reflexões.");
      } else {
        setSavedAnswers(data ?? []);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  const handleNewQuestion = () => {
    let newIndex = Math.floor(Math.random() * questions.length);

    while (questions.length > 1 && questions[newIndex] === currentQuestion) {
      newIndex = Math.floor(Math.random() * questions.length);
    }

    setCurrentQuestion(questions[newIndex]);
    setUserAnswer("");
    setFeedback("");
  };

  const handleSaveAnswer = async () => {
    if (!userAnswer.trim() || !userId || saving) return;

    setSaving(true);
    setFeedback("");

    const { data, error } = await supabase
      .from("reflexoes")
      .insert({
        user_id: userId,
        pergunta: currentQuestion,
        resposta: userAnswer.trim(),
      })
      .select("id, pergunta, resposta, created_at")
      .single();

    if (error) {
      console.error("Erro ao salvar reflexão:", error);
      setFeedback("Não foi possível salvar. Tente novamente.");
      setSaving(false);
      return;
    }

    setSavedAnswers((previous) => [data, ...previous].slice(0, 5));
    setUserAnswer("");
    setFeedback("Sua reflexão foi salva com privacidade! 💙");
    setSaving(false);

    handleNewQuestion();
  };

  const handleDeleteReflection = async (reflectionId: number) => {
    const confirmed = window.confirm(
      "Tem certeza de que deseja excluir esta reflexão? Essa ação não poderá ser desfeita."
    );

    if (!confirmed || !userId || deletingId !== null) return;

    setDeletingId(reflectionId);
    setFeedback("");

    const { error } = await supabase
      .from("reflexoes")
      .delete()
      .eq("id", reflectionId)
      .eq("user_id", userId);

    if (error) {
      console.error("Erro ao excluir reflexão:", error);
      setFeedback("Não foi possível excluir a reflexão. Tente novamente.");
      setDeletingId(null);
      return;
    }

    setSavedAnswers((previous) =>
      previous.filter((item) => item.id !== reflectionId)
    );

    setFeedback("Reflexão excluída com sucesso! 💙");
    setDeletingId(null);
  };

  return (
    <div className="pt-20 bg-gradient-to-b from-white to-[#A7C7E7]/5 dark:from-gray-900 dark:to-[#A7C7E7]/10 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28">

        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Pergunta do <span className="text-[#A7C7E7]">Dia</span>
          </h1>

          <p className="text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Um momento de reflexão e autoconhecimento
          </p>
        </div>

        {/* Pergunta principal */}
        <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl overflow-hidden mb-12 animate-fade-in">
          <div className="bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] p-12 text-white text-center">
            <MessageCircle className="w-20 h-20 mx-auto mb-6 animate-bounce-slow" />

            <h2 className="text-4xl md:text-5xl font-bold leading-relaxed">
              {currentQuestion || "Carregando pergunta..."}
            </h2>
          </div>

          <div className="p-10 space-y-8">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-3">
                Sua resposta (opcional):
              </label>

              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Escreva seus pensamentos aqui..."
                rows={4}
                disabled={!userId || saving}
                className="w-full px-6 py-4 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-transparent focus:border-[#A7C7E7] focus:outline-none resize-none disabled:opacity-60"
              />
            </div>

            {feedback && (
              <p className="text-center text-sm font-medium text-[#6385A8] dark:text-blue-200">
                {feedback}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSaveAnswer}
                disabled={!userAnswer.trim() || !userId || saving || loading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#A7C7E7] to-[#89CFF0] text-white rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5" />
                <span>{saving ? "Salvando..." : "Salvar Reflexão"}</span>
              </button>

              <button
                onClick={handleNewQuestion}
                disabled={!userId}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Nova Pergunta</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reflexões recentes */}
        <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl p-10 mb-12 animate-fade-in-up">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
            <span className="text-[#A7C7E7] mr-4 text-4xl">📝</span>
            Suas reflexões recentes
          </h3>

          {loading ? (
            <p className="text-gray-500 dark:text-gray-400">
              Carregando suas reflexões...
            </p>
          ) : savedAnswers.length > 0 ? (
            <div className="space-y-6">
              {savedAnswers.map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-r from-[#A7C7E7]/10 to-[#89CFF0]/10 p-6 rounded-2xl"
                >
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <p className="font-semibold text-[#A7C7E7]">
                      {item.pergunta}
                    </p>

                    <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {new Date(item.created_at).toLocaleDateString("pt-BR")}
                    </span>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 italic break-words">
                    "{item.resposta}"
                  </p>

                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => handleDeleteReflection(item.id)}
                      disabled={deletingId !== null}
                      aria-label="Excluir reflexão"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="font-semibold text-sm">
                        {deletingId === item.id ? "Excluindo..." : "Excluir"}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Você ainda não possui reflexões salvas. Este espaço é seu! 💙
            </p>
          )}
        </div>

        {/* Informações */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-[#A7C7E7]/10 to-[#89CFF0]/10 p-8 rounded-3xl">
            <div className="text-5xl mb-4">💭</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Por que refletir?
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              A autorreflexão ajuda a desenvolver autoconhecimento, reduzir estresse e tomar
              decisões mais alinhadas com seus valores.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#89CFF0]/10 to-[#A7C7E7]/10 p-8 rounded-3xl">
            <div className="text-5xl mb-4">🌱</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Sem julgamento
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Não há respostas certas ou erradas. Este é um espaço seguro para explorar seus
              pensamentos e sentimentos.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-[#A7C7E7] p-8 rounded-2xl">
            <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
              <strong>💡 Dica:</strong> Volte aqui diariamente para novas perguntas e acompanhe
              sua jornada de autoconhecimento através das suas reflexões salvas.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#A7C7E7]/10 to-[#89CFF0]/10 p-10 rounded-3xl text-center">
            <p className="text-2xl text-gray-800 dark:text-gray-200 font-semibold mb-4 leading-relaxed">
              💙 Seus pensamentos e sentimentos são importantes
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Dar voz às suas emoções é um ato de coragem e autocuidado
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#A7C7E7]/5 to-[#89CFF0]/5 p-8 rounded-3xl text-center">
              <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
                🌟 Você tem valor
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#89CFF0]/5 to-[#A7C7E7]/5 p-8 rounded-3xl text-center">
              <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
                💪 Você é capaz
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#A7C7E7]/5 to-[#89CFF0]/5 p-8 rounded-3xl text-center">
              <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
                ✨ Você importa
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
