import { extratoRepository } from "../repositories/extratoRepository"

export const extratoService = {
    createExtrato: async (
    valor: number,
    tipo: "CREDITO" | "DEBITO",
    usuarioId: number,
    contraparte?: string
  ) => {
    return extratoRepository.create({ valor, tipo, usuarioId, contraparte })
  },

  getExtratos: async() => {
    return extratoRepository.findAll()
  },

  getExtratoById: async(id: number) => {
    return extratoRepository.findById(id)
  },

  getExtratoByUsuario: async(usuarioId: number) => {
    return extratoRepository.findByUsuarioId(usuarioId)
  },

  updateExtrato: async (id: number, data: any) => {
    return extratoRepository.update(id, data)
  },

  deleteExtrato: async (id: number) => {
    return extratoRepository.delete(id)
  },
}