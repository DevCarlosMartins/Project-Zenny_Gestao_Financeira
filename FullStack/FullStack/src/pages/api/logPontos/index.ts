import type { NextApiRequest, NextApiResponse } from "next";
import { logPontosService } from "../../services/logPontosService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const logPontos = await logPontosService.getLogPontos();
    return res.status(200).json(logPontos);
  }

  if (req.method === "POST") {
    const { operacao, usuarioId, extratoId } = req.body;

    if (!operacao || !usuarioId)
      return res.status(400).json({ message: "Operação e usuárioId são obrigatórios" });

    const novoLog = await logPontosService.createLogPonto(operacao, usuarioId, extratoId);
    return res.status(201).json(novoLog);
  }

  return res.status(405).json({ message: "Método não permitido" });
}