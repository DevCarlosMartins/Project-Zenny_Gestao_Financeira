import { totalPontosRepository } from "../repositories/totalPontosRepository";

export const totalPontosService = {
  createTotalPonto: async (ponto: number, logPontoId: number) => {
    return totalPontosRepository.create({ ponto, logPontoId });
  },

  getTotalPontos: async () => {
    return totalPontosRepository.findAll();
  },

  getTotalPontoById: async (id: number) => {
    return totalPontosRepository.findById(id);
  },

  getTotalPontoByLogPonto: async (logPontoId: number) => {
    return totalPontosRepository.findByLogPontoId(logPontoId);
  },

  updateTotalPonto: async (id: number, data: any) => {
    return totalPontosRepository.update(id, data);
  },

  deleteTotalPonto: async (id: number) => {
    return totalPontosRepository.delete(id);
  },
};