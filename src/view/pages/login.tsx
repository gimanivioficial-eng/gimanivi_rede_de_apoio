
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../supabase";

type Modo = "login" | "cadastro" | "recuperar" | "novaSenha";

export function Login() {
  const navigate = useNavigate();

  const [modo, setModo] = useState<Modo>("login");
  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  // VERIFICA RECUPERAÇÃO DE SENHA
  useEffect(() => {
    const recuperacaoPendente = sessionStorage.getItem(
      "gimanivi_password_recovery"
    );

    const erroRecuperacao = sessionStorage.getItem(
      "gimanivi_recovery_error"
    );

    if (recuperacaoPendente === "1") {
      setModo("novaSenha");
    }

    if (erroRecuperacao) {
      setErro(erroRecuperacao);
      sessionStorage.removeItem("gimanivi_recovery_error");
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((evento) => {
      if (evento === "PASSWORD_RECOVERY") {
        setModo("novaSenha");
        setErro("");
        setMensagem("");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  function trocarModo(novoModo: Modo) {
    setModo(novoModo);
    setErro("");
    setMensagem("");
    setSenha("");
    setNovaSenha("");
  }

  // LOGIN
  async function entrar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setMensagem("");

    if (!usuario.trim() || !senha.trim()) {
      setErro("Preencha seu e-mail e sua senha.");
      return;
    }

    setCarregando(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: usuario.trim(),
        password: senha,
      });

      if (error) throw error;

      const { data: perfil, error: perfilError } = await supabase
        .from("usuarios")
        .select("role")
        .eq("auth_id", data.user.id)
        .maybeSingle();

      if (perfilError) {
        await supabase.auth.signOut();
        throw new Error(
          "Não foi possível verificar seu perfil. Confira as permissões da tabela usuarios no Supabase."
        );
      }

      if (!perfil) {
        await supabase.auth.signOut();
        throw new Error(
          "Seu perfil não foi encontrado. Entre em contato com a administração."
        );
      }

      navigate("/respiracao", {
        state: {
          role: perfil.role,
          isAdmin: perfil.role === "admin",
        },
      });
    } catch (error: unknown) {
      const mensagemErro =
        error instanceof Error ? error.message : "Não foi possível entrar.";

      setErro(
        mensagemErro === "Invalid login credentials"
          ? "E-mail ou senha incorretos."
          : mensagemErro
      );
    } finally {
      setCarregando(false);
    }
  }

  // CADASTRO
  async function cadastrar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setMensagem("");

    if (!nome.trim() || !usuario.trim() || !senha.trim()) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    setCarregando(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: usuario.trim(),
        password: senha,
        options: {
          data: {
            nome: nome.trim(),
          },
        },
      });

      if (error) throw error;

      if (data.user && !data.session) {
        setMensagem(
          "Cadastro realizado! Confira seu e-mail para confirmar sua conta antes de entrar."
        );
        setModo("login");
        return;
      }

      if (data.user) {
        const { error: perfilError } = await supabase
          .from("usuarios")
          .insert({
            nome: nome.trim(),
            email: usuario.trim(),
            auth_id: data.user.id,
            role: "usuario",
          });

        if (perfilError) {
          throw new Error(
            "A conta foi criada, mas não foi possível salvar o perfil. Verifique as permissões da tabela usuarios."
          );
        }
      }

      navigate("/respiracao");
    } catch (error: unknown) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível realizar o cadastro."
      );
    } finally {
      setCarregando(false);
    }
  }

  // RECUPERAÇÃO DE SENHA
  async function recuperarSenha(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setMensagem("");

    if (!usuario.trim()) {
      setErro("Digite seu e-mail para receber o link de recuperação.");
      return;
    }

    setCarregando(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        usuario.trim(),
        {
          redirectTo: `${window.location.origin}/`,
        }
      );

      if (error) throw error;

      setMensagem(
        "Se esse e-mail estiver cadastrado, você receberá um link para redefinir sua senha. Confira também o spam."
      );
    } catch (error: unknown) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar o link."
      );
    } finally {
      setCarregando(false);
    }
  }

  // SALVAR NOVA SENHA
  async function salvarNovaSenha(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setMensagem("");

    if (novaSenha.length < 6) {
      setErro("A nova senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    setCarregando(true);

    try {
      const { data: sessao } = await supabase.auth.getSession();

      if (!sessao.session) {
        throw new Error(
          "Sua sessão de recuperação não está válida. Solicite um novo link."
        );
      }

      const { error } = await supabase.auth.updateUser({
        password: novaSenha,
      });

      if (error) throw error;

      sessionStorage.removeItem("gimanivi_password_recovery");

      setMensagem("Senha alterada com sucesso! Você já pode entrar.");
      setModo("login");
      setSenha("");
      setNovaSenha("");

      await supabase.auth.signOut();
    } catch (error: unknown) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível alterar a senha."
      );
    } finally {
      setCarregando(false);
    }
  }

  const titulo = {
    login: "Seu espaço seguro",
    cadastro: "Crie sua conta",
    recuperar: "Recupere seu acesso",
    novaSenha: "Nova senha",
  }[modo];

  const descricao = {
    login: "Entre na sua conta para acessar suas ferramentas de bem-estar.",
    cadastro: "Faça seu cadastro e tenha seu próprio espaço de acolhimento.",
    recuperar: "Informe seu e-mail para receber o link de recuperação.",
    novaSenha: "Escolha uma nova senha para sua conta.",
  }[modo];

  return (
    <div className="min-h-screen w-screen flex bg-[#F4F9FC] font-sans antialiased selection:bg-[#A7C7E7]/30">

      {/* COLUNA ESQUERDA */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 md:px-16 lg:px-24 max-w-xl bg-white shadow-[20px_0_60px_rgba(167,199,231,0.08)] z-10">
        <div className="w-full max-w-sm mx-auto">

          {/* LOGO */}
          <div className="flex flex-col mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#A7C7E7] to-[#CBE0F7] flex items-center justify-center shadow-md shadow-blue-100">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-sky-950 to-slate-700 bg-clip-text text-transparent tracking-widest uppercase">
                GIMANIVI
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
              {titulo}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              {descricao}
            </p>
          </div>

          {erro && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold rounded-2xl">
              {erro}
            </div>
          )}

          {mensagem && (
            <div className="mb-6 p-4 bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold rounded-2xl">
              {mensagem}
            </div>
          )}

          <form
            onSubmit={
              modo === "login"
                ? entrar
                : modo === "cadastro"
                ? cadastrar
                : modo === "recuperar"
                ? recuperarSenha
                : salvarNovaSenha
            }
            className="space-y-6"
          >

            {/* NOME */}
            {modo === "cadastro" && (
              <div>
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2.5 ml-1">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  autoComplete="name"
                  required
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-200/60 rounded-2xl text-slate-800 text-sm focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#A7C7E7]/15 focus:border-[#A7C7E7] transition-all"
                />
              </div>
            )}

            {/* E-MAIL */}
            {modo !== "novaSenha" && (
              <div>
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2.5 ml-1">
                  E-mail
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    autoComplete="email"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200/60 rounded-2xl text-slate-800 text-sm focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#A7C7E7]/15 focus:border-[#A7C7E7] transition-all"
                  />
                </div>
              </div>
            )}

            {/* SENHA DE LOGIN / CADASTRO */}
            {(modo === "login" || modo === "cadastro") && (
              <div>
                <div className="flex justify-between items-center mb-2.5 ml-1">
                  <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                    Senha de acesso
                  </label>

                  {modo === "login" && (
                    <button
                      type="button"
                      onClick={() => trocarModo("recuperar")}
                      className="text-[11px] text-sky-600 font-bold hover:underline"
                    >
                      Esqueceu?
                    </button>
                  )}
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>

                  <input
                    type={mostrarSenha ? "text" : "password"}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Sua senha"
                    autoComplete={modo === "cadastro" ? "new-password" : "current-password"}
                    required
                    className="w-full pl-12 pr-20 py-4 bg-slate-50 border border-slate-200/60 rounded-2xl text-slate-800 text-sm focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#A7C7E7]/15 focus:border-[#A7C7E7] transition-all"
                  />

                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-sky-600 cursor-pointer text-xs font-bold"
                  >
                    {mostrarSenha ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>
            )}

            {/* NOVA SENHA */}
            {modo === "novaSenha" && (
              <div>
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2.5 ml-1">
                  Nova senha
                </label>
                <input
                  type="password"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="Digite sua nova senha"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-200/60 rounded-2xl text-slate-800 text-sm focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#A7C7E7]/15 focus:border-[#A7C7E7] transition-all"
                />
              </div>
            )}

            {/* BOTÃO */}
            <div className="relative pt-2">
              <div className="absolute inset-x-4 bottom-[-4px] top-4 bg-[#A7C7E7] rounded-2xl blur-lg opacity-50 transform translate-y-1"></div>

              <button
                type="submit"
                disabled={carregando}
                className="w-full relative bg-gradient-to-r from-[#A7C7E7] to-[#8ebae4] hover:from-[#9bc1e8] hover:to-[#7daadd] active:scale-[0.98] disabled:opacity-60 text-white font-bold py-4 rounded-2xl transition-all duration-300 cursor-pointer text-sm tracking-widest uppercase shadow-md"
              >
                {carregando
                  ? "Aguarde..."
                  : modo === "login"
                  ? "Acessar Portal"
                  : modo === "cadastro"
                  ? "Criar minha conta"
                  : modo === "recuperar"
                  ? "Enviar link"
                  : "Salvar nova senha"}
              </button>
            </div>
          </form>

          {/* NAVEGAÇÃO */}
          <div className="mt-6 text-center space-y-3">
            {modo === "login" && (
              <p className="text-xs text-slate-400">
                Ainda não tem uma conta?{" "}
                <button
                  type="button"
                  onClick={() => trocarModo("cadastro")}
                  className="text-sky-600 font-bold hover:underline"
                >
                  Criar conta
                </button>
              </p>
            )}

            {modo !== "login" && (
              <button
                type="button"
                onClick={() => trocarModo("login")}
                className="text-xs text-sky-600 font-bold hover:underline"
              >
                Voltar para o login
              </button>
            )}
          </div>

          {/* RODAPÉ */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400 font-medium">
              TCC Centro Universitário — Projeto GIMANIVI
            </p>
          </div>
        </div>
      </div>

      {/* COLUNA DIREITA */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-tr from-[#E3F2FD] via-[#F0F6FA] to-[#FFF0F5] items-center justify-center overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#A7C7E7]/40 to-[#EBF3FC]/30 blur-[120px] -top-20 -right-20 animate-pulse" style={{ animationDuration: "9s" }}></div>

        <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#FFE4EC]/40 to-[#B5FFFC]/20 blur-[130px] -bottom-20 -left-10 animate-pulse" style={{ animationDuration: "13s" }}></div>

        <div className="max-w-md p-10 z-10 bg-white/35 backdrop-blur-2xl rounded-[36px] border border-white/60 shadow-[0_30px_60px_-15px_rgba(146,187,230,0.2)] text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center shadow-lg text-[#A7C7E7]">
            <svg className="w-8 h-8 animate-spin" style={{ animationDuration: "30s" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">
            Respire fundo, viva melhor
          </h3>

          <p className="text-slate-600 leading-relaxed text-sm mb-4">
            Um ambiente terapêutico desenvolvido para auxiliar no controle da ansiedade e no monitoramento da saúde mental.
          </p>

          <div className="w-16 h-[2px] bg-[#A7C7E7] mx-auto rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
