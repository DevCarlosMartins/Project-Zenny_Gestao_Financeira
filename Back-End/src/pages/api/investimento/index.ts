import type { NextApiRequest, NextApiResponse } from "next"
import { investimentoService } from "../../../services/investimentoService"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const investimentos = await investimentoService.getInvestimentos()
    return res.status(200).json(investimentos)
  }

  if (req.method === "POST") {
    const { nome, categoria, data, corretora, valorInvest, usuarioId } = req.body

    if (!nome || !categoria || !data || !corretora || !valorInvest || !usuarioId) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes" })
    }

    try {
      const investimento = await investimentoService.createInvestimento(
        nome,
        categoria,
        new Date(data),
        corretora,
        valorInvest,
        usuarioId
      )
      return res.status(201).json(investimento)
    } catch (error: any) {
      if (error.code === "P2003") {
        return res.status(400).json({ message: "Usuário não encontrado. Verifique o usuarioId." })
      }
      return res.status(500).json({ message: "Erro ao criar investimento", error: error.message })
    }
  }

  return res.status(405).json({ message: "Método não permitido" })
}