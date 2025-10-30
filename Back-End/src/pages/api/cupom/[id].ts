import type { NextApiRequest, NextApiResponse } from "next";
import { cupomService } from "../../../services/cupomService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const cupomId = parseInt(id as string);

  if (isNaN(cupomId)) return res.status(400).json({ message: "ID inválido" });

  if (req.method === "GET") {
    const cupom = await cupomService.getCupomById(cupomId);
    return res.status(200).json(cupom);
  }

  if (req.method === "PUT") {
    const cupomAtualizado = await cupomService.updateCupom(cupomId, req.body);
    return res.status(200).json(cupomAtualizado);
  }

  if (req.method === "DELETE") {
    await cupomService.deleteCupom(cupomId);
    return res.status(204).end();
  }

  return res.status(405).json({ message: "Método não permitido" });
}