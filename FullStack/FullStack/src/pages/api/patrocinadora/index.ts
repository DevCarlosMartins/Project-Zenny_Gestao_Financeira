import type { NextApiRequest, NextApiResponse } from "next";
import { patrocinadoraService } from "../../services/patrocinadoraService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const patrocinadoras = await patrocinadoraService.getPatrocinadoras();
    return res.status(200).json(patrocinadoras);
  }

  if (req.method === "POST") {
    const { nome, cnpj, nomeFant } = req.body;

    if (!nome || !cnpj || !nomeFant)
      return res.status(400).json({ message: "Campos 'nome', 'cnpj' e 'nomeFant' são obrigatórios" });

    const novaPatrocinadora = await patrocinadoraService.createPatrocinadora(
      nome,
      cnpj,
      nomeFant
    );

    return res.status(201).json(novaPatrocinadora);
  }

  return res.status(405).json({ message: "Método não permitido" });
}