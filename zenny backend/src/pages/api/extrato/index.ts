import type { NextApiRequest, NextApiResponse } from "next";
import{ extratoService } from "../../../services/extratoService"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const extratos = await extratoService.getExtratos()
        return res.status(200).json(extratos)
    }

    if (req.method === "POST") {
        const { valor, tipo, contraparte, usuarioId} = req.body
        const extrato = await extratoService.createExtrato(valor, tipo, usuarioId, contraparte)
        return res.status(200).json(extrato)
    }

    return res.status(405).json({ message: "Método não permitido" })
}