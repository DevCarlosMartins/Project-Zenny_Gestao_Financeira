import type { NextApiRequest, NextApiResponse } from "next";
import { extratoService } from "../../../services/extratoService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query
    const extratoId = parseInt(id as string);

    if (req.method === "GET") {
        const extrato = await extratoService.getExtratoById(extratoId)
        return res.status(200).json(extrato)
    }

    if(req.method === "PUT") {
        const extrato = await extratoService.updateExtrato(extratoId, req.body)
        return res.status(200).json(extrato)
    }

    if(req.method === "DELETE") {
        await extratoService.deleteExtrato(extratoId)
        return res.status(204).end()
    }

    return res.status(405).json({ message: "Método não permitido" })
}