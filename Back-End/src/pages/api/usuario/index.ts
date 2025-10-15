import type { NextApiRequest, NextApiResponse } from "next"
import { usuarioService } from "../../../services/usuarioService"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const usuarios = await usuarioService.getUsuarios()
    return res.status(200).json(usuarios)
  }

  if (req.method === "POST") {
    const { nome, senha, saldo } = req.body
    const usuario = await usuarioService.createUsuario(nome, senha, saldo)
    return res.status(201).json(usuario)
  }

  return res.status(405).json({ message: "Método não permitido" })
}