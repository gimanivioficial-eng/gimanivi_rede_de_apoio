import { createRoot } from "react-dom/client";
import { supabase } from "../supabase";
import "./styles/index.css";

async function iniciarAplicacao() {
  const hash = window.location.hash;

  // Verifica se o endereço contém um link de recuperação.
  const parametros = new URLSearchParams(hash.replace(/^#/, ""));

  const accessToken = parametros.get("access_token");
  const refreshToken = parametros.get("refresh_token");
  const tipo = parametros.get("type");

  if (tipo === "recovery" && accessToken && refreshToken) {
    // Salva a informação para a tela de login abrir no modo correto.
    sessionStorage.setItem("gimanivi_password_recovery", "1");

    // Valida os tokens e cria a sessão de recuperação.
    const { error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (error) {
      sessionStorage.removeItem("gimanivi_password_recovery");
      sessionStorage.setItem(
        "gimanivi_recovery_error",
        "O link de recuperação expirou ou não é válido. Solicite outro."
      );
    }

    // Limpa os tokens da barra de endereço.
    window.history.replaceState(
      {},
      document.title,
      `${window.location.pathname}${window.location.search}#/login`
    );
  }

  // Importa o aplicativo somente depois de tratar o link.
  const { default: App } = await import("./App.tsx");

  const elemento = document.getElementById("root");

  if (!elemento) {
    throw new Error("Elemento root não encontrado.");
  }

  createRoot(elemento).render(<App />);
}

iniciarAplicacao().catch((error) => {
  console.error("Erro ao iniciar o GIMANIVI:", error);
});