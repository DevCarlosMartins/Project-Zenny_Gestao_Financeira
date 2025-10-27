import prisma from "../lib/prisma";

export const totalPontosRepository = {
  create: (data: { ponto: number; logPontoId: number }) =>
    prisma.totalPontos.create({
      data,
    }),

  findById: (id: number) =>
    prisma.totalPontos.findUnique({
      where: { id },
      include: { logPonto: true },
    }),

  findAll: () =>
    prisma.totalPontos.findMany({
      include: { logPonto: true },
      orderBy: { id: "desc" },
    }),

  findByLogPontoId: (logPontoId: number) =>
    prisma.totalPontos.findMany({
      where: { logPontoId },
      include: { logPonto: true },
      orderBy: { id: "desc" },
    }),

  update: (id: number, data: any) =>
    prisma.totalPontos.update({
      where: { id },
      data,
    }),

  delete: (id: number) =>
    prisma.totalPontos.delete({
      where: { id },
    }),
};