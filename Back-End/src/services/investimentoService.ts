import { investimentoRepository } from "../repositories/investimentoRepository"

export const investimentoService = {
  
  createInvestimento: async (
    nome: string,
    categoria: string,
    data: Date,
    corretora: string,
    valorInvest: number,
    usuarioId: number
  ) => {
    return investimentoRepository.create({
      nome,
      categoria,
      data,
      corretora,
      valorInvest,
      usuarioId,
    })
  },

  getInvestimentos: async () => {
    return investimentoRepository.findAll()
  },

  getInvestimentoById: async (id: number) => {
    return investimentoRepository.findById(id)
  },

  updateInvestimento: async (id: number, data: any) => {
    return investimentoRepository.update(id, data)
  },

  deleteInvestimento: async (id: number) => {
    return investimentoRepository.delete(id)
  },
}