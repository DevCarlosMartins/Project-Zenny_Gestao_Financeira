import prisma from '../../lib/prisma'

export const cupomRepository = {
  create: (data: {
    descricao?: string;
    observacao?: string;
    valorDesc: number;
    codigo: string;
    patrocinadoraId: number;
  }) =>
    prisma.cupom.create({
      data,
      include: { patrocinadora: true },
    }),

  findById: (id: number) =>
    prisma.cupom.findUnique({
      where: { id },
      include: { patrocinadora: true },
    }),

  findAll: () =>
    prisma.cupom.findMany({
      include: { patrocinadora: true },
      orderBy: { id: "desc" },
    }),

  findByPatrocinadoraId: (patrocinadoraId: number) =>
    prisma.cupom.findMany({
      where: { patrocinadoraId },
      include: { patrocinadora: true },
      orderBy: { id: "desc" },
    }),

  update: (id: number, data: any) =>
    prisma.cupom.update({
      where: { id },
      data,
      include: { patrocinadora: true },
    }),

  delete: (id: number) =>
    prisma.cupom.delete({
      where: { id },
    }),
};