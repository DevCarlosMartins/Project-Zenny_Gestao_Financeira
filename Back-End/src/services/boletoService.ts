import { boletoRepository } from "../repositories/boletoRepository"

export const boletoService = {

  createBoleto: async (
    cedente: string,
    dataValid: Date,
    valor: number,
    status: string,
    usuarioId: number
  ) => {
    return boletoRepository.create({
      cedente,
      dataValid,
      valor,
      status,
      usuarioId,
    })
  },

  getBoletos: async () => {
    return boletoRepository.findAll()
  },

  getBoletoById: async (id: number) => {
    return boletoRepository.findById(id)
  },

  updateBoleto: async (id: number, data: any) => {
    return boletoRepository.update(id, data)
  },

  deleteBoleto: async (id: number) => {
    return boletoRepository.delete(id)
  },
}
