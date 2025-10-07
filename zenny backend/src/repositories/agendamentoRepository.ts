import prisma from '../lib/prisma'

export const agendamentoRepository = {

    create: (data: { nome: string; descricao: string | null; data: Date; horario: Date; usuarioId: number}) =>
        prisma.agendamento.create({ data }),

    findById: (id: number) =>
        prisma.agendamento.findUnique({
            where: { id },
            include: { usuario: true },
        }),
    
    findAll: () => 
        prisma.agendamento.findMany({
        include: { usuario: true },
        }),

    findByUsuarioId: (usuarioId: number) =>
        prisma.agendamento.findMany({
            where: { usuarioId },
            orderBy: {data: 'desc'}
        }),

    update: (id: number, data: any) =>
        prisma.agendamento.update({
            where: { id },
            data,
        }),
    
    delete: (id: number) =>
        prisma.agendamento.delete({
            where: { id },
        })
}