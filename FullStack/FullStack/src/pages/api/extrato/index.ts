import type { NextApiRequest, NextApiResponse } from "next";
import { extratoService } from "../../services/extratoService"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const extratos = await extratoService.getExtratos();
            return res.status(200).json(extratos);
        } catch (error) {
            console.error('Erro ao buscar extratos:', error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    if (req.method === "POST") {
        const { valor, tipo, contraparte, usuarioId } = req.body;

        // Validação básica de campos obrigatórios
        if (!valor || !tipo || !usuarioId) {
            return res.status(400).json({ 
                message: "Campos obrigatórios ausentes",
                required: ["valor", "tipo", "usuarioId"]
            });
        }

        try {
            const extrato = await extratoService.createExtrato(
                Number(valor),
                tipo,
                Number(usuarioId),
                contraparte
            );
            return res.status(201).json(extrato);
        } catch (error: any) {
            // Captura os erros das regras de negócio
            console.error('Erro ao criar extrato:', error);
            
            if (error.message.includes('VALOR_INVALIDO')) {
                return res.status(400).json({ message: error.message });
            }
            if (error.message.includes('TIPO_INVALIDO')) {
                return res.status(400).json({ message: error.message });
            }
            if (error.message.includes('VALOR_EXCEDE_LIMITE')) {
                return res.status(400).json({ message: error.message });
            }
            if (error.message.includes('USUARIO_INVALIDO')) {
                return res.status(400).json({ message: error.message });
            }
            if (error.message.includes('LIMITE_DIARIO')) {
                return res.status(400).json({ message: error.message });
            }
            
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    return res.status(405).json({ message: "Método não permitido" });
}