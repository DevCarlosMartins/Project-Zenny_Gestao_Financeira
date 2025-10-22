import type { NextApiRequest, NextApiResponse } from "next"
import { boletoService } from "../../../services/boletoService"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const boletos = await boletoService.getBoletos()
    return res.status(200).json(boletos)
  }

  if (req.method === "POST") {
    const { cedente, dataValid, valor, status, usuarioId } = req.body

    if (!cedente || !dataValid || !valor || !status || !usuarioId) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes" })
    }

    try {
      const boleto = await boletoService.createBoleto(
        cedente,
        new Date(dataValid),
        valor,
        status,
        usuarioId
      )
      return res.status(201).json(boleto)
    } catch (error: any) {
      if (error.code === "P2003") {
        return res.status(400).json({ message: "Usuário não encontrado. Verifique o usuarioId." })
      }
      return res.status(500).json({ message: "Erro ao criar boleto", error: error.message })
    }
  }

  return res.status(405).json({ message: "Método não permitido" })
}
