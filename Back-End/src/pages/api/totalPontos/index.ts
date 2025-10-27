import type { NextApiRequest, NextApiResponse } from "next";
import { totalPontosService } from "../../../services/totalPontosService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const totalPontos = await totalPontosService.getTotalPontos();
    return res.status(200).json(totalPontos);
  }

  if (req.method === "POST") {
    const { ponto, logPontoId } = req.body;

    if (typeof ponto !== "number" || !logPontoId)
      return res.status(400).json({ message: "Campos 'ponto' e 'logPontoId' são obrigatórios" });

    const novoTotal = await totalPontosService.createTotalPonto(ponto, logPontoId);
    return res.status(201).json(novoTotal);
  }

  return res.status(405).json({ message: "Método não permitido" });
}