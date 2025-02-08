import { prisma } from '@/database/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository'
import { RegisterService } from '@/services/registerService'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'


export async function register(request: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        const prismaUsers = new PrismaUsersRepository()
        const registerService = new RegisterService(prismaUsers)

        await registerService.execute({
            name,
            email,
            password,
        })

    } catch (error) {
        return reply.status(409).send()
    }

    return reply.status(201).send()
}