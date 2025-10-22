import type { NextApiRequest, NextApiResponse } from "next"
import { agendamentoService } from "../../../services/agendamentoService"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const agendamentoId = parseInt(id as string)

  if (isNaN(agendamentoId)) {
    return res.status(400).json({ message: "ID inválido" })
  }

  if (req.method === "GET") {
    const agendamento = await agendamentoService.getAgendamentoById(agendamentoId)
    return res.status(200).json(agendamento)
  }

  if (req.method === "PUT") {
    const agendamento = await agendamentoService.updateAgendamento(agendamentoId, req.body)
    return res.status(200).json(agendamento)
  }

  if (req.method === "DELETE") {
    await agendamentoService.deleteAgendamento(agendamentoId)
    return res.status(204).end()
  }

  return res.status(405).json({ message: "Método não permitido" })
}
