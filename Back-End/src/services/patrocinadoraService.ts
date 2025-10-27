import { patrocinadoraRepository } from "../repositories/patrocinadoraRepository";

export const patrocinadoraService = {
  createPatrocinadora: async (nome: string, cnpj: string, nomeFant: string) => {
    return patrocinadoraRepository.create({ nome, cnpj, nomeFant });
  },

  getPatrocinadoras: async () => {
    return patrocinadoraRepository.findAll();
  },

  getPatrocinadoraById: async (id: number) => {
    return patrocinadoraRepository.findById(id);
  },

  updatePatrocinadora: async (id: number, data: any) => {
    return patrocinadoraRepository.update(id, data);
  },

  deletePatrocinadora: async (id: number) => {
    return patrocinadoraRepository.delete(id);
  },
};