import prisma from '../../lib/prisma'

export const categoriaInvestRepository = {

  create: (data: { nome: string; descricao?: string }) =>
    prisma.categoriaInvest.create({ data }),

  findById: (id: number) =>
    prisma.categoriaInvest.findUnique({
      where: { id },
      include: { investimentos: true },
    }),

  findAll: () =>
    prisma.categoriaInvest.findMany({
      include: { investimentos: true },
    }),

  update: (id: number, data: any) =>
    prisma.categoriaInvest.update({
      where: { id },
      data,
    }),

  delete: (id: number) =>
    prisma.categoriaInvest.delete({
      where: { id },
    }),
};
