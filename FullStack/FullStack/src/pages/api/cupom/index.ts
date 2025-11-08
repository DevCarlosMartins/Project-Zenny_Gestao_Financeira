import type { NextApiRequest, NextApiResponse } from "next";
import { cupomService } from "../../services/cupomService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const cupons = await cupomService.getCupons();
    return res.status(200).json(cupons);
  }

  if (req.method === "POST") {
    const { descricao, observacao, valorDesc, codigo, patrocinadoraId } = req.body;

    if (!valorDesc || !codigo || !patrocinadoraId)
      return res.status(400).json({
        message: "Campos 'valorDesc', 'codigo' e 'patrocinadoraId' são obrigatórios",
      });

    const novoCupom = await cupomService.createCupom(
      valorDesc,
      codigo,
      patrocinadoraId,
      descricao,
      observacao
    );

    return res.status(201).json(novoCupom);
  }

  return res.status(405).json({ message: "Método não permitido" });
}