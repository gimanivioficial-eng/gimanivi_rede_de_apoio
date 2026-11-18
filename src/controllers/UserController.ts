import { listaUsuariosExemplo, Usuario } from '../models/types';

export const UserController = {
  // Função que a View vai chamar para listar os usuários na tela
  obterTodosUsuarios(): Usuario[] {
    return listaUsuariosExemplo;
  },

  // Função para buscar um único usuário pelo ID
  buscarPorId(id: string): Usuario | undefined {
    return listaUsuariosExemplo.find(usuario => usuario.id === id);
  }
};
