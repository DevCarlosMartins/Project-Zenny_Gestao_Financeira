import prisma from '../../lib/prisma'

export const logPontosRepository = {
  create: (data: { operacao: string; usuarioId: number; extratoId?: number }) =>
    prisma.logPontos.create({
      data,
    }),

  findById: (id: number) =>
    prisma.logPontos.findUnique({
      where: { id },
      include: {
        usuario: true,
        extrato: true,
        totalPontos: true,
      },
    }),

  findAll: () =>
    prisma.logPontos.findMany({
      include: {
        usuario: true,
        extrato: true,
        totalPontos: true,
      },
      orderBy: { id: "desc" },
    }),

  findByUsuarioId: (usuarioId: number) =>
    prisma.logPontos.findMany({
      where: { usuarioId },
      include: {
        extrato: true,
        totalPontos: true,
      },
      orderBy: { id: "desc" },
    }),

  update: (id: number, data: any) =>
    prisma.logPontos.update({
      where: { id },
      data,
    }),

  delete: (id: number) =>
    prisma.logPontos.delete({
      where: { id },
    }),
};