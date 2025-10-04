import { usuarioRepository } from "../repositories/usuarioRepository"

export const usuarioService = {
  
  createUsuario: async (nome: string, senha: string, saldo = 0) => {
    return usuarioRepository.create({ nome, senha, saldo })
  },

  getUsuarios: async () => {
    return usuarioRepository.findAll()
  },

  getUsuarioById: async (id: number) => {
    return usuarioRepository.findById(id)
  },

  updateUsuario: async (id: number, data: any) => {
    return usuarioRepository.update(id, data)
  },

  deleteUsuario: async (id: number) => {
    return usuarioRepository.delete(id)
  },
}
