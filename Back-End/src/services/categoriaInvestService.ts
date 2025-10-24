import { categoriaInvestRepository } from "../repositories/categoriaInvestRepository";

export const categoriaInvestService = {

  createCategoria: async (nome: string, descricao?: string) => {
    return categoriaInvestRepository.create({ nome, descricao });
  },

  getCategorias: async () => {
    return categoriaInvestRepository.findAll();
  },

  getCategoriaById: async (id: number) => {
    return categoriaInvestRepository.findById(id);
  },

  updateCategoria: async (id: number, data: any) => {
    return categoriaInvestRepository.update(id, data);
  },

  deleteCategoria: async (id: number) => {
    return categoriaInvestRepository.delete(id);
  },
};