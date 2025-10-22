import type { NextApiRequest, NextApiResponse } from "next"
import { investimentoService } from "../../../services/investimentoService"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const investimentoId = parseInt(id as string)

  if (isNaN(investimentoId)) {
    return res.status(400).json({ message: "ID inválido" })
  }

  if (req.method === "GET") {
    const investimento = await investimentoService.getInvestimentoById(investimentoId)
    return res.status(200).json(investimento)
  }

  if (req.method === "PUT") {
    const investimento = await investimentoService.updateInvestimento(investimentoId, req.body)
    return res.status(200).json(investimento)
  }

  if (req.method === "DELETE") {
    await investimentoService.deleteInvestimento(investimentoId)
    return res.status(204).end()
  }

  return res.status(405).json({ message: "Método não permitido" })
}