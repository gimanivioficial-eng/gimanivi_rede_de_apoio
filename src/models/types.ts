// Define a estrutura de um Usuário no sistema
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: 'administrador' | 'comum';
  dataCriacao: string;
}

// Dados simulados (Mock) para que as suas telas exibam informações de teste
export const listaUsuariosExemplo: Usuario[] = [
  {
    id: "1",
    nome: "Administrador TCC",
    email: "admin@tcc.com",
    tipo: "administrador",
    dataCriacao: "2026-08-12"
  },
  {
    id: "2",
    nome: "Usuário Teste",
    email: "user@tcc.com",
    tipo: "comum",
    dataCriacao: "2026-08-12"
  }
];
