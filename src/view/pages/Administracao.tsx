
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  ShieldCheck,
  RefreshCw,
  Users,
  UserCheck,
  UserX,
  Search,
  CheckCircle2,
  Clock,
  Heart,
  UserRound,
} from "lucide-react";
import { supabase } from "../../supabase";

type Usuario = {
  id: number;
  nome: string | null;
  email: string | null;
  role: string;
  ativo: boolean;
  created_at: string;
};

type Filtro = "todos" | "ativos" | "desativados";

export function Administracao() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [reativando, setReativando] = useState<number | null>(null);
  const [pesquisa, setPesquisa] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function carregarUsuarios() {
    setErro("");
    setAtualizando(true);

    try {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authData.user) {
        navigate("/login");
        return;
      }

      const { data: perfil, error: perfilError } = await supabase
        .from("usuarios")
        .select("role, ativo")
        .eq("auth_id", authData.user.id)
        .maybeSingle();

      if (
        perfilError ||
        !perfil ||
        perfil.role !== "admin" ||
        perfil.ativo !== true
      ) {
        navigate("/respiracao");
        return;
      }

      const { data, error } = await supabase.rpc("admin_listar_usuarios");

      if (error) throw error;

      setUsuarios((data ?? []) as Usuario[]);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível carregar os usuários. Tente novamente.");
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }

  async function reativarUsuario(id: number) {
    const usuario = usuarios.find((u) => u.id === id);

    if (!usuario || usuario.ativo) return;

    const confirmar = window.confirm(
      `Deseja reativar a conta de ${usuario.nome || usuario.email || "este usuário"}?`
    );

    if (!confirmar) return;

    setReativando(id);
    setErro("");
    setMensagem("");

    try {
      const { error } = await supabase.rpc("admin_reativar_usuario", {
        p_usuario_id: id,
      });

      if (error) throw error;

      setMensagem("Conta reativada com sucesso! 💙");
      await carregarUsuarios();
    } catch (error) {
      console.error(error);
      setErro("Não foi possível reativar esta conta. Tente novamente.");
    } finally {
      setReativando(null);
    }
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const ativos = usuarios.filter((u) => u.ativo).length;
  const desativados = usuarios.filter((u) => !u.ativo).length;
  const administradores = usuarios.filter(
    (u) => u.role === "admin"
  ).length;

  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter((usuario) => {
      const correspondePesquisa =
        (usuario.nome || "")
          .toLowerCase()
          .includes(pesquisa.toLowerCase()) ||
        (usuario.email || "")
          .toLowerCase()
          .includes(pesquisa.toLowerCase());

      const correspondeFiltro =
        filtro === "todos" ||
        (filtro === "ativos" && usuario.ativo) ||
        (filtro === "desativados" && !usuario.ativo);

      return correspondePesquisa && correspondeFiltro;
    });
  }, [usuarios, pesquisa, filtro]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#EDF6FF] via-[#F7FAFE] to-white px-4 pb-16 pt-28">
      <div className="mx-auto max-w-6xl">

        {/* Cabeçalho */}
        <header className="mb-9 overflow-hidden rounded-3xl bg-white shadow-sm border border-blue-100">
          <div className="relative p-6 sm:p-9">
            <div className="absolute -right-8 -top-12 h-48 w-48 rounded-full bg-[#DCEEFF] opacity-70" />
            <div className="absolute right-28 -bottom-16 h-36 w-36 rounded-full bg-[#EAF4FF]" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#EAF4FF] px-4 py-2 text-sm font-semibold text-[#668DB5]">
                  <ShieldCheck size={17} />
                  Painel exclusivo da administração
                </div>

                <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
                  Olá, administradora! 💙
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
                  Aqui você pode acompanhar as contas do GIMANIVI e
                  ajudar os usuários a recuperarem seu acesso.
                </p>
              </div>

              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center self-start rounded-3xl bg-[#EAF4FF] text-[#668DB5] sm:self-center">
                <ShieldCheck size={48} strokeWidth={1.5} />
                <Heart
                  size={20}
                  className="absolute -bottom-2 -right-2 fill-white text-[#83AED8]"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Mensagens */}
        {mensagem && (
          <div className="mb-5 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            <CheckCircle2 size={21} />
            {mensagem}
          </div>
        )}

        {erro && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {erro}
          </div>
        )}

        {/* Indicadores */}
        <section className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF4FF] text-[#668DB5]">
              <Users size={24} />
            </div>
            <p className="text-sm text-slate-500">Total de contas</p>
            <p className="mt-1 text-3xl font-bold text-slate-800">
              {usuarios.length}
            </p>
          </div>

          <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
              <UserCheck size={24} />
            </div>
            <p className="text-sm text-slate-500">Contas ativas</p>
            <p className="mt-1 text-3xl font-bold text-slate-800">
              {ativos}
            </p>
          </div>

          <div className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <UserX size={24} />
            </div>
            <p className="text-sm text-slate-500">Contas desativadas</p>
            <p className="mt-1 text-3xl font-bold text-slate-800">
              {desativados}
            </p>
          </div>

          <div className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
              <ShieldCheck size={24} />
            </div>
            <p className="text-sm text-slate-500">Administradores</p>
            <p className="mt-1 text-3xl font-bold text-slate-800">
              {administradores}
            </p>
          </div>
        </section>

        {/* Gerenciamento */}
        <section className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">
          <div className="border-b border-blue-50 p-5 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Gerenciamento de usuários
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Consulte e gerencie as contas cadastradas.
                </p>
              </div>

              <button
                onClick={carregarUsuarios}
                disabled={atualizando}
                className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 px-4 py-3 text-sm font-semibold text-[#668DB5] transition hover:bg-blue-50 disabled:opacity-50"
              >
                <RefreshCw
                  size={17}
                  className={atualizando ? "animate-spin" : ""}
                />
                Atualizar lista
              </button>
            </div>

            {/* Pesquisa */}
            <div className="relative mt-6">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                placeholder="Pesquisar por nome ou e-mail..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-[#83AED8] focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Filtros */}
            <div className="mt-5 flex flex-wrap gap-2">
              {(
                [
                  ["todos", "Todas as contas"],
                  ["ativos", "Ativas"],
                  ["desativados", "Desativadas"],
                ] as [Filtro, string][]
              ).map(([valor, texto]) => (
                <button
                  key={valor}
                  onClick={() => setFiltro(valor)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    filtro === valor
                      ? "bg-[#A7C7E7] text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-blue-50"
                  }`}
                >
                  {texto}
                </button>
              ))}
            </div>
          </div>

          {/* Lista */}
          <div className="p-5 sm:p-7">
            {carregando ? (
              <div className="flex flex-col items-center py-16 text-slate-400">
                <RefreshCw size={30} className="mb-3 animate-spin text-[#83AED8]" />
                <p className="text-sm">Carregando usuários...</p>
              </div>
            ) : usuariosFiltrados.length === 0 ? (
              <div className="flex flex-col items-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF4FF] text-[#83AED8]">
                  <Users size={30} />
                </div>
                <p className="font-semibold text-slate-700">
                  Nenhum usuário encontrado
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Tente mudar sua pesquisa ou o filtro selecionado.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {usuariosFiltrados.map((usuario) => (
                  <article
                    key={usuario.id}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 transition hover:border-blue-200 hover:bg-[#FBFDFF] sm:flex-row sm:items-center sm:justify-between sm:p-5"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF4FF] text-[#668DB5]">
                        <UserRound size={24} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-slate-800">
                          {usuario.nome || "Nome não informado"}
                        </h3>

                        <p className="break-all text-sm text-slate-500">
                          {usuario.email || "E-mail não informado"}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                              usuario.ativo
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-600"
                            }`}
                          >
                            {usuario.ativo ? (
                              <CheckCircle2 size={13} />
                            ) : (
                              <Clock size={13} />
                            )}
                            {usuario.ativo ? "Conta ativa" : "Conta desativada"}
                          </span>

                          {usuario.role === "admin" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
                              <ShieldCheck size={13} />
                              Administrador
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {!usuario.ativo && (
                      <button
                        onClick={() => reativarUsuario(usuario.id)}
                        disabled={reativando !== null}
                        className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#A7C7E7] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#83AED8] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {reativando === usuario.id ? (
                          <>
                            <RefreshCw size={16} className="animate-spin" />
                            Reativando...
                          </>
                        ) : (
                          <>
                            <UserCheck size={17} />
                            Reativar conta
                          </>
                        )}
                      </button>
                    )}
                  </article>
                ))}
              </div>
            )}

            {!carregando && usuariosFiltrados.length > 0 && (
              <p className="mt-5 text-center text-xs text-slate-400">
                Exibindo {usuariosFiltrados.length} de {usuarios.length} contas
              </p>
            )}
          </div>
        </section>

        <footer className="mt-8 text-center">
          <p className="flex items-center justify-center gap-2 text-sm text-slate-400">
            Feito com <Heart size={14} className="fill-pink-300 text-pink-300" />
            para cuidar da comunidade GIMANIVI
          </p>
        </footer>
      </div>
    </main>
  );
}
