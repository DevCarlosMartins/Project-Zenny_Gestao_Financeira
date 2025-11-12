import type { NextApiRequest, NextApiResponse } from "next";
import { extratoService } from "../../services/extratoService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const extratoId = parseInt(id as string);

    if (isNaN(extratoId)) {
        return res.status(400).json({ message: "ID inválido" });
    }

    if (req.method === "GET") {
        try {
            const extrato = await extratoService.getExtratoById(extratoId);
            if (!extrato) {
                return res.status(404).json({ message: "Extrato não encontrado" });
            }
            return res.status(200).json(extrato);
        } catch (error) {
            console.error('Erro ao buscar extrato:', error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    if (req.method === "PUT") {
        try {
            const extrato = await extratoService.updateExtrato(extratoId, req.body);
            return res.status(200).json(extrato);
        } catch (error: any) {
            console.error('Erro ao atualizar extrato:', error);
            
            // Captura erros das regras de negócio
            if (error.message.includes('VALOR_INVALIDO') || 
                error.message.includes('TIPO_INVALIDO') ||
                error.message.includes('VALOR_EXCEDE_LIMITE')) {
                return res.status(400).json({ message: error.message });
            }
            
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    if (req.method === "DELETE") {
        try {
            await extratoService.deleteExtrato(extratoId);
            return res.status(204).end();
        } catch (error) {
            console.error('Erro ao deletar extrato:', error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    return res.status(405).json({ message: "Método não permitido" });
}