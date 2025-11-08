import type { NextApiRequest, NextApiResponse } from "next"
import { usuarioService } from "../../services/usuarioService"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { nome, senha } = req.body
    
    try {
      const usuario = await usuarioService.validarUsuario(nome, senha)
      
      if (usuario) {
        return res.status(200).json({ 
          success: true, 
          user: { id: usuario.id, nome: usuario.nome } 
        })
      } else {
        return res.status(401).json({ 
          success: false, 
          message: "Credenciais inválidas" 
        })
      }
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Erro interno do servidor" 
      })
    }
  }

  return res.status(405).json({ message: "Método não permitido" })
}