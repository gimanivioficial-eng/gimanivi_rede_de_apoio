
import { createHashRouter } from "react-router";
import { Layout } from "../view/components/Layout";
import { Home } from "../view/pages/Home";
import { Sobre } from "../view/pages/Sobre";
import { Origem } from "../view/pages/Origem";
import { Equipe } from "../view/pages/Equipe";
import { Projeto } from "../view/pages/projeto";
import { Login } from "../view/pages/login";
import { Respiracao } from "../view/pages/Respiracao";
import { Acessibilidade } from "../view/pages/Acessibilidade";
import { Apoio } from "../view/pages/Apoio";
import { Contato } from "../view/pages/Contato";
import { Grounding } from "../view/pages/Grounding";
import { Mensagens } from "../view/pages/Mensagens";
import { SonsCalmantes } from "../view/pages/SonsCalmantes";
import { MiniExercicios } from "../view/pages/MiniExercicios";
import { Sentimentos } from "../view/pages/Sentimentos";
import { PerguntaDoDia } from "../view/pages/PerguntaDoDia";

export const router = createHashRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "sobre", Component: Sobre },
      { path: "origem", Component: Origem },
      { path: "equipe", Component: Equipe },
      { path: "projeto", Component: Projeto },
      { path: "respiracao", Component: Respiracao },
      { path: "acessibilidade", Component: Acessibilidade },
      { path: "apoio", Component: Apoio },
      { path: "contato", Component: Contato },
      { path: "grounding", Component: Grounding },
      { path: "mensagens", Component: Mensagens },
      { path: "sons-calmantes", Component: SonsCalmantes },
      { path: "mini-exercicios", Component: MiniExercicios },
      { path: "sentimentos", Component: Sentimentos },
      { path: "pergunta-do-dia", Component: PerguntaDoDia },
    ],
  },
]);
