
import { createRoot } from "react-dom/client";
import { supabase } from "../supabase";
import "./styles/index.css";

async function iniciarAplicacao() {
  const url = new URL(window.location.href);

  // Verifica se o Supabase retornou um código PKCE.
  const codigo = url.searchParams.get("code");

  if (codigo) {
    const { error } = await supabase.auth.exchangeCodeForSession(codigo);

    if (error) {
      console.error("Erro ao confirmar o e-mail:", error.message);
    }

    window.history.replaceState(
      {},
      document.title,
      `${window.location.pathname}#/login`
    );
  } else {
    // Verifica os tokens enviados no endereço pelo Supabase.
    const hash = window.location.hash;
    const parametros = new URLSearchParams(hash.replace(/^#/, ""));

    const accessToken = parametros.get("access_token");
    const refreshToken = parametros.get("refresh_token");
    const tipo = parametros.get("type");

    // Confirmação de cadastro ou recuperação de senha.
    if (
      (tipo === "signup" || tipo === "recovery") &&
      accessToken &&
      refreshToken
    ) {
      if (tipo === "recovery") {
        sessionStorage.setItem("gimanivi_password_recovery", "1");
      }

      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error) {
        console.error("Erro ao validar o link:", error.message);

        if (tipo === "recovery") {
          sessionStorage.removeItem("gimanivi_password_recovery");
          sessionStorage.setItem(
            "gimanivi_recovery_error",
            "O link de recuperação expirou ou não é válido. Solicite outro."
          );
        }
      }

      // Limpa os tokens e direciona para o login.
      window.history.replaceState(
        {},
        document.title,
        `${window.location.pathname}#/login`
      );
    }
  }

  // Inicia o site somente depois de processar o retorno do Supabase.
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
