import { investimentoRepository } from "../repositories/investimentoRepository"

export const investimentoService = {

  createInvestimento: async (
    data: Date,
    corretora: string,
    valorInvest: number,
    usuarioId: number,
    categoriaId?: number | null
  ) => {
    return investimentoRepository.create({
      data,
      corretora,
      valorInvest,
      usuarioId,
      categoriaId: categoriaId ?? undefined,
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
