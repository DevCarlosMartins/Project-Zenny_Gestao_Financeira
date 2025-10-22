import prisma from "../lib/prisma"

export const investimentoRepository = {
  
  create: (data: {
    nome: string
    categoria: string
    data: Date
    corretora: string
    valorInvest: number
    usuarioId: number
  }) =>
    prisma.investimento.create({ data }),

  findById: (id: number) =>
    prisma.investimento.findUnique({
      where: { id },
      include: { usuario: true },
    }),

  findAll: () =>
    prisma.investimento.findMany({
      include: { usuario: true },
    }),

  update: (id: number, data: any) =>
    prisma.investimento.update({
      where: { id },
      data,
    }),

  delete: (id: number) =>
    prisma.investimento.delete({ where: { id } }),
}