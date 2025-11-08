import type { NextApiRequest, NextApiResponse } from "next"
import { boletoService } from "../../services/boletoService"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const boletoId = parseInt(id as string)

  if (isNaN(boletoId)) {
    return res.status(400).json({ message: "ID inválido" })
  }

  if (req.method === "GET") {
    const boleto = await boletoService.getBoletoById(boletoId)
    return res.status(200).json(boleto)
  }

  if (req.method === "PUT") {
    const boleto = await boletoService.updateBoleto(boletoId, req.body)
    return res.status(200).json(boleto)
  }

  if (req.method === "DELETE") {
    await boletoService.deleteBoleto(boletoId)
    return res.status(204).end()
  }

  return res.status(405).json({ message: "Método não permitido" })
}