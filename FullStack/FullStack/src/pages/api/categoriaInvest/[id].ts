import type { NextApiRequest, NextApiResponse } from "next";
import { categoriaInvestService } from "../../services/categoriaInvestService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const categoriaId = parseInt(id as string);

  if (isNaN(categoriaId)) return res.status(400).json({ message: "ID inválido" });

  if (req.method === "GET") {
    const categoria = await categoriaInvestService.getCategoriaById(categoriaId);
    return res.status(200).json(categoria);
  }

  if (req.method === "PUT") {
    const categoria = await categoriaInvestService.updateCategoria(categoriaId, req.body);
    return res.status(200).json(categoria);
  }

  if (req.method === "DELETE") {
    await categoriaInvestService.deleteCategoria(categoriaId);
    return res.status(204).end();
  }

  return res.status(405).json({ message: "Método não permitido" });
}