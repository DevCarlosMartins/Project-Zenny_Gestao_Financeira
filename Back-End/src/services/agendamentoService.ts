import { agendamentoRepository } from "../repositories/agendamentoRepository"

export const agendamentoService = {
  
  createAgendamento: async (
    nome: string,
    descricao: string | undefined,
    data: Date,
    horario: Date,
    usuarioId: number
  ) => {
    return agendamentoRepository.create({ nome, descricao, data, horario, usuarioId })
  },

  getAgendamentos: async () => {
    return agendamentoRepository.findAll()
  },

  getAgendamentoById: async (id: number) => {
    return agendamentoRepository.findById(id)
  },

  updateAgendamento: async (id: number, data: any) => {
    return agendamentoRepository.update(id, data)
  },

  deleteAgendamento: async (id: number) => {
    return agendamentoRepository.delete(id)
  },
}
