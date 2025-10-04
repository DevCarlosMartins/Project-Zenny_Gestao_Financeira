import type { NextApiRequest, NextApiResponse } from "next"
import { usuarioService } from "../../../services/usuarioService"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const usuarioId = parseInt(id as string)

  if (req.method === "GET") {
    const usuario = await usuarioService.getUsuarioById(usuarioId)
    return res.status(200).json(usuario)
  }

  if (req.method === "PUT") {
    const usuario = await usuarioService.updateUsuario(usuarioId, req.body)
    return res.status(200).json(usuario)
  }

  if (req.method === "DELETE") {
    await usuarioService.deleteUsuario(usuarioId)
    return res.status(204).end()
  }

  return res.status(405).json({ message: "Método não permitido" })
}