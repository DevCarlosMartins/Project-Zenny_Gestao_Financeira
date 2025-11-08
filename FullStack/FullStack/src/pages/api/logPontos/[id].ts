import type { NextApiRequest, NextApiResponse } from "next";
import { logPontosService } from "../../services/logPontosService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const logPontoId = parseInt(id as string);

  if (isNaN(logPontoId))
    return res.status(400).json({ message: "ID inválido" });

  if (req.method === "GET") {
    const log = await logPontosService.getLogPontoById(logPontoId);
    return res.status(200).json(log);
  }

  if (req.method === "PUT") {
    const log = await logPontosService.updateLogPonto(logPontoId, req.body);
    return res.status(200).json(log);
  }

  if (req.method === "DELETE") {
    await logPontosService.deleteLogPonto(logPontoId);
    return res.status(204).end();
  }

  return res.status(405).json({ message: "Método não permitido" });
}