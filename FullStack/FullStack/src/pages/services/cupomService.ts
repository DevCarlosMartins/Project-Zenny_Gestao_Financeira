import { cupomRepository } from "../repositories/cupomRepository";

export const cupomService = {
  createCupom: async (
    valorDesc: number,
    codigo: string,
    patrocinadoraId: number,
    descricao?: string,
    observacao?: string
  ) => {
    return cupomRepository.create({
      valorDesc,
      codigo,
      patrocinadoraId,
      descricao,
      observacao,
    });
  },

  getCupons: async () => {
    return cupomRepository.findAll();
  },

  getCupomById: async (id: number) => {
    return cupomRepository.findById(id);
  },

  getCuponsByPatrocinadora: async (patrocinadoraId: number) => {
    return cupomRepository.findByPatrocinadoraId(patrocinadoraId);
  },

  updateCupom: async (id: number, data: any) => {
    return cupomRepository.update(id, data);
  },

  deleteCupom: async (id: number) => {
    return cupomRepository.delete(id);
  },
};