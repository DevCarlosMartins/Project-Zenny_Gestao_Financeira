import { projectUpdate } from 'next/dist/build/swc/generated-native';
import prisma from '../lib/prisma';

export const extratoRepository = {

  create: (data: { valor: number; tipo: string; contraparte?: string; usuarioId: number }) =>
    prisma.extrato.create({ data }),

  findById: (id: number) =>
    prisma.extrato.findUnique({
      where: { id },
      include: { usuario: true },
    }),

  findAll: () =>
    prisma.extrato.findMany({
      include: { usuario: true },
    }),

  findByUsuarioId: (usuarioId: number) =>
    prisma.extrato.findMany({
      where: { usuarioId },
      orderBy: { data: 'desc' },
    }),

    update: (id: number, data: any) =>
    prisma.extrato.update({
      where: { id },
      data,
    }),

  delete: (id: number) =>
    prisma.extrato.delete({
      where: { id },
    }),
};