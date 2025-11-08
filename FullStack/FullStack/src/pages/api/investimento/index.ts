import type { NextApiRequest, NextApiResponse } from "next"
import { investimentoService } from "../../services/investimentoService"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const investimentos = await investimentoService.getInvestimentos()
    return res.status(200).json(investimentos)
  }

  if (req.method === "POST") {
    const { data, corretora, valorInvest, usuarioId, categoriaId } = req.body

    if (!data || !corretora || !valorInvest || !usuarioId) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes" })
    }

    try {
      const investimento = await investimentoService.createInvestimento(
        new Date(data),
        corretora,
        Number(valorInvest),
        Number(usuarioId),
        categoriaId ? Number(categoriaId) : undefined
)
      return res.status(201).json(investimento)
    } catch (error: any) {
      if (error.code === "P2003") {
        return res.status(400).json({ message: "Usuário ou categoria não encontrados." })
      }
      return res.status(500).json({ message: "Erro ao criar investimento", error: error.message })
    }
  }

  return res.status(405).json({ message: "Método não permitido" })
}
