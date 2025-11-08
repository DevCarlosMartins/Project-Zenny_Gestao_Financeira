import type { NextApiRequest, NextApiResponse } from "next";
import { totalPontosService } from "../../services/totalPontosService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const totalPontoId = parseInt(id as string);

  if (isNaN(totalPontoId))
    return res.status(400).json({ message: "ID inválido" });

  if (req.method === "GET") {
    const total = await totalPontosService.getTotalPontoById(totalPontoId);
    return res.status(200).json(total);
  }

  if (req.method === "PUT") {
    const total = await totalPontosService.updateTotalPonto(totalPontoId, req.body);
    return res.status(200).json(total);
  }

  if (req.method === "DELETE") {
    await totalPontosService.deleteTotalPonto(totalPontoId);
    return res.status(204).end();
  }

  return res.status(405).json({ message: "Método não permitido" });
}