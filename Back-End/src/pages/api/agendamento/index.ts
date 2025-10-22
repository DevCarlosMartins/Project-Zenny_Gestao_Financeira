import type { NextApiRequest, NextApiResponse } from "next"
import { agendamentoService } from "../../../services/agendamentoService"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const agendamentos = await agendamentoService.getAgendamentos()
    return res.status(200).json(agendamentos)
  }

  if (req.method === "POST") {
    const { nome, descricao, data, horario, usuarioId } = req.body

    if (!nome || !data || !horario || !usuarioId) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes" })
    }

    const agendamento = await agendamentoService.createAgendamento(
      nome,
      descricao,
      new Date(data),
      new Date(horario),
      usuarioId
    )

    return res.status(201).json(agendamento)
  }

  return res.status(405).json({ message: "Método não permitido" })
}
