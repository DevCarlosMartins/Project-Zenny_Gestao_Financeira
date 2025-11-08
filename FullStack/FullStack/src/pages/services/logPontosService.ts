import { logPontosRepository } from "../repositories/logPontosRepository";

export const logPontosService = {
  createLogPonto: async (
    operacao: string,
    usuarioId: number,
    extratoId?: number
  ) => {
    return logPontosRepository.create({ operacao, usuarioId, extratoId });
  },

  getLogPontos: async () => {
    return logPontosRepository.findAll();
  },

  getLogPontoById: async (id: number) => {
    return logPontosRepository.findById(id);
  },

  getLogPontoByUsuario: async (usuarioId: number) => {
    return logPontosRepository.findByUsuarioId(usuarioId);
  },

  updateLogPonto: async (id: number, data: any) => {
    return logPontosRepository.update(id, data);
  },

  deleteLogPonto: async (id: number) => {
    return logPontosRepository.delete(id);
  },
};
