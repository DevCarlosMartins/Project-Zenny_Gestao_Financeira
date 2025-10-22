import prisma from "../lib/prisma"

export const boletoRepository = {
  
  create: (data: {
    cedente: string
    dataValid: Date
    valor: number
    status: string
    usuarioId: number
  }) =>
    prisma.boleto.create({ data }),

  findById: (id: number) =>
    prisma.boleto.findUnique({
      where: { id },
      include: { usuario: true },
    }),

  findAll: () =>
    prisma.boleto.findMany({
      include: { usuario: true },
    }),

  update: (id: number,data: any) =>
    prisma.boleto.update({
      where: { id },
      data,
    }),

  delete: (id: number) =>
    prisma.boleto.delete({ where: { id } }),
}
