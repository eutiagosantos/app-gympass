import { UserAlreadyExistsError } from '@/services/errors/UserAlreadyExistsError'
import { makeRegisterUseCase } from '@/services/factories/makeRegisterUseCase'
import fastifyJwt from '@fastify/jwt'
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
        const registerService = makeRegisterUseCase()

        const { user } = await registerService.execute({
            name,
            email,
            password,
        })


    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send()
        }
        console.error(error)
        return reply.status(500).send()

    }

    return reply.status(201).send()
}