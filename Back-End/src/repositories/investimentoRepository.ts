import prisma from '../lib/prisma';

export const investimentoRepository = {

  create: (data: {
    data: Date;
    corretora: string;
    valorInvest: number;
    usuarioId: number;
    categoriaId?: number | null; // opcional
  }) =>
    prisma.investimento.create({
      data: {
        ...data,
        categoriaId: data.categoriaId ?? undefined, // ignora se não tiver categoria
      },
    }),

  findById: (id: number) =>
    prisma.investimento.findUnique({
      where: { id },
      include: {
        usuario: true,
        categoria: true,
      },
    }),

  findAll: () =>
    prisma.investimento.findMany({
      include: {
        usuario: true,
        categoria: true,
      },
    }),

  update: (id: number, data: any) =>
    prisma.investimento.update({
      where: { id },
      data,
    }),

  delete: (id: number) =>
    prisma.investimento.delete({
      where: { id },
    }),
};
