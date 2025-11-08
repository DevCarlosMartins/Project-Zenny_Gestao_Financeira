import type { NextApiRequest, NextApiResponse } from "next";
import { patrocinadoraService } from "../../services/patrocinadoraService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const patrocinadoraId = parseInt(id as string);

  if (isNaN(patrocinadoraId))
    return res.status(400).json({ message: "ID inválido" });

  if (req.method === "GET") {
    const patrocinadora = await patrocinadoraService.getPatrocinadoraById(patrocinadoraId);
    return res.status(200).json(patrocinadora);
  }

  if (req.method === "PUT") {
    const patrocinadora = await patrocinadoraService.updatePatrocinadora(patrocinadoraId, req.body);
    return res.status(200).json(patrocinadora);
  }

  if (req.method === "DELETE") {
    await patrocinadoraService.deletePatrocinadora(patrocinadoraId);
    return res.status(204).end();
  }

  return res.status(405).json({ message: "Método não permitido" });
}