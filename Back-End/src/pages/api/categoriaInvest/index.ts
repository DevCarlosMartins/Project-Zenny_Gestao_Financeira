import type { NextApiRequest, NextApiResponse } from "next";
import { categoriaInvestService } from "../../../services/categoriaInvestService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const categorias = await categoriaInvestService.getCategorias();
    return res.status(200).json(categorias);
  }

  if (req.method === "POST") {
    const { nome, descricao } = req.body;
    if (!nome) return res.status(400).json({ message: "Nome é obrigatório" });

    const categoria = await categoriaInvestService.createCategoria(nome, descricao);
    return res.status(201).json(categoria);
  }

  return res.status(405).json({ message: "Método não permitido" });
}