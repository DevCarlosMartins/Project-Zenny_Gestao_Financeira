import prisma from '../lib/prisma'

export const usuarioRepository = {

  create: (data: {nome: string; senha: string; saldo?: number}) =>
    prisma.usuario.create({ data }),

  findById: (id: number) =>
    prisma.usuario.findUnique({ where: { id }, include: { extratos: true } }),

  findAll: () => prisma.usuario.findMany(),

  update: (id: number, data: Partial<{ nome: string; senha: string; saldo?: number }>) =>
    prisma.usuario.update({ where: { id }, data }),
  
  delete: (id: number) =>
    prisma.usuario.delete({ where: { id } }),
}