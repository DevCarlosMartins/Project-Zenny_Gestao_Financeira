import prisma from '../../lib/prisma'

export const patrocinadoraRepository = {
  create: (data: { nome: string; cnpj: string; nomeFant: string }) =>
    prisma.patrocinadora.create({
      data,
    }),

  findById: (id: number) =>
    prisma.patrocinadora.findUnique({
      where: { id },
      include: { cupons: true },
    }),

  findAll: () =>
    prisma.patrocinadora.findMany({
      include: { cupons: true },
      orderBy: { id: "desc" },
    }),

  update: (id: number, data: any) =>
    prisma.patrocinadora.update({
      where: { id },
      data,
    }),

  delete: (id: number) =>
    prisma.patrocinadora.delete({
      where: { id },
    }),
};